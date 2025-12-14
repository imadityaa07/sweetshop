import { useState } from 'react';
import api from '../api/axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const res = await api.post('/auth/register', {
        name,
        email,
        password
      });
      localStorage.setItem('token', res.data.token);
      window.location.reload();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
      className="
        bg-white/80
        backdrop-blur-md
        border border-pink-200
        rounded-xl
        shadow-xl
        p-6
        animate-fadeIn
      "
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Register
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 hover:bg-green-700
                     text-white py-2 rounded font-medium transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
