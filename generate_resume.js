import fs from 'fs';
import path from 'path';



const WIDTH = 595;
const HEIGHT = 842;
const MARGIN_LEFT = 38;
const MARGIN_RIGHT = 38;

class ResumePDF {
  build() {
    const pages = [];
    let ops = [];
    let y = 808;

    const setColor = (r, g, b) => {
      ops.push(`${r} ${g} ${b} rg`);
      ops.push(`${r} ${g} ${b} RG`);
    };

    const drawLine = (x1, y1, x2, y2, width = 0.75) => {
      ops.push(`${width} w`);
      ops.push(`${x1} ${y1} m`);
      ops.push(`${x2} ${y2} l`);
      ops.push(`S`);
    };

    const drawText = (text, x, yPos, font = '/F1', size = 9) => {
      const sanitized = text
        .replace(/\\/g, '\\\\')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)');
      ops.push(`BT`);
      ops.push(`${font} ${size} Tf`);
      ops.push(`${x} ${yPos} Td`);
      ops.push(`(${sanitized}) Tj`);
      ops.push(`ET`);
    };

    const drawCenteredText = (text, yPos, font = '/F1', size = 9) => {
      // Approximate character width
      const charWidth = size * (font === '/F2' ? 0.58 : 0.52);
      const strWidth = text.length * charWidth;
      const x = Math.max(MARGIN_LEFT, (WIDTH - strWidth) / 2);
      drawText(text, x, yPos, font, size);
    };

    const checkPageBreak = (needed = 35) => {
      if (y - needed < 35) {
        pages.push(ops.join('\n'));
        ops = [];
        y = 808;
      }
    };

    const addSectionHeader = (title) => {
      checkPageBreak(30);
      setColor(0.04, 0.15, 0.28);
      drawText(title.toUpperCase(), MARGIN_LEFT, y, '/F2', 10);
      y -= 3;
      setColor(0.12, 0.35, 0.55);
      drawLine(MARGIN_LEFT, y, WIDTH - MARGIN_RIGHT, y, 0.75);
      y -= 9.5;
    };

    // ════════════════════ PAGE 1 ════════════════════

    // Header
    setColor(0, 0, 0);
    drawCenteredText('GOUTAM GUPTA', y, '/F2', 18);
    y -= 13;

    setColor(0.08, 0.25, 0.45);
    drawCenteredText('Full-Stack MERN Architect & Android App Developer', y, '/F2', 9.5);
    y -= 12;

    setColor(0.2, 0.2, 0.2);
    drawCenteredText('Asansol, WB, India | +91 8343957187 | Gmail.com | linkedin.com | github.com', y, '/F1', 8);
    y -= 14;

    // ── PROFESSIONAL SUMMARY ──
    addSectionHeader('Professional Summary');
    setColor(0.15, 0.15, 0.15);
    const summary = [
      'Proactive and results-driven Full-Stack MERN Architect and Android Application Developer with a strong track record of',
      'engineering scalable web applications, low-latency microservices, and high-performance native Android solutions. Proficient',
      'across modern JavaScript ecosystems (React.js, Node.js, Express, MongoDB Atlas) and native mobile frameworks (Java, Kotlin,',
      'Android SDK). Experienced in building real-time multiplayer WebSocket engines, AI-powered systems (Gemini AI, TFLite), and',
      'secure enterprise authentication (JWT, Nodemailer). Committed to clean architectural patterns, robust API design, and intuitive',
      'user experiences.'
    ];
    summary.forEach(line => {
      drawText(line, MARGIN_LEFT, y, '/F1', 7.7);
      y -= 9.5;
    });
    y -= 3;

    // ── TECHNICAL SKILLS ──
    addSectionHeader('Technical Skills');
    const skills = [
      ['Frontend Engineering', 'React.js, Vite, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap, Responsive UI/UX Design'],
      ['Backend & APIs', 'Node.js, Express.js, RESTful APIs, JWT Authentication, Nodemailer, WebSocket.'],
      ['Mobile & Edge AI', 'Android Studio, Java, Kotlin, Android SDK, Material 3, MPAndroidChart, Firebase, TFLite, OpenCV'],
      ['Database Management', 'MongoDB Atlas,'],
      ['Tools & Integrations', 'Git, GitHub, VS Code, Postman, Stripe API, Gemini API']
    ];
    skills.forEach(([cat, val]) => {
      setColor(0.05, 0.05, 0.05);
      drawText(`•  ${cat}:`, MARGIN_LEFT + 3, y, '/F2', 7.8);
      setColor(0.2, 0.2, 0.2);
      drawText(val, MARGIN_LEFT + 115, y, '/F1', 7.8);
      y -= 10;
    });
    y -= 3;

