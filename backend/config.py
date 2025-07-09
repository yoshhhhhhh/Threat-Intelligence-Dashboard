from urllib.parse import quote_plus

DB_USER = 'root'
DB_PASSWORD = quote_plus('yourpassword')
DB_HOST = 'localhost'
DB_NAME = 'threat_intel_db'

class Config:
    SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True  # optional: logs all DB queries
