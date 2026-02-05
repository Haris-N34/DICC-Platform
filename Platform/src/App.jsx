import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Spotlight } from './components/ui/spotlight'
import { HoverEffect } from './components/ui/card-hover-effect'
import { BackgroundGradient } from './components/ui/background-gradient'
import { Button } from './components/ui/moving-border'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import './index.css'

function LandingPage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: "🎯",
      title: "Skills Assessment",
      description: "Discover your path through our intelligent assessment algorithm. Multiple evaluation methods analyze your strengths and passions to recommend the perfect learning trajectory from 50+ unique professions."
    },
    {
      icon: "🧭",
      title: "Navigating VUCA",
      description: "Thrive in a Volatile, Uncertain, Complex, and Ambiguous world. Develop the mindset to find your purpose beyond tasks. Transform challenges into opportunities for growth."
    },
    {
      icon: "🤖",
      title: "AI Literacy",
      description: "Master the language of tomorrow. Understand, leverage, and work alongside artificial intelligence to amplify your capabilities and stay ahead in the evolving digital landscape."
    },
    {
      icon: "🔄",
      title: "Rotational Programs",
      description: "Experience round-table rotation between faculties. Gain diverse perspectives and cross-functional skills that prepare you for the interconnected careers of the future."
    }
  ]

  const courses = [
    {
      title: "Discover Your Purpose",
      category: "Skills Assessment",
      description: "Comprehensive evaluation to map your strengths to career paths",
      rating: "4.9",
      students: "2,340",
      gradient: "from-indigo-500 to-purple-500",
      badge: "Bestseller"
    },
    {
      title: "AI Foundations & Applications",
      category: "AI Literacy",
      description: "Master AI concepts and learn to collaborate with intelligent systems",
      rating: "4.8",
      students: "1,850",
      gradient: "from-cyan-500 to-blue-500",
      badge: "New"
    },
    {
      title: "Thriving in VUCA World",
      category: "Mindset",
      description: "Develop resilience and adaptive thinking for uncertain environments",
      rating: "4.9",
      students: "3,120",
      gradient: "from-amber-500 to-orange-500",
      badge: "Popular"
    }
  ]

  const testimonials = [
    {
      content: "The Skills Assessment completely changed my perspective. I discovered strengths I never knew I had and found a career path that truly fits me.",
      name: "Sarah Ahmed",
      role: "Product Designer",
      initials: "SA"
    },
    {
      content: "The VUCA navigation course gave me the mindset shift I needed. I now approach challenges with confidence and see opportunity everywhere.",
      name: "Mohammed Khan",
      role: "Entrepreneur",
      initials: "MK"
    },
    {
      content: "AI Literacy prepared me for the future. I went from fearing AI to leveraging it daily in my work. Best investment in myself.",
      name: "Lisa Park",
      role: "Data Analyst",
      initials: "LP"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent">
              DICC Learning
            </span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-slate-400 transition hover:text-white">Features</a>
            <a href="#courses" className="text-sm text-slate-400 transition hover:text-white">Courses</a>
            <a href="#testimonials" className="text-sm text-slate-400 transition hover:text-white">Testimonials</a>
            <button
              onClick={() => navigate('/auth')}
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Sign In
            </button>
            <Button onClick={() => navigate('/auth')}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Unlock Your Potential with{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Expert-Led Courses
              </span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 md:text-xl"
          >
            Join thousands of learners mastering new skills with our interactive
            courses, hands-on projects, and personalized learning paths.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              onClick={() => navigate('/auth')}
              className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-xl hover:shadow-indigo-500/30"
            >
              Start Learning Free
            </button>
            <button className="rounded-full border border-slate-700 px-8 py-3 font-semibold text-white transition hover:border-slate-500 hover:bg-slate-800">
              Browse Courses
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 flex justify-center gap-12"
          >
            {[
              { number: "10K+", label: "Students" },
              { number: "200+", label: "Courses" },
              { number: "50+", label: "Instructors" }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.number}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950" />
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Transform Your Learning Journey
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              Our platform combines cutting-edge assessment technology with future-ready skills
            </p>
          </div>
          <HoverEffect items={features} />
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="relative px-6 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/10 to-slate-950" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Popular Learning Paths
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              Start your journey with our most impactful courses designed for the future
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <BackgroundGradient className="rounded-2xl bg-slate-900 p-6">
                  <div className={`mb-4 h-40 rounded-xl bg-gradient-to-br ${course.gradient} flex items-start justify-end p-3`}>
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
                      {course.badge}
                    </span>
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                    {course.category}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-white">{course.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{course.description}</p>
                  <div className="mt-4 flex gap-4 text-sm text-slate-500">
                    <span>⭐ {course.rating}</span>
                    <span>👥 {course.students} students</span>
                  </div>
                </BackgroundGradient>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-xl hover:shadow-indigo-500/30">
              View All Courses
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              What Our Learners Say
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              Join thousands who have transformed their careers with us
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
              >
                <p className="mb-6 text-slate-300 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-sm font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-indigo-600 to-cyan-600 p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to Transform Your Future?
          </h2>
          <p className="mb-8 text-lg text-white/80">
            Join thousands of learners who are building skills for tomorrow's world.
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="rounded-full bg-white px-8 py-3 font-semibold text-indigo-600 shadow-lg transition hover:bg-slate-100"
          >
            Start Your Journey Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            <div className="max-w-xs">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl">📚</span>
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent">
                  DICC Learning
                </span>
              </div>
              <p className="text-sm text-slate-500">
                Empowering learners to navigate and thrive in an evolving world.
              </p>
            </div>
            <div className="flex gap-16">
              <div>
                <h4 className="mb-4 font-semibold text-white">Platform</h4>
                <div className="flex flex-col gap-2 text-sm text-slate-500">
                  <a href="#courses" className="transition hover:text-white">Courses</a>
                  <a href="#features" className="transition hover:text-white">Features</a>
                  <a href="#testimonials" className="transition hover:text-white">Testimonials</a>
                </div>
              </div>
              <div>
                <h4 className="mb-4 font-semibold text-white">Resources</h4>
                <div className="flex flex-col gap-2 text-sm text-slate-500">
                  <a href="#" className="transition hover:text-white">Blog</a>
                  <a href="#" className="transition hover:text-white">Help Center</a>
                  <a href="#" className="transition hover:text-white">Community</a>
                </div>
              </div>
              <div>
                <h4 className="mb-4 font-semibold text-white">Company</h4>
                <div className="flex flex-col gap-2 text-sm text-slate-500">
                  <a href="#" className="transition hover:text-white">About Us</a>
                  <a href="#" className="transition hover:text-white">Careers</a>
                  <a href="#" className="transition hover:text-white">Contact</a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            © 2026 DICC Learning. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
