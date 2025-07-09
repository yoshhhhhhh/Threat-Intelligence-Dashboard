# Threat-Intelligence-Dashboard

 Overview
The Threat Intelligence Dashboard is a full-stack web application that enables cybersecurity analysts to browse, filter, and analyze cyber threat data. The data originates from a CSV file sourced from a Kaggle dataset.

✅ Features Implemented
Ingests and stores threat data from a CSV into a database.

RESTful API using Flask to support:

Pagination, search, and filter of threat reports.

Threat statistics (total count, by category, by severity).

Individual threat details by ID.

React frontend with:

Dashboard view showing statistics via charts.

Threats table view with pagination, filtering, and search.

Clean UI with routing and client-side controls.

🧰 Technology Stack
🔙 Backend
Language: Python

Framework: Flask

Database: PostgreSQL

Data ingestion: CSV parsing using Python scripts

Justification:
Flask provides a lightweight and modular framework ideal for rapid prototyping of REST APIs. PostgreSQL is a robust, scalable relational database, perfect for structured threat data.

🔝 Frontend
Framework: React

Styling: Tailwind CSS

Charts: Chart.js with react-chartjs-2

Justification:
React allows for building a modern SPA with great developer tooling and flexibility. Chart.js offers simple yet powerful charting capabilities to visually convey statistics.



## ⚙️ Setup Instructions

### 📁 Backend (`/backend/`)

<details>
<summary>📂 Project Structure</summary>

/backend/
├── app.py               # Entry point to start the Flask server
├── config.py            # Configuration settings
├── models.py            # SQLAlchemy models
├── routes.py            # API routes
├── Pipfile              # Pipenv dependency file
├── Pipfile.lock         # Locked dependency versions

</details>

### 🔧 Installation & Running Backend

```bash
cd backend

```
# Install pipenv if not already installed
```bash
pip install pipenv

```
# Install all dependencies from Pipfile.lock

```bash
pipenv install

```
# Activate virtual environment

```bash
pipenv shell

```
# Run the Flask server

```bash
pipenv run python app.py


```

For frontend

```bash
cd frontend

```
# Install frontend dependencies

```bash
npm install

```
# Start the development server

```bash
npm start

```

