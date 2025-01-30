import { useState } from 'react';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                createdAt: serverTimestamp(),
                role: "student",
                profilePicture: ""
            });

            alert('Registered successfully!');
            router.push('/'); // Redirect to the main page
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="background">
            <div className="glassmorphism slideIn">
                <h1 style={{ color: 'white', textAlign: 'center' }}>Register</h1>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="input"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="input"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="input"
                        required
                    />
                    <button type="submit" className="button">
                        Register
                    </button>
                </form>
                <p style={{ color: 'white', textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Link href="/login" style={{ color: '#0070f3' }}>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}