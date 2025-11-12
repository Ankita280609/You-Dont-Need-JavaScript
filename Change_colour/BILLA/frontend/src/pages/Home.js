import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center p-16">
      <h1 className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
        Welcome to BILLA
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
        Your one-stop dashboard to manage all your subscriptions and bills.
      </p>
      <div className="space-x-4">
        <Link
          to="/signup"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-3 px-6 rounded-lg text-lg"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;