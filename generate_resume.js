import fs from 'fs';
import path from 'path';

// Generate clean standard vector PDF with ATS compliance
// Page: Standard Letter / A4 (595.28 x 841.89 points)
const WIDTH = 595;
const HEIGHT = 842;
const MARGIN_LEFT = 40;
const MARGIN_RIGHT = 40;
const CONTENT_WIDTH = WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

class SimplePDF {
  constructor() {
    this.pagesContent = [];
  }

  build() {
    const pages = [];
    let ops = [];
    let y = 805;

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

    const drawText = (text, x, yPos, font = '/F1', size = 9.5) => {
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

    const checkPageBreak = (needed = 40) => {
      if (y - needed < 40) {
        pages.push(ops.join('\n'));
        ops = [];
        y = 805;
      }
    };

    // Helper for Section Headers
    const addSection = (title) => {
      checkPageBreak(35);
      setColor(0.04, 0.15, 0.25);
      drawText(title.toUpperCase(), MARGIN_LEFT, y, '/F2', 10.5);
      y -= 3;
      setColor(0.12, 0.38, 0.57);
      drawLine(MARGIN_LEFT, y, WIDTH - MARGIN_RIGHT, y, 0.8);
      y -= 10;
    };

    // ── HEADER: Name ──
    setColor(0.04, 0.15, 0.25);
    drawText('GOUTAM GUPTA', MARGIN_LEFT, y, '/F2', 18);
    y -= 14;

    // Subtitle
    setColor(0.12, 0.38, 0.57);
    drawText('Full-Stack MERN Architect & Android App Developer', MARGIN_LEFT, y, '/F2', 10);
    y -= 13;

    // Contact details
    setColor(0.25, 0.25, 0.25);
    const contactLine = 'Kolkata, WB | +91 8343957187 | goutamgupta605@gmail.com | linkedin.com/in/goutam-gupta | github.com/G870-ops';
    drawText(contactLine, MARGIN_LEFT, y, '/F1', 8);
    y -= 7;

    // Top Divider Line
    setColor(0.12, 0.38, 0.57);
    drawLine(MARGIN_LEFT, y, WIDTH - MARGIN_RIGHT, y, 1.2);
    y -= 12;

    // ── SECTION 1: PROFESSIONAL SUMMARY ──
    addSection('Professional Summary');
    setColor(0.2, 0.2, 0.2);
    const summaryLines = [
      'Innovative Full-Stack MERN Architect and Native Android Developer with proven expertise in building scalable, real-time web applications,',
      'low-latency WebSocket engines, and edge AI mobile systems. Proficient in React.js, Node.js, Express, MongoDB, Java, Kotlin, and Gemini AI.',
      'Demonstrated success architecting microservices, RESTful APIs, role-based security architectures, and automated financial/educational pipelines',
      'with a strong commitment to clean code principles, high-performance rendering, and seamless cloud deployments.'
    ];
    summaryLines.forEach(line => {
      drawText(line, MARGIN_LEFT, y, '/F1', 8);
      y -= 10;
    });
    y -= 2;

    // ── SECTION 2: TECHNICAL SKILLS ──
    addSection('Technical Skills Matrix');
    const skills = [
      ['Frontend Engineering', 'React.js, Vite, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap, Responsive UI/UX'],
      ['Backend & APIs', 'Node.js, Express.js, RESTful APIs, JWT Authentication, Nodemailer, WebSocket, Microservices, PHP'],
      ['Mobile & Edge AI', 'Android Studio, Java, Kotlin, Android SDK, Material 3, MPAndroidChart, Firebase, TFLite, OpenCV'],
      ['Database Systems', 'MongoDB Atlas, MySQL, NoSQL Document Design, Relational Database Modeling, Schema Optimization'],
      ['Tools & Integrations', 'Git, GitHub, VS Code, Postman, Linux/WSL, Stripe API, Google Gemini AI, Agile Development']
    ];

    skills.forEach(([cat, items]) => {
      setColor(0.08, 0.08, 0.08);
      drawText(`•  ${cat}:`, MARGIN_LEFT + 3, y, '/F2', 8);
      setColor(0.22, 0.22, 0.22);
      drawText(items, MARGIN_LEFT + 120, y, '/F1', 8);
      y -= 10.5;
    });
    y -= 2;

    // ── SECTION 3: FEATURED ENGINEERING PROJECTS (6 PROJECTS FROM SCREENSHOT) ──
    addSection('Featured Engineering Projects');

    const projects = [
      {
        title: 'School Management System',
        category: 'Full Stack Web Platform',
        tech: 'React.js, Node.js, Express.js, MongoDB Atlas, Tailwind CSS, JWT, Nodemailer, Gemini AI',
        live: 'https://school-management-system-lyart-zeta.vercel.app/login',
        source: 'https://github.com/G870-ops/School-Management-System',
        apk: '',
        bullets: [
          'Architected an enterprise School Management System with role-based access control for Admins, Teachers, Students, and Parents.',
          'Engineered robust JWT authentication, Bcrypt password encryption, and Nodemailer OTP verification for secure login sessions.',
          'Integrated AI-powered automated notification and fee reminders utilizing the Google Gemini API with real-time academic records.'
        ]
      },
      {
        title: 'Neo Chess - Real-Time Multiplayer Engine',
        category: 'Mobile & WebSocket Engine',
        tech: 'Android, Java, JavaScript, Node.js, Express, WebSocket, HTML5, CSS3',
        live: '',
        source: 'https://github.com/G870-ops/NEO_CHESS_GAME_APP',
        apk: 'https://github.com/G870-ops/NEO_CHESS_GAME_APP/releases/download/v1.0.0/chess.apk',
        bullets: [
          'Engineered a real-time multiplayer chess platform combining a native Android wrapper with a low-latency web game engine.',
          'Built Node.js WebSocket backend server handling concurrent player matchmaking, move synchronizations, and turn rule validations.',
          'Distributed standalone Android APK package with zero-latency board responsiveness and cross-device match sessions.'
        ]
      },
      {
        title: 'Cow Business - AI Dairy Farm Calculator',
        category: 'Android Fintech & Analytics App',
        tech: 'Java, Android SDK, Material 3, MPAndroidChart, PdfDocument, SharedPreferences, XML',
        live: '',
        source: 'https://github.com/G870-ops/Cow_Business_App',
        apk: 'https://github.com/G870-ops/Cow_Business_App/releases/download/v1.0.0/cow_business.apk',
        bullets: [
          'Developed native Android agribusiness application to calculate, forecast, and optimize dairy farm commercial profitability.',
          'Implemented reducing-balance loan EMI calculation algorithms and interactive visual cashflow charts using MPAndroidChart.',
          'Integrated an automated PDF document generator (PdfDocument) for exporting and sharing comprehensive business yield reports.'
        ]
      },
      {
        title: 'Sci-Fi Scientific Calculator',
        category: 'Native Android Application',
        tech: 'Kotlin, Android SDK, XML Layouts, Material 3, Gradle, Git, BigDecimal Precision Engine',
        live: '',
        source: 'https://github.com/G870-ops/Scientifc_calculator_project',
        apk: 'https://github.com/G870-ops/Scientifc_calculator_project/releases/download/v1.0.0/Scie.Cal.apk',
        bullets: [
          'Engineered advanced Android scientific calculator featuring an interstellar cyberpunk UI, matrix solvers, and complex equations.',
          'Programmed custom Java/Kotlin BigDecimal mathematical precision core preventing floating-point inaccuracies in conversions.',
          'Packaged and distributed production-ready Android APK with built-in physics constants and mathematical reference tables.'
        ]
      },
      {
        title: 'Invitor (Event Booking) Website',
        category: 'Full Stack Event Management',
        tech: 'React.js, Vite, Tailwind CSS, RESTful APIs, Postman API Testing',
        live: 'https://event-booking-web-app-seven.vercel.app/',
        source: 'https://github.com/G870-ops/Event_Booking_WebApp',
        apk: '',
        bullets: [
          'Developed a modern Event Booking management web platform featuring dynamic role-based administrative and client dashboards.',
          'Constructed a high-velocity responsive interface with Tailwind CSS and Vite for optimized performance across devices.',
          'Conducted automated API testing and validation with Postman collections to ensure zero-regression backend communications.'
        ]
      },
      {
        title: 'Full Stack Food Delivery Website',
        category: 'Full Stack MERN Platform',
        tech: 'React.js, Node.js, Express, MongoDB Atlas, Stripe API, Tailwind CSS',
        live: 'https://food-dev-frontend.vercel.app/',
        source: 'https://github.com/G870-ops/FOOD_DEV_FRONTEND',
        apk: '',
        bullets: [
          'Engineered end-to-end food ordering platform featuring live order status telemetry and reactive cart state management.',
          'Integrated Stripe payment gateway for seamless, encrypted credit/debit transactions with automated webhook verification.',
          'Designed scalable backend REST microservices backed by MongoDB Atlas for real-time menu queries and user order histories.'
        ]
      }
    ];

    projects.forEach(p => {
      checkPageBreak(50);
      setColor(0.04, 0.15, 0.25);
      drawText(p.title, MARGIN_LEFT, y, '/F2', 9.5);
      setColor(0.4, 0.4, 0.4);
      drawText(`  |  ${p.category}`, MARGIN_LEFT + 200, y, '/F1', 8);
      y -= 10;

      // Links row
      const links = [];
      if (p.live) links.push(`Live Demo: ${p.live}`);
      if (p.apk) links.push(`Install APK: ${p.apk}`);
      if (p.source) links.push(`Source: ${p.source}`);

      setColor(0.12, 0.38, 0.57);
      drawText(`[ ${links.join('  |  ')} ]`, MARGIN_LEFT + 4, y, '/F1', 7.5);
      y -= 10;

      setColor(0.2, 0.2, 0.2);
      p.bullets.forEach(b => {
        checkPageBreak(12);
        drawText(`•  ${b}`, MARGIN_LEFT + 6, y, '/F1', 7.8);
        y -= 9.5;
      });
      y -= 2;
    });

    // ── SECTION 4: EDUCATION ──
    addSection('Education');
    const education = [
      {
        degree: 'Bachelor of Technology (B.Tech) in Information Technology',
        inst: 'Kalyani Government Engineering College (KGEC / MAKAUT)',
        year: '2023 - 2026',
        score: '6.55 CGPA (Up to 8th Semester)'
      },
      {
        degree: 'Diploma in Electronics & Telecommunication Engineering (ETCE)',
        inst: 'Purulia Polytechnic (W.B.S.C.T.E)',
        year: '2020 - 2023',
        score: 'Score: 79.9%'
      },
      {
        degree: 'Higher Secondary (10+2 Science)',
        inst: 'Sodepur Colliery High School (W.B.C.H.S.E)',
        year: '2018 - 2020',
        score: 'Score: 84.4%'
      },
      {
        degree: 'Secondary School Education (10th Standard)',
        inst: 'Sodepur Colliery High School (W.B.B.S.E)',
        year: '2018',
        score: 'Score: 59.86%'
      }
    ];

    education.forEach(edu => {
      checkPageBreak(20);
      setColor(0.04, 0.15, 0.25);
      drawText(`${edu.degree}  (${edu.year})`, MARGIN_LEFT, y, '/F2', 8.5);
      y -= 9.5;
      setColor(0.25, 0.25, 0.25);
      drawText(`${edu.inst}  —  ${edu.score}`, MARGIN_LEFT + 6, y, '/F1', 8);
      y -= 11;
    });

    // ── SECTION 5: HONORS & CERTIFICATIONS ──
    addSection('Honors & Certifications');
    const honors = [
      'WBJELET Engineering State Joint Entrance Exam: General Rank 170 | OBC Rank 26 (Top Tier State Placement)',
      'Robo Fight Competition: Secured 3rd Position representing Purulia Polytechnic in tactical robotics combat matchup',
      'Professional Full Stack Systems Certification: Certified in Modern Web Frameworks, CSS/Bootstrap, JavaScript, and PHP',
      'Domestic Data Entry Operator (DDEO): Certified in database operational maintenance and speed typing'
    ];

    honors.forEach(h => {
      checkPageBreak(12);
      setColor(0.2, 0.2, 0.2);
      drawText(`•  ${h}`, MARGIN_LEFT + 4, y, '/F1', 8);
      y -= 10;
    });

    pages.push(ops.join('\n'));
    return pages;
  }
}

// Generate the multi-page PDF with 6 projects
const generator = new SimplePDF();
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

// Object 1: Catalog
addObj('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');

// Page objects ids
// Pages obj is 2. Font F1 is 4, F2 is 5.
// Let's create page objs:
// For 2 pages: page 1 is obj 3, content is obj 6. page 2 is obj 7, content is obj 8.
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

// Object 2: Pages
addObj(`2 0 obj\n<< /Type /Pages /Kids [${pageObjIds.map(id => `${id} 0 R`).join(' ')}] /Count ${numPages} >>\nendobj`);

// Page objects
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

// Fonts
addObj(`${fontF1Id} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj`);
addObj(`${fontF2Id} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj`);

// Streams
for (let i = 0; i < numPages; i++) {
  const streamBuf = Buffer.from(pages[i]);
  addObj(`${contentObjIds[i]} 0 obj
<< /Length ${streamBuf.length} >>
stream
${pages[i]}
endstream
endobj`);
}

// XRef table
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
