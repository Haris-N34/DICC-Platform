import './App.css'

function App() {
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="brand-icon">📚</span>
          <span className="brand-text">DICC Learning</span>
        </div>
        <div className="nav-links">
          <a href="#courses">Courses</a>
          <a href="#features">Features</a>
          <a href="#testimonials">Testimonials</a>
          <button className="btn btn-outline">Sign In</button>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Unlock Your Potential with
            <span className="highlight"> Expert-Led Courses</span>
          </h1>
          <p className="hero-subtitle">
            Join thousands of learners mastering new skills with our interactive
            courses, hands-on projects, and personalized learning paths.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-large">
              Start Learning Free
            </button>
            <button className="btn btn-outline btn-large">
              Browse Courses
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat">
              <span className="stat-number">200+</span>
              <span className="stat-label">Courses</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Instructors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-header">
          <h2 className="section-title">Transform Your Learning Journey</h2>
          <p className="section-subtitle">
            Our platform combines cutting-edge assessment technology with future-ready skills
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Skills Assessment</h3>
            <p>
              Discover your path through our intelligent assessment algorithm.
              Multiple evaluation methods analyze your strengths and passions to
              recommend the perfect learning trajectory from 50+ unique professions.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧭</div>
            <h3>Navigating VUCA</h3>
            <p>
              Thrive in a Volatile, Uncertain, Complex, and Ambiguous world.
              Develop the mindset to find your purpose beyond tasks.
              Transform challenges into opportunities for growth.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Literacy</h3>
            <p>
              Master the language of tomorrow. Understand, leverage, and work
              alongside artificial intelligence to amplify your capabilities
              and stay ahead in the evolving digital landscape.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Rotational Programs</h3>
            <p>
              Experience round-table rotation between faculties. Gain diverse
              perspectives and cross-functional skills that prepare you for
              the interconnected careers of the future.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses" id="courses">
        <div className="section-header">
          <h2 className="section-title">Popular Learning Paths</h2>
          <p className="section-subtitle">
            Start your journey with our most impactful courses designed for the future
          </p>
        </div>
        <div className="courses-grid">
          <div className="course-card">
            <div className="course-image" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <span className="course-badge">Bestseller</span>
            </div>
            <div className="course-content">
              <div className="course-category">Skills Assessment</div>
              <h3>Discover Your Purpose</h3>
              <p>Comprehensive evaluation to map your strengths to career paths</p>
              <div className="course-meta">
                <span>⭐ 4.9</span>
                <span>👥 2,340 students</span>
              </div>
            </div>
          </div>
          <div className="course-card">
            <div className="course-image" style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' }}>
              <span className="course-badge">New</span>
            </div>
            <div className="course-content">
              <div className="course-category">AI Literacy</div>
              <h3>AI Foundations & Applications</h3>
              <p>Master AI concepts and learn to collaborate with intelligent systems</p>
              <div className="course-meta">
                <span>⭐ 4.8</span>
                <span>👥 1,850 students</span>
              </div>
            </div>
          </div>
          <div className="course-card">
            <div className="course-image" style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}>
              <span className="course-badge">Popular</span>
            </div>
            <div className="course-content">
              <div className="course-category">Mindset</div>
              <h3>Thriving in VUCA World</h3>
              <p>Develop resilience and adaptive thinking for uncertain environments</p>
              <div className="course-meta">
                <span>⭐ 4.9</span>
                <span>👥 3,120 students</span>
              </div>
            </div>
          </div>
        </div>
        <div className="courses-cta">
          <button className="btn btn-primary btn-large">View All Courses</button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <div className="section-header">
          <h2 className="section-title">What Our Learners Say</h2>
          <p className="section-subtitle">
            Join thousands who have transformed their careers with us
          </p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The Skills Assessment completely changed my perspective. I discovered strengths I never knew I had and found a career path that truly fits me."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">SA</div>
              <div className="author-info">
                <h4>Sarah Ahmed</h4>
                <span>Product Designer</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The VUCA navigation course gave me the mindset shift I needed. I now approach challenges with confidence and see opportunity everywhere."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">MK</div>
              <div className="author-info">
                <h4>Mohammed Khan</h4>
                <span>Entrepreneur</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"AI Literacy prepared me for the future. I went from fearing AI to leveraging it daily in my work. Best investment in myself."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">LP</div>
              <div className="author-info">
                <h4>Lisa Park</h4>
                <span>Data Analyst</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Future?</h2>
          <p>Join thousands of learners who are building skills for tomorrow's world.</p>
          <button className="btn btn-primary btn-large">Start Your Journey Today</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand-icon">📚</span>
            <span className="brand-text">DICC Learning</span>
            <p>Empowering learners to navigate and thrive in an evolving world.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Platform</h4>
              <a href="#courses">Courses</a>
              <a href="#features">Features</a>
              <a href="#testimonials">Testimonials</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#">Blog</a>
              <a href="#">Help Center</a>
              <a href="#">Community</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 DICC Learning. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
