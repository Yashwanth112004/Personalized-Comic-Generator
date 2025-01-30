import { useState } from 'react';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Logged in successfully!');
            router.push('/'); // Redirect to the main page
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="background">
            <div className="glassmorphism slideIn">
                <h1 style={{ color: 'white', textAlign: 'center' }}>Login</h1>
                <form onSubmit={handleLogin}>
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
                        Login
                    </button>
                </form>
                <p style={{ color: 'white', textAlign: 'center' }}>
                    Don't have an account?{' '}
                    <Link href="/register" style={{ color: '#0070f3' }}>
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}