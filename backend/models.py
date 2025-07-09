from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Threat(db.Model):
    __tablename__ = 'threats'

    id = db.Column(db.Integer, primary_key=True)
    threat_category = db.Column(db.String(255))
    iocs = db.Column(db.Text)
    threat_actor = db.Column(db.String(255))
    attack_vector = db.Column(db.String(255))
    geo_location = db.Column(db.String(255))
    sentiment_score = db.Column(db.Float)
    severity_score = db.Column(db.Float)
    predicted_threat_category = db.Column(db.String(255))
    defense_mechanism = db.Column(db.String(255))
    risk_level_prediction = db.Column(db.String(255))
    cleaned_description = db.Column(db.Text)
    keywords = db.Column(db.Text)
    named_entities = db.Column(db.Text)
    topic_label = db.Column(db.String(255))
    word_count = db.Column(db.Integer)

    def to_dict(self):
        return {
            "id": self.id,
            "threat_category": self.threat_category,
            "iocs": self.iocs,
            "threat_actor": self.threat_actor,
            "attack_vector": self.attack_vector,
            "geo_location": self.geo_location,
            "sentiment_score": self.sentiment_score,
            "severity_score": self.severity_score,
            "predicted_threat_category": self.predicted_threat_category,
            "defense_mechanism": self.defense_mechanism,
            "risk_level_prediction": self.risk_level_prediction,
            "cleaned_description": self.cleaned_description,
            "keywords": self.keywords,
            "named_entities": self.named_entities,
            "topic_label": self.topic_label,
            "word_count": self.word_count
        }
