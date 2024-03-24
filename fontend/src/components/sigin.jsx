import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = ({ label, signinfo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', { email, password });
      localStorage.setItem("token", response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center px-60 py-20">
      <div className="shadow-xl bg-white p-8 rounded">
        <div className="text-3xl font-bold mb-6">
          <div>{label}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-left py-2">
            Email
          </div>
          <input
            placeholder="Email"
            onChange={(e) => { setEmail(e.target.value) }}
            className="w-full px-2 py-1 border rounded border-slate-200"
          />
        </div>
        <div>
          <div className="text-sm font-medium text-left py-2">
            Password
          </div>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => { setPassword(e.target.value) }}
            className="w-full px-2 py-1 border rounded border-slate-200"
          />
        </div>
        <div className="py-3">
          <button className="bg-blue-500 text-white rounded w-full hover:bg-blue-700" onClick={signin}>{signinfo}</button>
        </div>
      </div>
    </div>
  );
};

