import fs from 'fs';
import path from 'path';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from 'docx';

// Professional ATS-Compliant Resume DOCX
// Exactly matching the user's uploaded 2-page Resume PDF

const primaryColor = '000000'; // Black title/headings
const headerBlue = '003366'; // Section underline / Accent Navy
const linkColor = '005599'; // Subtle blue for hyperlinks
const textColor = '1A1A1A';
const subTextColor = '444444';

const createSectionHeader = (title) => {
  return new Paragraph({
    spacing: { before: 200, after: 80 },
    border: {
      bottom: {
        color: '004080',
        space: 3,
        style: BorderStyle.SINGLE,
        size: 8,
      },
    },
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        size: 21, // 10.5pt
        font: 'Calibri',
        color: '002B49',
      }),
    ],
  });
};

const createBullet = (text, boldPrefix = '') => {
  const children = [];
  if (boldPrefix) {
    children.push(
      new TextRun({
        text: boldPrefix + ' ',
        bold: true,
        size: 19, // 9.5pt
        font: 'Calibri',
        color: textColor,
      })
    );
  }
  children.push(
    new TextRun({
      text: text,
      size: 19, // 9.5pt
      font: 'Calibri',
      color: textColor,
    })
  );

  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 25, after: 25 },
    children,
  });
};

