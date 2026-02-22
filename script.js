// ============ PDF VIEWER ============
const pdfModal = document.getElementById('pdf-viewer-modal');
const closePdfBtn = document.getElementById('close-pdf');
const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');
const rotateLeftBtn = document.getElementById('rotate-left');
const rotateRightBtn = document.getElementById('rotate-right');
const zoomLevelDisplay = document.getElementById('zoom-level');
const pdfWrapper = document.getElementById('pdf-canvas-wrapper');

let currentZoom = 100;
let currentRotation = 0;

// Function to open PDF viewer
function openPdfViewer() {
  pdfModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close PDF viewer
closePdfBtn.addEventListener('click', () => {
  pdfModal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Close on background click
pdfModal.addEventListener('click', (e) => {
  if (e.target === pdfModal) {
    pdfModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
    pdfModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Zoom In
zoomInBtn.addEventListener('click', () => {
  if (currentZoom < 200) {
    currentZoom += 10;
    updatePdfTransform();
  }
});

// Zoom Out
zoomOutBtn.addEventListener('click', () => {
  if (currentZoom > 50) {
    currentZoom -= 10;
    updatePdfTransform();
  }
});

// Rotate Left
rotateLeftBtn.addEventListener('click', () => {
  currentRotation -= 90;
  updatePdfTransform();
});

// Rotate Right
rotateRightBtn.addEventListener('click', () => {
  currentRotation += 90;
  updatePdfTransform();
});

// Update PDF transform
function updatePdfTransform() {
  const scale = currentZoom / 100;
  pdfWrapper.style.transform = `scale(${scale}) rotate(${currentRotation}deg)`;
  zoomLevelDisplay.textContent = `${currentZoom}%`;
}

// ============ MODE TOGGLE ============
const toggleBtn = document.getElementById('toggle-mode');
const cliMode = document.getElementById('cli-mode');
const ideMode = document.getElementById('ide-mode');
const modeLabel = document.querySelector('.mode-label');

let currentMode = 'cli'; // 'cli' or 'ide'

toggleBtn.addEventListener('click', () => {
  if (currentMode === 'cli') {
    cliMode.classList.remove('active');
    ideMode.classList.add('active');
    modeLabel.textContent = 'Switch to CLI Mode';
    currentMode = 'ide';
  } else {
    ideMode.classList.remove('active');
    cliMode.classList.add('active');
    modeLabel.textContent = 'Switch to IDE Mode';
    currentMode = 'cli';
  }
});

// ============ CLI MODE ============
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

// Command history
let commandHistory = [];
let historyIndex = -1;

// System start time
const systemStartTime = new Date();

const commands = {
  help: `Available commands:

Portfolio Commands:
  about      - About Ashish Jadhav
  skills     - List technical skills
  projects   - Show all projects
  experience - Work experience
  education  - Educational background
  contact    - Contact information
  resume     - View resume/CV

System Commands:
  date       - Display current date
  time       - Display current time
  whoami     - Display current user
  pwd        - Print working directory
  ls         - List directory contents
  echo       - Display a line of text
  uname      - System information
  uptime     - Show system uptime
  history    - Show command history
  clear      - Clear terminal`,
  
  resume: 'OPEN_RESUME',
  
  about: `Ashish Jadhav - Backend Software Engineer
  
Backend-focused Software Engineer building production APIs and asynchronous 
systems using Java Spring Boot. Developed a distributed coding judge executing 
untrusted code inside isolated Docker containers using Redis worker queues and 
non-blocking processing.

Location: Pune, Maharashtra
Email: jadhavashish1113@gmail.com
GitHub: github.com/ashishjadhav58
LinkedIn: linkedin.com/in/ashish-jadhav-497543247
Portfolio: ashishjadhavv.me`,

  skills: `Technical Skills:

Languages:
  • Java, SQL, JavaScript, Python

Backend:
  • Spring Boot, REST API Design
  • Authentication (JWT, RBAC)

Databases:
  • PostgreSQL, MySQL, MongoDB, DynamoDB
  • Query Optimization, Indexing

DevOps/Cloud:
  • Docker, Redis, Nginx
  • AWS (Lambda, S3, API Gateway), GCP VM

Concepts:
  • Concurrency, Asynchronous Processing
  • System Design Basics`,

  projects: `Projects:

1. HireNPlace - Online Coding & Placement Platform
   • Sandboxed Docker code execution
   • Redis worker queues for async processing
   • PostgreSQL optimization (500K+ records)
   • Live: hire-n-place.vercel.app

2. Smart Training & Placement System
   • Role-based placement management portal
   • AWS Lambda serverless backend
   • Live: smartevolvetnp.vercel.app

3. PetSecure - QR Based Lost Pet Identification
   • QR-based identity system
   • REST APIs with PostgreSQL
   • Live: petsecure-khaki.vercel.app

4. Cloud Notes Application (Serverless)
   • AWS Lambda, S3, API Gateway
   • Live: master.dvj1bw6t0046c.amplifyapp.com`,

  experience: `Work Experience:

Software Developer Intern
Cybernetics Software Pvt. Ltd. | Jun 2025 - Present
  • Developed production REST APIs for enterprise platform
  • Improved database performance on 500K+ records
  • Built backend services for web and mobile apps

Web Developer Intern
Edunet (EYGDS) | Feb 2025 - Mar 2025
  • Developed MERN stack application

Web Developer Intern
Right Shift Infotech Pvt. Ltd. | Dec 2024 - Jan 2025
  • Developed REST APIs and database modules
  • Built responsive UI with React.js`,

  education: `Education:

B.E. Computer Engineering
Savitribai Phule Pune University | 2023 - 2026
CGPA: 9.42/10

Diploma in Computer Engineering
JSPM Institute | 2020 - 2023
Percentage: 83.54%`,

  contact: `Contact Information:

Email: jadhavashish1113@gmail.com
Phone: +91 9356605762
Location: Pune, Maharashtra

GitHub: github.com/ashishjadhav58
LinkedIn: linkedin.com/in/ashish-jadhav-497543247
Portfolio: ashishjadhavv.me`,

  clear: 'CLEAR_TERMINAL'
};

// Initialize terminal
function initTerminal() {
  addTerminalLine('Welcome to Ashish Jadhav\'s Portfolio Terminal', 'output');
  addTerminalLine('Type "help" to see available commands', 'output');
  addTerminalLine('', 'output');
}

function addTerminalLine(text, type = 'output') {
  const line = document.createElement('div');
  line.className = `terminal-line ${type}`;
  line.textContent = text;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const input = terminalInput.value.trim();
    
    if (input) {
      // Add to history
      commandHistory.push(input);
      historyIndex = commandHistory.length;
      
      // Parse command and arguments
      const parts = input.split(' ');
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);
      
      addTerminalLine(`ashish@portfolio:~$ ${input}`, 'command');
      
      // Handle commands
      if (commands[command]) {
        if (commands[command] === 'CLEAR_TERMINAL') {
          terminalOutput.innerHTML = '';
        } else if (commands[command] === 'OPEN_RESUME') {
          addTerminalLine('Opening resume...', 'output');
          setTimeout(() => {
            openPdfViewer();
          }, 500);
        } else {
          commands[command].split('\n').forEach(line => {
            addTerminalLine(line, 'output');
          });
        }
      } else {
        // Handle dynamic commands
        handleDynamicCommand(command, args, input);
      }
      
      addTerminalLine('', 'output');
    }
    
    terminalInput.value = '';
  } else if (e.key === 'ArrowUp') {
    // Navigate history up
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      terminalInput.value = commandHistory[historyIndex];
    }
  } else if (e.key === 'ArrowDown') {
    // Navigate history down
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      terminalInput.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      terminalInput.value = '';
    }
  } else if (e.key === 'Tab') {
    // Tab completion
    e.preventDefault();
    const input = terminalInput.value.toLowerCase();
    if (input) {
      const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
      if (matches.length === 1) {
        terminalInput.value = matches[0];
      } else if (matches.length > 1) {
        addTerminalLine(`ashish@portfolio:~$ ${input}`, 'command');
        addTerminalLine(matches.join('  '), 'output');
        addTerminalLine('', 'output');
      }
    }
  }
});

// Handle dynamic commands
function handleDynamicCommand(command, args, fullInput) {
  switch(command) {
    case 'date':
      const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      addTerminalLine(new Date().toLocaleDateString('en-US', dateOptions), 'output');
      break;
      
    case 'time':
      addTerminalLine(new Date().toLocaleTimeString('en-US'), 'output');
      break;
      
    case 'whoami':
      addTerminalLine('ashish', 'output');
      break;
      
    case 'pwd':
      addTerminalLine('/home/ashish/portfolio', 'output');
      break;
      
    case 'ls':
      const files = [
        'about.html',
        'projects.html',
        'contact.html',
        'resume.pdf',
        'style.css',
        'script.js',
        'images/'
      ];
      addTerminalLine(files.join('  '), 'output');
      break;
      
    case 'echo':
      if (args.length > 0) {
        addTerminalLine(args.join(' '), 'output');
      }
      break;
      
    case 'uname':
      if (args.includes('-a')) {
        addTerminalLine('Portfolio OS 1.0.0 ashish-portfolio x86_64 GNU/Linux', 'output');
      } else {
        addTerminalLine('Portfolio OS', 'output');
      }
      break;
      
    case 'uptime':
      const uptime = Math.floor((new Date() - systemStartTime) / 1000);
      const minutes = Math.floor(uptime / 60);
      const seconds = uptime % 60;
      addTerminalLine(`up ${minutes} minutes, ${seconds} seconds`, 'output');
      break;
      
    case 'history':
      commandHistory.forEach((cmd, index) => {
        addTerminalLine(`  ${index + 1}  ${cmd}`, 'output');
      });
      break;
      
    case 'cal':
    case 'calendar':
      const now = new Date();
      const month = now.toLocaleString('en-US', { month: 'long' });
      const year = now.getFullYear();
      addTerminalLine(`     ${month} ${year}`, 'output');
      addTerminalLine('Su Mo Tu We Th Fr Sa', 'output');
      
      const firstDay = new Date(year, now.getMonth(), 1).getDay();
      const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate();
      
      let calStr = ' '.repeat(firstDay * 3);
      for (let day = 1; day <= daysInMonth; day++) {
        calStr += day.toString().padStart(2, ' ') + ' ';
        if ((firstDay + day) % 7 === 0) {
          addTerminalLine(calStr, 'output');
          calStr = '';
        }
      }
      if (calStr) addTerminalLine(calStr, 'output');
      break;
      
    case 'fortune':
      const fortunes = [
        'Success is not final, failure is not fatal: it is the courage to continue that counts.',
        'The best way to predict the future is to invent it.',
        'Code is like humor. When you have to explain it, it\'s bad.',
        'First, solve the problem. Then, write the code.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Experience is the name everyone gives to their mistakes.',
        'Java is to JavaScript what car is to Carpet.',
        'It works on my machine. - Every developer ever'
      ];
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      addTerminalLine(randomFortune, 'output');
      break;
      
    case 'cowsay':
      const message = args.length > 0 ? args.join(' ') : 'Hello from Ashish!';
      const border = '_'.repeat(message.length + 2);
      addTerminalLine(` ${border}`, 'output');
      addTerminalLine(`< ${message} >`, 'output');
      addTerminalLine(` ${'-'.repeat(message.length + 2)}`, 'output');
      addTerminalLine('        \\   ^__^', 'output');
      addTerminalLine('         \\  (oo)\\_______', 'output');
      addTerminalLine('            (__)\\       )\\/\\', 'output');
      addTerminalLine('                ||----w |', 'output');
      addTerminalLine('                ||     ||', 'output');
      break;
      
    case 'banner':
      addTerminalLine('', 'output');
      addTerminalLine('  █████╗ ███████╗██╗  ██╗██╗███████╗██╗  ██╗', 'output');
      addTerminalLine(' ██╔══██╗██╔════╝██║  ██║██║██╔════╝██║  ██║', 'output');
      addTerminalLine(' ███████║███████╗███████║██║███████╗███████║', 'output');
      addTerminalLine(' ██╔══██║╚════██║██╔══██║██║╚════██║██╔══██║', 'output');
      addTerminalLine(' ██║  ██║███████║██║  ██║██║███████║██║  ██║', 'output');
      addTerminalLine(' ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝', 'output');
      addTerminalLine('', 'output');
      addTerminalLine('           Backend Software Engineer', 'output');
      addTerminalLine('', 'output');
      break;
      
    case 'neofetch':
      addTerminalLine('', 'output');
      addTerminalLine('       _,met$$$$$gg.          ashish@portfolio', 'output');
      addTerminalLine('    ,g$$$$$$$$$$$$$$$P.       ----------------', 'output');
      addTerminalLine('  ,g$$P"     """Y$$.".        OS: Portfolio OS 1.0.0', 'output');
      addTerminalLine(' ,$$P\'              `$$$.     Host: GitHub Pages', 'output');
      addTerminalLine('\',$$P       ,ggs.     `$$b:   Kernel: JavaScript', 'output');
      addTerminalLine('`d$$\'     ,$P"\'   .    $$$    Uptime: ' + Math.floor((new Date() - systemStartTime) / 60000) + ' mins', 'output');
      addTerminalLine(' $$P      d$\'     ,    $$P    Shell: portfolio-cli', 'output');
      addTerminalLine(' $$:      $$.   -    ,d$$\'    Role: Backend Engineer', 'output');
      addTerminalLine(' $$;      Y$b._   _,d$P\'      Skills: Java, Spring Boot', 'output');
      addTerminalLine(' Y$$.    `.`"Y$$$$P"\'         Location: Pune, India', 'output');
      addTerminalLine(' `$$b      "-.__              ', 'output');
      addTerminalLine('  `Y$$                        ', 'output');
      addTerminalLine('   `Y$$.                      ', 'output');
      addTerminalLine('     `$$b.                    ', 'output');
      addTerminalLine('       `Y$$b.                 ', 'output');
      addTerminalLine('          `"Y$b._             ', 'output');
      addTerminalLine('              `"""            ', 'output');
      addTerminalLine('', 'output');
      break;
      
    default:
      addTerminalLine(`Command not found: ${command}`, 'error');
      addTerminalLine('Type "help" for available commands', 'output');
  }
}

initTerminal();

// ============ IDE MODE ============

// File structure
const fileStructure = [
  { name: 'about.js', icon: '📄', type: 'js' },
  { name: 'skills.json', icon: '📋', type: 'json' },
  { name: 'projects.js', icon: '🚀', type: 'js' },
  { name: 'experience.md', icon: '💼', type: 'md' },
  { name: 'contact.js', icon: '📧', type: 'js' }
];

// File contents
const fileContents = {
  'about.js': `// About Ashish Jadhav
const developer = {
  name: "Ashish Jadhav",
  role: "Backend Software Engineer",
  location: "Pune, Maharashtra",
  
  focus: [
    "Building production APIs",
    "Asynchronous systems",
    "Docker containerization"
  ],
  
  expertise: {
    backend: "Java Spring Boot",
    databases: ["PostgreSQL", "MySQL", "MongoDB"],
    devops: ["Docker", "Redis", "Nginx"],
    cloud: ["AWS Lambda", "S3", "API Gateway"]
  },
  
  currentWork: "Cybernetics Software Pvt. Ltd.",
  
  contact: {
    email: "jadhavashish1113@gmail.com",
    phone: "+91 9356605762",
    github: "github.com/ashishjadhav58",
    linkedin: "linkedin.com/in/ashish-jadhav-497543247"
  }
};

export default developer;`,

  'skills.json': `{
  "languages": [
    "Java",
    "SQL",
    "JavaScript",
    "Python"
  ],
  "backend": [
    "Spring Boot",
    "REST API Design",
    "JWT Authentication",
    "RBAC"
  ],
  "databases": [
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "DynamoDB"
  ],
  "devops": [
    "Docker",
    "Redis",
    "Nginx"
  ],
  "cloud": [
    "AWS Lambda",
    "S3",
    "API Gateway",
    "GCP VM"
  ],
  "concepts": [
    "Concurrency",
    "Asynchronous Processing",
    "System Design",
    "Query Optimization"
  ]
}`,

  'projects.js': `// Featured Projects
const projects = [
  {
    name: "HireNPlace",
    description: "Online Coding & Placement Platform",
    tech: ["Spring Boot", "Docker", "Redis", "PostgreSQL"],
    highlights: [
      "Sandboxed Docker code execution",
      "Redis worker queues for async processing",
      "PostgreSQL optimization (500K+ records)",
      "JWT authentication with RBAC"
    ],
    live: "https://hire-n-place.vercel.app/"
  },
  {
    name: "Smart Training & Placement",
    description: "Role-based placement management portal",
    tech: ["MERN", "AWS Lambda", "API Gateway"],
    highlights: [
      "Role-based authentication",
      "Application workflow management",
      "AWS Lambda serverless backend"
    ],
    live: "https://smartevolvetnp.vercel.app/"
  },
  {
    name: "PetSecure",
    description: "QR Based Lost Pet Identification",
    tech: ["Node.js", "PostgreSQL", "REST API"],
    highlights: [
      "QR code generation and scanning",
      "Pet-to-owner mapping system",
      "Owner notification workflow"
    ],
    live: "https://petsecure-khaki.vercel.app/"
  }
];

export default projects;`,

  'experience.md': `# Work Experience

## Software Developer Intern
**Cybernetics Software Pvt. Ltd.** | Jun 2025 - Present

- Developed production REST APIs for enterprise platform
- Improved database performance on 500K+ records
- Built backend services for web and mobile apps

## Web Developer Intern
**Edunet (EYGDS)** | Feb 2025 - Mar 2025

- Developed MERN stack application

## Web Developer Intern
**Right Shift Infotech Pvt. Ltd.** | Dec 2024 - Jan 2025

- Developed REST APIs and database modules
- Built responsive UI with React.js

---

# Education

## B.E. Computer Engineering
**Savitribai Phule Pune University** | 2023 - 2026
- CGPA: 9.42/10

## Diploma in Computer Engineering
**JSPM Institute** | 2020 - 2023
- Percentage: 83.54%`,

  'contact.js': `// Contact Information
const contact = {
  email: "jadhavashish1113@gmail.com",
  phone: "+91 9356605762",
  location: "Pune, Maharashtra, India",
  
  social: {
    github: "https://github.com/ashishjadhav58",
    linkedin: "https://linkedin.com/in/ashish-jadhav-497543247",
    portfolio: "https://ashishjadhavv.me"
  },
  
  availability: "Open to opportunities",
  
  preferredContact: "email"
};

export default contact;`
};

// Load file explorer
function loadFileExplorer() {
  const explorerContent = document.getElementById('explorer-content');
  
  fileStructure.forEach(file => {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.dataset.fileName = file.name;
    fileItem.draggable = true;
    
    fileItem.innerHTML = `
      <span class="file-icon">${file.icon}</span>
      <span class="file-name">${file.name}</span>
    `;
    
    // Click to open file
    fileItem.addEventListener('click', () => {
      document.querySelectorAll('.file-item').forEach(item => {
        item.classList.remove('active');
      });
      fileItem.classList.add('active');
      loadFileContent(file.name);
    });
    
    // Drag start
    fileItem.addEventListener('dragstart', (e) => {
      fileItem.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'copy';
      e.dataTransfer.setData('text/plain', file.name);
    });
    
    // Drag end
    fileItem.addEventListener('dragend', () => {
      fileItem.classList.remove('dragging');
    });
    
    explorerContent.appendChild(fileItem);
  });
  
  // Load first file by default
  document.querySelector('.file-item').classList.add('active');
  loadFileContent('about.js');
  
  // Setup drop zone for AI agent
  setupDropZone();
}

// Setup drag and drop for AI agent
function setupDropZone() {
  const agentContainer = document.getElementById('agent-container');
  const dropZone = document.getElementById('drop-zone');
  
  agentContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    dropZone.classList.add('active');
  });
  
  agentContainer.addEventListener('dragleave', (e) => {
    if (e.target === agentContainer) {
      dropZone.classList.remove('active');
    }
  });
  
  agentContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('active');
    
    const fileName = e.dataTransfer.getData('text/plain');
    if (fileName) {
      handleFileDrop(fileName);
    }
  });
}

