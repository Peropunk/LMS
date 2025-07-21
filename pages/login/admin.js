import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loginUser } from "../../utils/auth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (window.location.hostname === "admin.ailms.com" ||
        window.location.hostname === "admin.localhost" ||
        window.location.hostname === "admin.localhost:3000")
    ) {
      setAllowed(true);
    } else {
      setAllowed(false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginUser("admin", email, password)) {
      router.push("/dashboard/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  if (!allowed) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded shadow-md w-80 text-center">
          <h2 className="text-xl font-semibold mb-4 text-red-600">Access Denied</h2>
          <p>Admin login is only allowed from admin.ailms.com or admin.localhost:3000</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        <input
          className="mb-2 w-full p-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="mb-4 w-full p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
} 