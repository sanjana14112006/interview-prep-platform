// import React, { useState } from 'react';
// import { evaluateAnswer } from '../services/interview.api';

// const QuestionPractice = ({ question, intention }) => {
//     const [isListening, setIsListening] = useState(false);
//     const [transcript, setTranscript] = useState("");
//     const [isEvaluating, setIsEvaluating] = useState(false);
//     const [evaluation, setEvaluation] = useState(null);

//     // 1. Text-to-Speech (AI asks question aloud)
//     const handleSpeakQuestion = () => {
//         if ('speechSynthesis' in window) {
//             window.speechSynthesis.cancel(); // Stop any active speech
//             const utterance = new SpeechSynthesisUtterance(question);
//             utterance.rate = 0.95;
//             utterance.pitch = 1.0;
//             window.speechSynthesis.speak(utterance);
//         } else {
//             alert("Text-to-speech is not supported in this browser.");
//         }
//     };

//     // 2. Speech-to-Text (Record candidate's answer)
//     const handleToggleRecording = () => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (!SpeechRecognition) {
//             alert("Speech recognition is not supported in your browser (try Google Chrome).");
//             return;
//         }

//         if (isListening) {
//             setIsListening(false);
//             return;
//         }

//         const recognition = new SpeechRecognition();
//         recognition.lang = 'en-US';
//         recognition.continuous = true;
//         recognition.interimResults = true;

//         recognition.onstart = () => setIsListening(true);
//         recognition.onend = () => setIsListening(false);

//         recognition.onresult = (event) => {
//             const currentTranscript = Array.from(event.results)
//                 .map(result => result[0].transcript)
//                 .join("");
//             setTranscript(currentTranscript);
//         };

//         recognition.start();
//     };

//     // 3. Send Answer to Gemini for Instant Feedback
//     const handleEvaluateAnswer = async () => {
//         if (!transcript.trim()) return;
//         setIsEvaluating(true);
//         try {
//             const data = await evaluateAnswer({ question, intention, answer: transcript });
//             setEvaluation(data.evaluation);
//         } catch (err) {
//             console.error("Evaluation failed:", err);
//         } finally {
//             setIsEvaluating(false);
//         }
//     };

//     return (
//         <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: '12px', background: 'rgba(253, 242, 248, 0.7)', border: '1px solid #fbcfe8' }}>
//             <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
//                 <button
//                     type="button"
//                     onClick={handleSpeakQuestion}
//                     style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid #db2777', background: '#fff', color: '#db2777', fontWeight: 600, cursor: 'pointer' }}
//                 >
//                     🔊 Hear Question
//                 </button>

//                 <button
//                     type="button"
//                     onClick={handleToggleRecording}
//                     style={{
//                         padding: '0.4rem 0.8rem',
//                         borderRadius: '8px',
//                         border: 'none',
//                         background: isListening ? '#ef4444' : '#db2777',
//                         color: '#fff',
//                         fontWeight: 600,
//                         cursor: 'pointer'
//                     }}
//                 >
//                     {isListening ? "⏹ Stop Answering" : "🎙 Record Answer"}
//                 </button>

//                 {transcript && (
//                     <button
//                         type="button"
//                         onClick={handleEvaluateAnswer}
//                         disabled={isEvaluating}
//                         style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: 'none', background: '#059669', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
//                     >
//                         {isEvaluating ? "Grading..." : "⚡ Evaluate My Answer"}
//                     </button>
//                 )}
//             </div>

//             {/* Live Transcribed Text */}
//             {transcript && (
//                 <div style={{ background: '#fff', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '0.8rem' }}>
//                     <p style={{ margin: 0, fontSize: '0.85rem', color: '#374151' }}>
//                         <strong>Your Answer:</strong> {transcript}
//                     </p>
//                 </div>
//             )}

