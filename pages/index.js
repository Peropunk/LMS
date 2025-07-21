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
      if (loginUser(role, email, password)) {
        router.push(`/dashboard/${role}`);
      } else {
        setError("Invalid credentials");
        setIsLoading(false);
      }
    }, 1500);
  };

  const FloatingBook = ({ delay = 0, position = "top-20 left-20" }) => (
    <div className={`absolute ${position} animate-float`} style={{ animationDelay: `${delay}s` }}>
      <div className="w-16 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-sm shadow-lg transform rotate-12 relative">
        <div className="absolute inset-1 bg-white rounded-sm opacity-90">
          <div className="h-full w-1 bg-blue-300 ml-2"></div>
        </div>
      </div>
    </div>
  );

  const FloatingPencil = ({ delay = 0, position = "top-32 right-20" }) => (
    <div className={`absolute ${position} animate-bounce-slow`} style={{ animationDelay: `${delay}s` }}>
      <div className="w-2 h-16 bg-gradient-to-t from-yellow-400 via-orange-400 to-pink-400 rounded-full relative">
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-pink-500 rounded-full"></div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-gray-800 rounded-b-full"></div>
      </div>
    </div>
  );

  const AnimatedTitle = () => (
    <div className="text-center mb-8">
      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent animate-pulse-slow mb-4">
        EduVibe
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 animate-fade-in-up">
        Where Learning Meets Adventure! 🚀
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <FloatingBook delay={0} position="top-20 left-20" />
      <FloatingBook delay={1} position="top-40 right-32" />
      <FloatingBook delay={2} position="bottom-32 left-32" />
      <FloatingPencil delay={0.5} position="top-32 right-20" />
      <FloatingPencil delay={1.5} position="bottom-20 right-20" />
      <FloatingPencil delay={2.5} position="top-60 left-40" />

      {/* Geometric Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-24 h-24 bg-pink-500 transform rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-orange-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-blue-500 transform rotate-12 animate-pulse"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {!showLogin ? (
          // Welcome Screen
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <AnimatedTitle />
            
            <div className="mb-8">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Welcome to your digital classroom! Ready to embark on an amazing learning journey?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse-gentle"
                >
                  Start Learning! 📚
                </button>
                
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                  Students & Teachers Online
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800">Interactive Learning</h3>
                <p className="text-gray-600 text-sm">Engage with dynamic content and interactive quizzes</p>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-3">👥</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800">Collaborative Space</h3>
                <p className="text-gray-600 text-sm">Connect with classmates and teachers in real-time</p>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800">Track Progress</h3>
                <p className="text-gray-600 text-sm">Monitor your learning journey and achievements</p>
              </div>
            </div>
          </div>
        ) : (
          // Login Form
          <div className="w-full max-w-md mx-auto animate-slide-in">
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
              {/* Back Button */}
              <button
                onClick={() => setShowLogin(false)}
                className="mb-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Back to Home
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce-gentle">
                  <span className="text-2xl text-white">🎓</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                <p className="text-gray-600">Sign in to continue your learning adventure</p>
              </div>

              {isLoading ? (
                // Loading Animation
                <div className="text-center py-8">
                  <div className="relative">
                    <div className="w-20 h-20 mx-auto mb-4">
                      <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <div className="animate-pulse">
                      <div className="text-lg font-semibold text-gray-700 mb-2">Getting things ready...</div>
                      <div className="text-sm text-gray-500">Loading your dashboard 📚</div>
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
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Signing In..." : "Sign In to EduVibe"}
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
