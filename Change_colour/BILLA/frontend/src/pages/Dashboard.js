import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

import AnalyticsDashboard from '../components/dashboard/AnalyticsDashboard';
import SubscriptionForm from '../components/dashboard/SubscriptionForm';
import SubscriptionItem from '../components/dashboard/SubscriptionItem';
import { PlusIcon, EnvelopeIcon } from '@heroicons/react/24/solid'; // Import EnvelopeIcon

const Dashboard = () => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for the form modal
  const [showForm, setShowForm] = useState(false);
  const [editingSub, setEditingSub] = useState(null); // The subscription to edit
  
  // --- New state for email button ---
  const [emailLoading, setEmailLoading] = useState(false);


  // --- Data Fetching Function ---
  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch subscriptions and analytics in parallel
      const [subsResponse, analyticsResponse] = await Promise.all([
        api.get('/subscriptions'),
        api.get('/analytics/summary')
      ]);
      
      setSubscriptions(subsResponse.data);
      setAnalytics(analyticsResponse.data);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component loads
  useEffect(() => {
    fetchData();
  }, []);

  // --- Handler Functions ---
  const openForm = (sub = null) => {
    setEditingSub(sub); // If sub is provided, we're editing
    setShowForm(true);
  };

  const closeForm = () => {
    setEditingSub(null);
    setShowForm(false);
  };

  // This function is passed to the form
  // It will either create or update a subscription
  const handleSave = async (subData) => {
    try {
      if (editingSub) {
        // Update existing subscription
        await api.put(`/subscriptions/${editingSub._id}`, subData);
      } else {
        // Create new subscription
        await api.post('/subscriptions', subData);
      }
      
      // Refresh all data, close form, and clear editing state
      fetchData();
      closeForm();
    } catch (err) {
      console.error('Failed to save subscription:', err);
      alert('Failed to save. Please try again.'); // Simple error handling
    }
  };
  
  // This function is passed to the SubscriptionItem
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        await api.delete(`/subscriptions/${id}`);
        fetchData(); // Refresh data
      } catch (err) {
        console.error('Failed to delete subscription:', err);
        alert('Failed to delete. Please try again.');
      }
    }
  };
  
  // --- New handler for sending test email ---
  const handleTestEmail = async () => {
    setEmailLoading(true);
    try {
      // Call the new backend endpoint
      await api.post('/notify/test');
      alert('Test email sent! Check your Ethereal inbox (and the backend console for the link).');
    } catch (err) {
      console.error('Failed to send test email:', err);
      alert('Failed to send test email. See console for details.');
    } finally {
      setEmailLoading(false);
    }
  };

  // --- Render Logic ---
  if (loading) {
    return <div className="text-center p-10 text-xl">Loading Dashboard...</div>;
  }
  
  if (error) {
    return <div className="text-center p-10 text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Welcome, {user?.name}!</h1>

      {/* Analytics Section */}
      {analytics && <AnalyticsDashboard data={analytics} />}

      {/* Subscriptions List Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Your Subscriptions ({subscriptions.length})</h2>
          <div className="flex space-x-2">
            {/* Test Email Button */}
            <button
              onClick={handleTestEmail}
              disabled={emailLoading}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 disabled:opacity-50"
            >
              <EnvelopeIcon className="h-5 w-5" />
              <span>{emailLoading ? 'Sending...' : 'Test Email'}</span>
            </button>
            
            {/* Add New Button */}
            <button
              onClick={() => openForm()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add New</span>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {subscriptions.length > 0 ? (
            subscriptions.map(sub => (
              <SubscriptionItem 
                key={sub._id} 
                subscription={sub}
                onEdit={() => openForm(sub)}
                onDelete={() => handleDelete(sub._id)}
              />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              You haven't added any subscriptions yet.
            </p>
          )}
        </div>
      </div>
      
      {/* Add/Edit Form Modal */}
      {showForm && (
        <SubscriptionForm
          subscription={editingSub}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}
    </div>
  );
};

export default Dashboard;