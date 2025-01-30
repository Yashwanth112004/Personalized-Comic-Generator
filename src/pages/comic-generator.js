import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/ComicGenerator.module.css';
import Navbar from '@/components/Navbar'; // Import the Navbar component

export default function ComicGenerator() {
    const [formData, setFormData] = useState({
        topic: '',
        targetAudience: 'kids',
        objective: ''
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/generate_comic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to generate comic');

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return ( <
        div className = { styles.background } >
        <
        Navbar / > { /* Add the Navbar component here */ }

        <
        motion.div className = { styles.glassmorphism }
        initial = {
            { opacity: 0, y: 20 }
        }
        animate = {
            { opacity: 1, y: 0 }
        }
        transition = {
            { duration: 0.5 }
        } >
        <
        h1 className = { styles.title } > AI Comic Generator < /h1>

        <
        form onSubmit = { handleSubmit }
        className = { styles.form } >
        <
        div className = { styles.formGroup } >
        <
        label > Topic: < /label> <
        input type = "text"
        value = { formData.topic }
        onChange = {
            (e) => setFormData({...formData, topic: e.target.value })
        }
        required /
        >
        <
        /div>

        <
        div className = { styles.formGroup } >
        <
        label > Target Audience: < /label> <
        select value = { formData.targetAudience }
        onChange = {
            (e) => setFormData({...formData, targetAudience: e.target.value })
        } >
        <
        option value = "kids" > Kids < /option> <
        option value = "teens" > Teens < /option> <
        option value = "adults" > Adults < /option> < /
        select > <
        /div>

        <
        div className = { styles.formGroup } >
        <
        label > Learning Objective: < /label> <
        textarea value = { formData.objective }
        onChange = {
            (e) => setFormData({...formData, objective: e.target.value })
        }
        required /
        >
        <
        /div>

        <
        button type = "submit"
        className = { styles.button }
        disabled = { loading } > { loading ? 'Generating...' : 'Create Comic' } <
        /button> < /
        form >

        {
            error && < p className = { styles.error } > { error } < /p>}

            {
                result && ( <
                    div className = { styles.result } >
                    <
                    h2 > Generated Comic Script < /h2> <
                    pre className = { styles.script } > { result.script } < /pre> <
                    a href = { `http://localhost:5000${result.pdf_url}` }
                    download className = { styles.downloadButton } >
                    Download PDF <
                    /a> < /
                    div >
                )
            } <
            /motion.div> < /
            div >
        );
    }