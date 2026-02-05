import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'assessment', label: 'Skills Assessment', icon: '🎯' },
    { id: 'courses', label: 'My Courses', icon: '📖' },
    { id: 'ai-literacy', label: 'AI Literacy', icon: '🤖' },
    { id: 'vuca', label: 'VUCA Navigator', icon: '🧭' },
    { id: 'rotation', label: 'Rotational Programs', icon: '🔄' },
    { id: 'certificates', label: 'Certificates', icon: '🏆' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  const userStats = {
    coursesCompleted: 12,
    hoursLearned: 48,
    assessmentScore: 87,
    certificates: 4,
  }

  const enrolledCourses = [
    { id: 1, title: 'AI Foundations & Applications', progress: 75, category: 'AI Literacy', color: '#0ea5e9' },
    { id: 2, title: 'Discover Your Purpose', progress: 100, category: 'Assessment', color: '#6366f1' },
    { id: 3, title: 'Thriving in VUCA World', progress: 45, category: 'Mindset', color: '#f59e0b' },
    { id: 4, title: 'Cross-Functional Leadership', progress: 20, category: 'Rotation', color: '#10b981' },
  ]

  const upcomingActivities = [
    { id: 1, title: 'Live Workshop: AI Tools Masterclass', time: 'Today, 3:00 PM', type: 'workshop' },
    { id: 2, title: 'Assessment Deadline: Career Mapping', time: 'Tomorrow, 5:00 PM', type: 'deadline' },
    { id: 3, title: 'Rotation Session: Marketing Dept', time: 'Wed, 10:00 AM', type: 'rotation' },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewContent stats={userStats} courses={enrolledCourses} activities={upcomingActivities} />
      case 'assessment':
        return <AssessmentContent />
      case 'courses':
        return <CoursesContent courses={enrolledCourses} />
      case 'ai-literacy':
        return <AILiteracyContent />
      case 'vuca':
        return <VUCAContent />
      case 'rotation':
        return <RotationContent />
      case 'certificates':
        return <CertificatesContent />
      case 'settings':
        return <SettingsContent />
      default:
        return <OverviewContent stats={userStats} courses={enrolledCourses} activities={upcomingActivities} />
    }
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand" onClick={() => navigate('/')}>
            <span className="brand-icon">📚</span>
            {sidebarOpen && <span className="brand-text">DICC Learning</span>}
          </div>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {sidebarOpen && <span className="sidebar-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-item logout" onClick={() => navigate('/auth')}>
            <span className="sidebar-icon">🚪</span>
            {sidebarOpen && <span className="sidebar-label">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">
            <h1 className="page-title">
              {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="header-right">
            <div className="search-box">
              <input type="text" placeholder="Search courses, topics..." />
              <span className="search-icon">🔍</span>
            </div>
            <button className="notification-btn">
              <span>🔔</span>
              <span className="notification-badge">3</span>
            </button>
            <div className="user-menu">
              <div className="user-avatar">JD</div>
              <div className="user-info">
                <span className="user-name">John Doe</span>
                <span className="user-role">Learner</span>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

// Overview Section
function OverviewContent({ stats, courses, activities }) {
  return (
    <div className="overview">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>📖</div>
          <div className="stat-info">
            <span className="stat-value">{stats.coursesCompleted}</span>
            <span className="stat-label">Courses Completed</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' }}>⏱️</div>
          <div className="stat-info">
            <span className="stat-value">{stats.hoursLearned}h</span>
            <span className="stat-label">Hours Learned</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}>🎯</div>
          <div className="stat-info">
            <span className="stat-value">{stats.assessmentScore}%</span>
            <span className="stat-label">Assessment Score</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>🏆</div>
          <div className="stat-info">
            <span className="stat-value">{stats.certificates}</span>
            <span className="stat-label">Certificates</span>
          </div>
        </div>
      </div>

      <div className="overview-grid">
        {/* Continue Learning */}
        <div className="dashboard-card continue-learning">
          <div className="card-header">
            <h2>Continue Learning</h2>
            <a href="#" className="view-all">View All</a>
          </div>
          <div className="course-list">
            {courses.map(course => (
              <div key={course.id} className="course-item">
                <div className="course-color" style={{ background: course.color }}></div>
                <div className="course-details">
                  <span className="course-category">{course.category}</span>
                  <h3>{course.title}</h3>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${course.progress}%`, background: course.color }}></div>
                    </div>
                    <span className="progress-text">{course.progress}%</span>
                  </div>
                </div>
                <button className="continue-btn">{course.progress === 100 ? 'Review' : 'Continue'}</button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Activities */}
        <div className="dashboard-card upcoming">
          <div className="card-header">
            <h2>Upcoming Activities</h2>
          </div>
          <div className="activity-list">
            {activities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-icon ${activity.type}`}>
                  {activity.type === 'workshop' ? '📺' : activity.type === 'deadline' ? '📅' : '🔄'}
                </div>
                <div className="activity-info">
                  <h4>{activity.title}</h4>
                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-card">
            <span className="action-icon">🎯</span>
            <span className="action-label">Take Assessment</span>
          </button>
          <button className="action-card">
            <span className="action-icon">📚</span>
            <span className="action-label">Browse Courses</span>
          </button>
          <button className="action-card">
            <span className="action-icon">🤖</span>
            <span className="action-label">AI Tools</span>
          </button>
          <button className="action-card">
            <span className="action-icon">💬</span>
            <span className="action-label">Get Help</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Assessment Section
function AssessmentContent() {
  const assessmentTypes = [
    { id: 1, title: 'Career Interest Inventory', description: 'Discover your ideal career path based on interests and values', duration: '20 min', status: 'completed', score: 92 },
    { id: 2, title: 'Skills Gap Analysis', description: 'Identify areas for growth and recommended learning paths', duration: '15 min', status: 'completed', score: 85 },
    { id: 3, title: 'Learning Style Assessment', description: 'Understand how you learn best to optimize your journey', duration: '10 min', status: 'in-progress' },
    { id: 4, title: 'Personality & Work Style', description: 'Map your personality traits to 50+ professions', duration: '25 min', status: 'locked' },
  ]

  return (
    <div className="assessment-section">
      <div className="assessment-hero">
        <div className="assessment-hero-content">
          <h2>Your Skills Assessment Journey</h2>
          <p>Complete assessments to unlock personalized course recommendations and career insights.</p>
          <div className="assessment-progress">
            <div className="assessment-progress-bar">
              <div className="assessment-progress-fill" style={{ width: '50%' }}></div>
            </div>
            <span>2 of 4 completed</span>
          </div>
        </div>
        <div className="assessment-hero-visual">🎯</div>
      </div>

      <div className="assessment-grid">
        {assessmentTypes.map(assessment => (
          <div key={assessment.id} className={`assessment-card ${assessment.status}`}>
            <div className="assessment-status-badge">{assessment.status.replace('-', ' ')}</div>
            <h3>{assessment.title}</h3>
            <p>{assessment.description}</p>
            <div className="assessment-meta">
              <span>⏱️ {assessment.duration}</span>
              {assessment.score && <span>Score: {assessment.score}%</span>}
            </div>
            <button className="btn btn-primary" disabled={assessment.status === 'locked'}>
              {assessment.status === 'completed' ? 'View Results' : assessment.status === 'in-progress' ? 'Continue' : 'Start'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Courses Section
function CoursesContent({ courses }) {
  const allCourses = [
    ...courses,
    { id: 5, title: 'Data-Driven Decision Making', progress: 0, category: 'AI Literacy', color: '#0ea5e9' },
    { id: 6, title: 'Emotional Intelligence at Work', progress: 0, category: 'Mindset', color: '#f59e0b' },
  ]

  return (
    <div className="courses-section">
      <div className="courses-filter">
        <button className="filter-btn active">All Courses</button>
        <button className="filter-btn">In Progress</button>
        <button className="filter-btn">Completed</button>
        <button className="filter-btn">Not Started</button>
      </div>

      <div className="courses-grid-dashboard">
        {allCourses.map(course => (
          <div key={course.id} className="course-card-dashboard">
            <div className="course-thumbnail" style={{ background: course.color }}>
              {course.progress === 100 && <span className="completed-badge">✓ Completed</span>}
            </div>
            <div className="course-card-content">
              <span className="course-tag">{course.category}</span>
              <h3>{course.title}</h3>
              <div className="course-progress-wrapper">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${course.progress}%`, background: course.color }}></div>
                </div>
                <span>{course.progress}% complete</span>
              </div>
              <button className="btn btn-primary">
                {course.progress === 0 ? 'Start Course' : course.progress === 100 ? 'Review' : 'Continue'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// AI Literacy Section
function AILiteracyContent() {
  const modules = [
    { id: 1, title: 'Introduction to AI', lessons: 8, completed: 8, icon: '🧠' },
    { id: 2, title: 'Machine Learning Basics', lessons: 12, completed: 9, icon: '📊' },
    { id: 3, title: 'AI Tools for Productivity', lessons: 10, completed: 4, icon: '🛠️' },
    { id: 4, title: 'Ethics in AI', lessons: 6, completed: 0, icon: '⚖️' },
    { id: 5, title: 'AI in Your Industry', lessons: 8, completed: 0, icon: '🏢' },
  ]

  return (
    <div className="ai-literacy-section">
      <div className="ai-hero">
        <div className="ai-hero-content">
          <h2>Master AI Literacy</h2>
          <p>Learn to understand, leverage, and collaborate with AI to amplify your capabilities.</p>
        </div>
        <div className="ai-stats">
          <div className="ai-stat">
            <span className="ai-stat-value">21</span>
            <span className="ai-stat-label">Lessons Completed</span>
          </div>
          <div className="ai-stat">
            <span className="ai-stat-value">44</span>
            <span className="ai-stat-label">Total Lessons</span>
          </div>
        </div>
      </div>

      <div className="modules-list">
        {modules.map(module => (
          <div key={module.id} className="module-card">
            <div className="module-icon">{module.icon}</div>
            <div className="module-info">
              <h3>{module.title}</h3>
              <div className="module-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(module.completed / module.lessons) * 100}%` }}></div>
                </div>
                <span>{module.completed}/{module.lessons} lessons</span>
              </div>
            </div>
            <button className="btn btn-outline">
              {module.completed === 0 ? 'Start' : module.completed === module.lessons ? 'Review' : 'Continue'}
            </button>
          </div>
        ))}
      </div>

      <div className="ai-tools-section">
        <h2>AI Tools Playground</h2>
        <div className="tools-grid">
          <div className="tool-card">
            <span className="tool-icon">💬</span>
            <h3>ChatBot Assistant</h3>
            <p>Practice prompting techniques</p>
            <button className="btn btn-primary">Launch</button>
          </div>
          <div className="tool-card">
            <span className="tool-icon">🎨</span>
            <h3>Image Generator</h3>
            <p>Create AI-generated visuals</p>
            <button className="btn btn-primary">Launch</button>
          </div>
          <div className="tool-card">
            <span className="tool-icon">📝</span>
            <h3>Writing Assistant</h3>
            <p>Enhance your writing with AI</p>
            <button className="btn btn-primary">Launch</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// VUCA Section
function VUCAContent() {
  const vucaModules = [
    { letter: 'V', title: 'Volatility', description: 'Embrace change and develop adaptability', progress: 80, color: '#6366f1' },
    { letter: 'U', title: 'Uncertainty', description: 'Navigate ambiguity with confidence', progress: 60, color: '#0ea5e9' },
    { letter: 'C', title: 'Complexity', description: 'Simplify complex challenges', progress: 40, color: '#f59e0b' },
    { letter: 'A', title: 'Ambiguity', description: 'Make decisions with incomplete info', progress: 20, color: '#10b981' },
  ]

  return (
    <div className="vuca-section">
      <div className="vuca-hero">
        <h2>Navigate the VUCA World</h2>
        <p>Develop the mindset and skills to thrive in Volatile, Uncertain, Complex, and Ambiguous environments.</p>
      </div>

      <div className="vuca-grid">
        {vucaModules.map(module => (
          <div key={module.letter} className="vuca-card" style={{ borderTopColor: module.color }}>
            <div className="vuca-letter" style={{ color: module.color }}>{module.letter}</div>
            <h3>{module.title}</h3>
            <p>{module.description}</p>
            <div className="vuca-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${module.progress}%`, background: module.color }}></div>
              </div>
              <span>{module.progress}% complete</span>
            </div>
            <button className="btn btn-outline">Continue Learning</button>
          </div>
        ))}
      </div>

      <div className="vuca-resources">
        <h2>Resources & Tools</h2>
        <div className="resources-grid">
          <div className="resource-card">
            <span className="resource-icon">📚</span>
            <h3>Case Studies</h3>
            <p>Real-world VUCA scenarios</p>
          </div>
          <div className="resource-card">
            <span className="resource-icon">🎮</span>
            <h3>Simulations</h3>
            <p>Interactive decision games</p>
          </div>
          <div className="resource-card">
            <span className="resource-icon">🧘</span>
            <h3>Mindfulness</h3>
            <p>Stress management tools</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Rotation Section
function RotationContent() {
  const rotations = [
    { id: 1, department: 'Marketing', dates: 'Jan 15 - Feb 15', status: 'completed', rating: 4.8 },
    { id: 2, department: 'Engineering', dates: 'Feb 20 - Mar 20', status: 'current', rating: null },
    { id: 3, department: 'Finance', dates: 'Apr 1 - May 1', status: 'upcoming', rating: null },
    { id: 4, department: 'Operations', dates: 'May 15 - Jun 15', status: 'available', rating: null },
  ]

  return (
    <div className="rotation-section">
      <div className="rotation-hero">
        <h2>Rotational Programs</h2>
        <p>Gain diverse perspectives through cross-functional experiences with different departments.</p>
      </div>

      <div className="rotation-timeline">
        <h3>Your Rotation Journey</h3>
        <div className="timeline">
          {rotations.map((rotation, index) => (
            <div key={rotation.id} className={`timeline-item ${rotation.status}`}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>{rotation.department}</h4>
                <span className="timeline-dates">{rotation.dates}</span>
                <span className={`timeline-status ${rotation.status}`}>{rotation.status}</span>
                {rotation.rating && <span className="timeline-rating">★ {rotation.rating}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="available-rotations">
        <h3>Available Rotations</h3>
        <div className="rotation-cards">
          <div className="rotation-card">
            <h4>Product Development</h4>
            <p>Work with product teams to understand innovation cycles</p>
            <span className="rotation-duration">4 weeks</span>
            <button className="btn btn-primary">Apply</button>
          </div>
          <div className="rotation-card">
            <h4>Customer Success</h4>
            <p>Learn customer-facing skills and relationship management</p>
            <span className="rotation-duration">4 weeks</span>
            <button className="btn btn-primary">Apply</button>
          </div>
          <div className="rotation-card">
            <h4>Data Analytics</h4>
            <p>Explore data-driven decision making processes</p>
            <span className="rotation-duration">6 weeks</span>
            <button className="btn btn-primary">Apply</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Certificates Section
function CertificatesContent() {
  const certificates = [
    { id: 1, title: 'AI Foundations', date: 'Jan 15, 2024', badge: '🤖' },
    { id: 2, title: 'Skills Assessment Master', date: 'Dec 20, 2023', badge: '🎯' },
    { id: 3, title: 'VUCA Navigator Level 1', date: 'Nov 10, 2023', badge: '🧭' },
    { id: 4, title: 'Cross-Functional Excellence', date: 'Oct 5, 2023', badge: '🔄' },
  ]

  return (
    <div className="certificates-section">
      <div className="certificates-hero">
        <h2>Your Achievements</h2>
        <p>Showcase your learning accomplishments and professional growth.</p>
      </div>

      <div className="certificates-grid">
        {certificates.map(cert => (
          <div key={cert.id} className="certificate-card">
            <div className="certificate-badge">{cert.badge}</div>
            <h3>{cert.title}</h3>
            <span className="certificate-date">Earned: {cert.date}</span>
            <div className="certificate-actions">
              <button className="btn btn-outline">View</button>
              <button className="btn btn-primary">Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Settings Section
function SettingsContent() {
  return (
    <div className="settings-section">
      <div className="settings-group">
        <h2>Profile Settings</h2>
        <div className="settings-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" defaultValue="John Doe" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" defaultValue="john.doe@example.com" />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea defaultValue="Passionate learner exploring AI and future-ready skills."></textarea>
          </div>
          <button className="btn btn-primary">Save Changes</button>
        </div>
      </div>

      <div className="settings-group">
        <h2>Notifications</h2>
        <div className="settings-toggles">
          <label className="toggle-item">
            <span>Email notifications</span>
            <input type="checkbox" defaultChecked />
          </label>
          <label className="toggle-item">
            <span>Course reminders</span>
            <input type="checkbox" defaultChecked />
          </label>
          <label className="toggle-item">
            <span>Assessment deadlines</span>
            <input type="checkbox" defaultChecked />
          </label>
          <label className="toggle-item">
            <span>Community updates</span>
            <input type="checkbox" />
          </label>
        </div>
      </div>

      <div className="settings-group">
        <h2>Learning Preferences</h2>
        <div className="form-group">
          <label>Preferred Learning Style</label>
          <select defaultValue="visual">
            <option value="visual">Visual</option>
            <option value="auditory">Auditory</option>
            <option value="reading">Reading/Writing</option>
            <option value="kinesthetic">Hands-on</option>
          </select>
        </div>
        <div className="form-group">
          <label>Daily Learning Goal</label>
          <select defaultValue="30">
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
          </select>
        </div>
      </div>
    </div>
  )
}
