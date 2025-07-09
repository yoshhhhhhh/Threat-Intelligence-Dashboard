import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const navStyle = {
    padding: '1rem',
    background: '#282c34',
    color: 'white',
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  };

  const linkStyle = (path) => ({
    color: location.pathname === path ? 'yellow' : 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  });

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle('/')}>Home</Link>
      <Link to="/dashboard" style={linkStyle('/dashboard')}>Dashboard</Link>
      <Link to="/threats" style={linkStyle('/threats')}>Threat Table</Link>
    </nav>
  );
}
