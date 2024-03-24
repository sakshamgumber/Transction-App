
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = ({ label, information, signinfo, firstname }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', { email, password, name, amount });
      localStorage.setItem("token", response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center px-8 py-4 bg-gray-100 border border-gray-300 rounded-md">
        <div className="text-3xl font-bold mb-4 text-gray-800">
          {label}
        </div>
        <div className="text-sm text-gray-600 mb-4">
          {information}
        </div>
        <div className="mb-2">
          <div className="text-sm font-medium text-left py-2">
            Username
          </div>
          <input
            placeholder="Username"
            onChange={(e) => { setEmail(e.target.value) }}
            className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <div className="text-sm font-medium text-left py-2">
            Password
          </div>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => { setPassword(e.target.value) }}
            className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <div className="text-sm font-medium text-left py-2">
            {firstname}
          </div>
          <input
            placeholder="John"
            onChange={(e) => { setName(e.target.value) }}
            className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <div className="text-sm font-medium text-left py-2">
            Amount
          </div>
          <input
            placeholder="Amount"
            onChange={(e) => { setAmount(e.target.value) }}
            className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <button
            className="bg-gray-800 text-white rounded w-full hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-500"
            onClick={submit}
          >
            {signinfo}
          </button>
        </div>
        <div className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to='/signin' className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
};
