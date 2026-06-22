from flask import Flask, request, jsonify
from pypdf import PdfReader
import tempfile
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


@app.route("/analyze", methods=["POST"])
def analyze():

    resume = request.form.get("resume", "")
    job_description = request.form.get("jobDescription", "")

    if "resumeFile" in request.files:

        pdf_file = request.files["resumeFile"]

        with tempfile.NamedTemporaryFile(delete=False) as temp:

            pdf_file.save(temp.name)

            reader = PdfReader(temp.name)

            resume_text = ""

            for page in reader.pages:
                resume_text += page.extract_text() or ""

            resume = resume_text

    prompt = f"""
    You are an expert interview coach.

    Analyze the candidate resume against the job description.

    Return:

    1. Resume Strengths
    2. Missing Skills
    3. Match Score out of 100
    4. Top 10 Interview Questions
    5. Improvement Suggestions

    Resume:
    {resume}

    Job Description:
    {job_description}
    """

    print("========== DEBUG ==========")
    print("RESUME:")
    print(resume)
    print()
    print("JOB DESCRIPTION:")
    print(job_description)
    print("========== END ==========")

    response = model.generate_content(prompt)

    return jsonify({
        "result": response.text
    })

if __name__ == "__main__":
    app.run(debug=True)