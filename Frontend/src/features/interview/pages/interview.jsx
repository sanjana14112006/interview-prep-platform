// import React from 'react'
// import "../style/interview.scss"
// import { useInterview } from '../hooks/useInterview'

// const interviewReport = {
//   matchScore: 88,
//   technicalQuestions: [
//     {
//       question: "Explain the Node.js event loop and how it handles asynchronous I/O operations.",
//       intention: "To assess the candidate's deep understanding of Node.js internal architecture and non-blocking I/O.",
//       answer: "The candidate should explain the different phases of the event loop and how callbacks are processed. They should mention how libuv handles the thread pool and how the callback queue works with the call stack.",
//     },
//     {
//       question: "How do you optimize a MongoDB aggregation pipeline for high-volume data?",
//       intention: "To test practical experience with database performance and reducing response times.",
//       answer: "Focus on using $match as early as possible to reduce the dataset, ensuring fields used in $match and $sort are indexed, and avoiding $unwind where it can inflate the document count.",
//     },
//     {
//       question: "Can you describe the Cache-Aside pattern and when you would use Redis in a Node.js application?",
//       intention: "Validate caching strategy knowledge for production APIs.",
//       answer: "Use Redis to store frequently requested data. The app checks cache first, falls back to the database on a miss, then writes the result back to cache with an appropriate TTL.",
//     },
//     {
//       question: "What are the challenges of migrating a monolithic application to a modular service-based architecture?",
//       intention: "Measure architecture judgment and ability to reason about service boundaries.",
//       answer: "Key challenges include data ownership, deployment complexity, observability, network latency, team boundaries, and maintaining compatibility during incremental migration.",
//     },
//   ],
//   behavioralQuestions: [
//     {
//       question: "Tell me about a time you balanced privacy, UX, and product goals.",
//       intention: "Evaluate product thinking and decision-making.",
//       answer: "Use a STAR answer that explains the trade-off, the chosen privacy-preserving implementation, and the measurable outcome.",
//     },
//     {
//       question: "How do you handle technical debt under tight deadlines?",
//       intention: "Understand prioritization and engineering judgment.",
//       answer: "Rank debt by user impact and failure risk, fix critical path issues immediately, and schedule lower-risk work in planned iterations.",
//     },
//   ],
//   skillGaps: [
//     { skill: "Message Queue (Kafka/RabbitMQ)", severity: "high" },
//     { skill: "Advanced Docker & CI/CD Pipelines", severity: "medium" },
//     { skill: "Distributed Systems Design", severity: "medium" },
//     { skill: "Production-level Redis management", severity: "low" },
//   ],
//   preparationPlan: [
//     {
//       day: 1,
//       focus: "Node.js Internals & Streams",
//       tasks: [
//         "Deep dive into Event Loop phases and process.nextTick vs setImmediate.",
//         "Practice implementing Node.js streams for handling large data sets.",
//       ],
//     },
//     {
//       day: 2,
//       focus: "Advanced MongoDB & Indexing",
//       tasks: [
//         "Study compound indexes, TTL indexes, and text indexes.",
//         "Practice writing complex aggregation pipelines and using explain execution stats.",
//       ],
//     },
//     {
//       day: 3,
//       focus: "Caching & Redis Strategies",
//       tasks: [
//         "Read about Redis data types beyond strings, including sets, hashes, and sorted sets.",
//         "Implement a Redis-based rate limiter or caching layer for a sample API.",
//       ],
//     },
//     {
//       day: 4,
//       focus: "System Design & Microservices",
//       tasks: [
//         "Study synchronous vs asynchronous service communication patterns.",
//         "Learn API Gateway, Circuit Breaker, and service discovery patterns.",
//       ],
//     },
//     {
//       day: 5,
//       focus: "Message Queues & DevOps Basics",
//       tasks: [
//         "Watch introductory tutorials on RabbitMQ or Kafka.",
//         "Dockerize a project and write a simple GitHub Actions workflow for CI.",
//       ],
//     },
//     {
//       day: 6,
//       focus: "Data Structures & Algorithms",
//       tasks: [
//         "Solve 5-10 medium LeetCode problems focused on arrays, strings, and hash maps.",
//         "Review common sorting and searching algorithms.",
//       ],
//     },
//     {
//       day: 7,
//       focus: "Mock Interview & Project Review",
//       tasks: [
//         "Conduct a mock interview focused on explaining one full-stack project architecture.",
//         "Prepare concise summaries for all work experience and project bullets.",
//       ],
//     },
//   ],
// }

// const Interview = () => {

//   const { report } = useInterview()

//   const technicalCount = interviewReport.technicalQuestions.length
//   const behavioralCount = interviewReport.behavioralQuestions.length
//   const roadmapCount = interviewReport.preparationPlan.length

//   return (
//     <main className="interview">