    // ── FEATURED ENGINEERING PROJECTS ──
    addSectionHeader('Featured Engineering Projects');

    const project1 = {
      title: 'School Management System',
      category: 'Full Stack Web Platform',
      tech: 'React.js, Node.js, Express.js, MongoDB Atlas, Tailwind CSS, JWT, Nodemailer, Gemini AI',
      links: '[ Live Demo    Source Code ]',
      bullets: [
        'Architected enterprise-grade school management platform with role-based access control (Admin, Teachers, Students, Parents).',
        'Engineered secure JWT authentication, Bcrypt password hashing, and Nodemailer OTP email verification workflows.',
        'Integrated AI-powered fee notification & reminder engine utilizing Google Gemini API with automated student progress tracking modules.'
      ]
    };

    const project2 = {
      title: 'Neo Chess - Real-Time Multiplayer Engine',
      category: 'Mobile & WebSocket Engine',
      tech: 'Android Studio, Java, JavaScript, Node.js, Express, WebSocket, HTML5, CSS3',
      links: '[ Download APK    Source Code ]',
      bullets: [
        'Developed real-time multiplayer chess game with native Android wrapper and high-performance embedded web execution layer.',
        'Engineered Node.js WebSocket backend server achieving sub-30ms player matchmaking, live move synchronization, and turn validation.',
        'Released standalone Android APK distribution package with offline fallback modes and zero-lag board rendering.'
      ]
    };

    const project3 = {
      title: 'Cow Business - AI Dairy Farm Calculator',
      category: 'Android Fintech & Analytics App',
      tech: 'Java, Android SDK, Material 3, MPAndroidChart, PdfDocument, SharedPreferences, XML',
      links: '[ Download APK    Source Code ]',
      bullets: [
        'Created specialized native Android agricultural finance application for yield forecasting and dairy farm profitability analysis.',
        'Implemented reducing-balance loan EMI calculation algorithms and interactive visual cashflow graphs using MPAndroidChart.',
        'Engineered automated PDF export generator (PdfDocument) enabling farmers to save and share comprehensive business dossiers.'
      ]
    };

    const project4 = {
      title: 'Sci-Fi Scientific Calculator',
      category: 'Native Android Calculator Application',
      tech: 'Kotlin, Android SDK, XML Layouts, Material 3, Gradle, Git, BigDecimal Precision Engine',
      links: '[ Download APK    Source Code ]',
      bullets: [
        'Built advanced native Android calculator with cyberpunk interstellar neon UI theme, matrix solvers, and complex equations.',
        'Engineered custom Java/Kotlin BigDecimal mathematical precision core preventing floating-point inaccuracies during multi-step conversions.',
        'Implemented built-in physics/math formula cheatsheets and released optimized native APK on GitHub Releases.'
      ]
    };

    const renderProject = (p) => {
      checkPageBreak(45);
      setColor(0.04, 0.15, 0.28);
      drawText(p.title, MARGIN_LEFT, y, '/F2', 8.8);
      setColor(0.35, 0.35, 0.35);
      drawText(` | ${p.category}`, MARGIN_LEFT + (p.title.length * 5), y, '/F1', 7.5);
      y -= 9;

      setColor(0.3, 0.3, 0.3);
      drawText(`Tech Stack: `, MARGIN_LEFT, y, '/F2', 7.5);
      drawText(`${p.tech}  `, MARGIN_LEFT + 46, y, '/F1', 7.5);
      setColor(0.08, 0.35, 0.6);
      drawText(p.links, MARGIN_LEFT + 46 + (p.tech.length * 3.7), y, '/F1', 7.5);
      y -= 9;

      setColor(0.18, 0.18, 0.18);
      p.bullets.forEach(b => {
        checkPageBreak(11);
        drawText(`•  ${b}`, MARGIN_LEFT + 5, y, '/F1', 7.5);
        y -= 8.8;
      });
      y -= 2;
    };

    [project1, project2, project3, project4].forEach(renderProject);

    // End Page 1
    pages.push(ops.join('\n'));
    ops = [];
    y = 808;

    // ════════════════════ PAGE 2 ════════════════════