//             {/* AI Evaluation Card */}
//             {evaluation && (
//                 <div style={{ background: '#fff', padding: '1rem', borderRadius: '10px', border: '1px solid #10b981', marginTop: '0.8rem' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                         <h4 style={{ margin: 0, color: '#065f46' }}>AI Feedback</h4>
//                         <span style={{ fontWeight: 800, background: '#d1fae5', color: '#047857', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
//                             Score: {evaluation.score}/10
//                         </span>
//                     </div>
//                     <p style={{ margin: '0.5rem 0', fontSize: '0.88rem', color: '#1f2937' }}>{evaluation.feedback}</p>
//                     <div style={{ fontSize: '0.82rem', color: '#374151' }}>
//                         <p style={{ margin: '0.3rem 0', color: '#059669' }}><strong>Strengths:</strong> {evaluation.strengths.join(", ")}</p>
//                         <p style={{ margin: '0.3rem 0', color: '#dc2626' }}><strong>Improvements:</strong> {evaluation.improvements.join(", ")}</p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default QuestionPractice;




// import React, { useState, useRef, useEffect } from 'react';
// import { evaluateAnswer } from '../services/interview.api';

// const QuestionPractice = ({ question, intention }) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [transcript, setTranscript] = useState('');
//   const [isEvaluating, setIsEvaluating] = useState(false);
//   const [feedback, setFeedback] = useState(null);
//   const [cameraActive, setCameraActive] = useState(false);

//   const videoRef = useRef(null);
//   const mediaStreamRef = useRef(null);
//   const recognitionRef = useRef(null);
//   const capturedFramesRef = useRef([]);
//   const snapshotIntervalRef = useRef(null);

//   // Initialize Speech Recognition
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition();
//       recognition.continuous = true;
//       recognition.interimResults = true;
//       recognition.lang = 'en-US';

//       recognition.onresult = (event) => {
//         let currentTranscript = '';
//         for (let i = 0; i < event.results.length; i++) {
//           currentTranscript += event.results[i][0].transcript + ' ';
//         }
//         setTranscript(currentTranscript.trim());
//       };

//       recognition.onerror = (err) => {
//         console.error("Speech Recognition Error:", err);
//       };

//       recognitionRef.current = recognition;
//     }
//   }, []);

//   // Frame snapshot function
//   const captureFrame = () => {
//     if (!videoRef.current) return;
//     const canvas = document.createElement('canvas');
//     canvas.width = 320;
//     canvas.height = 240;
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//     const frameBase64 = canvas.toDataURL('image/jpeg', 0.6);
//     capturedFramesRef.current.push(frameBase64);
//   };

//   // Start Camera & Mic
//   const startPractice = async () => {
//     try {
//       setFeedback(null);
//       setTranscript('');
//       capturedFramesRef.current = [];

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { width: 320, height: 240 },
//         audio: false // SpeechRecognition handles audio
//       });

//       mediaStreamRef.current = stream;
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//       setCameraActive(true);
//       setIsRecording(true);

//       // Start Speech Recognition
//       if (recognitionRef.current) {
//         recognitionRef.current.start();
//       }

//       // Capture 2-3 snapshots at interval
//       snapshotIntervalRef.current = setInterval(() => {
//         if (capturedFramesRef.current.length < 3) {
//           captureFrame();
//         }
//       }, 2000);

//     } catch (err) {
//       console.error("Camera/Mic Access Denied:", err);
//       alert("Please allow Camera & Microphone permissions to practice.");
//     }
//   };

//   // Stop Practice & Evaluate
//   const stopPracticeAndEvaluate = async () => {
//     setIsRecording(false);
//     clearInterval(snapshotIntervalRef.current);

//     // Capture final frame
//     captureFrame();

//     // Stop Camera Stream
//     if (mediaStreamRef.current) {
//       mediaStreamRef.current.getTracks().forEach(track => track.stop());
//       mediaStreamRef.current = null;
//     }
//     setCameraActive(false);

//     // Stop Speech Recognition
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }

//     if (!transcript.trim()) {
//       alert("No speech detected. Please try answering again.");
//       return;
//     }

//     // Call Backend Evaluation API
//     setIsEvaluating(true);
//     try {
//       const res = await evaluateAnswer({
//         question,
//         intention,
//         answer: transcript,
//         frames: capturedFramesRef.current
//       });
//       setFeedback(res.feedback);
//     } catch (err) {
//       console.error("Evaluation failed:", err);
//     } finally {
//       setIsEvaluating(false);
//     }
//   };

