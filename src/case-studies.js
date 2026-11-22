const asset=path=>`${import.meta.env.BASE_URL}${path}`;

export const caseStudies=[
  {
    id:'nasa',eyebrow:'SPACE SCIENCE / INDEPENDENT ENGINEERING',name:'Astronaut Health Monitoring',shortName:'WEDJAT-X',event:'NASA Space Apps Challenge 2026',date:'November 14–15, 2026',location:'Giza, Egypt',role:'Individual / Solo',recognition:'GALACTIC PROBLEM SOLVER',theme:'space',
    description:'One engineer. A real scientific dataset. A complete journey from an open question to an analytical software prototype.',
    overview:'I independently explored how software can support astronaut health monitoring during space missions. Using NASA’s OSDR-575 Inspiration4 dataset, I took responsibility for the scientific research, data validation, analytical architecture, backend, frontend, debugging, and testing.',
    problem:'How can a software system bring together longitudinal biomedical observations, anomaly detection, and data-quality evaluation without treating every unusual reading as equally trustworthy?',
    why:'Monitoring begins with understanding change. The engineering problem is to organize observations over time, evaluate the reliability of the data, and make analytical findings understandable to the person reviewing them.',
    objectives:['Understand the scientific challenge before choosing methods.','Research and validate the NASA dataset.','Combine complementary analytical methods in one architecture.','Connect data processing, backend services, and the frontend.','Debug and test an end-to-end implementation under time pressure.'],
    contribution:'I handled the entire engineering journey independently: scientific problem framing, dataset research, architecture, method selection, backend and frontend implementation, debugging, and testing. This was solo participation, not a team project.',
    technologies:['Python','React','TypeScript','FastAPI','SQLite','Three.js'],technologyNote:'Software stack documented in the public WEDJAT-X repository. Analytical methods are documented in the supplied project brief.',
    methods:[
      ['Robust statistical analysis','Median, MAD, and Robust Z-Score to describe observations relative to a robust baseline.'],
      ['Bayesian modeling','Probabilistic analysis of biomedical patterns.'],
      ['Isolation Forest','Unsupervised anomaly detection as part of the hybrid approach.'],
      ['Trajectory analysis','Track biomarker changes across sampling time points.'],
      ['Sensor trust evaluation','Assess data quality and reliability before interpreting a finding.'],
      ['Intelligent alert engine','Organize analytical findings into understandable alert states.']
    ],
    workflow:['NASA OSDR-575','Processing & validation','Hybrid analysis','Trust evaluation','Alert classification','Review interface'],
    roadmap:[
      ['Understand the mission','Defined the astronaut health monitoring software challenge and researched its scientific context.'],
      ['Investigate the evidence','Researched NASA OSDR-575 and validated the cleaned project dataset: 8,456 observations, 302 biomarkers, four participants, and seven sampling time points.'],
      ['Design the system','Selected complementary statistical, probabilistic, anomaly-detection, trajectory, and trust-evaluation methods.'],
      ['Build the implementation','Connected data processing and validation with backend services and a frontend interface.'],
      ['Debug, test, and refine','Worked through implementation issues and made engineering decisions under competition time pressure.']
    ],
    challenges:[['Small cohort, longitudinal context','The project dataset contains four participants. The engineering focus is organizing and exploring their observations over time; the supplied material does not establish population-level conclusions.'],['A finding is only as useful as its evidence','Sensor trust and data validation sit alongside detection methods so that data quality remains visible in the analytical workflow.'],['Independent delivery under pressure','I owned the handoffs between research, architecture, implementation, and testing rather than dividing them among a team.']],
    milestones:['Researched and validated the project dataset.','Designed and implemented a hybrid analytical architecture.','Built backend and frontend components and worked through debugging and testing.','Received the Galactic Problem Solver participation recognition shown on the original certificate.'],
    outcome:'An independently engineered astronaut health monitoring prototype and documented participation in NASA Space Apps Challenge 2026. The certificate recognizes participation and problem-solving efforts; no competition ranking, NASA employment, or endorsement is claimed.',
    resultsNote:'Quantitative model-performance results and medical conclusions have not been supplied.',
    github:'https://github.com/krestya79-crypto/WEDJAT-X',demo:null,
    certificate:asset('images/case-studies/nasa-certificate-original.jpg'),certificateName:'Ahmed Waleed Reda Gad',
    screenshots:[],artifacts:[
      {src:asset('images/case-studies/nasa-biomarker-trends-original.png'),alt:'Original WEDJAT-X repository report figure showing longitudinal biomarker plots',caption:'Original exploratory report figure: biomarker trends over time. Reproduced unchanged from WEDJAT-X / reports / figures; not an application screenshot.'},
      {src:asset('images/case-studies/nasa-data-quality-original.png'),alt:'Original WEDJAT-X repository report figure showing assay completeness and missingness',caption:'Original exploratory report figure: assay completeness and missingness. Reproduced unchanged from WEDJAT-X / reports / figures; no additional scientific conclusion is asserted.'}
    ],sources:[['NASA OSD-575 dataset','https://osdr.nasa.gov/bio/repo/data/studies/OSD-575'],['WEDJAT-X technical documentation','https://github.com/krestya79-crypto/WEDJAT-X#readme']],
  },
  {
    id:'ecomind',eyebrow:'ENVIRONMENTAL INTELLIGENCE / TEAM LEADERSHIP',name:'EcoMind AI',shortName:'EcoMind',event:'Green Loop Competition',date:'September 2026',location:'University hackathon',role:'Team Leader',recognition:'4th Place — Top 5',theme:'environment',
    description:'Environmental questions. Knowledge-grounded answers. An agentic RAG prototype, built through shared effort and clear technical direction.',
    overview:'I led a team to design and build an Environmental Agentic RAG Chatbot for the Green Loop Competition. I directed the architecture and coordinated the technical work, UI, business model, and presentation.',
    problem:'Environmental questions need domain-specific context. The project explored how a specialized knowledge base and retrieval-augmented generation could support knowledge-grounded, context-aware answers.',
    why:'The project connects a defined information domain with an intelligent interaction layer, making the source context part of the answer-building process.',
    objectives:['Build an environmental chatbot with a specialized knowledge base.','Connect that knowledge base to a RAG pipeline.','Add an agentic layer to the workflow.','Coordinate a working prototype and competition presentation.'],
    contribution:'As team leader, I directed the system architecture and the connection between the environmental knowledge base and RAG pipeline. I coordinated work across the business model, UI, technical architecture, and presentation.',
    technologies:['Agentic AI','Retrieval-augmented generation','Environmental knowledge base'],technologyNote:'Specific model providers, frameworks, vector stores, and deployment infrastructure have not been supplied.',
    methods:[['Specialized knowledge base','Environmental information provides the domain context.'],['Retrieval-augmented generation','The retrieval pipeline connects relevant source context to answer generation.'],['Agentic workflow','An agentic layer works with retrieval and generation to produce context-aware answers.'],['Prototype integration','The team brought architecture, UI, business model, and presentation into one working prototype.']],
    workflow:['Environmental question','Agentic layer','Knowledge retrieval','Context-aware generation','Chatbot response'],
    roadmap:[['Frame the concept','Defined an environmental chatbot around domain-specific knowledge.'],['Connect the knowledge','Directed the specialized knowledge base and RAG pipeline architecture.'],['Coordinate the team','Aligned the business model, UI, architecture, and presentation work.'],['Deliver the prototype','Turned the concept into a working prototype for the competition.']],
    challenges:[['Grounding answers in the domain','The technical challenge was connecting relevant environmental knowledge to generation.'],['Coordinating parallel work','Leadership meant keeping technical architecture, UI, business planning, and presentation moving together.']],
    milestones:['Designed and built the environmental chatbot prototype.','Directed the knowledge-base and RAG architecture.','Led coordination across multiple project workstreams.','Placed 4th, within the competition’s Top 5.'],
    outcome:'A working Environmental Agentic RAG Chatbot prototype. The team achieved 4th Place — Top 5 at the Green Loop Competition.',resultsNote:'No additional performance metrics have been supplied.',
    github:null,demo:null,screenshots:[],sources:[],
  },
  {
    id:'sakina',eyebrow:'HUMAN-CENTERED AI / COLLABORATIVE ENGINEERING',name:'Sakina AI',shortName:'Sakina',event:'Creativa Mansoura Hackathon',date:'August 2026',location:'Creativa Mansoura',role:'Team contributor',recognition:'Working live demo developed',theme:'human',partners:['Orange','ITIDA','Instant Software Solutions'],
    description:'A mental health understanding platform, brought from an initial idea to a working demo by a newly formed hackathon team.',
    overview:'Sakina AI is an AI-powered mental health understanding platform using retrieval-augmented generation and LLM integration. I contributed to data preparation, document processing, pipelines, and AI system architecture.',
    problem:'The project explored how AI could help users better understand their mental and emotional state, with retrieved information supporting the interaction.',
    why:'The focus was a human-centered understanding experience and the engineering needed to connect prepared information, retrieval, and language-model interaction.',
    objectives:['Build an AI-powered mental health understanding platform.','Connect document processing and retrieval to LLM integration.','Collaborate with a newly formed team under hackathon time constraints.','Take the concept through to a working live demo.'],
    contribution:'I worked hands-on with data preparation and pipelines, document processing, and AI system architecture. I collaborated with a newly formed team to progress from the initial idea to a working live demo under tight time constraints.',
    technologies:['Retrieval-augmented generation','LLM integration','Document processing','Data pipelines'],technologyNote:'Specific frameworks, model providers, and deployment infrastructure have not been supplied.',
    methods:[['Data preparation','Prepare the information used by the platform.'],['Document processing','Process documents for the retrieval workflow.'],['Retrieval & LLM integration','Connect retrieved context with the language-model interaction.'],['Demo integration','Bring the components into a working experience with the team.']],
    workflow:['Prepared documents','Processing pipeline','Context retrieval','LLM integration','Understanding interface'],
    roadmap:[['Shape the idea','Worked with a newly formed team on the mental health understanding concept.'],['Prepare the information','Contributed to data preparation, document processing, and pipelines.'],['Connect the AI system','Contributed to AI system architecture, RAG, and LLM integration.'],['Bring it together','Collaborated on a working live demo during the hackathon.']],
    challenges:[['Building a shared direction quickly','The team formed around the hackathon and developed the concept under tight time constraints.'],['Connecting the data to the experience','Data preparation, document processing, retrieval, and the interface needed to work as one system.']],
    milestones:['Developed the initial concept with the team.','Prepared data and document-processing pipelines.','Integrated RAG and LLM capabilities into the architecture.','Reached a working live demo during the hackathon.'],
    outcome:'A working AI-powered mental health understanding demo, developed at the Creativa Mansoura Hackathon with Orange, ITIDA, and Instant Software Solutions. No competition ranking is claimed.',resultsNote:'The demo was developed during the event. A public demo URL and performance measurements have not been supplied.',
    github:'https://github.com/krestya79-crypto/Sakina',demo:null,screenshots:[],sources:[],
  }
];

export const findCaseStudy=id=>caseStudies.find(project=>project.id===id);