    const project5 = {
      title: 'Invitor (Event Booking) Website',
      category: 'Full Stack Event Management',
      tech: 'React.js, Vite, Tailwind CSS, RESTful APIs, Postman API Testing',
      links: '[ Live Demo    Source Code ]',
      bullets: [
        'Built full-stack Event Booking and Ticketing management platform featuring dynamic role-based dashboards.',
        'Designed responsive cyberpunk-tailored interface using Tailwind CSS and high-velocity Vite build pipeline.',
        'Verified and audited end-to-end REST API communication with structured Postman collections for seamless reliability.'
      ]
    };

    const project6 = {
      title: 'Full Stack Food Delivery Website',
      category: 'Full Stack MERN Platform',
      tech: 'React.js, Node.js, Express, MongoDB Atlas, Stripe Payment Gateway, Tailwind CSS',
      links: '[ Live Demo    Source Code ]',
      bullets: [
        'Developed end-to-end online food ordering application with live telemetry order status tracking and responsive user carts.',
        'Integrated Stripe payment gateway for encrypted online financial transactions with webhook-driven order fulfillment.',
        'Architected scalable backend REST APIs using Express.js and MongoDB aggregation queries for food catalog filtering.'
      ]
    };

    [project5, project6].forEach(renderProject);
    y -= 3;

    // ── EDUCATION ──
    addSectionHeader('Education');

    const eduEntries = [
      {
        deg: 'Bachelor of Technology (B.Tech) - Information Technology',
        dur: '(2023 - 2026)',
        sub: 'Kalyani Government Engineering College (KGEC / MAKAUT) — Score: 6.61 CGPA'
      },
      {
        deg: 'Diploma in Electronics & Telecommunication Engineering (ETCE)',
        dur: '(2020 - 2023)',
        sub: 'Purulia Polytechnic (W.B.S.C.T.E) — Score: 79.9% Aggregate'
      },
      {
        deg: 'Higher Secondary Education (10+2)',
        dur: '(2018 - 2020)',
        sub: 'Sodepur Colliery High School (W.B.C.H.S.E) — Score: 84.4%'
      },
      {
        deg: 'Secondary School Education (10th Standard)',
        dur: '(2018)',
        sub: 'Sodepur Colliery High School (W.B.B.S.E) — Score: 59.86%'
      }
    ];

    eduEntries.forEach(e => {
      setColor(0.08, 0.32, 0.58);
      drawText(e.deg, MARGIN_LEFT, y, '/F2', 8);
      setColor(0.35, 0.35, 0.35);
      drawText(` ${e.dur}`, MARGIN_LEFT + (e.deg.length * 4.6), y, '/F1', 7.5);
      y -= 8.5;
      setColor(0.2, 0.2, 0.2);
      drawText(e.sub, MARGIN_LEFT, y, '/F1', 7.5);
      y -= 9.5;
    });
    y -= 3;

    // ── HONORS, RANKINGS & CERTIFICATIONS ──
    addSectionHeader('Honors, Rankings & Certifications');
    setColor(0.18, 0.18, 0.18);
    const bulletsHonors = [
      'WBJELET State Joint Entrance Examination: General Rank 170 | OBC Rank 26 (Top Tier State Placement).',
      'Robo Fight Competition: 3rd Position Trophy representing Purulia Polytechnic in tactical robotics warfare.',
      'Open-Source Community: Regularly mentor junior peers in Android SDK configuration, React frontend patterns, and REST API design.',
      'Domestic Data Entry Operator (DDEO): Certified in database operational maintenance and speed typing.'
    ];

    bulletsHonors.forEach(b => {
      drawText(`•  ${b}`, MARGIN_LEFT + 4, y, '/F1', 7.6);
      y -= 8.8;
    });
    y -= 3;

    // Certifications with dates
    const certs = [
      {
        title: '•  Spring Framework for Java Developers: Practical Guide',
        date: 'March 17, 2025',
        meta: 'Udemy | Credential ID: UC-a44fa5d7-a5b0-4895-8512-126670934dbc | Duration: 20.5 Hours',
        desc: 'Mastered Spring Core, Dependency Injection (DI), Spring Boot, Spring Data JPA, and RESTful microservices architecture.'
      },
      {
        title: '•  Power BI From Scratch',
        date: 'December 21, 2025',
        meta: 'Udemy | Credential ID: UC-3308c41b-93cb-485a-9ee3-610090f8ef62 | Duration: 40 Hours',
        desc: 'Mastered enterprise data modeling, DAX query optimization, Power Query ETL pipelines, and interactive analytics reporting dashboards.'
      },
      {
        title: '•  CSS, Bootstrap, JavaScript And PHP Stack Complete Course',
        date: 'May 8, 2024',
        meta: 'Udemy | Credential ID: UC-895a323e-a202-41d4-a07e-08610799bbc2 | Duration: 8 Hours',
        desc: 'Gained expertise in responsive web design, DOM manipulation, asynchronous JavaScript operations, and PHP server scripting.'
      },
      {
        title: '•  Learn the Python Programming Language',
        date: 'March 16, 2024',
        meta: 'Udemy | Credential ID: UC-90269a29-9c64-4fc6-8759-66586b6dc73e | Duration: 2.5 Hours',
        desc: 'Core proficiency in Python syntax, standard data structures, object-oriented concepts, and algorithmic problem-solving.'
      },
      {
        title: '•  Common Indicators for Cryptocurrencies Trading with Python',
        date: 'March 15, 2024',
        meta: 'Udemy | Credential ID: UC-604e0fb5-86a3-400f-bbe4-4d8991b7fb4d | Duration: 2 Hours',
        desc: 'Implemented technical financial indicators, quantitative market data processing, and automated algorithmic calculations using Python.'
      }
    ];

    certs.forEach(c => {
      setColor(0.1, 0.1, 0.1);
      drawText(c.title, MARGIN_LEFT + 4, y, '/F2', 7.8);
      setColor(0.3, 0.3, 0.3);
      drawText(c.date, WIDTH - MARGIN_RIGHT - 65, y, '/F2', 7.5);
      y -= 8.5;
      setColor(0.4, 0.4, 0.4);
      drawText(c.meta, MARGIN_LEFT + 12, y, '/F1', 7);
      y -= 8.2;
      setColor(0.2, 0.2, 0.2);
      drawText(c.desc, MARGIN_LEFT + 12, y, '/F1', 7.2);
      y -= 9.5;
    });

    pages.push(ops.join('\n'));
    return pages;
  }
}

const generator = new ResumePDF();
const pages = generator.build();

const pdfParts = [];
let offset = 0;
const xref = [];

const addObj = (str) => {
  xref.push(offset);
  const data = Buffer.from(str + '\n');
  pdfParts.push(data);
  offset += data.length;
};

// PDF Header
const header = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
pdfParts.push(Buffer.from(header));
offset += Buffer.byteLength(header);

// Catalog
addObj('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');

// Pages
const numPages = pages.length;
const pageObjIds = [];
let nextId = 3;

for (let i = 0; i < numPages; i++) {
  pageObjIds.push(nextId++);
}
const fontF1Id = nextId++;
const fontF2Id = nextId++;
const contentObjIds = [];
for (let i = 0; i < numPages; i++) {
  contentObjIds.push(nextId++);
}

addObj(`2 0 obj\n<< /Type /Pages /Kids [${pageObjIds.map(id => `${id} 0 R`).join(' ')}] /Count ${numPages} >>\nendobj`);

for (let i = 0; i < numPages; i++) {
  addObj(`${pageObjIds[i]} 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 ${WIDTH} ${HEIGHT}]
  /Contents ${contentObjIds[i]} 0 R
  /Resources <<
    /Font <<
      /F1 ${fontF1Id} 0 R
      /F2 ${fontF2Id} 0 R
    >>
  >>
>>
endobj`);
}

addObj(`${fontF1Id} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj`);
addObj(`${fontF2Id} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj`);

for (let i = 0; i < numPages; i++) {
  const streamBuf = Buffer.from(pages[i]);
  addObj(`${contentObjIds[i]} 0 obj
<< /Length ${streamBuf.length} >>
stream
${pages[i]}
endstream
endobj`);
}

const xrefOffset = offset;
let xrefStr = `xref\n0 ${nextId}\n0000000000 65535 f \n`;
xref.forEach((o) => {
  xrefStr += String(o).padStart(10, '0') + ' 00000 n \n';
});
xrefStr += `trailer\n<< /Size ${nextId} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
pdfParts.push(Buffer.from(xrefStr));

const finalPdfBuffer = Buffer.concat(pdfParts);

const targets = [
  'd:/Desktop/portfolio_goutam/frontend/public/Goutam_Gupta_Resume.pdf',
  'd:/Desktop/portfolio_goutam/frontend/public/resume.pdf',
  'd:/Desktop/portfolio_goutam/frontend/Goutam_Gupta_Resume.pdf',
  'd:/Desktop/portfolio_goutam/Goutam_Gupta_Resume.pdf',
];

targets.forEach((t) => {
  fs.writeFileSync(path.resolve(t), finalPdfBuffer);
  console.log('Successfully written PDF to:', t, 'Size:', finalPdfBuffer.length, 'bytes');
});
