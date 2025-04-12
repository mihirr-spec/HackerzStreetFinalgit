import pandas as pd
import joblib
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.ensemble import RandomForestClassifier

# Load CSV files
df = pd.read_csv('DiseaseAndSymptoms.csv')
precaution_df = pd.read_csv('aimodel/DiseaseAndSymptoms.csv')


# Collect all symptom columns
symptom_cols = [col for col in df.columns if 'Symptom' in col]

# Combine symptoms into a list per row
df['Symptoms'] = df[symptom_cols].values.tolist()
df['Symptoms'] = df['Symptoms'].apply(lambda x: [i.strip() for i in x if pd.notna(i)])

# One-hot encode symptoms
mlb = MultiLabelBinarizer()
X = mlb.fit_transform(df['Symptoms'])

# Target variable (disease)
y = df['Disease']

# Train the model
model = RandomForestClassifier()
model.fit(X, y)

# Save the model and symptom encoder
joblib.dump(model, 'disease_prediction_model.pkl')
joblib.dump(mlb, 'symptom_encoder.pkl')

print("✅ Model and encoder saved as 'disease_prediction_model.pkl' and 'symptom_encoder.pkl'")
