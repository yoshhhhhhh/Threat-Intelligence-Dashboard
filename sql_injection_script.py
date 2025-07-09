import pandas as pd
import json
import mysql.connector
from sqlalchemy import create_engine, text
from sqlalchemy.types import Integer, Float, Text, VARCHAR
from urllib.parse import quote_plus

# Step 1: MySQL connection config
user = "root"
password = "yourpassword"  # No need to quote_plus for mysql.connector
host = "localhost"
port = "3306"
database = "threat_intel_db"

# Step 2: Ensure database exists
def create_database_if_not_exists():
    conn = mysql.connector.connect(
        host=host,
        user=user,
        password=password
    )
    cursor = conn.cursor()
    cursor.execute(f"CREATE DATABASE IF NOT EXISTS {database}")
    cursor.close()
    conn.close()

create_database_if_not_exists()

# Step 3: SQLAlchemy engine after database is ensured
password_encoded = quote_plus(password)
engine = create_engine(f"mysql+mysqlconnector://{user}:{password_encoded}@{host}:{port}/{database}")

# Step 4: Ensure the table exists
create_table_sql = """
CREATE TABLE IF NOT EXISTS threats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    threat_category VARCHAR(255),
    iocs TEXT,
    threat_actor VARCHAR(255),
    attack_vector VARCHAR(255),
    geo_location VARCHAR(255),
    sentiment_score FLOAT,
    severity_score INT,
    predicted_threat_category VARCHAR(255),
    defense_mechanism VARCHAR(255),
    risk_level_prediction INT,
    cleaned_description TEXT,
    keywords TEXT,
    named_entities TEXT,
    topic_label VARCHAR(255),
    word_count INT
)
"""

with engine.connect() as conn:
    conn.execute(text(create_table_sql))

# Step 5: Read CSV
df = pd.read_csv("D:/assig_prpjects/Cybersecurity_Dataset.csv")

# Step 6: Clean fields - convert list-like strings to JSON strings
def to_json_string(val):
    if pd.isna(val):
        return "[]"
    try:
        return json.dumps(eval(val))
    except:
        return json.dumps([val])  # fallback to single-item list

list_fields = ["IOCs (Indicators of Compromise)", "Keyword Extraction", "Named Entities (NER)"]
for field in list_fields:
    df[field] = df[field].apply(to_json_string)

# Step 7: Rename columns to match DB
df = df.rename(columns={
    "Threat Category": "threat_category",
    "IOCs (Indicators of Compromise)": "iocs",
    "Threat Actor": "threat_actor",
    "Attack Vector": "attack_vector",
    "Geographical Location": "geo_location",
    "Sentiment in Forums": "sentiment_score",
    "Severity Score": "severity_score",
    "Predicted Threat Category": "predicted_threat_category",
    "Suggested Defense Mechanism": "defense_mechanism",
    "Risk Level Prediction": "risk_level_prediction",
    "Cleaned Threat Description": "cleaned_description",
    "Keyword Extraction": "keywords",
    "Named Entities (NER)": "named_entities",
    "Topic Modeling Labels": "topic_label",
    "Word Count": "word_count"
})

# Step 8: Insert into MySQL
df.to_sql(name='threats', con=engine, if_exists='append', index=False, dtype={
    "threat_category": VARCHAR(255),
    "iocs": Text,
    "threat_actor": VARCHAR(255),
    "attack_vector": VARCHAR(255),
    "geo_location": VARCHAR(255),
    "sentiment_score": Float,
    "severity_score": Integer,
    "predicted_threat_category": VARCHAR(255),
    "defense_mechanism": VARCHAR(255),
    "risk_level_prediction": Integer,
    "cleaned_description": Text,
    "keywords": Text,
    "named_entities": Text,
    "topic_label": VARCHAR(255),
    "word_count": Integer
})

print("✅ Data successfully ingested into MySQL!")