const docChildren = [
  // ── HEADER: Name ──
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 40 },
    children: [
      new TextRun({
        text: 'GOUTAM GUPTA',
        bold: true,
        size: 34, // 17pt
        font: 'Calibri',
        color: '000000',
      }),
    ],
  }),

  // ── Sub-heading / Headline ──
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 40 },
    children: [
      new TextRun({
        text: 'Full-Stack MERN Architect & Android App Developer',
        bold: true,
        size: 20, // 10pt
        font: 'Calibri',
        color: '004080',
      }),
    ],
  }),

  // ── Contact Strip ──
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 140 },
    children: [
      new TextRun({ text: 'Asansol, WB, India  |  ', font: 'Calibri', size: 18, color: subTextColor }),
      new TextRun({ text: '+91 8343957187  |  ', font: 'Calibri', size: 18, color: subTextColor }),
      new TextRun({ text: 'Gmail.com  |  ', font: 'Calibri', size: 18, color: linkColor, underline: {} }),
      new TextRun({ text: 'linkedin.com  |  ', font: 'Calibri', size: 18, color: linkColor, underline: {} }),
      new TextRun({ text: 'github.com', font: 'Calibri', size: 18, color: linkColor, underline: {} }),
    ],
  }),

  // ── PROFESSIONAL SUMMARY ──
  createSectionHeader('Professional Summary'),
  new Paragraph({
    spacing: { before: 40, after: 100 },
    children: [
      new TextRun({
        text: 'Proactive and results-driven Full-Stack MERN Architect and Android Application Developer with a strong track record of engineering scalable web applications, low-latency microservices, and high-performance native Android solutions. Proficient across modern JavaScript ecosystems (React.js, Node.js, Express, MongoDB Atlas) and native mobile frameworks (Java, Kotlin, Android SDK). Experienced in building real-time multiplayer WebSocket engines, AI-powered systems (Gemini AI, TFLite), and secure enterprise authentication (JWT, Nodemailer). Committed to clean architectural patterns, robust API design, and intuitive user experiences.',
        font: 'Calibri',
        size: 19, // 9.5pt
        color: textColor,
      }),
    ],
  }),

  // ── TECHNICAL SKILLS ──
  createSectionHeader('Technical Skills'),
  createBullet('React.js, Vite, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap, Responsive UI/UX Design', 'Frontend Engineering:'),
  createBullet('Node.js, Express.js, RESTful APIs, JWT Authentication, Nodemailer, WebSocket.', 'Backend & APIs:'),
  createBullet('Android Studio, Java, Kotlin, Android SDK, Material 3, MPAndroidChart, Firebase, TFLite, OpenCV', 'Mobile & Edge AI:'),
  createBullet('MongoDB Atlas,', 'Database Management:'),
  createBullet('Git, GitHub, VS Code, Postman, Stripe API, Gemini API', 'Tools & Integrations:'),

  // ── FEATURED ENGINEERING PROJECTS ──
  createSectionHeader('Featured Engineering Projects'),

  // Project 1: School Management System
  new Paragraph({
    spacing: { before: 100, after: 20 },
    children: [
      new TextRun({ text: 'School Management System', bold: true, font: 'Calibri', size: 20, color: '000000' }),
      new TextRun({ text: '  |  Full Stack Web Platform', font: 'Calibri', size: 18, color: subTextColor, italics: true }),
    ],
  }),
  new Paragraph({
    spacing: { before: 10, after: 40 },
    children: [
      new TextRun({ text: 'Tech Stack: ', bold: true, font: 'Calibri', size: 18, color: subTextColor }),
      new TextRun({ text: 'React.js, Node.js, Express.js, MongoDB Atlas, Tailwind CSS, JWT, Nodemailer, Gemini AI  [ ', font: 'Calibri', size: 18, color: textColor }),
      new TextRun({ text: 'Live Demo', font: 'Calibri', size: 18, color: linkColor, underline: {} }),
      new TextRun({ text: '   ', font: 'Calibri', size: 18 }),
      new TextRun({ text: 'Source Code', font: 'Calibri', size: 18, color: linkColor, underline: {} }),
      new TextRun({ text: ' ]', font: 'Calibri', size: 18, color: textColor }),
    ],
  }),
  createBullet('Architected enterprise-grade school management platform with role-based access control (Admin, Teachers, Students, Parents).'),
  createBullet('Engineered secure JWT authentication, Bcrypt password hashing, and Nodemailer OTP email verification workflows.'),
  createBullet('Integrated AI-powered fee notification & reminder engine utilizing Google Gemini API with automated student progress tracking modules.'),

  // Project 2: Neo Chess
  new Paragraph({
    spacing: { before: 90, after: 20 },
    children: [
      new TextRun({ text: 'Neo Chess - Real-Time Multiplayer Engine', bold: true, font: 'Calibri', size: 20, color: '000000' }),
      new TextRun({ text: '  |  Mobile & WebSocket Engine', font: 'Calibri', size: 18, color: subTextColor, italics: true }),
    ],
  }),
  new Paragraph({
    spacing: { before: 10, after: 40 },
    children: [
      new TextRun({ text: 'Tech Stack: ', bold: true, font: 'Calibri', size: 18, color: subTextColor }),
      new TextRun({ text: 'Android Studio, Java, JavaScript, Node.js, Express, WebSocket, HTML5, CSS3  [ ', font: 'Calibri', size: 18, color: textColor }),
      new TextRun({ text: 'Download APK', font: 'Calibri', size: 18, color: linkColor, underline: {} }),
      new TextRun({ text: '   ', font: 'Calibri', size: 18 }),
      new TextRun({ text: 'Source Code', font: 'Calibri', size: 18, color: linkColor, underline: {} }),
      new TextRun({ text: ' ]', font: 'Calibri', size: 18, color: textColor }),
    ],
  }),
  createBullet('Developed real-time multiplayer chess game with native Android wrapper and high-performance embedded web execution layer.'),
  createBullet('Engineered Node.js WebSocket backend server achieving sub-30ms player matchmaking, live move synchronization, and turn validation.'),
  createBullet('Released standalone Android APK distribution package with offline fallback modes and zero-lag board rendering.'),

  // Project 3: Cow Business
  new Paragraph({
    spacing: { before: 90, after: 20 },
    children: [
      new TextRun({ text: 'Cow Business - AI Dairy Farm Calculator', bold: true, font: 'Calibri', size: 20, color: '000000' }),
      new TextRun({ text: '  |  Android Fintech & Analytics App', font: 'Calibri', size: 18, color: subTextColor, italics: true }),
    ],
  }),
  new Paragraph({
    spacing: { before: 10, after: 40 },
    children: [
      new TextRun({ text: 'Tech Stack: ', bold: true, font: 'Calibri', size: 18, color: subTextColor }),
      new TextRun({ text: 'Java, Android SDK, Material 3, MPAndroidChart, PdfDocument, SharedPreferences, XML  [ ', font: 'Calibri', size: 18, color: textColor }),
      new TextRun({ text: 'Download APK', font: 'Calibri', size: 18, color: linkColor, underline: {} }),
      new TextRun({ text: '   ', font: 'Calibri', size: 18 }),
      new TextRun({ text: 'Source Code', font: 'Calibri', size: 18, color: linkColor, underline: {} }),
      new TextRun({ text: ' ]', font: 'Calibri', size: 18, color: textColor }),
    ],
  }),
  createBullet('Created specialized native Android agricultural finance application for yield forecasting and dairy farm profitability analysis.'),
  createBullet('Implemented reducing-balance loan EMI calculation algorithms and interactive visual cashflow graphs using MPAndroidChart.'),
  createBullet('Engineered automated PDF export generator (PdfDocument) enabling farmers to save and share comprehensive business dossiers.'),

  // Project 4: Sci-Fi Scientific Calculator
  new Paragraph({
    spacing: { before: 90, after: 20 },
    children: [
      new TextRun({ text: 'Sci-Fi Scientific Calculator', bold: true, font: 'Calibri', size: 20, color: '000000' }),
      new TextRun({ text: '  |  Native Android Calculator Application', font: 'Calibri', size: 18, color: subTextColor, italics: true }),
    ],
  }),
  new Paragraph({
    spacing: { before: 10, after: 40 },
    children: [
      new TextRun({ text: 'Tech Stack: ', bold: true, font: 'Calibri', size: 18, color: subTextColor }),
      new TextRun({ text: 'Kotlin, Android SDK, XML Layouts, Material 3, Gradle, Git, BigDecimal Precision Engine  [ ', font: 'Calibri', size: 18, color: textColor }),
      new TextRun({ text: 'Download APK', font: 'Calibri', size: 18, color: linkColor, underline: {} }),
      new TextRun({ text: '   ', font: 'Calibri', size: 18 }),
      new TextRun({ text: 'Source Code', font: 'Calibri', size: 18, color: linkColor, underline: {} }),
      new TextRun({ text: ' ]', font: 'Calibri', size: 18, color: textColor }),
    ],
  }),
  createBullet('Built advanced native Android calculator with cyberpunk interstellar neon UI theme, matrix solvers, and complex equations.'),
  createBullet('Engineered custom Java/Kotlin BigDecimal mathematical precision core preventing floating-point inaccuracies during multi-step conversions.'),
  createBullet('Implemented built-in physics/math formula cheatsheets and released optimized native APK on GitHub Releases.'),

  // Project 5: Invitor
  new Paragraph({
    spacing: { before: 90, after: 20 },
    children: [
      new TextRun({ text: 'Invitor (Event Booking) Website', bold: true, font: 'Calibri', size: 20, color: '000000' }),
      new TextRun({ text: '  |  Full Stack Event Management', font: 'Calibri', size: 18, color: subTextColor, italics: true }),
    ],
  }),
  new Paragraph({
    spacing: { before: 10, after: 40 },
    children: [
      new TextRun({ text: 'Tech Stack: ', bold: true, font: 'Calibri', size: 18, color: subTextColor }),
      new TextRun({ text: 'React.js, Vite, Tailwind CSS, RESTful APIs, Postman API Testing  [ ', font: 'Calibri', size: 18, color: textColor }),
      new TextRun({ text: 'Live Demo', font: 'Calibri', size: 18, color: linkColor, underline: {} }),
      new TextRun({ text: '   ', font: 'Calibri', size: 18 }),
      new TextRun({ text: 'Source Code', font: 'Calibri', size: 18, color: linkColor, underline: {} }),
      new TextRun({ text: ' ]', font: 'Calibri', size: 18, color: textColor }),
    ],
  }),
  createBullet('Built full-stack Event Booking and Ticketing management platform featuring dynamic role-based dashboards.'),
  createBullet('Designed responsive cyberpunk-tailored interface using Tailwind CSS and high-velocity Vite build pipeline.'),
  createBullet('Verified and audited end-to-end REST API communication with structured Postman collections for seamless reliability.'),

  // Project 6: Full Stack Food Delivery Website
  new Paragraph({
    spacing: { before: 90, after: 20 },
    children: [
      new TextRun({ text: 'Full Stack Food Delivery Website', bold: true, font: 'Calibri', size: 20, color: '000000' }),
      new TextRun({ text: '  |  Full Stack MERN Platform', font: 'Calibri', size: 18, color: subTextColor, italics: true }),
    ],
  }),
  new Paragraph({
    spacing: { before: 10, after: 40 },
    children: [
      new TextRun({ text: 'Tech Stack: ', bold: true, font: 'Calibri', size: 18, color: subTextColor }),
      new TextRun({ text: 'React.js, Node.js, Express, MongoDB Atlas, Stripe Payment Gateway, Tailwind CSS  [ ', font: 'Calibri', size: 18, color: textColor }),
      new TextRun({ text: 'Live Demo', font: 'Calibri', size: 18, color: linkColor, underline: {} }),
      new TextRun({ text: '   ', font: 'Calibri', size: 18 }),
      new TextRun({ text: 'Source Code', font: 'Calibri', size: 18, color: linkColor, underline: {} }),
      new TextRun({ text: ' ]', font: 'Calibri', size: 18, color: textColor }),
    ],
  }),
  createBullet('Developed end-to-end online food ordering application with live telemetry order status tracking and responsive user carts.'),
  createBullet('Integrated Stripe payment gateway for encrypted online financial transactions with webhook-driven order fulfillment.'),
  createBullet('Architected scalable backend REST APIs using Express.js and MongoDB aggregation queries for food catalog filtering.'),

  // ── EDUCATION ──
  createSectionHeader('Education'),

  new Paragraph({
    spacing: { before: 70, after: 15 },
    children: [
      new TextRun({ text: 'Bachelor of Technology (B.Tech) - Information Technology', bold: true, font: 'Calibri', size: 19, color: '004080', underline: {} }),
      new TextRun({ text: ' (2023 - 2026)', font: 'Calibri', size: 18, color: subTextColor }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 50 },
    children: [
      new TextRun({ text: 'Kalyani Government Engineering College (KGEC / MAKAUT)  —  Score: 6.61 CGPA', font: 'Calibri', size: 18, color: textColor }),
    ],
  }),

  new Paragraph({
    spacing: { before: 60, after: 15 },
    children: [
      new TextRun({ text: 'Diploma in Electronics & Telecommunication Engineering (ETCE)', bold: true, font: 'Calibri', size: 19, color: '004080', underline: {} }),
      new TextRun({ text: ' (2020 - 2023)', font: 'Calibri', size: 18, color: subTextColor }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 50 },
    children: [
      new TextRun({ text: 'Purulia Polytechnic (W.B.S.C.T.E)  —  Score: 79.9% Aggregate', font: 'Calibri', size: 18, color: textColor }),
    ],
  }),

  new Paragraph({
    spacing: { before: 60, after: 15 },
    children: [
      new TextRun({ text: 'Higher Secondary Education (10+2)', bold: true, font: 'Calibri', size: 19, color: '004080', underline: {} }),
      new TextRun({ text: ' (2018 - 2020)', font: 'Calibri', size: 18, color: subTextColor }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 50 },
    children: [
      new TextRun({ text: 'Sodepur Colliery High School (W.B.C.H.S.E)  —  Score: 84.4%', font: 'Calibri', size: 18, color: textColor }),
    ],
  }),

  new Paragraph({
    spacing: { before: 60, after: 15 },
    children: [
      new TextRun({ text: 'Secondary School Education (10th Standard)', bold: true, font: 'Calibri', size: 19, color: '004080', underline: {} }),
      new TextRun({ text: ' (2018)', font: 'Calibri', size: 18, color: subTextColor }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 60 },
    children: [
      new TextRun({ text: 'Sodepur Colliery High School (W.B.B.S.E)  —  Score: 59.86%', font: 'Calibri', size: 18, color: textColor }),
    ],
  }),

  // ── HONORS, RANKINGS & CERTIFICATIONS ──
  createSectionHeader('Honors, Rankings & Certifications'),
  createBullet('WBJELET State Joint Entrance Examination: General Rank 170 | OBC Rank 26 (Top Tier State Placement).'),
  createBullet('Robo Fight Competition: 3rd Position Trophy representing Purulia Polytechnic in tactical robotics warfare.'),
  createBullet('Open-Source Community: Regularly mentor junior peers in Android SDK configuration, React frontend patterns, and REST API design.'),
  createBullet('Domestic Data Entry Operator (DDEO): Certified in database operational maintenance and speed typing.'),

  // Cert 1: Spring Framework
  new Paragraph({
    spacing: { before: 60, after: 10 },
    children: [
      new TextRun({ text: '•  Spring Framework for Java Developers: Practical Guide', bold: true, font: 'Calibri', size: 19, color: textColor }),
      new TextRun({ text: '                                          March 17, 2025', bold: true, font: 'Calibri', size: 18, color: subTextColor }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 20 },
    children: [
      new TextRun({ text: '    Udemy | Credential ID: UC-a44fa5d7-a5b0-4895-8512-126670934dbc | Duration: 20.5 Hours', font: 'Calibri', size: 17, color: subTextColor, italics: true }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 50 },
    children: [
      new TextRun({ text: '    Mastered Spring Core, Dependency Injection (DI), Spring Boot, Spring Data JPA, and RESTful microservices architecture.', font: 'Calibri', size: 18, color: textColor }),
    ],
  }),

  // Cert 2: Power BI
  new Paragraph({
    spacing: { before: 50, after: 10 },
    children: [
      new TextRun({ text: '•  Power BI From Scratch', bold: true, font: 'Calibri', size: 19, color: textColor }),
      new TextRun({ text: '                                                                                  December 21, 2025', bold: true, font: 'Calibri', size: 18, color: subTextColor }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 20 },
    children: [
      new TextRun({ text: '    Udemy | Credential ID: UC-3308c41b-93cb-485a-9ee3-610090f8ef62 | Duration: 40 Hours', font: 'Calibri', size: 17, color: subTextColor, italics: true }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 50 },
    children: [
      new TextRun({ text: '    Mastered enterprise data modeling, DAX query optimization, Power Query ETL pipelines, and interactive analytics reporting dashboards.', font: 'Calibri', size: 18, color: textColor }),
    ],
  }),

  // Cert 3: CSS Bootstrap JS PHP
  new Paragraph({
    spacing: { before: 50, after: 10 },
    children: [
      new TextRun({ text: '•  CSS, Bootstrap, JavaScript And PHP Stack Complete Course', bold: true, font: 'Calibri', size: 19, color: textColor }),
      new TextRun({ text: '                   May 8, 2024', bold: true, font: 'Calibri', size: 18, color: subTextColor }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 20 },
    children: [
      new TextRun({ text: '    Udemy | Credential ID: UC-895a323e-a202-41d4-a07e-08610799bbc2 | Duration: 8 Hours', font: 'Calibri', size: 17, color: subTextColor, italics: true }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 50 },
    children: [
      new TextRun({ text: '    Gained expertise in responsive web design, DOM manipulation, asynchronous JavaScript operations, and PHP server scripting.', font: 'Calibri', size: 18, color: textColor }),
    ],
  }),

  // Cert 4: Python
  new Paragraph({
    spacing: { before: 50, after: 10 },
    children: [
      new TextRun({ text: '•  Learn the Python Programming Language', bold: true, font: 'Calibri', size: 19, color: textColor }),
      new TextRun({ text: '                                                    March 16, 2024', bold: true, font: 'Calibri', size: 18, color: subTextColor }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 20 },
    children: [
      new TextRun({ text: '    Udemy | Credential ID: UC-90269a29-9c64-4fc6-8759-66586b6dc73e | Duration: 2.5 Hours', font: 'Calibri', size: 17, color: subTextColor, italics: true }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 50 },
    children: [
      new TextRun({ text: '    Core proficiency in Python syntax, standard data structures, object-oriented concepts, and algorithmic problem-solving.', font: 'Calibri', size: 18, color: textColor }),
    ],
  }),

  // Cert 5: Common Indicators for Cryptocurrencies
  new Paragraph({
    spacing: { before: 50, after: 10 },
    children: [
      new TextRun({ text: '•  Common Indicators for Cryptocurrencies Trading with Python', bold: true, font: 'Calibri', size: 19, color: textColor }),
      new TextRun({ text: '                   March 15, 2024', bold: true, font: 'Calibri', size: 18, color: subTextColor }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 20 },
    children: [
      new TextRun({ text: '    Udemy | Credential ID: UC-604e0fb5-86a3-400f-bbe4-4d8991b7fb4d | Duration: 2 Hours', font: 'Calibri', size: 17, color: subTextColor, italics: true }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 60 },
    children: [
      new TextRun({ text: '    Implemented technical financial indicators, quantitative market data processing, and automated algorithmic calculations using Python.', font: 'Calibri', size: 18, color: textColor }),
    ],
  }),
];

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: 720, // 0.5 in
            bottom: 720,
            left: 720,
            right: 720,
          },
        },
      },
      children: docChildren,
    },
  ],
});

async function run() {
  const buffer = await Packer.toBuffer(doc);

  const targets = [
    'd:/Desktop/portfolio_goutam/frontend/public/Goutam_Gupta_Resume.docx',
    'd:/Desktop/portfolio_goutam/frontend/public/resume.docx',
    'd:/Desktop/portfolio_goutam/frontend/Goutam_Gupta_Resume.docx',
    'd:/Desktop/portfolio_goutam/Goutam_Gupta_Resume.docx',
  ];

  targets.forEach((t) => {
    fs.writeFileSync(path.resolve(t), buffer);
    console.log('Successfully saved DOCX to:', t);
  });
}

run();
