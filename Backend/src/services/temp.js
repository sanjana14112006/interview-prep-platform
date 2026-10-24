const resume = `
ALEX CHEN
San Francisco, CA | (555) 019-2834 | alex.chen@email.com | linkedin.com/in/alexchen-dev | github.com/alexchen

PROFESSIONAL SUMMARY
Results-driven Full Stack Software Engineer with 4+ years of experience designing, developing, and deploying scalable web applications. Proficient in React, Node.js, TypeScript, and cloud technologies (AWS). Adept at optimizing database performance, implementing CI/CD pipelines, and collaborating in agile environments to deliver high-impact software solutions.

TECHNICAL SKILLS

Languages: JavaScript (ES6+), TypeScript, Python, HTML5, CSS3/SCSS, SQL

Frontend: React, Next.js, Redux Toolkit, Tailwind CSS, Vite

Backend: Node.js, Express.js, RESTful APIs, GraphQL

Databases & ORM: PostgreSQL, MongoDB, Redis, Prisma, Mongoose

DevOps & Cloud: AWS (S3, EC2, Lambda), Docker, Git, GitHub Actions, CI/CD

Testing & Tools: Jest, React Testing Library, Postman, Webpack

PROFESSIONAL EXPERIENCE

Software Engineer | CloudScale Solutions — San Francisco, CA
July 2023 – Present

Architected and maintained microservices handling over 2M+ daily API requests using Node.js, Express, and PostgreSQL.

Redesigned core customer dashboard using React, TypeScript, and Tailwind CSS, improving page load speeds by 38%.

Implemented Redis caching strategy that reduced database query latency by 45%.

Collaborated with cross-functional product and design teams to deliver 12 major feature releases on schedule.

Junior Full Stack Developer | Apex Digital Labs — Austin, TX
June 2021 – June 2023

Developed reusable React components and integrated RESTful APIs for client-facing SaaS platforms.

Built automated testing suites using Jest, increasing overall test coverage from 62% to 88%.

Assisted in migrating on-premise infrastructure to AWS (S3, EC2), reducing monthly hosting costs by 20%.

Resolved 150+ bug tickets across frontend and backend codebases during agile sprint cycles.

PROJECTS

AI Mock Interview Platform | React, Node.js, Express, MongoDB, Gemini API

Built an end-to-end full-stack web application providing real-time AI-powered interview feedback and scoring.

Implemented secure JWT-based authentication with HTTP-only cookies and protected routes.

Integrated Google Gemini API for prompt evaluation and customized performance feedback.

TaskStream — Team Collaboration Tool | Next.js, TypeScript, PostgreSQL, Prisma

Created a Kanban-style task management platform supporting real-time workspace updates via WebSockets.

Containerized application workflows using Docker and configured continuous deployment pipelines via GitHub Actions.

EDUCATION

Bachelor of Science in Computer Science
University of Texas at Austin | Graduated May 2021

Relevant Coursework: Data Structures & Algorithms, Database Systems, Web Development, Cloud Computing.

CERTIFICATIONS

AWS Certified Solutions Architect – Associate (2024)

Meta Front-End Developer Professional Certificate (2022)
`

const selfDescription = `
I am a results-driven Full Stack Software Engineer with over four years of experience architecting, developing, and deploying scalable web applications. My core expertise spans the JavaScript/TypeScript ecosystem—specifically building high-performance frontend interfaces with React, Next.js, and modern CSS/SCSS, alongside robust backend architectures powered by Node.js, Express, PostgreSQL, and MongoDB.

Throughout my career, I have specialized in microservices architecture, API design, database query optimization (including Redis caching), and cloud integration across AWS. I combine strong technical foundations in full-stack engineering and CI/CD automation with a collaborative, agile mindset to translate complex requirements into clean, maintainable, and impactful software products.
`

const jobDescription = `
Role: Full Stack Software Engineer

Company: CloudScale Innovations

Location: Remote / Hybrid (San Francisco, CA)

Job Type: Full-Time

About the Role

We are looking for a skilled and passionate Full Stack Software Engineer to join our core engineering team. In this role, you will be responsible for designing, building, and maintaining scalable web applications and microservices that power our enterprise SaaS platform. You will work closely with product managers, UI/UX designers, and backend architects to deliver high-performance user experiences.

Key Responsibilities

Design and implement responsive, accessible, and performant web interfaces using modern frontend frameworks (React, Next.js).

Build robust, secure, and scalable RESTful and GraphQL APIs using Node.js and Express.

Architect database schemas and optimize query performance across relational (PostgreSQL) and NoSQL (MongoDB) data stores.

Integrate third-party APIs, AI services (e.g., LLM APIs), and real-time communication tools (WebSockets).

Implement secure authentication mechanisms (JWT, OAuth, HTTP-only cookies) and route protection.

Write clean, maintainable, and well-tested code with unit and integration tests (Jest, React Testing Library).

Collaborate in an Agile/Scrum development environment, participating in sprint planning, code reviews, and deployments.

Requirements & Qualifications

Experience: 2–5 years of professional full-stack software development experience.

Frontend: Proficiency in JavaScript (ES6+), TypeScript, React, HTML5, and SCSS/Tailwind CSS.

Backend: Strong understanding of Node.js, Express.js, middleware architecture, and API design.

Databases: Practical experience with MongoDB (Mongoose) or PostgreSQL (Prisma/TypeORM), plus caching strategies (Redis).

Cloud & DevOps: Familiarity with Git workflows, Docker containerization, CI/CD pipelines, and cloud platforms (AWS/GCP).

Problem Solving: Solid grasp of data structures, web security standards (CORS, CSRF, XSS prevention), and state management patterns.

Nice to Have

Experience integrating Generative AI APIs (Gemini, OpenAI) into production applications.

Familiarity with microservices architecture and serverless computing (AWS Lambda).
`

module.exports = {
    resume, selfDescription, jobDescription
}