//       <section className="interview-shell" aria-label="Interview strategy report">
//         <input className="section-radio technical-radio" type="radio" name="reportSection" id="technicalSlide" defaultChecked />
//         <input className="section-radio behavioral-radio" type="radio" name="reportSection" id="behavioralSlide" />
//         <input className="section-radio roadmap-radio" type="radio" name="reportSection" id="roadmapSlide" />

//         <aside className="interview-nav" aria-label="Report sections">
//           <p className="nav-label">Sections</p>
//           <nav>
//             <label className="section-tab technical-tab" htmlFor="technicalSlide">
//               <span>&lt;&gt;</span>
//               Technical Questions
//             </label>
//             <label className="section-tab behavioral-tab" htmlFor="behavioralSlide">
//               <span>o</span>
//               Behavioral Questions
//             </label>
//             <label className="section-tab roadmap-tab" htmlFor="roadmapSlide">
//               <span>-&gt;</span>
//               Road Map
//             </label>
//           </nav>
//         </aside>

//         <section className="interview-content">
//           <div className="report-slide technical-slide">
//             <div className="content-header">
//               <div>
//                 <h1>Technical Questions</h1>
//                 <span>{technicalCount} questions</span>
//               </div>
//             </div>

//             <div className="question-list">
//               {interviewReport.technicalQuestions.map((item, index) => (
//                 <details className="question-card" key={item.question} open={index === 0}>
//                   <summary>
//                     <span className="question-number">{String(index + 1).padStart(2, "0")}</span>
//                     <h2>{item.question}</h2>
//                     <span className="chevron">v</span>
//                   </summary>

//                   <div className="answer-block">
//                     <span className="answer-label purple">Intention</span>
//                     <p>{item.intention}</p>
//                     <span className="answer-label green">Model Answer</span>
//                     <p>{item.answer}</p>
//                   </div>
//                 </details>
//               ))}
//             </div>
//           </div>

//           <div className="report-slide behavioral-slide">
//             <div className="content-header">
//               <div>
//                 <h1>Behavioral Questions</h1>
//                 <span>{behavioralCount} questions</span>
//               </div>
//             </div>

//             <div className="question-list">
//               {interviewReport.behavioralQuestions.map((item, index) => (
//                 <details className="question-card" key={item.question}>
//                   <summary>
//                     <span className="question-number">{String(index + 1).padStart(2, "0")}</span>
//                     <h2>{item.question}</h2>
//                     <span className="chevron">v</span>
//                   </summary>

//                   <div className="answer-block">
//                     <span className="answer-label purple">Intention</span>
//                     <p>{item.intention}</p>
//                     <span className="answer-label green">Model Answer</span>
//                     <p>{item.answer}</p>
//                   </div>
//                 </details>
//               ))}
//             </div>
//           </div>

//           <div className="report-slide roadmap-slide">
//             <div className="content-header">
//               <div>
//                 <h1>Preparation Road Map</h1>
//                 <span>{roadmapCount}-day plan</span>
//               </div>
//             </div>

//             <div className="timeline">
//               {interviewReport.preparationPlan.map((day) => (
//                 <article className="timeline-item" key={day.day}>
//                   <span className="timeline-dot"></span>
//                   <div className="timeline-content">
//                     <span className="day-pill">Day {day.day}</span>
//                     <h2>{day.focus}</h2>
//                     <ul>
//                       {day.tasks.map((task) => (
//                         <li key={task}>{task}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           </div>
//         </section>

//         <aside className="skill-panel" aria-label="Skill gaps">
//           <div className="score-card">
//             <p>Match Score</p>
//             <span>{interviewReport.matchScore}</span>
//             <small>%</small>
//           </div>
//           <p className="score-copy">Strong match for this role</p>

//           <h2>Skill Gaps</h2>
//           <div className="skill-list">
//             {interviewReport.skillGaps.map((gap) => (
//               <span className={`skill-pill ${gap.severity}`} key={gap.skill}>
//                 {gap.skill}
//               </span>
//             ))}
//           </div>
//         </aside>
//       </section>
//     </main>
//   )
// }

// export default Interview






// import React, { useState } from 'react'
// import { useParams } from 'react-router'
// import "../style/interview.scss"
// import { useInterview } from '../hooks/useInterview'
// import QuestionPractice from '../components/QuestionPractice'

// const fallbackReport = {
//   title: "Computer Vision & Edge AI Engineer",
//   matchScore: 92,
//   skillGaps: [
//     { skill: "DeepStream SDK advanced production pipelines", severity: "medium" },
//     { skill: "Industrial CANopen protocol implementation", severity: "low" }
//   ],
//   technicalQuestions: [
//     {
//       question: "How do you optimize a YOLOv8 model using TensorRT for deployment on an NVIDIA Jetson platform, and what trade-offs do you consider between FP32, FP16, and INT8 quantization?",
//       intention: "To assess practical knowledge in edge AI optimization, model quantization, and hardware acceleration on resource-constrained GPUs.",
//       answer: "Export to ONNX format, configure TensorRT builders to serialize an optimized engine, and evaluate inference throughput versus precision loss."
//     },
//     {
//       question: "Explain how you handle communication and message synchronization between ROS 2 nodes and a Pixhawk flight controller running MAVLink.",
//       intention: "To test real-time robotics middleware integration and asynchronous communication reliability.",
//       answer: "Utilize micro-ROS or MAVROS bridge nodes, ensuring strict message timestamp alignment using tf2 message filters."
//     }
//   ],
//   behavioralQuestions: [
//     {
//       question: "Tell me about a time when an embedded model ran out of memory right before a demonstration. How did you diagnose and resolve it under pressure?",
//       intention: "Evaluates debugging under pressure, hardware resource awareness, and methodical problem-solving.",
//       answer: "Analyzed memory allocations using tegrastats, reduced input batch size and image dimensions, and enabled swap memory to stabilize the demo."
//     }
//   ],
//   preparationPlan: [
//     {
//       day: 1,
//       focus: "TensorRT Architecture & Quantization Deep Dive",
//       tasks: [
//         "Review TensorRT calibration process for INT8 post-training quantization.",
//         "Benchmark inference throughput on FP16 vs INT8 on target Jetson hardware.",
//         "Document latency differences across input batch sizes and engine build settings."
//       ]
//     },
//     {
//       day: 2,
//       focus: "Embedded Vision & Real-Time Pipeline Optimization",
//       tasks: [
//         "Analyze NVIDIA DeepStream GStreamer pipeline plugins (nvstreammux, nvinfer).",
//         "Implement zero-copy memory transfers using unified CUDA memory.",
//         "Measure and reduce end-to-end glass-to-glass latency across video feeds."
//       ]
//     },
//     {
//       day: 3,
//       focus: "Robotics Middleware & Microcontroller Integration",
//       tasks: [
//         "Set up test ROS 2 nodes with publisher/subscriber QoS profiles.",
//         "Simulate MAVLink telemetry ingestion and verify timestamp synchronization via tf2.",
//         "Handle UART/CAN bus hardware communication faults gracefully in firmware."
//       ]
//     },
//     {
//       day: 4,
//       focus: "Core DSA, Systems Programming & C++ Mastery",
//       tasks: [
//         "Practice high-frequency C++ interview patterns (smart pointers, RAII, move semantics).",
//         "Solve 3 interval and sliding window algorithmic challenges.",
//         "Review memory sanitizers and Valgrind profiling for memory leak detection."
//       ]
//     },
//     {
//       day: 5,
//       focus: "End-to-End Edge AI Production Architecture",
//       tasks: [
//         "Architect an edge-to-cloud telemetry sync pipeline handling intermittent connectivity.",
//         "Review OTA model update strategies and rollback mechanisms for fleet devices.",
//         "Draft system architecture diagrams detailing edge inference constraints."
//       ]
//     },
//     {
//       day: 6,
//       focus: "Behavioral & STAR Scenario Preparation",
//       tasks: [
//         "Draft STAR responses for engineering trade-offs made under tight delivery deadlines.",
//         "Practice communicating hardware debugging under production pressure.",
//         "Structure stories highlighting cross-functional leadership and stakeholder communication."
//       ]
//     },
//     {
//       day: 7,
//       focus: "Full Mock Interview & Spoken Voice Rehearsal",
//       tasks: [
//         "Conduct a timed audio mock interview covering both technical and architectural prompts.",
//         "Refine concise, punchy explanations of core resume projects using the XYZ formula.",
//         "Review the target company's latest technology stack and prepare 3 targeted questions."
//       ]
//     }
//   ]
// }

// const Interview = () => {
//   const { interviewId } = useParams()
//   const { report, loading, getResumePdf } = useInterview()
  
//   const [activeTab, setActiveTab] = useState('technical')
//   const [openAccordion, setOpenAccordion] = useState(null)
//   const [isDownloading, setIsDownloading] = useState(false)

//   // 1. Unique storage key for roadmap task persistence per report
//   const storageKey = `roadmap_tasks_${interviewId || 'default'}`

//   // 2. Persistent checklist state
//   const [completedTasks, setCompletedTasks] = useState(() => {
//     try {
//       const saved = localStorage.getItem(storageKey)
//       return saved ? JSON.parse(saved) : {}
//     } catch {
//       return {}
//     }
//   })

//   // 3. Toggle task completion
//   const toggleTask = (taskId) => {
//     setCompletedTasks(prev => {
//       const updated = { ...prev, [taskId]: !prev[taskId] }
//       localStorage.setItem(storageKey, JSON.stringify(updated))
//       return updated
//     })
//   }

//   // 4. Handle 1-Page ATS Resume Download
//   const handleDownloadResume = async () => {
//     if (!interviewId) return
//     setIsDownloading(true)
//     try {
//       await getResumePdf(interviewId)
//     } catch (err) {
//       console.error("Resume download failed:", err)
//     } finally {
//       setIsDownloading(false)
//     }
//   }

//   const toggleAccordion = (index) => {
//     setOpenAccordion(openAccordion === index ? null : index)
//   }

//   const interviewReport = report || fallbackReport

//   const technicalCount = interviewReport.technicalQuestions?.length || 0
//   const behavioralCount = interviewReport.behavioralQuestions?.length || 0
//   const roadmapCount = interviewReport.preparationPlan?.length || 0

//   // 5. Checklist Metrics for Progress Bar
//   const allTasksCount = interviewReport.preparationPlan?.reduce(
//     (acc, day) => acc + (day.tasks?.length || 0), 0
//   ) || 0

//   const finishedTasksCount = Object.keys(completedTasks).filter(
//     key => completedTasks[key]
//   ).length

//   const progressPercent = allTasksCount > 0 
//     ? Math.round((finishedTasksCount / allTasksCount) * 100) 
//     : 0

//   if (loading) {
//     return (
//       <main className="interview" style={{ display: 'grid', placeItems: 'center', minHeight: '80vh' }}>
//         <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#4b5563' }}>
//           Loading your tailored interview strategy...
//         </p>
//       </main>
//     )
//   }

//   return (
//     <main className="interview">
//       <div className="interview-container">
        
//         {/* Navigation Sidebar */}
//         <nav className="interview-nav" aria-label="Interview Sections">
//           <p className="nav-label">SECTIONS</p>
//           <button 
//             type="button"
//             className={`nav-btn ${activeTab === 'technical' ? 'active' : ''}`}
//             onClick={() => setActiveTab('technical')}
//           >
//             <span>&lt;&gt;</span>
//             Technical Questions
//           </button>
//           <button 
//             type="button"
//             className={`nav-btn ${activeTab === 'behavioral' ? 'active' : ''}`}
//             onClick={() => setActiveTab('behavioral')}
//           >
//             <span>o</span>
//             Behavioral Questions
//           </button>
//           <button 
//             type="button"
//             className={`nav-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
//             onClick={() => setActiveTab('roadmap')}
//           >
//             <span>-&gt;</span>
//             Road Map
//           </button>
//         </nav>

//         {/* Dynamic Content Slides */}
//         <section className="interview-content">

//           {/* 1. Technical Questions Tab */}
//           {activeTab === 'technical' && (
//             <div className="report-slide technical-slide">
//               <div className="content-header">
//                 <div>
//                   <h1>Technical Questions</h1>
//                   <span>{technicalCount} questions</span>
//                 </div>
//               </div>

//               <div className="question-accordion">
//                 {interviewReport.technicalQuestions?.map((item, index) => {
//                   const isOpen = openAccordion === index || (openAccordion === null && index === 0)
//                   return (
//                     <div className="accordion-item" key={index}>
//                       <button 
//                         type="button"
//                         className="accordion-trigger"
//                         onClick={() => toggleAccordion(index)}
//                       >
//                         <span className="question-badge">{String(index + 1).padStart(2, '0')}</span>
//                         <p>{item.question}</p>
//                         <span className="chevron">{isOpen ? 'ʌ' : 'v'}</span>
//                       </button>

//                       {isOpen && (
//                         <div className="accordion-body">
//                           <div className="body-block">
//                             <span className="block-tag intention">INTENTION</span>
//                             <p>{item.intention}</p>
//                           </div>

//                           <div className="body-block">
//                             <span className="block-tag answer">MODEL ANSWER</span>
//                             <p>{item.answer}</p>
//                           </div>

//                           <QuestionPractice 
//                             question={item.question} 
//                             intention={item.intention} 
//                           />
//                         </div>
//                       )}
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>
//           )}

//           {/* 2. Behavioral Questions Tab */}
//           {activeTab === 'behavioral' && (
//             <div className="report-slide behavioral-slide">
//               <div className="content-header">
//                 <div>
//                   <h1>Behavioral Questions</h1>
//                   <span>{behavioralCount} questions</span>
//                 </div>
//               </div>

//               <div className="question-accordion">
//                 {interviewReport.behavioralQuestions?.map((item, index) => {
//                   const isOpen = openAccordion === index || (openAccordion === null && index === 0)
//                   return (
//                     <div className="accordion-item" key={index}>
//                       <button 
//                         type="button"
//                         className="accordion-trigger"
//                         onClick={() => toggleAccordion(index)}
//                       >
//                         <span className="question-badge">{String(index + 1).padStart(2, '0')}</span>
//                         <p>{item.question}</p>
//                         <span className="chevron">{isOpen ? 'ʌ' : 'v'}</span>
//                       </button>

//                       {isOpen && (
//                         <div className="accordion-body">
//                           <div className="body-block">
//                             <span className="block-tag intention">INTENTION</span>
//                             <p>{item.intention}</p>
//                           </div>

//                           <div className="body-block">
//                             <span className="block-tag answer">MODEL ANSWER</span>
//                             <p>{item.answer}</p>
//                           </div>

//                           <QuestionPractice 
//                             question={item.question} 
//                             intention={item.intention} 
//                           />
//                         </div>
//                       )}
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>
//           )}

//           {/* 3. Interactive Roadmap Tab */}
//           {activeTab === 'roadmap' && (
//             <div className="report-slide roadmap-slide">
//               <div className="content-header">
//                 <div>
//                   <h1>Preparation Road Map</h1>
//                   <span>{roadmapCount}-day plan</span>
//                 </div>
//               </div>

//               {/* Progress Bar Card */}
//               <div style={{
//                 background: 'rgba(255, 255, 255, 0.75)',
//                 backdropFilter: 'blur(10px)',
//                 border: '1px solid rgba(226, 232, 240, 0.8)',
//                 borderRadius: '14px',
//                 padding: '1rem 1.25rem',
//                 marginBottom: '1.5rem',
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
//               }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
//                   <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1f2937' }}>
//                     Checklist Progress
//                   </span>
//                   <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#db2777' }}>
//                     {finishedTasksCount} / {allTasksCount} completed ({progressPercent}%)
//                   </span>
//                 </div>
                
//                 {/* Progress Track */}
//                 <div style={{
//                   width: '100%',
//                   height: '8px',
//                   backgroundColor: '#f1f5f9',
//                   borderRadius: '999px',
//                   overflow: 'hidden'
//                 }}>
//                   <div style={{
//                     height: '100%',
//                     width: `${progressPercent}%`,
//                     background: 'linear-gradient(90deg, #ec4899 0%, #a855f7 100%)',
//                     borderRadius: '999px',
//                     transition: 'width 0.35s ease'
//                   }} />
//                 </div>
//               </div>

//               {/* Checklist Timeline */}
//               <div className="timeline">
//                 {interviewReport.preparationPlan?.map((day) => (
//                   <article className="timeline-item" key={day.day}>
//                     <span className="timeline-dot"></span>
//                     <div className="timeline-content">
//                       <span className="day-pill">Day {day.day}</span>
//                       <h2>{day.focus}</h2>
                      
//                       <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                         {day.tasks?.map((task, idx) => {
//                           const taskId = `day-${day.day}-task-${idx}`
//                           const isDone = !!completedTasks[taskId]

//                           return (
//                             <li 
//                               key={idx}
//                               onClick={() => toggleTask(taskId)}
//                               style={{
//                                 display: 'flex',
//                                 alignItems: 'flex-start',
//                                 gap: '0.75rem',
//                                 padding: '0.6rem 0.8rem',
//                                 borderRadius: '8px',
//                                 backgroundColor: isDone ? 'rgba(243, 244, 246, 0.6)' : 'rgba(255, 255, 255, 0.5)',
//                                 border: isDone ? '1px dashed #cbd5e1' : '1px solid rgba(226, 232, 240, 0.6)',
//                                 cursor: 'pointer',
//                                 transition: 'all 0.2s ease',
//                                 userSelect: 'none'
//                               }}
//                             >
//                               <input
//                                 type="checkbox"
//                                 checked={isDone}
//                                 onChange={() => {}}
//                                 style={{
//                                   marginTop: '0.2rem',
//                                   width: '16px',
//                                   height: '16px',
//                                   accentColor: '#db2777',
//                                   cursor: 'pointer'
//                                 }}
//                               />
//                               <span style={{
//                                 fontSize: '0.88rem',
//                                 lineHeight: '1.4',
//                                 color: isDone ? '#9ca3af' : '#374151',
//                                 textDecoration: isDone ? 'line-through' : 'none',
//                                 fontWeight: isDone ? 400 : 500
//                               }}>
//                                 {task}
//                               </span>
//                             </li>
//                           )
//                         })}
//                       </ul>
//                     </div>
//                   </article>
//                 ))}
//               </div>
//             </div>
//           )}

//         </section>

//         {/* Right Info Panel: Match Score, 1-Page ATS Resume Download, & Skill Gaps */}
//         <aside className="skill-panel" aria-label="Skill gaps">
//           <div className="score-card">
//             <p>MATCH SCORE</p>
//             <span>{interviewReport.matchScore}</span>
//             <small>%</small>
//           </div>
//           <p className="score-copy">Strong match for this role</p>

