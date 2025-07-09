import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ThreatTable() {
  const [threats, setThreats] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(1);

  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();


  // Fetch unique threat categories
  useEffect(() => {
    fetch('/api/threats?page=1&limit=100')
      .then((res) => res.json())
      .then((data) => {
        const unique = [...new Set(data.data.map((t) => t.threat_category))].filter(Boolean);
        setCategories(unique);
      });
  }, []);

  // Fetch threats
  useEffect(() => {
    let url = `/api/threats?page=${page}&limit=${limit}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setThreats(data.data || []);
        setPages(data.pages || 1);
      })
      .catch((err) => console.error('Error fetching threats:', err));
  }, [page, limit, category, searchTerm]);

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    const currentOffset = (page - 1) * limit;
    const newPage = Math.floor(currentOffset / newLimit) + 1;

    setLimit(newLimit);
    setPage(newPage);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setPage(1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Threat Table</h2>

      {/* Controls */}
      <div style={{ marginBottom: '10px' }}>
        {/* Rows per page */}
        <label htmlFor="limit">Rows per page: </label>
        <select id="limit" value={limit} onChange={handleLimitChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Category filter */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="category">Filter by Threat Category: </label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Search input */}
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: '10px' }}>
        <label htmlFor="search">Search Description: </label>
        <input
          id="search"
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search threats..."
        />
        <button type="submit">Search</button>
      </form>

      {/* Table */}
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Threat Category</th>
            <th>Severity Score</th>
            <th>Cleaned Description</th>
            <th>Risk Level</th>
          </tr>
        </thead>
        <tbody>
  {threats.map((threat) => (
    <tr
      key={threat.id}
      onClick={() => navigate(`/threats/${threat.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <td>{threat.id}</td>
      <td>{threat.threat_category}</td>
      <td>{threat.severity_score}</td>
      <td>{threat.cleaned_description}</td>
      <td>{threat.risk_level_prediction}</td>
    </tr>
  ))}
</tbody>

      </table>

      {/* Pagination */}
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>Page {page} of {pages}</span>
        <button onClick={() => setPage((p) => Math.min(p + 1, pages))} disabled={page === pages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ThreatTable;
