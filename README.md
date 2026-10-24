# AI-Powered Full-Stack Mock Interview Platform

An intelligent, full-stack mock interview application that prepares candidates through role-tailored technical assessments, dynamic preparation roadmaps, and client-side multi-take video rehearsal with zero server media storage overhead. Spoken answers are transcribed in real time and evaluated across technical precision, English fluency, and confidence using the Google Gemini API.

---

## Key Features

- **Role-Tailored Question Generation:** Synthesizes 6–8 advanced technical questions and 4–5 STAR-method behavioral questions tailored to targeted job requirements and skills.
- **Authoritative Technical References:** Appends direct documentation links (e.g., PyTorch, MDN, RFCs) to questions to anchor preparation in industry standards.
- **Zero-Server Video Recording Pipeline:** Implements native browser `MediaRecorder` combined with `IndexedDB` storage to record, persist, and replay multiple takes locally on the user's PC (0 KB server media overhead; avoids `413 Payload Too Large` bottlenecks).
- **Client-Side Video Management:** Rehearse across multiple takes per question, review with local playback, export `.webm` recordings to disk, or discard takes at will.
- **Real-Time Speech & AI Evaluation:** Captures live answers via the Web Speech API and prompts Gemini 3.5 to benchmark candidate technical depth, vocabulary, and delivery composure.
- **7-Day Dynamic Roadmap:** Interactive daily milestones and structured check-lists tracking candidate preparedness and role match scores.

---

## Tech Stack

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** SCSS (responsive 3-column dashboard layout)
- **APIs & Storage:** Web Speech API, MediaDevices API, IndexedDB (client-side Blob storage)
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js & Express.js
- **AI Engine:** Google Gemini 3.5 API (`@google/genai`)
- **Database & Auth:** MongoDB (Mongoose), JSON Web Tokens (JWT)

---

## Architecture: Zero-Server Media Flow

```text
[ User Webcam & Microphone ]
            │
            ├── MediaRecorder API ──> IndexedDB (Saved locally in Chrome / PC)
            │                             ├── Playback & Review
            │                             ├── Local .webm Download
            │                             └── Delete / Discard Take
            │
            └── Web Speech API ──> Spoken Text Transcript
                                          │
                                          ▼ (Payload < 2 KB text, No Video Upload)
                            [ Express Server / Gemini API ]
                                          │
                                          ▼
                            [ Tri-Pillar Assessment ]
                            • Technical Depth (1-10)
                            • English Fluency (1-10)
                            • Delivery Confidence (1-10) 
```


## Getting Started
### Prerequisites
Node.js (v18+ recommended)

npm

Google Gemini API Key

MongoDB instance (Local or Atlas)

### Installation & Local Setup
1. Clone the repository

```bash
git clone https://github.com/sanjana14112006/interview-prep-platform.git
cd interview-prep-platform
```

2. Backend Setup
```bash 
cd Backend
npm install
```

Create a .env file inside the Backend/ directory:
```bash 
PORT=5000
GOOGLE_GENAI_API_KEY=your_gemini_api_key_here
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend development server:
```bash 
npm run dev
# Server running at http://localhost:5000
```

3. Frontend Setup
Open a separate terminal window:
```bash 
cd Frontend
npm install
npm run dev
# App running at http://localhost:5173
```

### Project Structure : 
```text
├── Backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Authentication & interview controllers
│   │   ├── middlewares/     # JWT verification & request validation
│   │   ├── models/          # MongoDB schemas (User, InterviewReport)
│   │   ├── routes/          # Express route declarations
│   │   └── services/        # Gemini API service & evaluation prompts
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/        # Auth state, login & registration views
│   │   │   └── interview/   # Question practice, roadmap & score modules
│   │   ├── utils/           # IndexedDB binary persistence logic
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```