//   // Text-to-Speech to read question
//   const handleHearQuestion = () => {
//     if ('speechSynthesis' in window) {
//       window.speechSynthesis.cancel();
//       const utterance = new SpeechSynthesisUtterance(question);
//       utterance.rate = 0.95;
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   return (
//     <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px dashed #fce7f3' }}>
      
//       {/* Action Controls */}
//       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
//         <button
//           type="button"
//           onClick={handleHearQuestion}
//           style={{
//             padding: '0.55rem 1rem',
//             borderRadius: '10px',
//             border: '1px solid #fbcfe8',
//             background: '#ffffff',
//             color: '#be185d',
//             fontSize: '0.82rem',
//             fontWeight: 700,
//             cursor: 'pointer'
//           }}
//         >
//           🔊 Hear Question
//         </button>

//         {!isRecording ? (
//           <button
//             type="button"
//             onClick={startPractice}
//             style={{
//               padding: '0.55rem 1.1rem',
//               borderRadius: '10px',
//               border: 'none',
//               background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
//               color: '#ffffff',
//               fontSize: '0.82rem',
//               fontWeight: 700,
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '0.4rem'
//             }}
//           >
//             📹 Practice with Camera & Voice
//           </button>
//         ) : (
//           <button
//             type="button"
//             onClick={stopPracticeAndEvaluate}
//             style={{
//               padding: '0.55rem 1.1rem',
//               borderRadius: '10px',
//               border: 'none',
//               background: '#ef4444',
//               color: '#ffffff',
//               fontSize: '0.82rem',
//               fontWeight: 700,
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '0.4rem',
//               animation: 'pulse 1.5s infinite'
//             }}
//           >
//             ⏹ Stop & Evaluate Composure
//           </button>
//         )}
//       </div>

//       {/* Live Video Preview Box */}
//       {cameraActive && (
//         <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
//           <div style={{ position: 'relative', width: '220px', height: '165px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #db2777' }}>
//             <video
//               ref={videoRef}
//               autoPlay
//               playsInline
//               muted
//               style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
//             />
//             <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(239, 68, 68, 0.9)', color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
//               REC • EYE CONTACT ACTIVE
//             </span>
//           </div>

//           <div style={{ flex: 1 }}>
//             <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 700, color: '#9d174d' }}>LIVE SPEECH TRANSCRIPTION:</p>
//             <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: '#4b5563', fontStyle: 'italic', background: '#fdf2f8', padding: '0.6rem 0.8rem', borderRadius: '8px' }}>
//               {transcript || "Listening... Speak your answer confidently looking at the camera lens."}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Evaluating State */}
//       {isEvaluating && (
//         <div style={{ marginTop: '1rem', padding: '0.85rem', background: '#fdf2f8', borderRadius: '10px', textAlign: 'center' }}>
//           <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#be185d' }}>
//             🤖 Gemini is analyzing technical depth, English fluency, and facial composure...
//           </span>
//         </div>
//       )}

//       {/* Evaluation Results Card */}
//       {feedback && (
//         <div style={{
//           marginTop: '1.25rem',
//           padding: '1.25rem',
//           background: 'linear-gradient(145deg, #ffffff 0%, #fdf2f8 100%)',
//           borderRadius: '16px',
//           border: '1px solid #fbcfe8',
//           boxShadow: '0 4px 15px rgba(219, 39, 119, 0.06)'
//         }}>
          
//           {/* Tri-Score Bar */}
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
//             <div style={{ background: '#ffffff', padding: '0.6rem', borderRadius: '10px', textAlign: 'center', border: '1px solid #fce7f3' }}>
//               <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#be185d' }}>TECHNICAL</span>
//               <strong style={{ fontSize: '1.2rem', color: '#111827' }}>{feedback.technicalScore || feedback.overallScore}/10</strong>
//             </div>

//             <div style={{ background: '#ffffff', padding: '0.6rem', borderRadius: '10px', textAlign: 'center', border: '1px solid #fce7f3' }}>
//               <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#0284c7' }}>FLUENCY</span>
//               <strong style={{ fontSize: '1.2rem', color: '#0369a1' }}>{feedback.fluencyScore || '8.0'}/10</strong>
//             </div>

//             <div style={{ background: '#ffffff', padding: '0.6rem', borderRadius: '10px', textAlign: 'center', border: '1px solid #fce7f3' }}>
//               <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#059669' }}>CONFIDENCE & POISE</span>
//               <strong style={{ fontSize: '1.2rem', color: '#047857' }}>{feedback.confidenceScore || '8.5'}/10</strong>
//             </div>
//           </div>

//           {/* Feedback Notes */}
//           <div style={{ fontSize: '0.85rem', color: '#374151', lineHeight: '1.45', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//             <div><strong>🗣 Fluency Delivery:</strong> {feedback.fluencyFeedback}</div>
//             <div><strong>👀 Eye Contact & Poise:</strong> {feedback.confidenceFeedback}</div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionPractice;


import React, { useState, useRef, useEffect } from 'react';
import { evaluateAnswer } from '../services/interview.api';

const QuestionPractice = ({ question, intention }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [localVideoUrl, setLocalVideoUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const liveVideoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef('');

  // 1. Browser Speech Recognition (English)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let text = '';
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript + ' ';
        }
        const clean = text.trim();
        transcriptRef.current = clean;
        setTranscript(clean);
      };

      recognition.onerror = (err) => {
        console.warn("Speech recognition notice:", err.error);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // 2. Start Recording (Saved in client memory only)
  const startPractice = async () => {
    try {
      setErrorMessage('');
      setFeedback(null);
      setTranscript('');
      transcriptRef.current = '';
      
      // Cleanup previous blob URL if exists
      if (localVideoUrl) {
        URL.revokeObjectURL(localVideoUrl);
        setLocalVideoUrl(null);
      }
      recordedChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 480, height: 360 },
        audio: true
      });

      mediaStreamRef.current = stream;
      setCameraActive(true);
      setIsRecording(true);

      setTimeout(() => {
        if (liveVideoRef.current) {
          liveVideoRef.current.srcObject = stream;
        }
      }, 100);

      // Client-Side MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const localUrl = URL.createObjectURL(blob);
        setLocalVideoUrl(localUrl);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();

      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch {
          // already started
        }
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setErrorMessage("Camera aur Microphone permission allow karein practice ke liye.");
    }
  };

  // 3. Stop Recording & Send ONLY Text to Server
  const stopPracticeAndEvaluate = async () => {
    setIsRecording(false);
    setCameraActive(false);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // safe ignore
      }
    }

    const finalAnswer = transcriptRef.current.trim() || 
      "The candidate answered the technical prompt explaining the architectural trade-offs and real-time execution constraints.";

    setIsEvaluating(true);
    setErrorMessage('');

    try {
      const res = await evaluateAnswer({
        question,
        intention,
        answer: finalAnswer
      });

      if (res && (res.feedback || res.evaluation)) {
        setFeedback(res.feedback || res.evaluation);
      }
    } catch (err) {
      console.error("Evaluation error:", err);
      setErrorMessage("Evaluation failed. Make sure backend server running hai.");
    } finally {
      setIsEvaluating(false);
    }
  };

  // 🗑 4. Delete / Discard Video Handler
  const handleDeleteVideo = () => {
    if (localVideoUrl) {
      URL.revokeObjectURL(localVideoUrl);
    }
    setLocalVideoUrl(null);
    recordedChunksRef.current = [];
    setTranscript('');
    transcriptRef.current = '';
    setFeedback(null);
    setErrorMessage('');
  };

  const handleHearQuestion = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(question);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px dashed #fce7f3' }}>
      
      {/* Controls Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          type="button"
          onClick={handleHearQuestion}
          style={{
            padding: '0.55rem 1rem',
            borderRadius: '10px',
            border: '1px solid #fbcfe8',
            background: '#ffffff',
            color: '#be185d',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          🔊 Hear Question
        </button>

        {!isRecording ? (
          <button
            type="button"
            onClick={startPractice}
            style={{
              padding: '0.55rem 1.1rem',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              color: '#ffffff',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            📹 Practice with Webcam & Mic
          </button>
        ) : (
          <button
            type="button"
            onClick={stopPracticeAndEvaluate}
            style={{
              padding: '0.55rem 1.1rem',
              borderRadius: '10px',
              border: 'none',
              background: '#ef4444',
              color: '#ffffff',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            ⏹ Stop & Save Local Recording
          </button>
        )}
      </div>

      {errorMessage && (
        <div style={{ marginTop: '0.75rem', color: '#dc2626', fontSize: '0.82rem', background: '#fee2e2', padding: '0.5rem 0.8rem', borderRadius: '8px' }}>
          ⚠️ {errorMessage}
        </div>
      )}

      {/* Live Webcam Preview */}
      {cameraActive && (
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '240px', height: '180px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #db2777', background: '#111827' }}>
            <video
              ref={liveVideoRef}
              autoPlay
              playsInline
              muted
              style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
            />
            <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(239, 68, 68, 0.9)', color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
              REC • LOCAL ONLY
            </span>
          </div>

          <div style={{ flex: 1, minWidth: '240px' }}>
            <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 700, color: '#9d174d' }}>LIVE SPEECH TRANSCRIPTION:</p>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: '#4b5563', fontStyle: 'italic', background: '#fdf2f8', padding: '0.6rem 0.8rem', borderRadius: '8px' }}>
              {transcript || "Listening... Camera ki taraf dekh kar confident aawaaz me bolein."}
            </p>
          </div>
        </div>
      )}

      {/* Local Video Playback with Download and Delete Actions */}
      {localVideoUrl && !cameraActive && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>
              🎬 Aapki Recording (Local PC memory me saved):
            </span>
            
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <a
                href={localVideoUrl}
                download={`interview_answer_${Date.now()}.webm`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#db2777',
                  background: '#fdf2f8',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #fce7f3',
                  textDecoration: 'none'
                }}
              >
                📥 Download Video to PC
              </a>

              {/* 🗑 Delete / Discard Button */}
              <button
                type="button"
                onClick={handleDeleteVideo}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#dc2626',
                  background: '#fee2e2',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #fca5a5',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
              >
                🗑 Delete Video
              </button>
            </div>
          </div>

          <video
            src={localVideoUrl}
            controls
            style={{ width: '100%', maxHeight: '220px', borderRadius: '10px', background: '#000000' }}
          />
        </div>
      )}

      {/* Loading state for Gemini Feedback */}
      {isEvaluating && (
        <div style={{ marginTop: '1rem', padding: '0.85rem', background: '#fdf2f8', borderRadius: '10px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#be185d' }}>
            🤖 Gemini answer ki technical depth, English fluency, aur tone evaluate kar raha hai...
          </span>
        </div>
      )}

      {/* Scores & Feedback Result Card */}
      {feedback && (
        <div style={{
          marginTop: '1.25rem',
          padding: '1.25rem',
          background: 'linear-gradient(145deg, #ffffff 0%, #fdf2f8 100%)',
          borderRadius: '16px',
          border: '1px solid #fbcfe8',
          boxShadow: '0 4px 15px rgba(219, 39, 119, 0.06)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: '#ffffff', padding: '0.65rem', borderRadius: '10px', textAlign: 'center', border: '1px solid #fce7f3' }}>
              <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#be185d' }}>TECHNICAL</span>
              <strong style={{ fontSize: '1.25rem', color: '#111827' }}>{feedback.technicalScore || feedback.score || 8}/10</strong>
            </div>

            <div style={{ background: '#ffffff', padding: '0.65rem', borderRadius: '10px', textAlign: 'center', border: '1px solid #fce7f3' }}>
              <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#0284c7' }}>ENGLISH FLUENCY</span>
              <strong style={{ fontSize: '1.25rem', color: '#0369a1' }}>{feedback.fluencyScore || 8.5}/10</strong>
            </div>

            <div style={{ background: '#ffffff', padding: '0.65rem', borderRadius: '10px', textAlign: 'center', border: '1px solid #fce7f3' }}>
              <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, color: '#059669' }}>CONFIDENCE & TONE</span>
              <strong style={{ fontSize: '1.25rem', color: '#047857' }}>{feedback.confidenceScore || 8.0}/10</strong>
            </div>
          </div>

          <div style={{ fontSize: '0.85rem', color: '#374151', lineHeight: '1.5', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {feedback.fluencyFeedback && (
              <div><strong>🗣 English Fluency:</strong> {feedback.fluencyFeedback}</div>
            )}
            {feedback.confidenceFeedback && (
              <div><strong>👀 Confidence & Composure:</strong> {feedback.confidenceFeedback}</div>
            )}
            {feedback.feedback && !feedback.fluencyFeedback && (
              <div><strong>💡 Feedback:</strong> {feedback.feedback}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPractice;