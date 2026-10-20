import fs from 'fs';
import path from 'path';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ExternalHyperlink,
} from 'docx';

// Create ATS-Compliant Professional Resume DOCX
// Standards: Standard standard headings, clean typography (Calibri/Arial), zero complex floating elements, clear sections

const primaryColor = '0A2540'; // Deep Navy
const secondaryColor = '1E6091'; // Accent Blue
const textColor = '222222';
const subTextColor = '555555';

const createSectionHeader = (title) => {
  return new Paragraph({
    spacing: { before: 240, after: 80 },
    border: {
      bottom: {
        color: secondaryColor,
        space: 4,
        style: BorderStyle.SINGLE,
        size: 12,
      },
    },
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        size: 22, // 11pt
        font: 'Calibri',
        color: primaryColor,
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
        size: 20, // 10pt
        font: 'Calibri',
        color: textColor,
      })
    );
  }
  children.push(
    new TextRun({
      text: text,
      size: 20, // 10pt
      font: 'Calibri',
      color: textColor,
    })
  );

  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 40, after: 40 },
    children,
  });
};

// 6 Projects as requested from screenshot
const projectsData = [
  {
    title: 'School Management System',
    category: 'Full Stack Web Platform',
    tech: 'React.js, Node.js, Express.js, MongoDB Atlas, Tailwind CSS, JWT, Nodemailer, Gemini AI',
    liveUrl: 'https://school-management-system-lyart-zeta.vercel.app/login',
    sourceUrl: 'https://github.com/G870-ops/School-Management-System',
    apkUrl: '',
    bullets: [
      'Architected enterprise-grade school management platform with role-based access control (Admin, Teachers, Students, Parents).',
      'Engineered secure JWT authentication, Bcrypt password hashing, and Nodemailer OTP email verification workflows.',
      'Integrated AI-powered fee notification & reminder engine utilizing Google Gemini API with automated student progress tracking modules.',
    ],
  },
  {
    title: 'Neo Chess - Real-Time Multiplayer Engine',
    category: 'Mobile & WebSocket Engine',
    tech: 'Android Studio, Java, JavaScript, Node.js, Express, WebSocket, HTML5, CSS3',
    liveUrl: '',
    sourceUrl: 'https://github.com/G870-ops/NEO_CHESS_GAME_APP',
    apkUrl: 'https://github.com/G870-ops/NEO_CHESS_GAME_APP/releases/download/v1.0.0/chess.apk',
    bullets: [
      'Developed real-time multiplayer chess game with native Android wrapper and high-performance embedded web execution layer.',
      'Engineered Node.js WebSocket backend server achieving sub-30ms player matchmaking, live move synchronization, and turn validation.',
      'Released standalone Android APK distribution package with offline fallback modes and zero-lag board rendering.',
    ],
  },
  {
    title: 'Cow Business - AI Dairy Farm Calculator',
    category: 'Android Fintech & Analytics App',
    tech: 'Java, Android SDK, Material 3, MPAndroidChart, PdfDocument, SharedPreferences, XML',
    liveUrl: '',
    sourceUrl: 'https://github.com/G870-ops/Cow_Business_App',
    apkUrl: 'https://github.com/G870-ops/Cow_Business_App/releases/download/v1.0.0/cow_business.apk',
    bullets: [
      'Created specialized native Android agricultural finance application for yield forecasting and dairy farm profitability analysis.',
      'Implemented reducing-balance loan EMI calculation algorithms and interactive visual cashflow graphs using MPAndroidChart.',
      'Engineered automated PDF export generator (PdfDocument) enabling farmers to save and share comprehensive business dossiers.',
    ],
  },
  {
    title: 'Sci-Fi Scientific Calculator',
    category: 'Native Android Calculator Application',
    tech: 'Kotlin, Android SDK, XML Layouts, Material 3, Gradle, Git, BigDecimal Precision Engine',
    liveUrl: '',
    sourceUrl: 'https://github.com/G870-ops/Scientifc_calculator_project',
    apkUrl: 'https://github.com/G870-ops/Scientifc_calculator_project/releases/download/v1.0.0/Scie.Cal.apk',
    bullets: [
      'Built advanced native Android calculator with cyberpunk interstellar neon UI theme, matrix solvers, and complex equations.',
      'Engineered custom Java/Kotlin BigDecimal mathematical precision core preventing floating-point inaccuracies during multi-step conversions.',
      'Implemented built-in physics/math formula cheatsheets and released optimized native APK on GitHub Releases.',
    ],
  },
  {
    title: 'Invitor (Event Booking) Website',
    category: 'Full Stack Event Management',
    tech: 'React.js, Vite, Tailwind CSS, RESTful APIs, Postman API Testing',
    liveUrl: 'https://event-booking-web-app-seven.vercel.app/',
    sourceUrl: 'https://github.com/G870-ops/Event_Booking_WebApp',
    apkUrl: '',
    bullets: [
      'Built full-stack Event Booking and Ticketing management platform featuring dynamic role-based dashboards.',
      'Designed responsive cyberpunk-tailored interface using Tailwind CSS and high-velocity Vite build pipeline.',
      'Verified and audited end-to-end REST API communication with structured Postman collections for seamless reliability.',
    ],
  },
  {
    title: 'Full Stack Food Delivery Website',
    category: 'Full Stack MERN Platform',
    tech: 'React.js, Node.js, Express, MongoDB Atlas, Stripe Payment Gateway, Tailwind CSS',
    liveUrl: 'https://food-dev-frontend.vercel.app/',
    sourceUrl: 'https://github.com/G870-ops/FOOD_DEV_FRONTEND',
    apkUrl: '',
    bullets: [
      'Developed end-to-end online food ordering application with live telemetry order status tracking and responsive user carts.',
      'Integrated Stripe payment gateway for encrypted online financial transactions with webhook-driven order fulfillment.',
      'Architected scalable backend REST APIs using Express.js and MongoDB aggregation queries for food catalog filtering.',
    ],
  },
];

