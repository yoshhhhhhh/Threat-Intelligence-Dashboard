// src/pages/Home.jsx
import React from 'react';
import CyberSecurityImage from '../Cyber_security.png';
export default function Home() {
  return (
    <div
      style={{
        padding: '2rem',
        backgroundImage: `url(${CyberSecurityImage})`,
        backgroundSize: 'cover',      // cover the entire div
        backgroundPosition: 'center', // center the image
        minHeight: '100vh',            // full viewport height so image fills screen
        color: 'white',                // if image is dark, white text stands out
      }}
    >
      <h1>Welcome to the Threat Intelligence Dashboard</h1>
      <p>This tool helps analyze cybersecurity threats with visual insights and searchable data.</p>
      <p>Use the navigation bar to explore the Dashboard and Threat Table.</p>
    </div>
  );
}
