import { useState } from "react";

function App() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const handleAnalyze = async () => {
    console.log("Button clicked");

    setResult("Analyzing candidate...");

    const formData = new FormData();

    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    if (resumeFile) {
      formData.append("resumeFile", resumeFile);
    }

    const response = await fetch(
      "http://127.0.0.1:5000/analyze",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log(data);

    setResult(data.result);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>InterviewAce AI</h1>

      <h2>Resume</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setResumeFile(e.target.files[0])}
      />

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

      <h2>Results</h2>

      <pre>{result}</pre>
    </div>
  );
}

export default App;