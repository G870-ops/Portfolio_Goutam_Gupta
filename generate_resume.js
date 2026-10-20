import fs from 'fs';
import path from 'path';

// Generate clean standard vector PDF with ATS compliance
// Page: Standard Letter / A4 (595.28 x 841.89 points)
const WIDTH = 595;
const HEIGHT = 842;
const MARGIN_LEFT = 45;
const MARGIN_RIGHT = 45;
const CONTENT_WIDTH = WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

class SimplePDF {
  constructor() {
    this.objects = [];
    this.pages = [];
  }

  addObject(content) {
    this.objects.push(content);
    return this.objects.length; // 1-based index
  }

  build(stream) {
    let y = 800;
    const ops = [];

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

    const drawText = (text, x, yPos, font = '/F1', size = 10) => {
      const sanitized = text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
      ops.push(`BT`);
      ops.push(`${font} ${size} Tf`);
      ops.push(`${x} ${yPos} Td`);
      ops.push(`(${sanitized}) Tj`);
      ops.push(`ET`);
    };

    // Header: Name
    setColor(0.05, 0.1, 0.2); // Navy Dark
    drawText('GOUTAM GUPTA', MARGIN_LEFT, y, '/F2', 20);
    y -= 16;

    // Subtitle
    setColor(0.15, 0.45, 0.65); // Teal Accent
    drawText('Full-Stack MERN Architect & Android App Developer', MARGIN_LEFT, y, '/F2', 10.5);
    y -= 14;

    // Contact details (single line for ATS parsing)
    setColor(0.2, 0.2, 0.2);
    const contactLine = 'Kolkata / Purulia, West Bengal | +91 8343957187 | goutamgupta605@gmail.com | linkedin.com/in/goutam-gupta | github.com/G870-ops';
    drawText(contactLine, MARGIN_LEFT, y, '/F1', 8.5);
    y -= 8;

    // Divider Line
    setColor(0.15, 0.45, 0.65);
    drawLine(MARGIN_LEFT, y, WIDTH - MARGIN_RIGHT, y, 1.2);
    y -= 14;

    // Helper for Section Headers
    const addSection = (title) => {
      setColor(0.05, 0.25, 0.45);
      drawText(title.toUpperCase(), MARGIN_LEFT, y, '/F2', 11);
      y -= 4;
      setColor(0.75, 0.8, 0.85);
      drawLine(MARGIN_LEFT, y, WIDTH - MARGIN_RIGHT, y, 0.5);
      y -= 11;
    };

    // SECTION 1: PROFESSIONAL SUMMARY
    addSection('Professional Summary');
    setColor(0.2, 0.2, 0.2);
    const summaryLines = [
      'Innovative Full-Stack MERN Architect and Native Android Developer with proven expertise in building scalable, real-time web',
      'applications and high-performance edge AI mobile systems. Proficient in React.js, Node.js, Express, MongoDB, Java, and Kotlin.',
      'Demonstrated success architecting microservices, RESTful APIs, asynchronous pipelines, and secure cloud integrations with a',
      'strong commitment to modern software engineering best practices, optimized state management, and clean code principles.'
    ];
    summaryLines.forEach(line => {
      drawText(line, MARGIN_LEFT, y, '/F1', 8.5);
      y -= 11;
    });
    y -= 4;

    // SECTION 2: TECHNICAL SKILLS MATRIX
    addSection('Technical Skills');
    const skills = [
      ['Frontend Development', 'React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap, Vite, Responsive UI/UX'],
      ['Backend & APIs', 'Node.js, Express.js, RESTful APIs, JWT Authentication, Microservices Architecture, Postman, PHP'],
      ['Mobile & Edge AI', 'Android Studio, Java, Kotlin, TensorFlow Lite (TFLite), OpenCV, Firebase Authentication & Firestore'],
      ['Database Systems', 'MongoDB Atlas, MySQL, NoSQL Document Design, Relational Database Modeling, Schema Optimization'],
      ['Tools & Engineering', 'Git, GitHub, VS Code, Linux/WSL, Agile Development, Non-blocking I/O, Shunting-yard Algorithms']
    ];

    skills.forEach(([cat, items]) => {
      setColor(0.1, 0.1, 0.1);
      drawText(`•  ${cat}:`, MARGIN_LEFT + 4, y, '/F2', 8.5);
      setColor(0.25, 0.25, 0.25);
      drawText(items, MARGIN_LEFT + 125, y, '/F1', 8.5);
      y -= 11.5;
    });
    y -= 4;

    // SECTION 3: KEY PROJECTS & DEPLOYMENTS
    addSection('Featured Engineering Projects');

    const projects = [
      {
        title: 'Full Stack Food Delivery Platform (MERN)',
        tech: 'React.js, Node.js, Express, MongoDB Atlas, Stripe API, Tailwind CSS',
        bullets: [
          'Architected an end-to-end food ordering ecosystem with real-time order telemetry, secure Stripe payment gateway, and reactive UI.',
          'Engineered resilient REST API endpoints with JWT authentication, role-based admin controls, and MongoDB aggregation pipelines.'
        ]
      },
      {
        title: 'PBIS (Pig Breed Identification System) - Edge AI Mobile App',
        tech: 'Android Studio, Java, OpenCV, TensorFlow Lite (INT8 Quantized)',
        bullets: [
          'Engineered an offline computer vision mobile solution achieving ~45ms inference latency for real-time live livestock classification.',
          'Integrated INT8 quantized neural network weights reducing mobile RAM consumption to under 25MB with high classification accuracy.'
        ]
      },
      {
        title: 'FlatBookingApp (StudentStay Accommodation)',
        tech: 'Android Studio, Kotlin, Firebase Auth, Cloud Firestore, Role-Based Routing',
        bullets: [
          'Engineered dual-tenant rental accommodation application serving student tenants and property landlords with real-time sync.',
          'Structured real-time data persistence with Cloud Firestore security rules, live listing updates, and instant query resolution.'
        ]
      },
      {
        title: 'Sci-Fi Scientific Calculator Android App',
        tech: 'Android Studio, Java, Shunting-yard Algorithm, Custom BigDecimal Precision Engine',
        bullets: [
          'Designed high-precision mobile calculation engine resolving complex algebraic expressions, matrix operations, and stats.',
          'Optimized rendering pipeline for sustained 60 FPS UI performance with an ergonomic interstellar aesthetic (Released on GitHub).'
        ]
      }
    ];

    projects.forEach(p => {
      setColor(0.05, 0.1, 0.2);
      drawText(p.title, MARGIN_LEFT, y, '/F2', 9.5);
      setColor(0.4, 0.4, 0.4);
      drawText(`[ ${p.tech} ]`, MARGIN_LEFT + 240, y, '/F1', 7.5);
      y -= 11;

      setColor(0.22, 0.22, 0.22);
      p.bullets.forEach(b => {
        drawText(`•  ${b}`, MARGIN_LEFT + 8, y, '/F1', 8);
        y -= 10;
      });
      y -= 2;
    });
    y -= 2;

    // SECTION 4: EDUCATION & ACADEMIC CREDENTIALS
    addSection('Education');
    const education = [
      {
        degree: 'Bachelor of Technology (B.Tech) - Information Technology',
        inst: 'Kalyani Government Engineering College (KGEC) / MAKAUT',
        year: '2023 - 2026',
        score: '6.55 CGPA (Up to 8th Semester)'
      },
      {
        degree: 'Diploma in Electronics & Telecommunication Engineering (ETCE)',
        inst: 'Purulia Polytechnic (WBSCTE)',
        year: '2020 - 2023',
        score: 'Score: 79.9%'
      },
      {
        degree: 'Higher Secondary (10+2 Science)',
        inst: 'Sodepur Colliery High School (WBCHSE)',
        year: '2020',
        score: 'Score: 84.4%'
      }
    ];

    education.forEach(edu => {
      setColor(0.05, 0.1, 0.2);
      drawText(edu.degree, MARGIN_LEFT, y, '/F2', 8.5);
      setColor(0.25, 0.25, 0.25);
      drawText(`${edu.inst}  |  ${edu.year}  |  ${edu.score}`, MARGIN_LEFT + 4, y - 9.5, '/F1', 8);
      y -= 21;
    });
    y -= 1;

    // SECTION 5: HONORS, RANKINGS & CERTIFICATIONS
    addSection('Honors & Certifications');
    const honors = [
      'WBJELET Engineering State Entrance Exam: General Rank 170 | OBC Rank 26 (Top Percentile Placement)',
      'Robo Fight Competition: 3rd Position Podium Placement representing Purulia Polytechnic in tactical robotics combat',
      'Professional Full Stack Certification: Certified in Modern Web Frameworks, CSS/Bootstrap, PHP, and JavaScript'
    ];

    honors.forEach(h => {
      setColor(0.2, 0.2, 0.2);
      drawText(`•  ${h}`, MARGIN_LEFT + 4, y, '/F1', 8);
      y -= 10.5;
    });

    const streamContent = ops.join('\n');
    return streamContent;
  }
}