const docChildren = [
  // ── HEADER: Name ──
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 60 },
    children: [
      new TextRun({
        text: 'GOUTAM GUPTA',
        bold: true,
        size: 36, // 18pt
        font: 'Calibri',
        color: primaryColor,
      }),
    ],
  }),

  // ── Sub-heading / Headline ──
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 60 },
    children: [
      new TextRun({
        text: 'Full-Stack MERN Architect & Android App Developer',
        bold: true,
        size: 22, // 11pt
        font: 'Calibri',
        color: secondaryColor,
      }),
    ],
  }),

  // ── Contact Info Strip (ATS preferred standard format) ──
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 180 },
    children: [
      new TextRun({ text: 'Kolkata, WB, India  |  ', font: 'Calibri', size: 19, color: subTextColor }),
      new TextRun({ text: '+91 8343957187  |  ', font: 'Calibri', size: 19, color: subTextColor }),
      new TextRun({ text: 'goutamgupta605@gmail.com  |  ', font: 'Calibri', size: 19, color: secondaryColor }),
      new TextRun({ text: 'linkedin.com/in/goutam-gupta  |  ', font: 'Calibri', size: 19, color: secondaryColor }),
      new TextRun({ text: 'github.com/G870-ops', font: 'Calibri', size: 19, color: secondaryColor }),
    ],
  }),

  // ── PROFESSIONAL SUMMARY ──
  createSectionHeader('Professional Summary'),
  new Paragraph({
    spacing: { before: 60, after: 120 },
    children: [
      new TextRun({
        text: 'Proactive and results-driven Full-Stack MERN Architect and Android Application Developer with a strong track record of engineering scalable web applications, low-latency microservices, and high-performance native Android solutions. Proficient across modern JavaScript ecosystems (React.js, Node.js, Express, MongoDB Atlas) and native mobile frameworks (Java, Kotlin, Android SDK). Experienced in building real-time multiplayer WebSocket engines, AI-powered systems (Gemini AI, TFLite), and secure enterprise authentication (JWT, Nodemailer). Committed to clean architectural patterns, robust API design, and intuitive user experiences.',
        font: 'Calibri',
        size: 20, // 10pt
        color: textColor,
      }),
    ],
  }),

  // ── TECHNICAL SKILLS MATRIX ──
  createSectionHeader('Technical Skills'),
  createBullet('React.js, Vite, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap, Responsive UI/UX Design', 'Frontend Engineering:'),
  createBullet('Node.js, Express.js, RESTful APIs, JWT Authentication, Nodemailer, WebSocket, Microservices, PHP', 'Backend & APIs:'),
  createBullet('Android Studio, Java, Kotlin, Android SDK, Material 3, MPAndroidChart, Firebase, TFLite, OpenCV', 'Mobile & Edge AI:'),
  createBullet('MongoDB Atlas, MySQL, NoSQL Document Schema Design, Database Optimization, CRUD Pipelines', 'Database Management:'),
  createBullet('Git, GitHub, VS Code, Postman, Linux/WSL, Agile Methodologies, Stripe API, Gemini API', 'Tools & Integrations:'),

  // ── FEATURED ENGINEERING PROJECTS (6 PROJECTS WITH LIVE DEMO, SOURCE, APK) ──
  createSectionHeader('Featured Engineering Projects'),
];