// Handle file drop on AI agent
function handleFileDrop(fileName) {
  const content = fileContents[fileName];
  
  addChatMessage(`Analyze ${fileName}`, true);
  
  setTimeout(() => {
    const summary = getFileSummary(fileName, content);
    addChatMessage(summary, false);
  }, 800);
}

// Generate file summary
function getFileSummary(fileName, content) {
  const summaries = {
    'about.js': `📄 about.js Summary:

This file contains Ashish's core profile information as a JavaScript object. Key highlights:

• Role: Backend Software Engineer
• Location: Pune, Maharashtra
• Specialization: Production APIs, Asynchronous systems, Docker containerization
• Tech Stack: Java Spring Boot, PostgreSQL, MySQL, MongoDB, Docker, Redis, AWS
• Current Position: Cybernetics Software Pvt. Ltd.
• Contact: Email, phone, GitHub, and LinkedIn links included

The file is structured as an ES6 module export, making it easy to import and use across the portfolio.`,

    'skills.json': `📋 skills.json Summary:

A comprehensive JSON file listing all technical skills organized by category:

• Languages: Java, SQL, JavaScript, Python
• Backend: Spring Boot, REST API Design, JWT, RBAC
• Databases: PostgreSQL, MySQL, MongoDB, DynamoDB
• DevOps: Docker, Redis, Nginx
• Cloud: AWS Lambda, S3, API Gateway, GCP VM
• Concepts: Concurrency, Async Processing, System Design, Query Optimization

This structured format makes it easy to parse and display skills dynamically on the portfolio.`,

    'projects.js': `🚀 projects.js Summary:

Contains detailed information about 3 major projects:

1. HireNPlace - Online coding platform with Docker sandbox execution, Redis queues, and PostgreSQL optimization for 500K+ records

2. Smart Training & Placement - MERN stack placement portal with AWS Lambda serverless backend

3. PetSecure - QR-based pet identification system with REST APIs and PostgreSQL

Each project includes tech stack, highlights, and live demo links. The data structure is perfect for rendering project cards or detailed views.`,

    'experience.md': `💼 experience.md Summary:

A Markdown file documenting work experience and education:

Work Experience:
• Software Developer Intern at Cybernetics (Jun 2025 - Present)
• Web Developer Intern at Edunet (Feb-Mar 2025)
• Web Developer Intern at Right Shift Infotech (Dec 2024-Jan 2025)

Education:
• B.E. Computer Engineering - CGPA 9.42/10 (2023-2026)
• Diploma Computer Engineering - 83.54% (2020-2023)

The Markdown format makes it easy to render with proper formatting and styling.`,

    'contact.js': `📧 contact.js Summary:

Contact information structured as a JavaScript object:

• Email: jadhavashish1113@gmail.com
• Phone: +91 9356605762
• Location: Pune, Maharashtra
• Social Links: GitHub, LinkedIn, Portfolio
• Availability: Open to opportunities
• Preferred Contact: Email

The object structure includes nested social links and metadata about availability, making it easy to integrate into contact forms or display sections.`
  };
  
  return summaries[fileName] || `File ${fileName} contains ${content.split('\n').length} lines of code. Drop other files to see their summaries!`;
}

