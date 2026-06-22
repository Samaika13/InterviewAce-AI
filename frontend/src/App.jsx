import { useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";

function App() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [matchScore, setMatchScore] = useState("");
  const [skills, setSkills] = useState([]);

  const handleAnalyze = async () => {
    console.log("Button clicked");

    setResult("⏳ Analyzing candidate...");

    const formData = new FormData();

    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    if (resumeFile) {
      formData.append("resumeFile", resumeFile);
    }

    const commonSkills = [
      "Python",
      "Java",
      "AWS",
      "React",
      "Git",
      "REST APIs",
      "JavaScript",
      "SQL",
      "Docker",
      "Kubernetes"
    ];

    const foundSkills = commonSkills.filter(skill =>
      jobDescription.toLowerCase().includes(skill.toLowerCase())
    );

    setSkills(foundSkills);

    const response = await fetch(
      "https://interviewace-ai-n056.onrender.com",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    const scoreMatch = data.result.match(/(\d+)\s*\/\s*100/);

    if (scoreMatch) {
      setMatchScore(scoreMatch[1]);
    }

    console.log(data);

    setResult(data.result);
  };

  const downloadPDF = () => {

    const doc = new jsPDF();

    const lines = doc.splitTextToSize(result, 180);

    let y = 10;

    lines.forEach((line) => {

      if (y > 280) {
        doc.addPage();
        y = 10;
      }

      doc.text(line, 10, y);
      y += 7;
    });

    doc.save("InterviewAce_Report.pdf");
  };

  return (
    <div className="container">
      <h1>InterviewAce AI</h1>

      <h2>Resume</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setResumeFile(e.target.files[0])}
      />

      {resumeFile && (
        <p>📄 {resumeFile.name}</p>
      )}

      <br />
      <br />

      <textarea
        rows="10"
        cols="80"
        placeholder="Paste resume here"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <h2>Job Description</h2>

      <textarea
        rows="10"
        cols="80"
        placeholder="Paste job description here"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleAnalyze}>
        Analyze Candidate
      </button>

      <br />
      <br />

      {matchScore && (
        <div className="score-card">
          <h3>Match Score</h3>
          <h1>{matchScore}/100</h1>
        </div>
      )}

      {skills.length > 0 && (
        <>
          <h2>Required Skills</h2>

          <div className="skills-container">
            {skills.map(skill => (
              <span key={skill} className="skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </>
      )}

      {result && (
        <>
          <h2>Results</h2>

          <div className="results">
            <pre>{result}</pre>
          </div>
        </>
      )}

      {result && !result.includes("⏳") && (
        <>
          <br />
          <br />
          <button onClick={downloadPDF}>
            📄 Download Report PDF
          </button>
        </>
      )}

    </div>
  );
}

export default App;