// Append all 6 projects with links and bullet points
projectsData.forEach((proj) => {
  // Title & Links Row
  const linkRuns = [];

  if (proj.liveUrl) {
    linkRuns.push(new TextRun({ text: '  [ Live Demo: ', font: 'Calibri', size: 18, color: subTextColor }));
    linkRuns.push(new TextRun({ text: proj.liveUrl, font: 'Calibri', size: 18, color: secondaryColor, underline: {} }));
    linkRuns.push(new TextRun({ text: ' ]', font: 'Calibri', size: 18, color: subTextColor }));
  }

  if (proj.apkUrl) {
    linkRuns.push(new TextRun({ text: '  [ Download APK: ', font: 'Calibri', size: 18, color: subTextColor }));
    linkRuns.push(new TextRun({ text: proj.apkUrl, font: 'Calibri', size: 18, color: secondaryColor, underline: {} }));
    linkRuns.push(new TextRun({ text: ' ]', font: 'Calibri', size: 18, color: subTextColor }));
  }

  if (proj.sourceUrl) {
    linkRuns.push(new TextRun({ text: '  [ Source Code: ', font: 'Calibri', size: 18, color: subTextColor }));
    linkRuns.push(new TextRun({ text: proj.sourceUrl, font: 'Calibri', size: 18, color: secondaryColor, underline: {} }));
    linkRuns.push(new TextRun({ text: ' ]', font: 'Calibri', size: 18, color: subTextColor }));
  }

  docChildren.push(
    new Paragraph({
      spacing: { before: 140, after: 40 },
      children: [
        new TextRun({
          text: proj.title,
          bold: true,
          font: 'Calibri',
          size: 21, // 10.5pt
          color: primaryColor,
        }),
        new TextRun({
          text: `  |  ${proj.category}`,
          font: 'Calibri',
          size: 19,
          color: subTextColor,
          italics: true,
        }),
      ],
    })
  );

  // Tech stack and links
  docChildren.push(
    new Paragraph({
      spacing: { before: 20, after: 60 },
      children: [
        new TextRun({
          text: 'Tech Stack: ',
          bold: true,
          font: 'Calibri',
          size: 18, // 9pt
          color: subTextColor,
        }),
        new TextRun({
          text: proj.tech,
          font: 'Calibri',
          size: 18,
          color: textColor,
        }),
        ...linkRuns,
      ],
    })
  );

  // Bullets
  proj.bullets.forEach((b) => {
    docChildren.push(createBullet(b));
  });
});

// ── EDUCATION SECTION ──
docChildren.push(createSectionHeader('Education'));

const educationData = [
  {
    degree: 'Bachelor of Technology (B.Tech) - Information Technology',
    institute: 'Kalyani Government Engineering College (KGEC / MAKAUT)',
    duration: '2023 - 2026',
    score: '6.55 CGPA (Up to 8th Semester)',
  },
  {
    degree: 'Diploma in Electronics & Telecommunication Engineering (ETCE)',
    institute: 'Purulia Polytechnic (W.B.S.C.T.E)',
    duration: '2020 - 2023',
    score: '79.9% Aggregate',
  },
  {
    degree: 'Higher Secondary Education (10+2 Science)',
    institute: 'Sodepur Colliery High School (W.B.C.H.S.E)',
    duration: '2018 - 2020',
    score: '84.4%',
  },
  {
    degree: 'Secondary School Education (10th Standard)',
    institute: 'Sodepur Colliery High School (W.B.B.S.E)',
    duration: '2018',
    score: '59.86%',
  },
];

educationData.forEach((edu) => {
  docChildren.push(
    new Paragraph({
      spacing: { before: 80, after: 20 },
      children: [
        new TextRun({
          text: edu.degree,
          bold: true,
          font: 'Calibri',
          size: 20,
          color: primaryColor,
        }),
        new TextRun({
          text: `  (${edu.duration})`,
          font: 'Calibri',
          size: 18,
          color: subTextColor,
        }),
      ],
    })
  );

  docChildren.push(
    new Paragraph({
      spacing: { before: 0, after: 60 },
      children: [
        new TextRun({
          text: `${edu.institute}  —  Score: ${edu.score}`,
          font: 'Calibri',
          size: 19,
          color: textColor,
        }),
      ],
    })
  );
});

// ── HONORS & CERTIFICATIONS ──
docChildren.push(createSectionHeader('Honors, Rankings & Certifications'));
docChildren.push(createBullet('WBJELET State Joint Entrance Examination: General Rank 170 | OBC Rank 26 (Top Tier State Placement).'));
docChildren.push(createBullet('Robo Fight Competition: 3rd Position Trophy representing Purulia Polytechnic in tactical robotics warfare.'));
docChildren.push(createBullet('Professional Web Frameworks & Systems Certification: Audited and certified in Full-Stack Web Development, CSS/Bootstrap, JavaScript, and PHP.'));
docChildren.push(createBullet('Domestic Data Entry Operator (DDEO): Certified in database operational maintenance and speed typing.'));

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
