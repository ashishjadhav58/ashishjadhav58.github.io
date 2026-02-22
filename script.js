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

const commands = {
  help: `Available commands:
  help       - Show this help message
  about      - About Ashish Jadhav
  skills     - List technical skills
  projects   - Show all projects
  experience - Work experience
  education  - Educational background
  contact    - Contact information
  clear      - Clear terminal`,
  
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
    const command = terminalInput.value.trim().toLowerCase();
    
    if (command) {
      addTerminalLine(`ashish@portfolio:~$ ${command}`, 'command');
      
      if (commands[command]) {
        if (commands[command] === 'CLEAR_TERMINAL') {
          terminalOutput.innerHTML = '';
        } else {
          commands[command].split('\n').forEach(line => {
            addTerminalLine(line, 'output');
          });
        }
      } else {
        addTerminalLine(`Command not found: ${command}`, 'error');
        addTerminalLine('Type "help" for available commands', 'output');
      }
      
      addTerminalLine('', 'output');
    }
    
    terminalInput.value = '';
  }
});

initTerminal();

// ============ IDE MODE ============

// Projects Data
const projectsData = [
  {
    id: 1,
    name: 'HireNPlace',
    tech: 'Spring Boot, Docker, Redis, PostgreSQL',
    description: 'Online Coding & Placement Platform with sandboxed code execution',
    details: {
      overview: 'Architected asynchronous code evaluation pipeline with Docker sandbox containers for secure code execution.',
      features: [
        'Sandboxed Docker code execution',
        'Redis worker queues for async processing',
        'PostgreSQL optimization (500K+ records)',
        'JWT authentication and RBAC',
        'Nginx reverse proxy deployment'
      ],
      tech: ['Java', 'Spring Boot', 'Docker', 'Redis', 'PostgreSQL', 'JWT'],
      link: 'https://hire-n-place.vercel.app/'
    }
  },
  {
    id: 2,
    name: 'Smart Training & Placement',
    tech: 'MERN, AWS Lambda, API Gateway',
    description: 'Role-based placement management portal',
    details: {
      overview: 'Developed role-based placement management portal for students, teachers, and placement officers.',
      features: [
        'Role-based authentication',
        'Application workflow management',
        'Profile management modules',
        'AWS Lambda serverless backend',
        'API Gateway integration'
      ],
      tech: ['MongoDB', 'Express', 'React', 'Node.js', 'AWS Lambda', 'API Gateway'],
      link: 'https://smartevolvetnp.vercel.app/'
    }
  },
  {
    id: 3,
    name: 'PetSecure',
    tech: 'REST API, PostgreSQL, QR System',
    description: 'QR Based Lost Pet Identification System',
    details: {
      overview: 'Built QR-based identity system mapping pets to owners and retrieving contact details.',
      features: [
        'QR code generation and scanning',
        'Pet-to-owner mapping system',
        'Image upload handling',
        'Owner notification workflow',
        'Pet recovery system'
      ],
      tech: ['Node.js', 'PostgreSQL', 'REST API', 'QR Code'],
      link: 'https://petsecure-khaki.vercel.app/'
    }
  },
  {
    id: 4,
    name: 'Cloud Notes',
    tech: 'AWS Lambda, S3, API Gateway',
    description: 'Serverless notes application',
    details: {
      overview: 'Built serverless notes platform using AWS Lambda, S3, and API Gateway.',
      features: [
        'Serverless architecture',
        'AWS Lambda functions',
        'S3 storage integration',
        'API Gateway endpoints',
        'Scalable and cost-effective'
      ],
      tech: ['AWS Lambda', 'S3', 'API Gateway', 'JavaScript'],
      link: 'https://master.dvj1bw6t0046c.amplifyapp.com/'
    }
  }
];

// Load projects into explorer
function loadProjects() {
  const explorerContent = document.getElementById('explorer-content');
  
  projectsData.forEach(project => {
    const projectItem = document.createElement('div');
    projectItem.className = 'project-item';
    projectItem.draggable = true;
    projectItem.dataset.projectId = project.id;
    
    projectItem.innerHTML = `
      <div class="project-name">${project.name}</div>
      <div class="project-tech">${project.tech}</div>
    `;
    
    // Click to select and show details
    projectItem.addEventListener('click', () => {
      document.querySelectorAll('.project-item').forEach(item => {
        item.classList.remove('selected');
      });
      projectItem.classList.add('selected');
      showProjectDetails(project);
    });
    
    // Drag and drop
    projectItem.addEventListener('dragstart', handleDragStart);
    projectItem.addEventListener('dragend', handleDragEnd);
    
    explorerContent.appendChild(projectItem);
  });
}

