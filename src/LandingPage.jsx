export default function LandingPage({ onStart }) {
  return (
    <div className="landing-page">
      {/* ── Navbar ── */}
      <nav className="landing-nav">
        <div className="landing-logo">
          <div className="landing-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
          </div>
          FormCraft
        </div>
        <div className="landing-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#export">Export</a>
        </div>
        <button className="landing-btn-outline" onClick={onStart}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 6}}>
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          Launch builder
        </button>
      </nav>

      {/* ── Hero Section ── */}
      <header className="landing-hero">
        <div className="landing-badge">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          No backend · No database · 100% client-side
        </div>
        <h1 className="landing-title">
          Build dynamic forms with <span className="landing-gradient-text">live validation</span>
        </h1>
        <p className="landing-subtitle">
          Drag fields onto a canvas, set validation rules, preview in real time.<br />
          Export as JSON or a ready-to-use React component.
        </p>
        <div className="landing-hero-actions">
          <button className="landing-btn-primary" onClick={onStart}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 6}}>
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Start building
          </button>
          <button className="landing-btn-secondary" onClick={onStart}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 6}}>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            See example
          </button>
        </div>

        {/* Browser Mockup */}
        <div className="landing-mockup">
          <div className="landing-mockup-header">
            <div className="landing-mockup-dots">
              <span style={{background: '#ff5f56'}}></span>
              <span style={{background: '#ffbd2e'}}></span>
              <span style={{background: '#27c93f'}}></span>
            </div>
            <div className="landing-mockup-url">form-builder - live preview</div>
            <div className="landing-mockup-tabs">
              <span className="active">Builder</span>
              <span>Preview</span>
              <span>JSON</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Features Section ── */}
      <section className="landing-features" id="features">
        <div className="landing-section-header">
          <span className="landing-section-tag">WHAT'S INSIDE</span>
          <h2>Everything your form needs</h2>
        </div>
        <div className="landing-grid">
          <div className="landing-card">
            <div className="landing-card-icon" style={{background: '#e0e7ff', color: '#4f46e5'}}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            </div>
            <h3>Drag and drop</h3>
            <p>Place text, select, checkbox, date and signature fields visually.</p>
          </div>
          <div className="landing-card">
            <div className="landing-card-icon" style={{background: '#dcfce7', color: '#16a34a'}}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h3>Live validation</h3>
            <p>isEmail, minLength, regex — errors appear instantly on blur.</p>
          </div>
          <div className="landing-card">
            <div className="landing-card-icon" style={{background: '#fee2e2', color: '#dc2626'}}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </div>
            <h3>Conditional logic</h3>
            <p>Show or hide fields based on what other fields contain.</p>
          </div>
          <div className="landing-card">
            <div className="landing-card-icon" style={{background: '#f3e8ff', color: '#9333ea'}}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </div>
            <h3>Export anywhere</h3>
            <p>Download as JSON schema or a standalone React component.</p>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="landing-how-it-works" id="how-it-works">
        <h2>How it works</h2>
        <div className="landing-timeline">
          <div className="landing-step">
            <div className="landing-step-circle">1</div>
            <h4>Add fields</h4>
            <p>Click from the sidebar to add to canvas</p>
          </div>
          <div className="landing-step">
            <div className="landing-step-circle">2</div>
            <h4>Set rules</h4>
            <p>Validation, conditions, labels in inspector</p>
          </div>
          <div className="landing-step">
            <div className="landing-step-circle">3</div>
            <h4>Preview live</h4>
            <p>Test your form with real-time errors</p>
          </div>
          <div className="landing-step">
            <div className="landing-step-circle">4</div>
            <h4>Export</h4>
            <p>JSON schema or React component</p>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="landing-cta">
        <div className="landing-cta-box">
          <h2>Ready to build your first form?</h2>
          <p>No sign up. No backend. Works entirely in your browser.</p>
          <div className="landing-cta-actions">
            <button className="landing-btn-primary" onClick={onStart}>Open builder</button>
            <button className="landing-btn-secondary" onClick={onStart} style={{border: 'none', background: 'transparent'}}>View example form</button>
          </div>
        </div>
      </section>
    </div>
  );
}
