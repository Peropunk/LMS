import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loginUser } from "../utils/auth";

export default function Home() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate loading for better UX
    setTimeout(() => {
      if (role === "admin") {
        // Redirect to admin subdomain or admin login page
        if (typeof window !== "undefined") {
          window.location.href = "/login/admin";
        }
        return;
      }

      if (loginUser(role, email, password)) {
        router.push(`/dashboard/${role}`);
      } else {
        setError("Invalid credentials");
        setIsLoading(false);
      }
    }, 1500);
  };

  const FloatingBook = ({ delay = 0, position = "top-20 left-20" }) => (
    <div className={`absolute ${position} animate-float hidden lg:block opacity-70`} style={{ animationDelay: `${delay}s` }}>
      <svg width="48" height="36" viewBox="0 0 48 36" className="drop-shadow-lg">
        <defs>
          <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
        </defs>
        {/* Book cover */}
        <rect x="4" y="4" width="40" height="28" rx="2" fill="url(#bookGradient)" />
        {/* Book spine */}
        <rect x="0" y="6" width="6" height="24" rx="1" fill="#1E3A8A" />
        {/* Pages */}
        <rect x="8" y="8" width="32" height="20" rx="1" fill="#F8FAFC" opacity="0.9" />
        {/* Page lines */}
        <line x1="12" y1="12" x2="36" y2="12" stroke="#E2E8F0" strokeWidth="0.5" />
        <line x1="12" y1="16" x2="36" y2="16" stroke="#E2E8F0" strokeWidth="0.5" />
        <line x1="12" y1="20" x2="36" y2="20" stroke="#E2E8F0" strokeWidth="0.5" />
        <line x1="12" y1="24" x2="36" y2="24" stroke="#E2E8F0" strokeWidth="0.5" />
      </svg>
    </div>
  );

  const FloatingPencil = ({ delay = 0, position = "top-32 right-20" }) => (
    <div className={`absolute ${position} animate-bounce-slow hidden lg:block opacity-70`} style={{ animationDelay: `${delay}s` }}>
      <svg width="12" height="64" viewBox="0 0 12 64" className="drop-shadow-lg">
        <defs>
          <linearGradient id="pencilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        {/* Eraser */}
        <rect x="2" y="2" width="8" height="6" rx="1" fill="#EC4899" />
        {/* Metal band */}
        <rect x="1" y="8" width="10" height="3" fill="#9CA3AF" />
        {/* Pencil body */}
        <rect x="3" y="11" width="6" height="42" fill="url(#pencilGradient)" />
        {/* Wood part */}
        <polygon points="3,53 6,60 9,53" fill="#92400E" />
        {/* Graphite tip */}
        <polygon points="5,60 6,64 7,60" fill="#1F2937" />
        {/* Brand text simulation */}
        <rect x="4" y="20" width="4" height="1" fill="#374151" opacity="0.7" />
        <rect x="4" y="25" width="4" height="1" fill="#374151" opacity="0.7" />
      </svg>
    </div>
  );

  const AnimatedTitle = () => (
    <div className="text-center mb-6 lg:mb-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent animate-pulse-slow mb-3 lg:mb-4 px-4">
        AI LMS
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-600 animate-fade-in-up px-4">
        Where Learning Meets Adventure! 🚀
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <FloatingBook delay={0} position="top-10 left-4 lg:top-20 lg:left-20" />
      <FloatingBook delay={1} position="top-20 right-4 lg:top-40 lg:right-32" />
      <FloatingBook delay={2} position="bottom-20 left-4 lg:bottom-32 lg:left-32" />
      <FloatingPencil delay={0.5} position="top-16 right-4 lg:top-32 lg:right-20" />
      <FloatingPencil delay={1.5} position="bottom-10 right-4 lg:bottom-20 lg:right-20" />
      <FloatingPencil delay={2.5} position="top-32 left-4 lg:top-60 lg:left-40" />

      {/* Geometric Background Patterns */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 lg:w-32 lg:h-32 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-16 h-16 lg:w-24 lg:h-24 bg-pink-500 transform rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 lg:w-20 lg:h-20 bg-orange-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/3 right-1/4 w-18 h-18 lg:w-28 lg:h-28 bg-blue-500 transform rotate-12 animate-pulse"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8 lg:p-4">
        {!showLogin ? (
          // Welcome Screen
          <div className="text-center max-w-4xl mx-auto animate-fade-in w-full">
            <AnimatedTitle />

            <div className="mb-6 lg:mb-8">
              <p className="text-base sm:text-lg text-gray-700 mb-4 lg:mb-6 leading-relaxed px-4">
                Your personalized learning experience awaits. Join thousands of students in mastering new skills.
              </p>

              {/* Quick Access Badges */}
              <div className="flex flex-wrap justify-center gap-2 mb-6 px-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium border border-purple-200">
                  📚 Interactive Lessons
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                  🎯 Skill Assessments
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">
                  🏆 Certificates
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium border border-orange-200">
                  👥 Study Groups
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
                <button
                  onClick={() => setShowLogin(true)}
                  className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse-gentle text-sm lg:text-base"
                >
                  Start Learning! 📚
                </button>
              </div>

              {/* Quick Access Links */}
              <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200/50 px-4">
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
                  <button className="group flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white/70 text-gray-700 font-medium rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10,9 9,9 8,9" />
                    </svg>
                    Course Catalog
                  </button>
                  <button className="group flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white/70 text-gray-700 font-medium rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Demo Classes
                  </button>
                </div>

                <button
                  onClick={() => { setRole("admin"); setShowLogin(true); }}
                  className="group flex items-center gap-2 lg:gap-3 mx-auto px-4 lg:px-6 py-2.5 lg:py-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-xs lg:text-sm"
                >
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <span className="text-xs lg:text-sm">🔐</span>
                  </div>
                  <span>Administrator Access</span>
                  <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-red-400 rounded-full animate-pulse"></div>
                </button>
              </div>
            </div>

            {/* LMS Stats Section */}
            <div className="mt-8 lg:mt-12 px-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl text-center border border-white/30 hover:bg-white/70 transition-all duration-300">
                  <div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-1">25+</div>
                  <div className="text-xs lg:text-sm text-gray-600 font-medium">Courses</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl text-center border border-white/30 hover:bg-white/70 transition-all duration-300">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">5K+</div>
                  <div className="text-xs lg:text-sm text-gray-600 font-medium">Students</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl text-center border border-white/30 hover:bg-white/70 transition-all duration-300">
                  <div className="text-2xl lg:text-3xl font-bold text-green-600 mb-1">150+</div>
                  <div className="text-xs lg:text-sm text-gray-600 font-medium">Teachers</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl text-center border border-white/30 hover:bg-white/70 transition-all duration-300">
                  <div className="text-2xl lg:text-3xl font-bold text-orange-600 mb-1">98%</div>
                  <div className="text-xs lg:text-sm text-gray-600 font-medium">Success Rate</div>
                </div>
              </div>

              {/* Learning Paths */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/30 shadow-lg">
                <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 text-center">Popular Learning Paths</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2">
                        <path d="M9 11H7a2 2 0 000 4h2v-4zM13 11h2a2 2 0 010 4h-2v-4zM9 15h6" />
                        <path d="M3 12a9 9 0 1118 0 9 9 0 01-18 0" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-800">Computer Science</div>
                      <div className="text-xs text-gray-600">12 Courses</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-800">Mathematics</div>
                      <div className="text-xs text-gray-600">8 Courses</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 hover:shadow-md transition-all duration-300 sm:col-span-2 lg:col-span-1">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-800">Arts & Design</div>
                      <div className="text-xs text-gray-600">6 Courses</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Login Form
          <div className="w-full max-w-md mx-auto animate-slide-in px-4">
            <div className={`${role === 'admin' ? 'bg-slate-50/90 border-slate-300/50' : 'bg-white/80 border-white/20'} backdrop-blur-lg p-6 lg:p-8 rounded-3xl shadow-2xl border transition-all duration-300`}>
              {/* Back Button */}
              <button
                onClick={() => setShowLogin(false)}
                className="mb-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Back to Home
              </button>

              <div className="text-center mb-4 lg:mb-6">
                <div className={`w-12 h-12 lg:w-16 lg:h-16 ${role === 'admin' ? 'bg-gradient-to-br from-slate-700 to-slate-900' : 'bg-gradient-to-br from-purple-500 to-pink-500'} rounded-full mx-auto mb-3 lg:mb-4 flex items-center justify-center animate-bounce-gentle transition-all duration-300`}>
                  <span className="text-xl lg:text-2xl text-white">
                    {role === 'admin' ? '🔐' : '🎓'}
                  </span>
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-1 lg:mb-2">
                  {role === 'admin' ? 'Admin Portal' : 'Welcome Back!'}
                </h2>
                <p className="text-gray-600 text-sm lg:text-base px-2">
                  {role === 'admin' ? 'Access system analytics and database management' : 'Sign in to continue your learning adventure'}
                </p>
              </div>

              {isLoading ? (
                // Loading Animation
                <div className="text-center py-8">
                  <div className="relative">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-3 lg:mb-4">
                      <div className="absolute inset-0 border-3 lg:border-4 border-purple-200 rounded-full"></div>
                      <div className="absolute inset-0 border-3 lg:border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <div className="animate-pulse">
                      <div className="text-base lg:text-lg font-semibold text-gray-700 mb-1 lg:mb-2">Getting things ready...</div>
                      <div className="text-xs lg:text-sm text-gray-500">Loading your dashboard 📚</div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">I am a:</label>
                    <select
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="student">🎓 Student</option>
                      <option value="teacher">👩‍🏫 Teacher</option>
                      <option value="admin">🔐 Administrator</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm animate-shake">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full ${role === 'admin' ? 'bg-gradient-to-r from-slate-700 to-slate-900' : 'bg-gradient-to-r from-purple-500 to-pink-500'} text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading ? (role === 'admin' ? 'Accessing Admin Portal...' : 'Signing In...') : (role === 'admin' ? 'Access Admin Dashboard' : 'Sign In to AI LMS')}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
