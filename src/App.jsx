import React, { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';
import TopoField from './components/ui/topo-field';
import profileImage from './assets/me.jpeg';
import catImage from './assets/cat.jpeg';

/* ── Scroll-reveal hook ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ── Toast ── */
function Toast({ message, hiding }) {
  return (
    <div className={`toast${hiding ? ' toast--hiding' : ''}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}

/* ── Interactive Terminal Shell ── */
const TERMINAL_TABS = [
  {
    id: 'train',
    label: 'Model Training',
    cmd: 'python train_spam_classifier.py',
    lines: [
      { text: '[1/3] Loading dataset: 5,572 SMS samples (ham / spam)', type: 'output' },
      { text: '[2/3] Vectorizing text with TF-IDF (n-gram: 1-2)...', type: 'output' },
      { text: '[3/3] Fitting Multinomial Naive Bayes...', type: 'output' },
      { text: '✓ Model trained successfully in 0.42s', type: 'success' },
      { text: '✓ Accuracy:  98.57%', type: 'success' },
      { text: '✓ Precision: 97.16%', type: 'success' },
      { text: '✓ F1 Score:  94.48%', type: 'success' },
      { text: 'Saved model artifact -> models/spam_classifier.joblib', type: 'info' },
    ],
  },
  {
    id: 'metrics',
    label: 'Evaluation',
    cmd: 'python evaluate_metrics.py --conf-matrix',
    lines: [
      { text: 'Confusion Matrix on Holdout Test Set (1,115 samples):', type: 'output' },
      { text: '  ├─ True Ham:  965 / 965 (100.0% specificity)', type: 'info' },
      { text: '  └─ True Spam: 135 / 149 (90.61% sensitivity)', type: 'info' },
      { text: '✓ False Positives: 0 (No legitimate SMS misclassified)', type: 'success' },
      { text: '✓ Average Inference Latency: 1.18ms / sample', type: 'success' },
      { text: 'Test completed: All benchmarks passed ✓', type: 'output' },
    ],
  },
  {
    id: 'profile',
    label: 'Profile Info',
    cmd: 'cat nihar_profile.json',
    lines: [
      { text: '{', type: 'output' },
      { text: '  "name": "Nihar Ranjan Nayak",', type: 'info' },
      { text: '  "degree": "B.Tech CSE (AI/ML), 3rd Semester",', type: 'info' },
      { text: '  "focus": ["Machine Learning", "NLP", "Conversational AI"],', type: 'info' },
      { text: '  "status": "Building practical AI projects & open for internships",', type: 'success' },
      { text: '  "location": "India"', type: 'info' },
      { text: '}', type: 'output' },
    ],
  },
];

function InteractiveTerminal({ onCopy }) {
  const [activeTab, setActiveTab] = useState('train');
  const activeData = TERMINAL_TABS.find(t => t.id === activeTab) || TERMINAL_TABS[0];

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(activeData.cmd).then(() => {
      onCopy(`✓ Copied: "${activeData.cmd}"`);
    });
  };

  return (
    <div className="terminal" aria-label="Interactive Terminal demo">
      <div className="terminal__titlebar">
        <span className="terminal__label">bash - 80x24</span>

        {/* Interactive Tabs */}
        <div className="terminal__tabs" role="tablist" aria-label="Terminal views">
          {TERMINAL_TABS.map(tab => (
            <button
              key={tab.id}
              className={`terminal__tab${activeTab === tab.id ? ' terminal__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          className="terminal__copy-btn"
          onClick={handleCopyCmd}
          title="Copy command to clipboard"
          aria-label="Copy terminal command"
        >
          Copy cmd
        </button>
      </div>

      <div className="terminal__body">
        <div className="terminal__line">
          <span className="terminal__prompt">nihar@portfolio:~$</span>
          <span className="terminal__cmd">{activeData.cmd}</span>
          <span className="terminal__cursor" aria-hidden="true" />
        </div>

        {activeData.lines.map((line, idx) => (
          <div
            key={idx}
            className={`terminal__output${line.type === 'success' ? ' terminal__output--success' : line.type === 'info' ? ' terminal__output--info' : ''}`}
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [toast, setToast] = useState(null);
  const [toastHiding, setToastHiding] = useState(false);
  const toastTimer = useRef(null);

  useReveal();

  /* Scroll Progress & Active Section Observer */
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollPercent(scrolled);
      setShowBackToTop(winScroll > 320);

      // Detect active section
      const sections = ['hero', 'about', 'skills', 'projects', 'education', 'achievements', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Close mobile menu on resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  /* Toast Notification */
  const showToast = useCallback((msg) => {
    clearTimeout(toastTimer.current);
    setToastHiding(false);
    setToast(msg);
    toastTimer.current = setTimeout(() => {
      setToastHiding(true);
      setTimeout(() => setToast(null), 250);
    }, 2400);
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText('unknown2006103@gmail.com').then(() => {
      showToast('✓ Email address copied to clipboard');
    });
  }, [showToast]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Global Full-Site Topographic WebGL Background ── */}
      <div
        className="site-background fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        <TopoField density={1.2} speed={0.75} opacity={0.6} />
        {/* Soft dark vignette to ensure optimal text contrast */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 40%, transparent 30%, rgba(10, 14, 23, 0.7) 100%)',
          }}
        />
      </div>

      {/* ── Scroll Progress Bar ── */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollPercent}%` }}
        aria-hidden="true"
      />

      {/* ── Navigation ── */}
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="nav__inner">
          <a href="#hero" className="nav__logo" onClick={closeMenu} aria-label="Home">
            NRN<span>.</span>
          </a>

          {/* Desktop links */}
          <div className={`nav__links${menuOpen ? ' nav__links--open' : ''}`} id="nav-links">
            <a href="#about"        className={activeSection === 'about' ? 'active' : ''} onClick={closeMenu}>About</a>
            <a href="#skills"       className={activeSection === 'skills' ? 'active' : ''} onClick={closeMenu}>Skills</a>
            <a href="#projects"     className={activeSection === 'projects' ? 'active' : ''} onClick={closeMenu}>Projects</a>
            <a href="#education"    className={activeSection === 'education' ? 'active' : ''} onClick={closeMenu}>Education</a>
            <a href="#achievements" className={activeSection === 'achievements' ? 'active' : ''} onClick={closeMenu}>Achievements</a>
            <a href="#contact"      className={activeSection === 'contact' ? 'active' : ''} onClick={closeMenu} style={{ color: 'var(--primary)' }}>Contact</a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`nav__hamburger${menuOpen ? ' nav__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-controls="nav-links"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            id="nav-hamburger"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <main>

        {/* ── 1. HERO ── */}
        <section id="hero" className="hero">
          <div className="container">
            <div className="hero__layout">
              <div className="hero__content reveal">
                <div className="hero__status-badge">
                  <span className="status-dot" aria-hidden="true" />
                  <span>Available for Internships &amp; Collaborations · India</span>
                </div>

                <p className="hero__eyebrow">B.Tech CSE (AI/ML) Student</p>
                <div className="hero__name-lockup">
                  <h1>Nihar Ranjan Nayak</h1>
                  <img className="hero__avatar" src={catImage} alt="Black cat illustration" />
                </div>
                <p className="hero__sub">
                  Aspiring AI/ML Developer &amp; Practical Problem Solver
                </p>
                <p className="hero__desc">
                  Building practical solutions with machine learning, NLP, and conversational AI.
                  Curious, methodical, and focused on turning ideas into clean working software.
                </p>
                <p className="hero__skills">Python · Machine Learning · NLP · Scikit-learn</p>

                <div className="hero__actions">
                  <a href="#projects" className="btn btn--primary btn--shimmer" id="hero-cta-projects">
                    View Projects ↓
                  </a>
                  <a href="#contact" className="btn btn--ghost" id="hero-cta-contact">
                    Get in Touch ↗
                  </a>
                  <button
                    className="btn btn--ghost"
                    onClick={copyEmail}
                    id="hero-cta-copy-email"
                    style={{ fontSize: '0.84rem' }}
                  >
                    📋 Copy Email
                  </button>
                </div>
              </div>

              <div className="hero__portrait reveal reveal--delay-1">
                <div className="hero__portrait-frame">
                  <img src={profileImage} alt="Nihar Ranjan Nayak" />
                  <div className="hero__portrait-caption">
                    <span className="status-dot" aria-hidden="true" />
                    <span>AI/ML developer in progress</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Minimalist Stats Bar */}
            <div className="hero__stats reveal reveal--delay-1">
              <div className="stat-item">
                <div className="stat-value">98.57<span>%</span></div>
                <div className="stat-label">Model Accuracy (Naive Bayes)</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">3<span>+</span></div>
                <div className="stat-label">AI &amp; ML Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">3<span>rd Sem</span></div>
                <div className="stat-label">B.Tech CSE (AI/ML)</div>
              </div>
            </div>

            {/* Interactive Terminal */}
            <div className="reveal reveal--delay-2">
              <InteractiveTerminal onCopy={showToast} />
            </div>

          </div>
        </section>


        {/* ── 2. ABOUT ── */}
        <section id="about" className="section" aria-labelledby="about-heading">
          <div className="container">
            <div className="section-heading reveal">
              <p className="section__label">// about</p>
              <h2 id="about-heading">About Me</h2>
              <p>I am a CSE (AI/ML) student who is still figuring things out one project at a time.</p>
            </div>
            <div className="about__intro reveal reveal--delay-1">
              <p>
                I am interested in AI, machine learning, Python, and software development. Right now,
                I am strengthening my fundamentals and building small practical projects so what I learn
                becomes something I can actually use.
              </p>
              <p>
                I learn best by trying things, checking where they fail, and improving them as I go.
              </p>
            </div>
          </div>
        </section>


        {/* ── 3. SKILLS ── */}
        <section id="skills" className="section" aria-labelledby="skills-heading">
          <div className="container">
            <div className="section-heading reveal">
              <p className="section__label">// learning in progress</p>
              <h2 id="skills-heading">Currently Learning</h2>
              <p>These are the areas I am spending time on right now, without pretending I have finished learning them.</p>
            </div>
            <div className="learning__grid">
              <article className="learning__item reveal reveal--delay-1">
                <span className="learning__number">01</span>
                <div>
                  <h3>Python</h3>
                  <p>Improving my fundamentals and using it for small projects and experiments.</p>
                </div>
              </article>
              <article className="learning__item reveal reveal--delay-2">
                <span className="learning__number">02</span>
                <div>
                  <h3>Machine Learning</h3>
                  <p>Learning how classifiers work and how to evaluate them with real data.</p>
                </div>
              </article>
              <article className="learning__item reveal reveal--delay-3">
                <span className="learning__number">03</span>
                <div>
                  <h3>SQL &amp; DBMS</h3>
                  <p>Practicing queries, database design, and the fundamentals behind storing data.</p>
                </div>
              </article>
              <article className="learning__item reveal reveal--delay-1">
                <span className="learning__number">04</span>
                <div>
                  <h3>Algorithms &amp; Core CS</h3>
                  <p>Working through data structures, algorithms, and the computer science basics behind software.</p>
                </div>
              </article>
              <article className="learning__item reveal reveal--delay-2">
                <span className="learning__number">05</span>
                <div>
                  <h3>NLP &amp; Conversational AI</h3>
                  <p>Exploring how language-focused systems can respond more usefully and responsibly.</p>
                </div>
              </article>
            </div>

            <div className="working-on reveal reveal--delay-2">
              <div className="working-on__heading">
                <p className="section__label">// right now</p>
                <h2>What I&apos;m Working On</h2>
              </div>
              <div className="working-on__list">
                <article className="working-on__item">
                  <h3>Small machine learning projects</h3>
                  <p>Building and testing practical classifiers to understand what happens beyond the theory.</p>
                </article>
                <article className="working-on__item">
                  <h3>My portfolio and web projects</h3>
                  <p>Improving my frontend skills by making this site clearer, more personal, and easier to use.</p>
                </article>
                <article className="working-on__item">
                  <h3>AI and NLP concepts</h3>
                  <p>Exploring conversational AI ideas and learning how to think about useful, responsible systems.</p>
                </article>
              </div>
            </div>
          </div>
        </section>


        {/* ── 4. PROJECTS ── */}
        <section id="projects" className="section" aria-labelledby="projects-heading">
          <div className="container">
            <div className="section-heading reveal">
              <p className="section__label">// featured work</p>
              <h2 id="projects-heading">Featured Projects</h2>
              <p>
                Real-world projects showcasing predictive modeling, deepfake detection concepts, and conversational AI.
              </p>
            </div>
            <div className="projects__grid">

              {/* Project 01 */}
              <article className="project-card reveal reveal--delay-1" id="project-spam-classifier">
                <div className="project-card__header">
                  <span className="project-card__num">01</span>
                  <span className="project-card__category">Machine Learning</span>
                </div>
                <div className="project-card__body">
                  <h3 className="project-card__title">Spam Message Classifier</h3>
                  <div className="project-card__tags">
                    <span className="skill-tag skill-tag--ai">NLP</span>
                    <span className="skill-tag">Python</span>
                    <span className="skill-tag">Scikit-learn</span>
                  </div>
                  <p className="project-card__desc">
                    An end-to-end machine learning system that classifies SMS messages as spam or legitimate.
                    Utilizes TF-IDF feature extraction and Multinomial Naive Bayes, evaluated rigorously with
                    cross-validation and confusion matrix analysis.
                  </p>
                  <div className="project-card__metrics">
                    <div className="metric">
                      <span className="metric__value">98.57%</span>
                      <span className="metric__label">Accuracy</span>
                    </div>
                    <div className="metric">
                      <span className="metric__value">97.16%</span>
                      <span className="metric__label">Precision</span>
                    </div>
                    <div className="metric">
                      <span className="metric__value">91.95%</span>
                      <span className="metric__label">Recall</span>
                    </div>
                    <div className="metric">
                      <span className="metric__value">94.48%</span>
                      <span className="metric__label">F1 Score</span>
                    </div>
                  </div>
                </div>
                <div className="project-card__footer">
                  <div className="project-card__tools">
                    <span className="skill-tag">NumPy</span>
                    <span className="skill-tag">Pandas</span>
                    <span className="skill-tag">TF-IDF</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                    Production Ready ✓
                  </span>
                </div>
              </article>

              {/* Project 02 */}
              <article className="project-card reveal reveal--delay-2" id="project-truthlens">
                <div className="project-card__header">
                  <span className="project-card__num">02</span>
                  <span className="project-card__category">Computer Vision &amp; XAI</span>
                </div>
                <div className="project-card__body">
                  <h3 className="project-card__title">TruthLens AI</h3>
                  <div className="project-card__tags">
                    <span className="skill-tag skill-tag--ai">Deepfake Detection</span>
                    <span className="skill-tag skill-tag--ai">Explainable AI</span>
                    <span className="skill-tag">Hackathon</span>
                  </div>
                  <p className="project-card__desc">
                    <strong>Detect. Explain. Verify.</strong> An AI architecture designed for detecting manipulated
                    or deepfake digital media. Delivers transparent, explainable verification scores to foster trust
                    in automated media forensics.
                  </p>
                  <div className="project-features">
                    <span className="project-feature">Facial artifact &amp; temporal inconsistency detection</span>
                    <span className="project-feature">Confidence scoring with visual explainability maps</span>
                    <span className="project-feature">Lightweight inference for real-time verification</span>
                  </div>
                </div>
                <div className="project-card__footer">
                  <div className="project-card__tools">
                    <span className="skill-tag skill-tag--ai">AI / Vision</span>
                    <span className="skill-tag">XAI</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontFamily: 'var(--font-mono)' }}>
                    Hackathon Finalist 🏆
                  </span>
                </div>
              </article>

              {/* Project 03 */}
              <article className="project-card reveal reveal--delay-3" id="project-emotion-ai">
                <div className="project-card__header">
                  <span className="project-card__num">03</span>
                  <span className="project-card__category">Conversational AI &amp; NLP</span>
                </div>
                <div className="project-card__body">
                  <h3 className="project-card__title">Emotion-Aware Conversational AI</h3>
                  <div className="project-card__tags">
                    <span className="skill-tag skill-tag--ai">Conversational AI</span>
                    <span className="skill-tag skill-tag--ai">NLP</span>
                    <span className="skill-tag">Safety Guardrails</span>
                  </div>
                  <p className="project-card__desc">
                    A dialogue system engineered to detect subtle affective states in user prompts and tailor empathetic,
                    contextually balanced replies with cognitive-behavioral structure and ethical safeguards.
                  </p>
                  <div className="project-features">
                    <span className="project-feature">Sentiment &amp; emotional valence scoring</span>
                    <span className="project-feature">CBT-informed dialog flow with empathy bounds</span>
                    <span className="project-feature">Consent-based escalation protocol for human support</span>
                  </div>
                </div>
                <div className="project-card__footer">
                  <div className="project-card__tools">
                    <span className="skill-tag skill-tag--ai">NLP</span>
                    <span className="skill-tag">Prompt Engineering</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}>
                    Research Prototype 🧪
                  </span>
                </div>
              </article>

            </div>
          </div>
        </section>


        {/* ── 5. EDUCATION ── */}
        <section id="education" className="section" aria-labelledby="education-heading">
          <div className="container">
            <div className="section-heading reveal">
              <p className="section__label">// academic background</p>
              <h2 id="education-heading">Education</h2>
              <p>
                Formal academic training in computer science, software engineering, and artificial intelligence.
              </p>
            </div>
            <div className="education__card reveal" id="education-btech">
              <div>
                <span className="education__badge">Currently Pursuing · 3rd Semester</span>
                <h3 className="education__degree">B.Tech in Computer Science &amp; Engineering</h3>
                <p style={{ color: 'var(--secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                  Specialization: Artificial Intelligence &amp; Machine Learning
                </p>
              </div>
              <div>
                <p className="education__subjects-label">Relevant Coursework &amp; Domains</p>
                <div className="education__subjects">
                  {[
                    'Machine Learning', 'Artificial Intelligence', 'Data Structures & Algorithms',
                    'Database Management Systems', 'Computer Organization & Architecture',
                    'Applied Statistics', 'Cloud Computing', 'Object-Oriented Programming'
                  ].map(subj => (
                    <span key={subj} className="subject-item">{subj}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ── 6. ACHIEVEMENTS ── */}
        <section id="achievements" className="section" aria-labelledby="achievements-heading">
          <div className="container">
            <div className="section-heading reveal">
              <p className="section__label">// milestones</p>
              <h2 id="achievements-heading">Achievements &amp; Activities</h2>
              <p>
                Key milestones from hackathons, machine learning projects, and technical presentations.
              </p>
            </div>
            <div className="achievements__list">
              {[
                { icon: '🏆', text: 'Participated in competitive AI/ML learnathons and hackathons, designing high-impact technical concepts.' },
                { icon: '⚡', text: 'Built and evaluated an end-to-end ML spam message classifier achieving 98.57% test accuracy with 0 false positives.' },
                { icon: '🎤', text: 'Delivered technical presentations on emerging AI architectures and trustworthy deepfake verification.' },
                { icon: '⚙️', text: 'Architected automated workflows and AI integration pipelines leveraging Make.com and PromptLayer.' },
                { icon: '📈', text: 'Continuously contributing to practical software projects across algorithms, data structures, and machine learning.' },
              ].map((item, i) => (
                <div key={i} className={`achievement-item reveal reveal--delay-${(i % 3) + 1}`} id={`achievement-${i + 1}`}>
                  <span className="achievement-item__icon" aria-hidden="true">{item.icon}</span>
                  <p className="achievement-item__text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ── 7. CONTACT ── */}
        <section id="contact" className="section" aria-labelledby="contact-heading">
          <div className="container">
            <div className="section-heading reveal">
              <p className="section__label">// connect</p>
              <h2 id="contact-heading">Get in Touch</h2>
              <p>
                Feel free to reach out for internship opportunities, project collaborations, or technical discussions.
              </p>
            </div>
            <div className="contact__inner">
              <div className="reveal">
                <p className="contact__info-label">Direct Communication Channels</p>
                <div className="contact__links">
                  {/* Email — copyable */}
                  <button
                    className="contact__link contact__link--copyable"
                    onClick={copyEmail}
                    id="contact-email"
                    aria-label="Copy email address"
                  >
                    <span className="contact__link-icon">Email</span>
                    <span className="contact__link-value">unknown2006103@gmail.com</span>
                    <span className="contact__copy-hint">click to copy 📋</span>
                  </button>

                  <a href="https://github.com/Nihar-2006" target="_blank" rel="noopener noreferrer" className="contact__link" id="contact-github">
                    <span className="contact__link-icon">GitHub</span>
                    <span className="contact__link-value">github.com/Nihar-2006</span>
                    <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--secondary)' }}>↗</span>
                  </a>

                  <a href="https://linkedin.com/in/unknown2006" target="_blank" rel="noopener noreferrer" className="contact__link" id="contact-linkedin">
                    <span className="contact__link-icon">LinkedIn</span>
                    <span className="contact__link-value">linkedin.com/in/unknown2006</span>
                    <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--secondary)' }}>↗</span>
                  </a>

                  <div className="contact__link" id="contact-location">
                    <span className="contact__link-icon">Location</span>
                    <span className="contact__link-value">India</span>
                  </div>
                </div>
              </div>

              <div className="contact__cta-card reveal reveal--delay-2" id="contact-cta">
                <h3>Open to Opportunities</h3>
                <p>
                  I am actively seeking software and AI/ML internships, research assistant roles, and collaborative
                  projects where I can apply my skills and build meaningful systems.
                </p>
                <a href="mailto:unknown2006103@gmail.com" className="btn btn--primary btn--shimmer" id="contact-cta-btn">
                  Send an Email ✉
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="footer" role="contentinfo">
        <div className="footer__inner">
          <p className="footer__copy">
            © 2026 <span>Nihar Ranjan Nayak</span> · Built with React &amp; Solar Ink.
          </p>
          <p className="footer__copy" style={{ opacity: 0.6 }}>
            CSE (AI/ML) · India
          </p>
        </div>
      </footer>

      {/* ── Floating Back to Top ── */}
      <button
        className={`back-to-top${showBackToTop ? ' back-to-top--visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top of page"
        title="Back to top"
      >
        ↑
      </button>

      {/* ── Toast ── */}
      {toast && <Toast message={toast} hiding={toastHiding} />}
    </>
  );
}

export default App;