// Generate the complete PDF file buffer
const generator = new SimplePDF();
const pageContent = generator.build();

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

// Object 2: Pages
addObj('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj');

// Object 3: Page
addObj(`3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 ${WIDTH} ${HEIGHT}]
  /Contents 6 0 R
  /Resources <<
    /Font <<
      /F1 4 0 R
      /F2 5 0 R
    >>
  >>
>>
endobj`);

// Object 4: Font F1 (Helvetica)
addObj('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj');

// Object 5: Font F2 (Helvetica-Bold)
addObj('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj');

// Object 6: Stream Contents
const streamBuf = Buffer.from(pageContent);
addObj(`6 0 obj
<< /Length ${streamBuf.length} >>
stream
${pageContent}
endstream
endobj`);

// XRef table
const xrefOffset = offset;
let xrefStr = `xref\n0 7\n0000000000 65535 f \n`;
xref.forEach((o) => {
  xrefStr += String(o).padStart(10, '0') + ' 00000 n \n';
});
xrefStr += `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
pdfParts.push(Buffer.from(xrefStr));

const finalPdfBuffer = Buffer.concat(pdfParts);

// Write to frontend/public/Goutam_Gupta_Resume.pdf
const outPath = path.resolve('d:/Desktop/portfolio_goutam/frontend/public/Goutam_Gupta_Resume.pdf');
fs.writeFileSync(outPath, finalPdfBuffer);

// Also copy to root and public directories for safety
fs.writeFileSync(path.resolve('d:/Desktop/portfolio_goutam/frontend/public/resume.pdf'), finalPdfBuffer);
fs.writeFileSync(path.resolve('d:/Desktop/portfolio_goutam/Goutam_Gupta_Resume.pdf'), finalPdfBuffer);

console.log('Successfully generated ATS-compliant vector PDF at:', outPath, 'Size:', finalPdfBuffer.length, 'bytes');
