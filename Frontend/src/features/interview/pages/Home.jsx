import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {
    const { loading, generateReport } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [selectedFileName, setSelectedFileName] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const resumeInputRef = useRef(null)

    const navigate = useNavigate()

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedFileName(file.name)
            setErrorMessage("")
        }
    }

    const handleGenerateReport = async () => {
        setErrorMessage("")

        // Validation 1: Job description is required
        if (!jobDescription.trim()) {
            setErrorMessage("Please enter a job description.")
            return
        }

        const resumeFile = resumeInputRef.current?.files?.[0]

        // Validation 2: Either resume or self description is required
        if (!resumeFile && !selfDescription.trim()) {
            setErrorMessage("Please upload a resume or provide a self-description.")
            return
        }

        try {
            const data = await generateReport({
                jobDescription,
                selfDescription,
                resumeFile: resumeFile || null
            })

            if (data?._id) {
                navigate(`/interview/${data._id}`)
            } else {
                setErrorMessage("Failed to generate report. Please try again.")
            }
        } catch (error) {
            console.error("Error generating report:", error)
            setErrorMessage(error.response?.data?.message || "Failed to generate report. Please try again.")
        }
    }

    return (
        <main className='home'>
            <input className="theme-checkbox" type="checkbox" id="themeToggle" aria-label="Toggle dark theme" />
            <label className="theme-toggle" htmlFor="themeToggle">
                <span className="toggle-track">
                    <span className="toggle-thumb"></span>
                </span>
                <span className="toggle-label">
                    <span className="light-text">Light</span>
                    <span className="dark-text">Dark</span>
                </span>
            </label>

            <section className="home-shell" aria-labelledby="interview-home-title">
                <div className="home-intro">
                    <h1 id="interview-home-title">
                        Create Your Custom <span>Interview Plan</span>
                    </h1>
                    <p className="intro-copy">
                        Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                    </p>
                </div>

                <form className="interview-input-group" onSubmit={(e) => e.preventDefault()}>
                    {errorMessage && (
                        <div style={{ color: "#ef4444", marginBottom: "1rem", fontSize: "0.9rem", fontWeight: 500 }}>
                            {errorMessage}
                        </div>
                    )}

                    <div className="form-body">
                        <div className="left form-column">
                            <div className="field-heading">
                                <label htmlFor="jobDescription">Job Description</label>
                                <span className="field-tag">Required</span>
                            </div>

                            <div className="textarea-wrap large">
                                <textarea
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    name="jobDescription"
                                    id="jobDescription"
                                    maxLength="5000"
                                    placeholder="Paste the full job description here... e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                                    disabled={loading}
                                ></textarea>
                                <span className="char-count">{jobDescription.length} / 5000 chars</span>
                            </div>
                        </div>

                        <div className="right form-column">
                            <div className="profile-heading">
                                <p>Your Profile</p>
                            </div>

                            <div className="upload-group">
                                <div className="sub-heading">
                                    <label htmlFor="resume">Upload Resume</label>
                                    <span className="field-tag best">Best Results</span>
                                </div>

                                <label className='file-label' htmlFor="resume" style={{ cursor: loading ? "not-allowed" : "pointer" }}>
                                    <span className="upload-icon" aria-hidden="true">+</span>
                                    <strong>
                                        {selectedFileName ? selectedFileName : "Click to upload or drag & drop"}
                                    </strong>
                                    <small>{selectedFileName ? "Click to change file" : "PDF or DOCX (Max 5MB)"}</small>
                                </label>
                                <input
                                    ref={resumeInputRef}
                                    hidden
                                    type="file"
                                    name="resume"
                                    id="resume"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    disabled={loading}
                                />
                            </div>

                            <div className="divider"><span>OR</span></div>

                            <div className="input-group">
                                <label htmlFor="selfDescription">Quick Self-Description</label>
                                <div className="textarea-wrap small">
                                    <textarea
                                        value={selfDescription}
                                        onChange={(e) => setSelfDescription(e.target.value)}
                                        name="selfDescription"
                                        id="selfDescription"
                                        placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                        disabled={loading}
                                    ></textarea>
                                </div>
                            </div>

                            <p className="helper-note">
                                Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.
                            </p>
                        </div>
                    </div>

                    <div className="form-footer">
                        <p>{loading ? "Generating your report with AI..." : "AI-Powered Strategy Generation - Approx 30s"}</p>
                        <button
                            onClick={handleGenerateReport}
                            className='button primary-button'
                            type="button"
                            disabled={loading}
                            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                        >
                            {loading ? "Generating Report..." : "Generate My Interview Strategy"}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Home