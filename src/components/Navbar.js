import Link from 'next/link';

export default function Navbar({ user, userName, handleLogout }) {
    return ( <
        nav className = "navbar" >
        <
        div className = "logo" >
        <
        button onClick = {
            () => window.location.href = '/'
        }
        className = "logo-button" > 📚EduPlatform <
        /button> < /
        div >


        <
        ul className = "nav-links" >
        <
        li >
        <
        button onClick = {
            () => window.location.href = '/'
        }
        className = "nav-button" >
        Home <
        /button> < /
        li > {
            user && ( <
                >
                <
                li >
                <
                button onClick = {
                    () => window.location.href = '/comic-generator'
                }
                className = "nav-button" >
                Create Comic <
                /button> < /
                li > <
                li >
                <
                button onClick = {
                    () => window.location.href = '/buddy'
                }
                className = "nav-button" >
                <
                /button> < /
                li > <
                />
            )
        } {
            !user ? ( < li >
                <
                Link href = "/login" >
                <
                /
                Link > <
                /li>

            ) : ( <
                >
                <
                li className = "welcome-text" > Welcome, { userName }! < /li> <
                li >
                <
                button className = "logout-btn"
                onClick = { handleLogout }
                label = "Logout" >
                Logout <
                /button> < /
                li > <
                />
            )
        } <
        /ul>

        <
        style jsx > { `
                .navbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 2rem;
                    background-color: rgba(26, 26, 46, 0.9);
                    backdrop-filter: blur(10px);
                    position: fixed;
                    width: 100%;
                    top: 0;
                    z-index: 1000;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .logo-link {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #fff;
                    text-decoration: none;
                    transition: opacity 0.3s ease;
                }

                .logo-link:hover {
                    opacity: 0.8;
                }

                .nav-links {
                    list-style: none;
                    display: flex;
                    gap: 2rem;
                    align-items: center;
                    margin: 0;
                    padding: 0;
                }

                .nav-link {
                    text-decoration: none;
                    color: #fff;
                    font-size: 1rem;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    transition: all 0.3s ease;
                }

                .nav-link:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }

                .login-link {
                    background-color: #0070f3;
                    padding: 0.5rem 1.5rem;
                }

                .login-link:hover {
                    background-color: #005bb5;
                }

                .logout-btn {
                    background-color: #ff4d4d;
                    color: white;
                    border: none;
                    padding: 0.5rem 1.5rem;
                    cursor: pointer;
                    border-radius: 5px;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }

                .logout-btn:hover {
                    background-color: #e63946;
                    transform: translateY(-1px);
                }

                .welcome-text {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 0.95rem;
                    margin-right: 1rem;
                }

                @media (max-width: 768px) {
                    .navbar {
                        padding: 1rem;
                    }
                    
                    .nav-links {
                        gap: 1rem;
                    }
                    
                    .nav-link {
                        padding: 0.5rem;
                    }
                    
                    .welcome-text {
                        display: none;
                    }
                }
            ` } < /style> < /
        nav >
    );
}