//           {/* 📄 1-Page ATS Resume Download Button */}
//           <button 
//             type="button"
//             onClick={handleDownloadResume}
//             disabled={isDownloading}
//             style={{
//               width: '100%',
//               padding: '0.75rem 1rem',
//               marginTop: '0.5rem',
//               marginBottom: '1.8rem',
//               borderRadius: '12px',
//               border: 'none',
//               background: 'linear-gradient(135deg, #d946ef 0%, #db2777 100%)',
//               color: '#ffffff',
//               fontWeight: 700,
//               fontSize: '0.82rem',
//               cursor: isDownloading ? 'not-allowed' : 'pointer',
//               boxShadow: '0 4px 15px rgba(219, 39, 119, 0.3)',
//               transition: 'opacity 0.2s ease, transform 0.2s ease',
//               opacity: isDownloading ? 0.7 : 1
//             }}
//           >
//             {isDownloading ? "📄 Generating ATS PDF..." : "⬇️ Download 1-Page ATS Resume"}
//           </button>

//           <h2>SKILL GAPS</h2>
//           <div className="skill-list">
//             {interviewReport.skillGaps?.map((gap, index) => (
//               <span className={`skill-pill ${gap.severity}`} key={index}>
//                 {gap.skill}
//               </span>
//             ))}
//           </div>
//         </aside>

//       </div>
//     </main>
//   )
// }

// export default Interview



import React, { useState } from 'react'
import { useParams } from 'react-router'
import "../style/interview.scss"
import { useInterview } from '../hooks/useInterview'
import QuestionPractice from '../components/QuestionPractice'

const fallbackReport = {
  title: "Computer Vision & Edge AI Engineer",
  matchScore: 95,
  skillGaps: [
    { skill: "DeepStream SDK", severity: "medium" },
    { skill: "CAN bus advanced diagnostics", severity: "low" }
  ],
  technicalQuestions: [
    {
      question: "How do you optimize a YOLOv8 model using TensorRT for deployment on an NVIDIA Jetson platform, and what trade-offs do you consider between FP32, FP16, and INT8 quantization?",
      intention: "To assess practical knowledge in edge AI optimization, model quantization, and hardware acceleration on resource-constrained GPUs.",
      answer: "Export to ONNX format, configure TensorRT builders to serialize an optimized engine, and evaluate inference throughput versus precision loss."
    },
    {
      question: "Explain how you handle communication and message synchronization between ROS 2 nodes and a Pixhawk flight controller running MAVLink.",
      intention: "To test real-time robotics middleware integration and asynchronous communication reliability.",
      answer: "Utilize micro-ROS or MAVROS bridge nodes, ensuring strict message timestamp alignment using tf2 message filters."
    }
  ],
  behavioralQuestions: [
    {
      question: "Tell me about a time when an embedded model ran out of memory right before a demonstration. How did you diagnose and resolve it under pressure?",
      intention: "Evaluates debugging under pressure, hardware resource awareness, and methodical problem-solving.",
      answer: "Analyzed memory allocations using tegrastats, reduced input batch size and image dimensions, and enabled swap memory to stabilize the demo."
    }
  ],
  preparationPlan: [
    {
      day: 1,
      focus: "TensorRT Architecture & Quantization Deep Dive",
      tasks: [
        "Review TensorRT calibration process for INT8 post-training quantization.",
        "Benchmark inference throughput on FP16 vs INT8 on target Jetson hardware.",
        "Document latency differences across input batch sizes and engine build settings."
      ]
    },
    {
      day: 2,
      focus: "Embedded Vision & Real-Time Pipeline Optimization",
      tasks: [
        "Analyze NVIDIA DeepStream GStreamer pipeline plugins (nvstreammux, nvinfer).",
        "Implement zero-copy memory transfers using unified CUDA memory.",
        "Measure and reduce end-to-end glass-to-glass latency across video feeds."
      ]
    },
    {
      day: 3,
      focus: "Robotics Middleware & Microcontroller Integration",
      tasks: [
        "Set up test ROS 2 nodes with publisher/subscriber QoS profiles.",
        "Simulate MAVLink telemetry ingestion and verify timestamp synchronization via tf2.",
        "Handle UART/CAN bus hardware communication faults gracefully in firmware."
      ]
    },
    {
      day: 4,
      focus: "Core DSA, Systems Programming & C++ Mastery",
      tasks: [
        "Practice high-frequency C++ interview patterns (smart pointers, RAII, move semantics).",
        "Solve 3 interval and sliding window algorithmic challenges.",
        "Review memory sanitizers and Valgrind profiling for memory leak detection."
      ]
    },
    {
      day: 5,
      focus: "End-to-End Edge AI Production Architecture",
      tasks: [
        "Architect an edge-to-cloud telemetry sync pipeline handling intermittent connectivity.",
        "Review OTA model update strategies and rollback mechanisms for fleet devices.",
        "Draft system architecture diagrams detailing edge inference constraints."
      ]
    },
    {
      day: 6,
      focus: "Behavioral & STAR Scenario Preparation",
      tasks: [
        "Draft STAR responses for engineering trade-offs made under tight delivery deadlines.",
        "Practice communicating hardware debugging under production pressure.",
        "Structure stories highlighting cross-functional leadership and stakeholder communication."
      ]
    },
    {
      day: 7,
      focus: "Full Mock Interview & Spoken Voice Rehearsal",
      tasks: [
        "Conduct a timed audio mock interview covering both technical and architectural prompts.",
        "Refine concise, punchy explanations of core resume projects using the XYZ formula.",
        "Review the target company's latest technology stack and prepare 3 targeted questions."
      ]
    }
  ]
}

