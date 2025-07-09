from flask import Flask
from flask_cors import CORS
from models import db
from routes import routes  # Import the Blueprint
import config

print("🚀 Launching app...")

app = Flask(__name__)
CORS(app)

# Load config from config.py
app.config.from_object(config.Config)

# Initialize DB
db.init_app(app)

# Register routes blueprint
app.register_blueprint(routes)

@app.route('/')
def home():
    return {"status": "Threat Intelligence API is running."}

if __name__ == '__main__':
    with app.app_context():
        print("🛠️ Creating tables (if not exist)...")
        db.create_all()
    app.run(debug=True)
