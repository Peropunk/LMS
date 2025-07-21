import { useRouter } from "next/router";

export default function Navbar({ onLogout }) {
  const router = useRouter();
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      router.push('/');
    }
  };

  const getCurrentPageTitle = () => {
    const path = router.pathname;
    const segments = path.split('/').filter(Boolean);
    
    if (segments.length >= 3) {
      const page = segments[2];
      return page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' ');
    }
    return 'Dashboard';
  };

  const getUserRole = () => {
    const path = router.pathname;
    const segments = path.split('/').filter(Boolean);
    
    if (segments.length >= 2) {
      return segments[1].charAt(0).toUpperCase() + segments[1].slice(1);
    }
    return 'User';
  };

  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Page Title */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-900">{getCurrentPageTitle()}</h1>
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
          <span>•</span>
          <span>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Right Side - User Info & Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
          <span className="text-xl">🔔</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">{getUserRole()}</p>
          </div>
          
          <div className="relative">
            <button className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium hover:shadow-lg transition-shadow">
              J
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <span>🚪</span>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