const Interview = () => {
  const { interviewId } = useParams()
  const { report, loading, getResumePdf } = useInterview()
  
  const [activeTab, setActiveTab] = useState('technical')
  const [openAccordion, setOpenAccordion] = useState(null)
  const [isDownloading, setIsDownloading] = useState(false)

  // 1. Task persistence per interviewId
  const storageKey = `roadmap_tasks_${interviewId || 'default'}`
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => {
      const updated = { ...prev, [taskId]: !prev[taskId] }
      localStorage.setItem(storageKey, JSON.stringify(updated))
      return updated
    })
  }

  const handleDownloadResume = async () => {
    if (!interviewId) return
    setIsDownloading(true)
    try {
      if (getResumePdf) {
        await getResumePdf(interviewId)
      }
    } catch (err) {
      console.error("Resume download failed:", err)
    } finally {
      setIsDownloading(false)
    }
  }

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index)
  }

  const interviewReport = report || fallbackReport

  const technicalQuestions = interviewReport.technicalQuestions || []
  const behavioralQuestions = interviewReport.behavioralQuestions || []
  const preparationPlan = interviewReport.preparationPlan || []

  // Progress metrics
  const allTasksCount = preparationPlan.reduce(
    (acc, day) => acc + (day.tasks?.length || 0), 0
  )
  const finishedTasksCount = Object.keys(completedTasks).filter(
    key => completedTasks[key]
  ).length
  const progressPercent = allTasksCount > 0 
    ? Math.round((finishedTasksCount / allTasksCount) * 100) 
    : 0

  if (loading) {
    return (
      <main className="interview" style={{ display: 'grid', placeItems: 'center', minHeight: '80vh' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#4b5563' }}>
          Loading your tailored interview strategy...
        </p>
      </main>
    )
  }

  return (
    <main className="interview">
      <div className="interview-container">
        
        {/* Navigation Sidebar */}
        <nav className="interview-nav" aria-label="Interview Sections">
          <p className="nav-label">SECTIONS</p>
          <button 
            type="button"
            className={`nav-btn ${activeTab === 'technical' ? 'active' : ''}`}
            onClick={() => setActiveTab('technical')}
          >
            <span>&lt;&gt;</span>
            Technical Questions
          </button>
          <button 
            type="button"
            className={`nav-btn ${activeTab === 'behavioral' ? 'active' : ''}`}
            onClick={() => setActiveTab('behavioral')}
          >
            <span>o</span>
            Behavioral Questions
          </button>
          <button 
            type="button"
            className={`nav-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            <span>-&gt;</span>
            Road Map
          </button>
        </nav>

        {/* Dynamic Content Slides */}
        <section className="interview-content">

          {/* 1. Technical Questions */}
          {activeTab === 'technical' && (
            <div className="report-slide technical-slide">
              <div className="content-header">
                <div>
                  <h1>Technical Questions</h1>
                  <span>{technicalQuestions.length} questions</span>
                </div>
              </div>

              <div className="question-accordion">
                {technicalQuestions.map((item, index) => {
                  const isOpen = openAccordion === index || (openAccordion === null && index === 0)
                  return (
                    <div className="accordion-item" key={index}>
                      <button 
                        type="button"
                        className="accordion-trigger"
                        onClick={() => toggleAccordion(index)}
                      >
                        <span className="question-badge">{String(index + 1).padStart(2, '0')}</span>
                        <p>{item.question}</p>
                        <span className="chevron">{isOpen ? '▲' : '▼'}</span>
                      </button>

                      {isOpen && (
                        <div className="accordion-body">
                          <div className="body-block">
                            <span className="block-tag intention">INTENTION</span>
                            <p>{item.intention}</p>
                          </div>

                          <div className="body-block">
                            <span className="block-tag answer">MODEL ANSWER</span>
                            <p>{item.answer}</p>
                          </div>

                          {QuestionPractice && (
                            <QuestionPractice 
                              question={item.question} 
                              intention={item.intention} 
                            />
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* 2. Behavioral Questions */}
          {activeTab === 'behavioral' && (
            <div className="report-slide behavioral-slide">
              <div className="content-header">
                <div>
                  <h1>Behavioral Questions</h1>
                  <span>{behavioralQuestions.length} questions</span>
                </div>
              </div>

              <div className="question-accordion">
                {behavioralQuestions.map((item, index) => {
                  const isOpen = openAccordion === index || (openAccordion === null && index === 0)
                  return (
                    <div className="accordion-item" key={index}>
                      <button 
                        type="button"
                        className="accordion-trigger"
                        onClick={() => toggleAccordion(index)}
                      >
                        <span className="question-badge">{String(index + 1).padStart(2, '0')}</span>
                        <p>{item.question}</p>
                        <span className="chevron">{isOpen ? '▲' : '▼'}</span>
                      </button>

                      {isOpen && (
                        <div className="accordion-body">
                          <div className="body-block">
                            <span className="block-tag intention">INTENTION</span>
                            <p>{item.intention}</p>
                          </div>

                          <div className="body-block">
                            <span className="block-tag answer">MODEL ANSWER</span>
                            <p>{item.answer}</p>
                          </div>

                          {QuestionPractice && (
                            <QuestionPractice 
                              question={item.question} 
                              intention={item.intention} 
                            />
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* 3. Interactive Roadmap */}
          {activeTab === 'roadmap' && (
            <div className="report-slide roadmap-slide">
              <div className="content-header">
                <div>
                  <h1>Preparation Road Map</h1>
                  <span>{preparationPlan.length}-day plan</span>
                </div>
              </div>

              {/* Progress Card */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                borderRadius: '14px',
                padding: '1rem 1.25rem',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1f2937' }}>
                    Checklist Progress
                  </span>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#db2777' }}>
                    {finishedTasksCount} / {allTasksCount} completed ({progressPercent}%)
                  </span>
                </div>
                
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '999px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${progressPercent}%`,
                    background: 'linear-gradient(90deg, #ec4899 0%, #a855f7 100%)',
                    borderRadius: '999px',
                    transition: 'width 0.35s ease'
                  }} />
                </div>
              </div>

              {/* Timeline */}
              <div className="timeline">
                {preparationPlan.map((day) => (
                  <article className="timeline-item" key={day.day}>
                    <span className="timeline-dot"></span>
                    <div className="timeline-content">
                      <span className="day-pill">Day {day.day}</span>
                      <h2>{day.focus}</h2>
                      
                      <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {day.tasks?.map((task, idx) => {
                          const taskId = `day-${day.day}-task-${idx}`
                          const isDone = !!completedTasks[taskId]

                          return (
                            <li 
                              key={idx}
                              onClick={() => toggleTask(taskId)}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.75rem',
                                padding: '0.6rem 0.8rem',
                                borderRadius: '8px',
                                backgroundColor: isDone ? 'rgba(243, 244, 246, 0.6)' : 'rgba(255, 255, 255, 0.5)',
                                border: isDone ? '1px dashed #cbd5e1' : '1px solid rgba(226, 232, 240, 0.6)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                userSelect: 'none'
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={isDone}
                                onChange={() => {}}
                                style={{
                                  marginTop: '0.2rem',
                                  width: '16px',
                                  height: '16px',
                                  accentColor: '#db2777',
                                  cursor: 'pointer'
                                }}
                              />
                              <span style={{
                                fontSize: '0.88rem',
                                lineHeight: '1.4',
                                color: isDone ? '#9ca3af' : '#374151',
                                textDecoration: isDone ? 'line-through' : 'none',
                                fontWeight: isDone ? 400 : 500
                              }}>
                                {task}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

        </section>

        {/* Right Info Panel */}
        <aside className="skill-panel" aria-label="Skill gaps">
          <div className="score-card">
            <p>MATCH SCORE</p>
            <span>{interviewReport.matchScore}</span>
            <small>%</small>
          </div>
          <p className="score-copy">Strong match for this role</p>

          <button 
            type="button"
            onClick={handleDownloadResume}
            disabled={isDownloading}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              marginTop: '0.5rem',
              marginBottom: '1.8rem',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #d946ef 0%, #db2777 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: isDownloading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 15px rgba(219, 39, 119, 0.3)',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              opacity: isDownloading ? 0.7 : 1
            }}
          >
            {isDownloading ? "📄 Generating ATS PDF..." : "⬇️ Download 1-Page ATS Resume"}
          </button>

          <h2>SKILL GAPS</h2>
          <div className="skill-list">
            {interviewReport.skillGaps?.map((gap, index) => (
              <span className={`skill-pill ${gap.severity}`} key={index}>
                {gap.skill}
              </span>
            ))}
          </div>
        </aside>

      </div>
    </main>
  )
}

export default Interview