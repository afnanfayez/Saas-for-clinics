"use client";
import React, { useState } from "react";
import Button from "../Component/Button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({ username: "", password: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { username: "", password: "" };
    let  isValid = true;

    if (!username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log("Login success ");
     //connect api 
    }
  };

  return (
<div className="w-full max-w-[500px] bg-white dark:bg-zinc-900 rounded-xl shadow-md p-8 space-y-6 mx-auto">
      <h1 className="text-2xl font-semibold text-center text-zinc-900 dark:text-white">
        Clinics System Login
      </h1>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-1 ">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <Button title="Login" />
      </form>
    </div>
  );
};

export default Login;
