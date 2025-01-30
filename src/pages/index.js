import { color, motion } from 'framer-motion';
import Link from 'next/link';
import { auth, db } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';

export default function Home() {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('');
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async(user) => {
            if (user) {
                setUser(user);
                await fetchUserName(user.uid);
            } else {
                setUser(null);
                setUserName('');
            }
        });
        return () => unsubscribe();
    }, []);

    const fetchUserName = async(uid) => {
        try {
            const userDocRef = doc(db, 'users', uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserName(userData.name || 'User');
            } else {
                setUserName('User');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUserName('User');
        }
    };

    const handleLogout = async() => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return ( <
        div className = "background" >
        <
        Navbar user = { user }
        userName = { userName }
        handleLogout = { handleLogout }
        />

        <
        div className = "main-content" >
        <
        motion.div initial = {
            { opacity: 0, y: 20 }
        }
        animate = {
            { opacity: 1, y: 0 }
        }
        transition = {
            { duration: 0.8 }
        }
        className = "hero-section" >
        <
        h1 > Welcome to AI - Powered Education < /h1> <
        p > Transform Learning Through Interactive Comic Experiences < /p>

        {
            user ? ( <
                div className = "auth-buttons" >
                <
                Link href = "/comic-generator" >
                <
                button className = "cta-button" >
                Create Your First Comic <
                /button> < /
                Link > <
                /div>
            ) : ( <
                div className = "auth-buttons" >
                <
                Link href = "/login" >
                <
                button className = "cta-button" >
                Get Started <
                /button> < /
                Link > <
                /div>
            )
        } <
        /motion.div>

        { /* How It Works Section */ } <
        motion.section initial = {
            { opacity: 0 }
        }
        whileInView = {
            { opacity: 1 }
        }
        viewport = {
            { once: true }
        }
        className = "how-it-works" >
        <
        h2 > How It Works < /h2> <
        div className = "steps-grid" >
        <
        div className = "step-card" >
        <
        div className = "step-number" > 1 < /div> <
        h3 > Choose Your Topic < /h3> <
        p > Select any educational subject or concept you want to teach or learn < /p> < /
        div > <
        div className = "step-card" >
        <
        div className = "step-number" > 2 < /div> <
        h3 > Customize Parameters < /h3> <
        p > Set your target audience, learning objectives, and preferred style < /p> < /
        div > <
        div className = "step-card" >
        <
        div className = "step-number" > 3 < /div> <
        h3 > Generate & Explore < /h3> <
        p > Watch AI create engaging comic content tailored to your needs < /p> < /
        div > <
        /div> < /
        motion.section >

        { /* Features Section */ } <
        motion.section initial = {
            { opacity: 0 }
        }
        whileInView = {
            { opacity: 1 }
        }
        viewport = {
            { once: true }
        }
        className = "features" >
        <
        h2 > Why Choose EduComics ? < /h2> <
        div className = "features-grid" >
        <
        div className = "feature-card" >
        <
        h3 > 🚀AI - Powered Generation < /h3> <
        p > Advanced algorithms create age - appropriate educational content < /p> < /
        div > <
        div className = "feature-card" >
        <
        h3 > 🎨Visual Learning < /h3> <
        p > Complex concepts made simple through comic storytelling < /p> < /
        div > <
        div className = "feature-card" >
        <
        h3 > 📚Curriculum Aligned < /h3> <
        p > Content adaptable to various educational standards and levels < /p> < /
        div > <
        /div> < /
        motion.section >

        { /* Get Started Section */ } <
        motion.section initial = {
            { opacity: 0 }
        }
        whileInView = {
            { opacity: 1 }
        }
        viewport = {
            { once: true }
        }
        className = "cta-section" >
        <
        h2 style = {
            { color: 'black' } } > Start Creating Today < /h2> <p style={{ color: 'black' }}> <
        strong > Join hundreds of educators and students already transforming their learning experience < /strong> < /
        p > <
        div className = "auth-buttons" > {
            user ? ( <
                Link href = "/comic-generator" >
                <
                button className = "cta-button" >
                Continue Creating <
                /button> < /
                Link >
            ) : ( <
                Link href = "/signup" >
                <
                button className = "cta-button" >
                Join Free Now <
                /button> < /
                Link >
            )
        } <
        /div> < /
        motion.section > <
        /div> < /
        div >
    );
}