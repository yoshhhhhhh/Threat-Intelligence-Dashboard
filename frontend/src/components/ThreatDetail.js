import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ThreatDetail() {
  const { id } = useParams();
  const [threat, setThreat] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/threats/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Threat not found');
        return res.json();
      })
      .then((data) => setThreat(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!threat) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Threat Details - ID: {id}</h2>
      <p><strong>Threat Category:</strong> {threat.threat_category}</p>
      <p><strong>Severity Score:</strong> {threat.severity_score}</p>
      <p><strong>Cleaned Description:</strong> {threat.cleaned_description}</p>
      <p><strong>Original Description:</strong> {threat.description}</p>
      <p><strong>Risk Level Prediction:</strong> {threat.risk_level_prediction}</p>

      <Link to="/">← Back to Dashboard</Link>
    </div>
  );
}

export default ThreatDetail;
