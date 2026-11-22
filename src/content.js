// Only confirmed information from the supplied brief. Replace nulls with verified CV details.
const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
export const profile = {
  name: 'Ahmed Waleed Gad', email: 'ahmedgad1503@gmail.com', linkedin: 'https://www.linkedin.com/in/ahmed-waleed-gad', github: null,
  cv: asset('Ahmed_Gad_CV.pdf'), photo: asset('images/ahmed-portrait-640.webp'),
  photoLarge: asset('images/ahmed-portrait-960.webp'),
  projects: [
    { id: 'ecomind', name: 'EcoMind AI', category: 'ENVIRONMENTAL INTELLIGENCE', description: 'Environmental Agentic RAG Chatbot.', detail: 'Knowledge-grounded environmental answers, powered by a specialized knowledge base and an agentic RAG pipeline. Built for the Green Loop university hackathon in September 2026, placing 4th in the competition.', tags: ['Agentic AI', 'RAG', 'Knowledge Base'], contribution: 'Team leader: directed the system architecture and environmental RAG pipeline, and coordinated business model, UI, technical architecture, and presentation to deliver a working prototype.', github: null, demo: null },
    { id: 'sakina', name: 'Sakina AI', category: 'HUMAN-CENTERED AI', description: 'Mental Health Understanding Platform.', detail: 'An AI-powered platform helping users better understand their mental and emotional state through RAG and LLM integration. Built at the Creativa Mansoura hackathon in August 2026.', tags: ['RAG', 'LLM Integration', 'Data Pipelines'], contribution: 'Worked on data preparation, pipelines, document processing, and AI system architecture. Collaborated with a newly formed team to take the concept to a working live demo under hackathon time constraints.', github: null, demo: null }
  ],
  skills: [
    {name:'Programming Languages', icon:'{ }', description:'The foundations behind intelligent systems.', items:['Python','C++','Java','Go','SQL']},
    {name:'AI & Machine Learning', icon:'✳', description:'Intelligence, from models to applications.', items:['NumPy','Pandas','Scikit-learn','Matplotlib','Prompt Engineering','RAG']},
    {name:'AI Security', icon:'◇', description:'Building trust into intelligent systems.', items:['AI Security Research','Safe intent-to-policy automation']},
    {name:'Cybersecurity', icon:'⌁', description:'A security-first perspective.', items:['Penetration Testing','Networking & Protocols','SIEM','Cloud Security','Incident Response','Digital Safety']},
    {name:'DevOps & Cloud', icon:'☁', description:'From experiments to resilient systems.', items:['DevOps Practices','Microsoft Azure','Linux basics']},
    {name:'Development Tools', icon:'⌘', description:'The tools behind the research.', items:['Git','GitHub','VS Code','Jupyter Notebook','Flutter','Flet']}
  ],
  experience: [
    {title:'Microsoft Student Ambassador · 2nd Term',type:'PRESENT / HORUS UNIVERSITY',description:'Representing the Microsoft Learn Student Ambassadors program on campus, promoting technical learning and community engagement.'},
    {title:'Public Relations Manager',type:'FEB 2026 – PRESENT / MICROSOFT STUDENT CLUB',description:'Connecting the club with partners, students, and stakeholders. Coordinating communication, schedules, and follow-ups across ongoing initiatives.'},
    {title:'ITI Technical Training',type:'AUG – SEP 2026 / ITI, DAMIETTA',description:'Training sessions in DevOps workflows, penetration testing, SOC operations, incident response, and cloud fundamentals.'},
    {title:'Microsoft AI Skills Fest',type:'JUN 2026 / MICROSOFT',description:'Participated in a week-long global initiative focused on building practical AI skills.'},
    {title:'Operations Lead',type:'NOV 2025 – FEB 2026 / MICROSOFT STUDENT CLUB',description:'Oversaw operations, task assignment, and team coordination. Tracked progress, resolved bottlenecks, and reported outcomes to leadership.'},
    {title:'Media Leadership & Volunteering',type:'STUDENT COMMUNITIES',description:'Media leadership and coordination across seven student organizations, including Etop, YLY, Student for Egypt, CSU, and TEDx. Managed people, schedules, and parallel projects.'}
  ],
  certifications: [
    {title:'Generate Reports with AI Research Agents',issuer:'Microsoft Applied Skills'},
    {title:'Retrieval Augmented Generation for Enhanced AI Outputs',issuer:'IBM SkillBuild'},
    {title:'One Million Prompt Engineering',issuer:'Dubai Future Foundation'},
    {title:'Introduction to Cybersecurity',issuer:'Cisco'},
    {title:'Cybersecurity Foundations',issuer:'LinkedIn Learning & NASBA'},
    {title:'Python Essentials 1',issuer:'Cisco Networking Academy'},
    {title:'Leadership and Team Management',issuer:'Harvard — as listed in CV'},
    {title:'Penetration Testing',issuer:'Training course'},
    {title:'Digital Safety and Security Awareness',issuer:'Cybersecurity'},
    {title:'AI in Marketing',issuer:'Microsoft'},
    {title:'AI in Content Creation & Marketing',issuer:'HP'},
    {title:'AI for Beginners & Critical Thinking in the AI Era',issuer:'HP LIFE'},
    {title:'Introduction to Computer Systems',issuer:'Maraef'},
    {title:'English for IT 1',issuer:'Cisco Networking Academy'}
  ]
};
