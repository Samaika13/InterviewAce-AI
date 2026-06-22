# InterviewAce AI

AI-powered interview preparation platform that analyzes a candidate's resume against a job description and generates:

- Resume match score
- Strengths analysis
- Missing skills detection
- Interview questions
- Improvement suggestions
- Downloadable PDF report

## Live Backend

Backend deployed on Render:

[Live Backend](https://interviewace-ai-n056.onrender.com)

## Features

- Upload resume PDF
- Paste job description
- AI-powered resume analysis
- Match score calculation
- Skill badge detection
- Interview question generation
- PDF report export

## Tech Stack

Frontend:
- React
- Vite
- JavaScript

Backend:
- Flask
- Google Gemini API
- PyPDF

## Screenshots

### Home Screen
![Home](screenshots/home.png)

### Analysis Results
![Results](screenshots/analysis.png)

## Run Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Architecture

Frontend (React)
        ↓
Flask API
        ↓
Google Gemini API
        ↓
Resume Analysis Results