// Load file content into editor
function loadFileContent(fileName) {
  const content = fileContents[fileName] || '// File not found';
  const codeContent = document.getElementById('code-content');
  const lineNumbers = document.getElementById('line-numbers');
  const activeFileName = document.getElementById('active-file-name');
  
  activeFileName.textContent = fileName;
  
  // Clear content
  codeContent.innerHTML = '';
  lineNumbers.innerHTML = '';
  
  // Syntax highlighting line by line
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    // Add line number
    const lineNumDiv = document.createElement('div');
    lineNumDiv.textContent = index + 1;
    lineNumbers.appendChild(lineNumDiv);
    
    // Add code line
    const lineDiv = document.createElement('div');
    const leadingSpaces = line.match(/^(\s*)/)[0];
    const restOfLine = line.substring(leadingSpaces.length);
    
    lineDiv.innerHTML = leadingSpaces.replace(/ /g, '&nbsp;') + syntaxHighlightLine(restOfLine, fileName);
    codeContent.appendChild(lineDiv);
  });
  
  // Sync scroll between line numbers and code
  codeContent.onscroll = function() {
    lineNumbers.scrollTop = codeContent.scrollTop;
  };
}

// Highlight a single line
function syntaxHighlightLine(line, fileName) {
  if (!line) return '&nbsp;';
  
  let highlighted = line.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  if (fileName.endsWith('.js')) {
    // Keywords
    highlighted = highlighted.replace(/\b(const|let|var|function|return|export|default|import|from|if|else|for|while|class|new|this)\b/g, '<span class="code-keyword">$1</span>');
    // Strings
    highlighted = highlighted.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span class="code-string">$1</span>');
    // Comments
    highlighted = highlighted.replace(/(\/\/.*$)/g, '<span class="code-comment">$1</span>');
    // Numbers
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>');
  } else if (fileName.endsWith('.json')) {
    // Strings
    highlighted = highlighted.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="code-string">$1</span>');
    // Numbers
    highlighted = highlighted.replace(/:\s*(\d+)/g, ': <span class="code-number">$1</span>');
  } else if (fileName.endsWith('.md')) {
    // Headers
    if (line.match(/^#{1,6}\s/)) {
      highlighted = '<span class="code-keyword">' + highlighted + '</span>';
    }
    // Bold
    highlighted = highlighted.replace(/\*\*(.*?)\*\*/g, '<span class="code-function">**$1**</span>');
  }
  
  return highlighted;
}

// Chat functionality
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');
let selectedModel = 'claude';

// Model selector
const modelSelector = document.getElementById('ai-model-selector');
if (modelSelector) {
  modelSelector.addEventListener('change', (e) => {
    selectedModel = e.target.value;
    const modelNames = {
      'claude': 'Claude Sonnet',
      'chatgpt': 'ChatGPT',
      'gemini': 'Gemini'
    };
    addChatMessage(`Switched to ${modelNames[selectedModel]} model. How can I help you?`, false);
  });
}

function addChatMessage(message, isUser = false, hasSuggestion = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${isUser ? 'user' : 'assistant'}`;
  
  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = isUser ? '👤' : '🤖';
  
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  
  if (hasSuggestion && !isUser) {
    const badge = document.createElement('div');
    badge.className = 'suggestion-badge';
    badge.textContent = 'Suggestion';
    bubble.appendChild(badge);
  }
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = message;
  
  bubble.appendChild(contentDiv);
  
  if (hasSuggestion && !isUser) {
    const actions = document.createElement('div');
    actions.className = 'message-actions';
    
    const acceptBtn = document.createElement('button');
    acceptBtn.className = 'action-btn accept';
    acceptBtn.innerHTML = '✓ Accept';
    acceptBtn.onclick = () => handleAccept(message, actions);
    
    const rejectBtn = document.createElement('button');
    rejectBtn.className = 'action-btn reject';
    rejectBtn.innerHTML = '✕ Reject';
    rejectBtn.onclick = () => handleReject(actions);
    
    actions.appendChild(acceptBtn);
    actions.appendChild(rejectBtn);
    bubble.appendChild(actions);
  }
  
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(bubble);
  chatMessages.appendChild(messageDiv);
  
  // Scroll to bottom to show newest message
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleAccept(suggestion, actionsDiv) {
  actionsDiv.innerHTML = '<span style="color: #4ec9b0; font-size: 12px;">✓ Accepted</span>';
  addChatMessage('Great! I\'ve noted your interest. Feel free to ask more questions!', false);
}

function handleReject(actionsDiv) {
  actionsDiv.innerHTML = '<span style="color: #858585; font-size: 12px;">✕ Rejected</span>';
  addChatMessage('No problem! Let me know if you need anything else.', false);
}

function getAIResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  
  // Add model-specific personality
  const modelPrefix = {
    'claude': '',
    'chatgpt': '',
    'gemini': ''
  };
  
  const prefix = modelPrefix[selectedModel] || '';
  
  // Skills
  if (msg.includes('skill') || msg.includes('technology') || msg.includes('tech stack')) {
    setTimeout(() => {
      addChatMessage('Would you like me to open the skills.json file to see the complete tech stack?', false, true);
    }, 800);
    return prefix + 'Ashish specializes in Java Spring Boot for backend development, with strong skills in Docker, Redis, PostgreSQL, and AWS. He has experience with REST API design, JWT authentication, database optimization, and asynchronous processing systems.';
  }
  
  // Projects
  if (msg.includes('project') || msg.includes('work') || msg.includes('built')) {
    setTimeout(() => {
      addChatMessage('I can open the projects.js file to show you detailed information about each project. Would you like that?', false, true);
    }, 800);
    return 'Ashish has built several impressive projects including HireNPlace (coding platform with Docker sandbox), Smart Training & Placement (AWS Lambda-based portal), PetSecure (QR pet identification), and Cloud Notes (serverless app). Check the projects.js file for details!';
  }
  
  // Experience
  if (msg.includes('experience') || msg.includes('work') || msg.includes('job') || msg.includes('intern')) {
    setTimeout(() => {
      addChatMessage('Want me to open experience.md to see his complete work history and education?', false, true);
    }, 800);
    return 'Ashish is currently a Software Developer Intern at Cybernetics Software Pvt. Ltd. (Jun 2025 - Present), developing production REST APIs and optimizing databases with 500K+ records. He previously interned at Edunet and Right Shift Infotech.';
  }
  
  // Education
  if (msg.includes('education') || msg.includes('degree') || msg.includes('university') || msg.includes('college')) {
    return 'Ashish is pursuing B.E. in Computer Engineering from Savitribai Phule Pune University (2023-2026) with an impressive CGPA of 9.42/10. He completed his Diploma in Computer Engineering from JSPM Institute with 83.54%. Check experience.md for details!';
  }
  
  // Docker/Containers
  if (msg.includes('docker') || msg.includes('container')) {
    return 'Ashish has hands-on experience with Docker, particularly in building sandboxed code execution environments. In HireNPlace, he architected a system that executes untrusted user code inside isolated Docker containers using Redis worker queues.';
  }
  
  // Database
  if (msg.includes('database') || msg.includes('sql') || msg.includes('postgres')) {
    return 'Ashish has strong database skills with PostgreSQL, MySQL, MongoDB, and DynamoDB. He has optimized PostgreSQL queries and indexing for datasets with 500K+ records, significantly improving performance in production environments.';
  }
  
  // Contact
  if (msg.includes('contact') || msg.includes('email') || msg.includes('reach')) {
    setTimeout(() => {
      addChatMessage('Should I open contact.js to show all contact details and social links?', false, true);
    }, 800);
    return 'You can reach Ashish at:\nEmail: jadhavashish1113@gmail.com\nPhone: +91 9356605762\nGitHub: github.com/ashishjadhav58\nLinkedIn: linkedin.com/in/ashish-jadhav-497543247';
  }
  
  // Resume/CV
  if (msg.includes('resume') || msg.includes('cv')) {
    setTimeout(() => {
      openPdfViewer();
    }, 1000);
    return 'Opening Ashish\'s resume for you... It includes his complete work experience, technical skills, projects, and education details. You can zoom, rotate, and download the PDF.';
  }
  
  // HireNPlace specific
  if (msg.includes('hirenplace') || msg.includes('hire n place') || msg.includes('coding platform')) {
    return 'HireNPlace is Ashish\'s most complex project - an online coding and placement platform. It features asynchronous code evaluation using Redis queues, secure Docker sandbox execution, non-blocking submission processing, and PostgreSQL optimization for 500K+ records. The architecture: API → Redis Queue → Worker Containers → Result Validation → Database Store';
  }
  
  // File opening
  if (msg.includes('open') && (msg.includes('file') || msg.includes('about') || msg.includes('skills') || msg.includes('projects') || msg.includes('experience') || msg.includes('contact'))) {
    let fileName = 'about.js';
    if (msg.includes('skills')) fileName = 'skills.json';
    else if (msg.includes('projects')) fileName = 'projects.js';
    else if (msg.includes('experience')) fileName = 'experience.md';
    else if (msg.includes('contact')) fileName = 'contact.js';
    
    setTimeout(() => {
      const fileItem = document.querySelector(`[data-file-name="${fileName}"]`);
      if (fileItem) fileItem.click();
    }, 500);
    
    return `Opening ${fileName} in the editor...`;
  }
  
  // Default
  return 'I can help you explore Ashish\'s portfolio! Try asking:\n• "What are his skills?"\n• "Tell me about his projects"\n• "Show me his experience"\n• "Open skills file"\n• "Show me his resume"';
}

function handleChatSend() {
  const message = chatInput.value.trim();
  
  if (message) {
    addChatMessage(message, true);
    chatInput.value = '';
    
    // Simulate AI thinking
    setTimeout(() => {
      const response = getAIResponse(message);
      addChatMessage(response, false);
    }, 500);
  }
}

chatSendBtn.addEventListener('click', handleChatSend);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleChatSend();
  }
});

// Initialize IDE mode
console.log('Initializing IDE mode...');
loadFileExplorer();
console.log('File explorer loaded');
