# AI Comic Generator with Gemini API

## 📌 Overview
The **AI Comic Generator** is an educational tool that converts text-based inputs (like a chapter or concept) into engaging comics using **Google's Gemini API**. It enhances learning by transforming text into visually appealing narratives, making education interactive and fun.

**Note**: THe Project is running locally. I have Tries Deploying Vercel, its getting some errors.

**Credientials to login Directly**: 
Email: puligillayashwanth111@gmail.com
Password : 1234567890

## 🚀 Features
- **AI-Powered Storytelling** – Generates a story-driven comic from text inputs.
- **Customizable Inputs** – Users can enter any topic or educational content.
- **Automated Comic Creation** – Uses Gemini API to generate dialogues, descriptions, and image prompts.
- **Engaging Visuals** – AI-generated content is structured in a comic format.
- **User-Friendly Interface** – Simple input method for seamless comic generation.
- **DataBase Authentication** - Login/Register is authenticated and user info is saved in Firestore Database
- **Retrieved Augmented Generation** - The Comic can be still understandable by questioning it via RAG, I have used Tinyllama from Hugging Face.
- **Image Generation** - I have used Stable Diffusion-v1-4 for image generation (Still need to Integrate).

## 🏗️ Tech Stack
- **Backend**: Python (Flask/FastAPI)
- **API**: Google Gemini API
- **Frontend**: Next.js
- **Storage**: Local file system
- **Database**: FireBase

## 📦 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yashwanth11187/Personalized-Comic-Generator.git
   cd Personalized-Comic-Generator
   ```
2. Create a virtual environment and install dependencies:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Set up **Google Gemini API**:
   - Get an API key from [Google AI Studio](https://ai.google.com/)
   - Create a `.env` file and add:
     ```sh
     GEMINI_API_KEY=your_api_key_here
     ```

## ⚡ Usage
1. Run the script:
   ```sh
   python main.py
   ```
2. Enter a chapter or concept as input.
3. The AI processes the text and generates a **comic-style story**.
4. Output can be saved or displayed in a **web UI** (if integrated).

## 📝 Example API Request
```python
import requests
API_URL = "http://localhost:5000/generate"
data = {"chapter": "Newton's Laws of Motion"}
response = requests.post(API_URL, json=data)
print(response.json())
```

## 🛠️ Future Enhancements
- Integrate **AI-generated images** for a complete visual experience.
- Add **multi-language support** using NLLB.
- Implement a **drag-and-drop UI** for user customization.
- Implement Voice Over with **Genesis Robotics**.

## 🤝 Contribution
Feel free to fork, submit issues, or contribute improvements!


---
### 🔗 Connect with Me
GitHub: [yashwanth11187](https://github.com/yashwanth11187)
