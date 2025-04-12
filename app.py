import os
import joblib
from flask import Flask, render_template, request, redirect, url_for, jsonify, flash, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, template_folder='template', static_folder='static')
app.secret_key = os.getenv('FLASK_SECRET_KEY')

# Configure SQLite Database
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.abspath(os.path.dirname(__file__)), 'users.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Load the trained model and encoder
model = joblib.load(os.path.join('aimodel', 'disease_prediction_model.pkl'))
mlb = joblib.load(os.path.join('aimodel', 'symptom_encoder.pkl'))

# ------------------- Models -------------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Create DB if not exists
with app.app_context():
    db.create_all()

# ------------------- Routes -------------------

@app.route('/')
def landing():
    return render_template('landing.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            return redirect(url_for('dashboard'))
        else:
            flash("Invalid credentials. Please try again.")
            return redirect(url_for('login'))

    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        if not username or not email or not password:
            flash("Please fill in all fields.")
            return redirect(url_for('register'))

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash("Email already registered.")
            return redirect(url_for('register'))

        hashed_password = generate_password_hash(password, method='sha256')
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        
        flash("Registration successful! Welcome to your dashboard.")
        return redirect(url_for('dashboard.html'))  # Changed from 'login' to 'dashboard'

    return render_template('register.html')

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        flash("Please login to access the dashboard.")
        return redirect(url_for('login'))

    user = User.query.get(session['user_id'])
    return render_template('dashboard.html', user=user)

@app.route('/predict_disease', methods=['POST'])
def predict_disease():
    try:
        symptoms = request.json.get('symptoms')
        if not symptoms:
            return jsonify({'error': 'No symptoms provided'}), 400

        encoded_symptoms = mlb.transform([symptoms])
        prediction = model.predict(encoded_symptoms)
        return jsonify({'disease': prediction[0]})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    flash("You have been logged out.")
    return redirect(url_for('login'))

# ------------------- Main -------------------
if __name__ == '__main__':
    app.run(debug=True)