// Drag and drop handlers
function handleDragStart(e) {
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
  this.classList.remove('dragging');
}

// Show project details
function showProjectDetails(project) {
  const detailsContent = document.getElementById('details-content');
  
  const featuresHTML = project.details.features.map(f => `<li>${f}</li>`).join('');
  const techHTML = project.details.tech.join(', ');
  
  detailsContent.innerHTML = `
    <div class="detail-section">
      <div class="detail-label">Project Name</div>
      <div class="detail-value">${project.name}</div>
    </div>
    
    <div class="detail-section">
      <div class="detail-label">Overview</div>
      <div class="detail-value">${project.details.overview}</div>
    </div>
    
    <div class="detail-section">
      <div class="detail-label">Key Features</div>
      <ul class="detail-list">
        ${featuresHTML}
      </ul>
    </div>
    
    <div class="detail-section">
      <div class="detail-label">Technologies</div>
      <div class="detail-value">${techHTML}</div>
    </div>
    
    <div class="detail-section">
      <div class="detail-label">Live Demo</div>
      <div class="detail-value">
        <a href="${project.details.link}" target="_blank" class="detail-link">
          View Project →
        </a>
      </div>
    </div>
  `;
}

// Chat functionality
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

function addChatMessage(message, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${isUser ? 'user' : 'assistant'}`;
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = message;
  
  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAIResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  
  // Skills
  if (msg.includes('skill') || msg.includes('technology') || msg.includes('tech stack')) {
    return 'Ashish specializes in Java Spring Boot for backend development, with strong skills in Docker, Redis, PostgreSQL, and AWS. He has experience with REST API design, JWT authentication, database optimization, and asynchronous processing systems.';
  }
  
  // Projects
  if (msg.includes('project') || msg.includes('work') || msg.includes('built')) {
    return 'Ashish has built several impressive projects:\n\n1. HireNPlace - A coding platform with sandboxed Docker execution and Redis queues\n2. Smart Training & Placement - AWS Lambda-based placement portal\n3. PetSecure - QR-based pet identification system\n4. Cloud Notes - Serverless notes app\n\nClick on any project in the Solution Explorer to see more details!';
  }
  
  // Experience
  if (msg.includes('experience') || msg.includes('work') || msg.includes('job') || msg.includes('intern')) {
    return 'Ashish is currently a Software Developer Intern at Cybernetics Software Pvt. Ltd. (Jun 2025 - Present), where he develops production REST APIs and optimized databases handling 500K+ records. He previously interned at Edunet and Right Shift Infotech.';
  }
  
  // Education
  if (msg.includes('education') || msg.includes('degree') || msg.includes('university') || msg.includes('college')) {
    return 'Ashish is pursuing B.E. in Computer Engineering from Savitribai Phule Pune University (2023-2026) with an impressive CGPA of 9.42/10. He completed his Diploma in Computer Engineering from JSPM Institute with 83.54%.';
  }
  
  // Docker/Containers
  if (msg.includes('docker') || msg.includes('container')) {
    return 'Ashish has hands-on experience with Docker, particularly in building sandboxed code execution environments. In HireNPlace, he architected a system that executes untrusted user code inside isolated Docker containers, preventing host system access while enabling secure code evaluation.';
  }
  
  // Database
  if (msg.includes('database') || msg.includes('sql') || msg.includes('postgres')) {
    return 'Ashish has strong database skills with PostgreSQL, MySQL, MongoDB, and DynamoDB. He has optimized PostgreSQL queries and indexing for datasets with 500K+ records, significantly improving performance in production environments.';
  }
  
  // Contact
  if (msg.includes('contact') || msg.includes('email') || msg.includes('reach')) {
    return 'You can reach Ashish at:\nEmail: jadhavashish1113@gmail.com\nPhone: +91 9356605762\nGitHub: github.com/ashishjadhav58\nLinkedIn: linkedin.com/in/ashish-jadhav-497543247';
  }
  
  // HireNPlace specific
  if (msg.includes('hirenplace') || msg.includes('hire n place') || msg.includes('coding platform')) {
    return 'HireNPlace is Ashish\'s most complex project - an online coding and placement platform. It features:\n• Asynchronous code evaluation using Redis queues\n• Secure Docker sandbox execution\n• Non-blocking submission processing\n• PostgreSQL optimization for 500K+ records\n• JWT authentication with RBAC\n\nThe architecture: API → Redis Queue → Worker Containers → Result Validation → Database Store';
  }
  
  // Default
  return 'I can help you learn about Ashish\'s skills, projects, experience, and education. Try asking:\n• "What are his skills?"\n• "Tell me about his projects"\n• "What\'s his experience?"\n• "How can I contact him?"';
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
loadProjects();
