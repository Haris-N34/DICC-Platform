import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

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
    { id: 1, title: 'AI Foundations & Applications', progress: 75, category: 'AI Literacy', color: 'from-cyan-500 to-blue-500' },
    { id: 2, title: 'Discover Your Purpose', progress: 100, category: 'Assessment', color: 'from-indigo-500 to-purple-500' },
    { id: 3, title: 'Thriving in VUCA World', progress: 45, category: 'Mindset', color: 'from-amber-500 to-orange-500' },
    { id: 4, title: 'Cross-Functional Leadership', progress: 20, category: 'Rotation', color: 'from-emerald-500 to-teal-500' },
  ]

  const upcomingActivities = [
    { id: 1, title: 'Live Workshop: AI Tools Masterclass', time: 'Today, 3:00 PM', type: 'workshop' },
    { id: 2, title: 'Assessment Deadline: Career Mapping', time: 'Tomorrow, 5:00 PM', type: 'deadline' },
    { id: 3, title: 'Rotation Session: Marketing Dept', time: 'Wed, 10:00 AM', type: 'rotation' },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewContent stats={userStats} courses={enrolledCourses} activities={upcomingActivities} setActiveSection={setActiveSection} />
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
        return <OverviewContent stats={userStats} courses={enrolledCourses} activities={upcomingActivities} setActiveSection={setActiveSection} />
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen border-r border-slate-800 bg-slate-900 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 p-4">
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={() => navigate('/')}
            >
              <span className="text-2xl">📚</span>
              {sidebarOpen && (
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text font-bold text-transparent">
                  DICC Learning
                </span>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                </button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t border-slate-800 p-4">
            <button
              onClick={() => navigate('/auth')}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <span className="text-xl">🚪</span>
              {sidebarOpen && <span className="text-sm font-medium">Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-bold">
              {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses, topics..."
                  className="w-72 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 pl-10 text-sm text-white placeholder-slate-500 transition focus:border-indigo-500 focus:outline-none"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
              </div>
              <button className="relative rounded-xl bg-slate-900 p-2 text-slate-400 transition hover:text-white">
                <span className="text-xl">🔔</span>
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="flex items-center gap-3 rounded-full bg-slate-900 py-2 pl-2 pr-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-sm font-bold">
                  JD
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold">John Doe</div>
                  <div className="text-xs text-slate-500">Learner</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

function OverviewContent({ stats, courses, activities, setActiveSection }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Courses Completed', value: stats.coursesCompleted, icon: '📖', gradient: 'from-indigo-500 to-purple-500' },
          { label: 'Hours Learned', value: `${stats.hoursLearned}h`, icon: '⏱️', gradient: 'from-cyan-500 to-blue-500' },
          { label: 'Assessment Score', value: `${stats.assessmentScore}%`, icon: '🎯', gradient: 'from-amber-500 to-orange-500' },
          { label: 'Certificates', value: stats.certificates, icon: '🏆', gradient: 'from-emerald-500 to-teal-500' },
        ].map((stat, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <div className="flex items-center gap-4">
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} text-2xl`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Continue Learning */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold">Continue Learning</h2>
            <button className="text-sm text-indigo-400 hover:text-indigo-300">View All</button>
          </div>
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="flex items-center gap-4 rounded-xl bg-slate-800/50 p-4 transition hover:bg-slate-800">
                <div className={`h-16 w-2 rounded-full bg-gradient-to-b ${course.color}`}></div>
                <div className="flex-1">
                  <div className="text-xs font-medium uppercase text-slate-500">{course.category}</div>
                  <div className="font-semibold">{course.title}</div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-slate-700">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${course.color}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-slate-400">{course.progress}%</span>
                  </div>
                </div>
                <button className="rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-sm font-semibold transition hover:shadow-lg hover:shadow-indigo-500/25">
                  {course.progress === 100 ? 'Review' : 'Continue'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <h2 className="mb-6 text-lg font-bold">Upcoming Activities</h2>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 rounded-xl bg-slate-800/50 p-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  activity.type === 'workshop' ? 'bg-indigo-500/20 text-indigo-400' :
                  activity.type === 'deadline' ? 'bg-red-500/20 text-red-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {activity.type === 'workshop' ? '📺' : activity.type === 'deadline' ? '📅' : '🔄'}
                </div>
                <div>
                  <div className="font-medium text-sm">{activity.title}</div>
                  <div className="text-xs text-slate-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-lg font-bold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { icon: '🎯', label: 'Take Assessment', action: () => setActiveSection('assessment') },
            { icon: '📚', label: 'Browse Courses', action: () => setActiveSection('courses') },
            { icon: '🤖', label: 'AI Tools', action: () => setActiveSection('ai-literacy') },
            { icon: '💬', label: 'Get Help', action: () => {} },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="flex flex-col items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-indigo-500/50 hover:bg-slate-800"
            >
              <span className="text-3xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function AssessmentContent() {
  const assessments = [
    { id: 1, title: 'Career Interest Inventory', description: 'Discover your ideal career path based on interests and values', duration: '20 min', status: 'completed', score: 92 },
    { id: 2, title: 'Skills Gap Analysis', description: 'Identify areas for growth and recommended learning paths', duration: '15 min', status: 'completed', score: 85 },
    { id: 3, title: 'Learning Style Assessment', description: 'Understand how you learn best to optimize your journey', duration: '10 min', status: 'in-progress' },
    { id: 4, title: 'Personality & Work Style', description: 'Map your personality traits to 50+ professions', duration: '25 min', status: 'locked' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold">Your Skills Assessment Journey</h2>
            <p className="mb-4 text-white/80">Complete assessments to unlock personalized course recommendations.</p>
            <div className="flex items-center gap-4">
              <div className="h-3 w-48 rounded-full bg-white/30">
                <div className="h-full w-1/2 rounded-full bg-white"></div>
              </div>
              <span className="text-sm">2 of 4 completed</span>
            </div>
          </div>
          <span className="text-6xl">🎯</span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {assessments.map((assessment) => (
          <div key={assessment.id} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-lg font-bold">{assessment.title}</h3>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                assessment.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                assessment.status === 'in-progress' ? 'bg-amber-500/20 text-amber-400' :
                'bg-slate-500/20 text-slate-400'
              }`}>
                {assessment.status.replace('-', ' ')}
              </span>
            </div>
            <p className="mb-4 text-sm text-slate-400">{assessment.description}</p>
            <div className="mb-4 flex gap-4 text-sm text-slate-500">
              <span>⏱️ {assessment.duration}</span>
              {assessment.score && <span>Score: {assessment.score}%</span>}
            </div>
            <button
              disabled={assessment.status === 'locked'}
              className={`w-full rounded-xl py-3 font-semibold transition ${
                assessment.status === 'locked'
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-indigo-500/25'
              }`}
            >
              {assessment.status === 'completed' ? 'View Results' : assessment.status === 'in-progress' ? 'Continue' : 'Start'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function CoursesContent({ courses }) {
  const allCourses = [
    ...courses,
    { id: 5, title: 'Data-Driven Decision Making', progress: 0, category: 'AI Literacy', color: 'from-cyan-500 to-blue-500' },
    { id: 6, title: 'Emotional Intelligence at Work', progress: 0, category: 'Mindset', color: 'from-amber-500 to-orange-500' },
  ]

  const [filter, setFilter] = useState('all')

  const filteredCourses = allCourses.filter(course => {
    if (filter === 'all') return true
    if (filter === 'in-progress') return course.progress > 0 && course.progress < 100
    if (filter === 'completed') return course.progress === 100
    if (filter === 'not-started') return course.progress === 0
    return true
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Filter */}
      <div className="flex gap-2">
        {['all', 'in-progress', 'completed', 'not-started'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === f
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {f.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <div key={course.id} className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
            <div className={`h-32 bg-gradient-to-br ${course.color} flex items-start justify-end p-4`}>
              {course.progress === 100 && (
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
                  ✓ Completed
                </span>
              )}
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold uppercase text-indigo-400">{course.category}</span>
              <h3 className="mt-2 font-bold">{course.title}</h3>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-2 flex-1 rounded-full bg-slate-700">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${course.color}`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-slate-400">{course.progress}%</span>
              </div>
              <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-3 font-semibold transition hover:shadow-lg hover:shadow-indigo-500/25">
                {course.progress === 0 ? 'Start Course' : course.progress === 100 ? 'Review' : 'Continue'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function AILiteracyContent() {
  const modules = [
    { id: 1, title: 'Introduction to AI', lessons: 8, completed: 8, icon: '🧠' },
    { id: 2, title: 'Machine Learning Basics', lessons: 12, completed: 9, icon: '📊' },
    { id: 3, title: 'AI Tools for Productivity', lessons: 10, completed: 4, icon: '🛠️' },
    { id: 4, title: 'Ethics in AI', lessons: 6, completed: 0, icon: '⚖️' },
    { id: 5, title: 'AI in Your Industry', lessons: 8, completed: 0, icon: '🏢' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-600 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold">Master AI Literacy</h2>
            <p className="text-white/80">Learn to understand, leverage, and collaborate with AI.</p>
          </div>
          <div className="flex gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">21</div>
              <div className="text-sm text-white/80">Lessons Done</div>
            </div>
            <div>
              <div className="text-3xl font-bold">44</div>
              <div className="text-sm text-white/80">Total Lessons</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="flex items-center gap-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-800 text-3xl">
              {module.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{module.title}</h3>
              <div className="mt-2 flex items-center gap-4">
                <div className="h-2 w-48 rounded-full bg-slate-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    style={{ width: `${(module.completed / module.lessons) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-slate-400">{module.completed}/{module.lessons} lessons</span>
              </div>
            </div>
            <button className="rounded-xl border border-slate-700 px-6 py-3 font-semibold transition hover:bg-slate-800">
              {module.completed === 0 ? 'Start' : module.completed === module.lessons ? 'Review' : 'Continue'}
            </button>
          </div>
        ))}
      </div>

      {/* Tools */}
      <div>
        <h2 className="mb-4 text-lg font-bold">AI Tools Playground</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: '💬', title: 'ChatBot Assistant', desc: 'Practice prompting techniques' },
            { icon: '🎨', title: 'Image Generator', desc: 'Create AI-generated visuals' },
            { icon: '📝', title: 'Writing Assistant', desc: 'Enhance your writing with AI' },
          ].map((tool, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center">
              <span className="text-4xl">{tool.icon}</span>
              <h3 className="mt-4 font-bold">{tool.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{tool.desc}</p>
              <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-3 font-semibold transition hover:shadow-lg hover:shadow-indigo-500/25">
                Launch
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function VUCAContent() {
  const vucaModules = [
    { letter: 'V', title: 'Volatility', description: 'Embrace change and develop adaptability', progress: 80, color: 'from-indigo-500 to-purple-500' },
    { letter: 'U', title: 'Uncertainty', description: 'Navigate ambiguity with confidence', progress: 60, color: 'from-cyan-500 to-blue-500' },
    { letter: 'C', title: 'Complexity', description: 'Simplify complex challenges', progress: 40, color: 'from-amber-500 to-orange-500' },
    { letter: 'A', title: 'Ambiguity', description: 'Make decisions with incomplete info', progress: 20, color: 'from-emerald-500 to-teal-500' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Hero */}
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-bold">Navigate the VUCA World</h2>
        <p className="mx-auto max-w-xl text-slate-400">
          Develop the mindset and skills to thrive in Volatile, Uncertain, Complex, and Ambiguous environments.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {vucaModules.map((module) => (
          <div key={module.letter} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <div className={`mb-4 text-5xl font-black bg-gradient-to-r ${module.color} bg-clip-text text-transparent`}>
              {module.letter}
            </div>
            <h3 className="text-xl font-bold">{module.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{module.description}</p>
            <div className="mt-4">
              <div className="h-2 rounded-full bg-slate-700">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${module.color}`}
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
              <span className="mt-2 block text-sm text-slate-400">{module.progress}% complete</span>
            </div>
            <button className="mt-4 w-full rounded-xl border border-slate-700 py-3 font-semibold transition hover:bg-slate-800">
              Continue Learning
            </button>
          </div>
        ))}
      </div>

      {/* Resources */}
      <div>
        <h2 className="mb-4 text-lg font-bold">Resources & Tools</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: '📚', title: 'Case Studies', desc: 'Real-world VUCA scenarios' },
            { icon: '🎮', title: 'Simulations', desc: 'Interactive decision games' },
            { icon: '🧘', title: 'Mindfulness', desc: 'Stress management tools' },
          ].map((resource, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center">
              <span className="text-3xl">{resource.icon}</span>
              <h3 className="mt-3 font-bold">{resource.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{resource.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function RotationContent() {
  const rotations = [
    { id: 1, department: 'Marketing', dates: 'Jan 15 - Feb 15', status: 'completed', rating: 4.8 },
    { id: 2, department: 'Engineering', dates: 'Feb 20 - Mar 20', status: 'current', rating: null },
    { id: 3, department: 'Finance', dates: 'Apr 1 - May 1', status: 'upcoming', rating: null },
    { id: 4, department: 'Operations', dates: 'May 15 - Jun 15', status: 'available', rating: null },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Hero */}
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-bold">Rotational Programs</h2>
        <p className="mx-auto max-w-xl text-slate-400">
          Gain diverse perspectives through cross-functional experiences with different departments.
        </p>
      </div>

      {/* Timeline */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <h3 className="mb-6 font-bold">Your Rotation Journey</h3>
        <div className="space-y-4">
          {rotations.map((rotation, idx) => (
            <div key={rotation.id} className="flex items-center gap-4">
              <div className={`h-4 w-4 rounded-full ${
                rotation.status === 'completed' ? 'bg-emerald-500' :
                rotation.status === 'current' ? 'bg-indigo-500 ring-4 ring-indigo-500/30' :
                rotation.status === 'upcoming' ? 'bg-amber-500' :
                'bg-slate-600'
              }`}></div>
              <div className="flex flex-1 items-center justify-between rounded-xl bg-slate-800/50 p-4">
                <div>
                  <h4 className="font-semibold">{rotation.department}</h4>
                  <span className="text-sm text-slate-500">{rotation.dates}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    rotation.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                    rotation.status === 'current' ? 'bg-indigo-500/20 text-indigo-400' :
                    rotation.status === 'upcoming' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {rotation.status}
                  </span>
                  {rotation.rating && <span className="text-amber-400">★ {rotation.rating}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available */}
      <div>
        <h3 className="mb-4 font-bold">Available Rotations</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Product Development', desc: 'Work with product teams to understand innovation cycles', duration: '4 weeks' },
            { title: 'Customer Success', desc: 'Learn customer-facing skills and relationship management', duration: '4 weeks' },
            { title: 'Data Analytics', desc: 'Explore data-driven decision making processes', duration: '6 weeks' },
          ].map((rotation, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h4 className="font-bold">{rotation.title}</h4>
              <p className="mt-2 text-sm text-slate-400">{rotation.desc}</p>
              <span className="mt-3 inline-block rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                {rotation.duration}
              </span>
              <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-3 font-semibold transition hover:shadow-lg hover:shadow-indigo-500/25">
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function CertificatesContent() {
  const certificates = [
    { id: 1, title: 'AI Foundations', date: 'Jan 15, 2024', badge: '🤖' },
    { id: 2, title: 'Skills Assessment Master', date: 'Dec 20, 2023', badge: '🎯' },
    { id: 3, title: 'VUCA Navigator Level 1', date: 'Nov 10, 2023', badge: '🧭' },
    { id: 4, title: 'Cross-Functional Excellence', date: 'Oct 5, 2023', badge: '🔄' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-bold">Your Achievements</h2>
        <p className="text-slate-400">Showcase your learning accomplishments and professional growth.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {certificates.map((cert) => (
          <div key={cert.id} className="rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/50 p-6 text-center">
            <span className="text-5xl">{cert.badge}</span>
            <h3 className="mt-4 font-bold">{cert.title}</h3>
            <p className="mt-2 text-sm text-slate-500">Earned: {cert.date}</p>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-xl border border-slate-700 py-2 text-sm font-semibold transition hover:bg-slate-800">
                View
              </button>
              <button className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-2 text-sm font-semibold transition hover:shadow-lg hover:shadow-indigo-500/25">
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function SettingsContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl space-y-6"
    >
      {/* Profile */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="mb-6 text-lg font-bold border-b border-slate-800 pb-4">Profile Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Full Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white transition focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Email Address</label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white transition focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Bio</label>
            <textarea
              defaultValue="Passionate learner exploring AI and future-ready skills."
              rows={3}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white transition focus:border-indigo-500 focus:outline-none resize-none"
            />
          </div>
          <button className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 font-semibold transition hover:shadow-lg hover:shadow-indigo-500/25">
            Save Changes
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="mb-6 text-lg font-bold border-b border-slate-800 pb-4">Notifications</h2>
        <div className="space-y-4">
          {[
            { label: 'Email notifications', checked: true },
            { label: 'Course reminders', checked: true },
            { label: 'Assessment deadlines', checked: true },
            { label: 'Community updates', checked: false },
          ].map((item, idx) => (
            <label key={idx} className="flex cursor-pointer items-center justify-between rounded-xl bg-slate-800/50 p-4">
              <span className="text-slate-300">{item.label}</span>
              <input
                type="checkbox"
                defaultChecked={item.checked}
                className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-indigo-500 focus:ring-indigo-500"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Learning Preferences */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="mb-6 text-lg font-bold border-b border-slate-800 pb-4">Learning Preferences</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Preferred Learning Style</label>
            <select
              defaultValue="visual"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white transition focus:border-indigo-500 focus:outline-none"
            >
              <option value="visual">Visual</option>
              <option value="auditory">Auditory</option>
              <option value="reading">Reading/Writing</option>
              <option value="kinesthetic">Hands-on</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Daily Learning Goal</label>
            <select
              defaultValue="30"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white transition focus:border-indigo-500 focus:outline-none"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
