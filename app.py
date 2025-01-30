import os
from typing import Dict, Optional
from flask import Flask, request, jsonify, render_template, send_file
from dotenv import load_dotenv
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import google.generativeai as genai
from flask_cors import CORS 

# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# Load environment variables from .env file
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("Please set the GEMINI_API_KEY in the .env file.")

class EducationalComicGenerator:
    def __init__(self, api_key: str):
        """Initialize the generator with API key."""
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-exp-1206")

    def create_comic_prompt(self, answers: Dict[str, str]) -> str:
        """Creates a structured prompt for educational comic script based on user's answers."""
        return f"""You are an expert educational comic creator. Based on the following information, generate a detailed, engaging comic script for kids about {answers.get('topic', '')}:

Topic: {answers.get('topic', '')}
Target Audience: {answers.get('target_audience', '')}
Objective: {answers.get('objective', '')}

Generate a script for a 4-panel comic that explains the topic in a fun and educational way. Include dialogue, educational content, and narrative structure for each panel. Keep the tone friendly, clear, and entertaining.

The script should include:
1. Panel 1: Introduction to the topic with an engaging hook.
2. Panel 2: Explanation with examples or visuals.
3. Panel 3: A challenge or problem related to the topic.
4. Panel 4: Resolution and conclusion with a fun takeaway or learning point."""

    def generate_comic_script(self, user_answers: Dict[str, str]) -> Optional[str]:
        """Generates an educational comic script using the Gemini API."""
        try:
            prompt = self.create_comic_prompt(user_answers)
            response = self.model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    temperature=0.7,
                    top_p=0.8,
                    top_k=40,
                    max_output_tokens=1024
                )
            )
            return response.text.replace("*", "").strip()
        except Exception as e:
            print(f"Error generating comic script: {e}")
            return None
    

    def save_comic_pdf(self, script: str, filename: str) -> bool:
        """Saves the generated comic script to a formatted PDF file."""
        try:
            # Create a PDF with word wrapping
            max_width = 500  # Maximum width for text in the PDF
            margin = 50  # Left margin
            line_height = 12  # Line height
            y_position = 750  # Initial y position
            c = canvas.Canvas(filename, pagesize=letter)

            for line in script.split("\n"):
                while line:
                    if y_position < 50:  # If near the bottom, add a new page
                        c.showPage()
                        y_position = 750
                    # Split the line to fit within max_width
                    text = line[:max_width]
                    c.drawString(margin, y_position, text)
                    line = line[len(text):]
                    y_position -= line_height

            c.save()
            return True
        except Exception as e:
            print(f"Error creating PDF: {e}")
            return False

# Initialize comic generator
comic_generator = EducationalComicGenerator(api_key)

@app.route("/")
def index():
    """Serve the HTML form."""
    return render_template("comic.html")

@app.route("/generate_comic", methods=["POST"])
def generate_comic():
    """Handle comic generation requests."""
    try:
        data = request.get_json()
        user_answers = {
            "topic": data["topic"],
            "target_audience": data["targetAudience"],  # Match frontend naming
            "objective": data["objective"],
        }
        script = comic_generator.generate_comic_script(user_answers)
        if not script:
            return jsonify({"error": "Failed to generate script."}), 500

        filename = "comic_script.pdf"
        if comic_generator.save_comic_pdf(script, filename):
            return jsonify({"script": script, "pdf_url": f"/download/{filename}"})
        return jsonify({"error": "Failed to save PDF."}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/download/<filename>")
def download_file(filename):
    """Handle file download requests."""
    try:
        return send_file(filename, as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)