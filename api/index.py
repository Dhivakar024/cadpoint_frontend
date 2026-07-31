import sys
import os

# Add backend directory to Python sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), '../../backend'))
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))

from app import create_app

app = create_app()

# Export WSGI application handler for Vercel Serverless Function
handler = app
