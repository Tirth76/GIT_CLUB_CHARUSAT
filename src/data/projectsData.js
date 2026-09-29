export const DOMAINS = [
  "All Projects",
  "Web Development",
  "AI / ML & Data Science",
  "Mobile App Dev",
  "IoT & Hardware",
  "DevOps & Security",
  "Automation & Utilities"
];

export const TECH_TAGS = [
  "React", "Node.js", "Python", "PyTorch", "Flutter", 
  "TailwindCSS", "FastAPI", "Firebase", "MongoDB", "ESP32",
  "TypeScript", "Next.js", "Docker", "PostgreSQL", "OpenCV"
];

export const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    title: "ExamSync — CHARUSAT Seating & Hall Ticket Portal",
    tagline: "Automated seating allocation & QR hall ticket system for CHARUSAT end-sem exams",
    domain: "Web Development",
    featured: true,
    status: "Active",
    upvotes: 142,
    starred: false,
    dateAdded: "2026-09-15",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Eliminates exam hall confusion for 10,000+ students across CSPIT, DEPSTAR & CMPICA with real-time seating maps and instant SMS hall tickets.",
    problem: "Managing 10,000+ student exam seating across 3 major institutes (CSPIT, DEPSTAR, CMPICA) led to manual paper sheet errors, crowded notice boards, and confused first-year students on exam mornings.",
    solution: "ExamSync auto-allocates seating based on roll numbers to prevent cheating, generates instant downloadable QR hall tickets, and provides floor-by-floor interactive navigation maps.",
    techStack: ["React", "Node.js", "MongoDB", "TailwindCSS", "PDFKit", "Express"],
    architecture: "Microservices architecture with Redis caching layer to handle 15,000+ concurrent requests on exam morning releases. Includes automated PDF generation engine.",
    snippet: `// Seat Allocation Engine Core
function calculateSeat(studentRoll, blockCapacity, antiCheatingGap = 2) {
  const departmentHash = hashDept(studentRoll.substring(0, 4));
  const seatIndex = (studentRoll.numericId * antiCheatingGap + departmentHash) % blockCapacity;
  return {
    building: getBuildingCode(studentRoll),
    floor: Math.floor(seatIndex / 30) + 1,
    roomNo: 101 + Math.floor(seatIndex / 25),
    seatNo: (seatIndex % 25) + 1
  };
}`,
    team: [
      { name: "Rohan Patel", role: "Lead Fullstack Dev", year: "3rd Year CSE", institute: "CSPIT", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
      { name: "Ananya Sharma", role: "UI/UX Designer", year: "3rd Year IT", institute: "DEPSTAR", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
      { name: "Jayesh Trivedi", role: "Backend Engineer", year: "4th Year CE", institute: "CSPIT", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" }
    ],
    github: "https://github.com/gitclub-charusat/examsync-charusat",
    demo: "https://examsync-charusat.vercel.app",
    interactiveDemoType: "exam-seating",
    metrics: { views: "4.2k", downloads: "1.8k", score: "9.8/10" }
  },
  {
    id: "proj-2",
    title: "SmartEval AI — Answer Script Evaluator",
    tagline: "Vision Transformer powered automated handwritten answer grading & detailed feedback",
    domain: "AI / ML & Data Science",
    featured: true,
    status: "Completed",
    upvotes: 189,
    starred: true,
    dateAdded: "2026-09-18",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Digitizes handwritten mid-term exam sheets, evaluates technical accuracy against model rubrics using LLMs, and flags scoring anomalies for professors.",
    problem: "Faculty spend over 120+ hours per semester manually grading thousands of handwritten answer books, leading to fatigue, inconsistent evaluation, and delayed results.",
    solution: "SmartEval AI scans answer sheets, performs handwriting OCR, matches key concept graphs against answer keys, and provides a preliminary score breakdown with feedback for professor approval.",
    techStack: ["Python", "PyTorch", "FastAPI", "OpenCV", "React", "TailwindCSS"],
    architecture: "Hybrid OCR pipeline combining TrOCR and fine-tuned LLaMA-3 vision model to evaluate handwriting legible down to 85% accuracy. Secure AES-256 encrypted storage for student scripts.",
    snippet: `@app.post("/api/v1/evaluate-answer")
async def evaluate_script(script_image: UploadFile, answer_key: str):
    image_bytes = await script_image.read()
    extracted_text = trocr_pipeline.extract_text(image_bytes)
    grading_result = llm_evaluator.grade(
        student_text=extracted_text,
        rubric=answer_key,
        max_marks=10
    )
    return {"score": grading_result.score, "feedback": grading_result.feedback}`,
    team: [
      { name: "Devansh Shah", role: "AI Research Lead", year: "4th Year AI/DS", institute: "DEPSTAR", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
      { name: "Kavya Mehta", role: "MLOps Engineer", year: "3rd Year CSE", institute: "CSPIT", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80" },
      { name: "Parth Solanki", role: "Frontend Dev", year: "3rd Year IT", institute: "CMPICA", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80" }
    ],
    github: "https://github.com/gitclub-charusat/smarteval-ai",
    demo: "https://smarteval.charusat.ac.in",
    interactiveDemoType: "ai-evaluator",
    metrics: { views: "6.8k", accuracy: "94.2%", speed: "3.2s/page" }
  },
  {
    id: "proj-3",
    title: "BitePass — Campus Canteen Queue & Pre-order",
    tagline: "Pre-order meals from class with live queue estimation & instant UPI pickup tokens",
    domain: "Mobile App Dev",
    featured: true,
    status: "Active",
    upvotes: 167,
    starred: false,
    dateAdded: "2026-09-10",
    thumbnail: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Reduces CMPICA & CSPIT canteen wait times from 30+ minutes to under 3 minutes with smart order batching and live prep notifications.",
    problem: "During the 1:00 PM lunch break, 2,000+ students crowd campus canteens resulting in long wait times, cold food, and missed afternoon lab sessions.",
    solution: "Students order lunch from their lecture hall via BitePass, pay via UPI, get a live token countdown, and simply pick up hot food when notified.",
    techStack: ["Flutter", "Firebase", "Node.js", "TailwindCSS", "WebSockets"],
    architecture: "Real-time WebSocket connection syncs canteen kitchen display system (KDS) with student mobile apps. Queue prediction model estimates prep time based on item count.",
    snippet: `// Realtime Kitchen Queue Sync
class QueueService {
  static Stream<KitchenOrder> watchOrder(String orderId) {
    return FirebaseFirestore.instance
      .collection('orders')
      .doc(orderId)
      .snapshots()
      .map((doc) => KitchenOrder.fromMap(doc.data()!));
  }
}`,
    team: [
      { name: "Siddharth Joshi", role: "Flutter Lead", year: "3rd Year IT", institute: "CSPIT", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" },
      { name: "Sneha Prajapati", role: "Backend Architect", year: "3rd Year CE", institute: "DEPSTAR", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" }
    ],
    github: "https://github.com/gitclub-charusat/bitepass-app",
    demo: "https://bitepass.charusat.app",
    interactiveDemoType: "canteen-order",
    metrics: { views: "5.1k", ordersCompleted: "14.2k", avgWaitTime: "2.4 mins" }
  },
  {
    id: "proj-4",
    title: "PrepPulse AI — Campus Placement Mock Interviewer",
    tagline: "Voice & code AI interviewer customized for TCS, Crest Data, Sophos & L&T drives",
    domain: "AI / ML & Data Science",
    featured: true,
    status: "Active",
    upvotes: 215,
    starred: true,
    dateAdded: "2026-09-22",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Simulates realistic technical & HR interview rounds with real-time feedback on DSA logic, confidence score, and voice response tone.",
    problem: "CHARUSAT engineering seniors lack affordable, realistic mock interview practice tailored to specific company patterns visiting campus.",
    solution: "PrepPulse leverages LLMs and speech synthesis to conduct live mock interviews, analyze live coding solutions in 10+ languages, and generate detailed scorecards.",
    techStack: ["Next.js", "Python", "TailwindCSS", "PostgreSQL", "Docker"],
    architecture: "Web Speech API integration with OpenAI GPT-4o for natural dialogue. Code execution sandbox runner using Docker containers for safety.",
    snippet: `// Interview Assessment Engine
export async function analyzeCodeSubmission(code: string, language: string, problemId: string) {
  const result = await dockerSandbox.run({ code, language, timeout: 5000 });
  const feedback = await aiModel.generateAssessment({
    studentCode: code,
    stdout: result.stdout,
    expectedComplexity: 'O(N log N)'
  });
  return feedback;
}`,
    team: [
      { name: "Yashvi Patel", role: "Fullstack Lead", year: "4th Year CE", institute: "CSPIT", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
      { name: "Aarav Zala", role: "NLP Specialist", year: "4th Year AI/DS", institute: "DEPSTAR", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" }
    ],
    github: "https://github.com/gitclub-charusat/preppulse-ai",
    demo: "https://preppulse.vercel.app",
    interactiveDemoType: "placement-prep",
    metrics: { views: "8.9k", interviewsTaken: "3.4k", placementSuccess: "88%" }
  },
  {
    id: "proj-5",
    title: "EcoLab Sentinel — IoT Smart Lab Energy Monitor",
    tagline: "ESP32 & MQTT wireless sensor network monitoring power & environmental safety",
    domain: "IoT & Hardware",
    featured: false,
    status: "In Development",
    upvotes: 98,
    starred: false,
    dateAdded: "2026-09-05",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Prevents overnight power waste across CHARUSAT hardware labs by detecting idle equipment and sending auto-shutdown signals via Telegram.",
    problem: "High-voltage oscilloscopes, 3D printers, and central lab air conditioning units are frequently left turned on overnight, wasting university power.",
    solution: "Non-invasive CT current sensors connected to ESP32 microcontrollers stream power draw telemetry to an InfluxDB dashboard and auto-trigger smart relays.",
    techStack: ["ESP32", "Python", "MQTT", "Grafana", "React"],
    architecture: "Lightweight MQTT pub-sub architecture with InfluxDB time-series database. Grafana dashboards visualize real-time kW consumption.",
    snippet: `// ESP32 Telemetry Loop
void loop() {
  double current = emon1.calcIrms(1480);
  if (current < IDLE_THRESHOLD && isAfterLabHours()) {
    triggerTelegramAlert("Lab 304 - Oscilloscope Idle detected!");
    digitalWrite(RELAY_PIN, LOW); // Auto shutdown
  }
  mqttClient.publish("charusat/lab304/power", String(current).c_str());
  delay(5000);
}`,
    team: [
      { name: "Manan Vyas", role: "Hardware Specialist", year: "3rd Year EC", institute: "CSPIT", avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=200&q=80" },
      { name: "Dhruv Parmar", role: "IoT Cloud Dev", year: "3rd Year CSE", institute: "CSPIT", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80" }
    ],
    github: "https://github.com/gitclub-charusat/ecolab-sentinel",
    demo: "https://ecolab.charusat.ac.in",
    interactiveDemoType: null,
    metrics: { views: "2.4k", powerSaved: "340 kWh/mo", sensorsLive: "24" }
  },
  {
    id: "proj-6",
    title: "Git Club CLI — Developer Setup Toolkit",
    tagline: "Command-line tool for Git Club members to scaffold hackathons & verify submissions",
    domain: "DevOps & Security",
    featured: false,
    status: "Active",
    upvotes: 84,
    starred: false,
    dateAdded: "2026-08-28",
    thumbnail: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Single command setup `npx gitclub-cli init` configures production-ready React/Node templates with pre-configured linters and Git hooks.",
    problem: "Hackathon participants spend the first 2 hours of every event dealing with boilerplate setup, lint errors, and deployment configurations.",
    solution: "GitClub CLI automates project creation, generates README standards, runs security audits, and packages final submissions for club events.",
    techStack: ["TypeScript", "Node.js", "Docker"],
    architecture: "Node.js CLI executable published to NPM with interactive terminal prompt using Inquirer.js and GitHub API integration.",
    snippet: `#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';

const program = new Command();
program
  .name('gitclub')
  .description('Official Git Club CHARUSAT Developer CLI')
  .version('2.4.0');

program.command('init')
  .description('Scaffold a new Git Club event template')
  .action(async () => {
    const answers = await inquirer.prompt([
      { type: 'list', name: 'stack', message: 'Select project stack:', choices: ['React + Vite + Tailwind', 'Next.js 15', 'Python FastAPI'] }
    ]);
    await cloneTemplate(answers.stack);
  });`,
    team: [
      { name: "Tirth Patel", role: "DevOps Lead", year: "3rd Year CSE", institute: "CSPIT", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80" },
      { name: "Het Shah", role: "CLI Maintainer", year: "2nd Year IT", institute: "DEPSTAR", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" }
    ],
    github: "https://github.com/gitclub-charusat/gitclub-cli",
    demo: "https://www.npmjs.com/package/gitclub-cli",
    interactiveDemoType: null,
    metrics: { views: "3.1k", npmDownloads: "1.2k", stars: "94" }
  },
  {
    id: "proj-7",
    title: "EventHub — CHARUSAT All-Campus Festival Portal",
    tagline: "Unified discovery & ticket generation portal for hackathons, workshops & fests",
    domain: "Web Development",
    featured: false,
    status: "Completed",
    upvotes: 156,
    starred: false,
    dateAdded: "2026-09-01",
    thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Aggregates events across all 9 CHARUSAT institutes with live registration tracking, team matchmaking, and QR ticket passes.",
    problem: "Students frequently miss workshops and tech competitions because announcements are scattered across different Instagram accounts and WhatsApp groups.",
    solution: "EventHub brings every university event onto one centralized dashboard where students can discover, register, find team members, and get entry passes.",
    techStack: ["React", "PostgreSQL", "TailwindCSS"],
    architecture: "Supabase backend with real-time database subscriptions and automated Google Calendar sync.",
    snippet: `// Event Discovery Query with Filter
const { data: events, error } = await supabase
  .from('events')
  .select('*, institute(name), registrations(count)')
  .eq('status', 'UPCOMING')
  .order('start_date', { ascending: true });`,
    team: [
      { name: "Riya Soni", role: "Frontend Lead", year: "3rd Year CE", institute: "CSPIT", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
      { name: "Harshil Vora", role: "Backend Developer", year: "3rd Year IT", institute: "CMPICA", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" }
    ],
    github: "https://github.com/gitclub-charusat/eventhub-charusat",
    demo: "https://eventhub-charusat.vercel.app",
    interactiveDemoType: null,
    metrics: { views: "7.4k", registrations: "4.8k", eventsHosted: "38" }
  },
  {
    id: "proj-8",
    title: "PassSwift — Automated Hostel Digital Out-Pass",
    tagline: "Instant digital out-pass with parent SMS approval & face-scan gate verification",
    domain: "Automation & Utilities",
    featured: false,
    status: "Active",
    upvotes: 112,
    starred: false,
    dateAdded: "2026-08-15",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Replaces manual paper pass registers with instant digital approvals, reducing hostel leave clearance time from 2 hours to 60 seconds.",
    problem: "Hostel students faced long queues outside rector offices to get physical paper passes stamped before weekend trips home.",
    solution: "Students submit leave requests on mobile; warden approves via 1-click push notification, triggering parent SMS confirmation and generating a gate pass QR.",
    techStack: ["Flutter", "Python", "FastAPI", "PostgreSQL", "TailwindCSS"],
    architecture: "FastAPI REST service connected to Twilio SMS gateway for parent authorization and OpenCV face embedding match for main gate entry.",
    snippet: `// Warden Approval & Parent SMS Trigger
@router.post("/api/passes/{pass_id}/approve")
async def approve_pass(pass_id: str, warden_id: str):
    pass_obj = await db.passes.get(pass_id)
    pass_obj.status = "APPROVED"
    sms_service.send_parent_alert(pass_obj.parent_phone, pass_obj.student_name)
    qr_code = generate_gate_qr(pass_id)
    return {"status": "SUCCESS", "qr": qr_code}`,
    team: [
      { name: "Kruti Bhatt", role: "App Developer", year: "4th Year IT", institute: "CMPICA", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
      { name: "Naman Dave", role: "Security Systems", year: "3rd Year CSE", institute: "CSPIT", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" }
    ],
    github: "https://github.com/gitclub-charusat/passswift-hostel",
    demo: "https://passswift.charusat.app",
    interactiveDemoType: null,
    metrics: { views: "3.9k", passesIssued: "9.1k", timeSaved: "85%" }
  }
];
