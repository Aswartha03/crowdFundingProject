import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [hovered, setHovered] = useState({ signup: false, login: false });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>CrowdFunding</h2>
      <div style={isMobile ? styles.linksMobile : styles.links}>
        <Link
          to="/signup"
          style={{
            ...(isMobile ? styles.buttonMobile : styles.button),
            ...(hovered.signup ? styles.hoverButton : {}),
          }}
          onMouseEnter={() => setHovered({ ...hovered, signup: true })}
          onMouseLeave={() => setHovered({ ...hovered, signup: false })}
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          style={{
            ...(isMobile ? styles.buttonMobile : styles.button),
            ...(hovered.login ? styles.hoverButton : {}),
          }}
          onMouseEnter={() => setHovered({ ...hovered, login: true })}
          onMouseLeave={() => setHovered({ ...hovered, login: false })}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  logo: {
    margin: 0,
    fontSize: '24px',
  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  linksMobile: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    position: 'absolute',
    top: '60px',
    right: '20px',
    backgroundColor: '#444',
    padding: '10px',
    borderRadius: '8px',
  },
  button: {
    color: '#fff',
    textDecoration: 'none',
    backgroundColor: '#007bff',
    padding: '8px 16px',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
  },
  buttonMobile: {
    color: '#fff',
    textDecoration: 'none',
    backgroundColor: '#28a745',
    padding: '10px 20px',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
  },
  hoverButton: {
    backgroundColor: '#0056b3',
    transform: 'scale(1.05)',
  }
}
