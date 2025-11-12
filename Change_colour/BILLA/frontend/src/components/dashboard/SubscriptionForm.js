import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

const SubscriptionForm = ({ subscription, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    cost: '',
    billingCycle: 'Monthly',
    category: 'Software',
    startDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
  });
  
  const [loading, setLoading] = useState(false);

  // If we are editing, pre-fill the form
  useEffect(() => {
    if (subscription) {
      setFormData({
        name: subscription.name,
        cost: subscription.cost,
        billingCycle: subscription.billingCycle,
        category: subscription.category,
        startDate: new Date(subscription.startDate).toISOString().split('T')[0],
      });
    }
  }, [subscription]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Pass the numeric cost to the save function
    await onSave({ ...formData, cost: parseFloat(formData.cost) });
    setLoading(false);
  };

  return (
    // Modal Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      {/* Modal Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-2xl font-semibold">
            {subscription ? 'Edit Subscription' : 'Add New Subscription'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">
              Subscription Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="cost">
                Cost
              </label>
              <input
                type="number"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="billingCycle">
                Billing Cycle
              </label>
              <select
                id="billingCycle"
                name="billingCycle"
                value={formData.billingCycle}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Monthly</option>
                <option>Yearly</option>
                <option>One-Time</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="category">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                placeholder="e.g. Software, Streaming, Utilities"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="startDate">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="flex justify-end pt-4 border-t dark:border-gray-700 space-x-3">
             <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
             <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Saving...' : (subscription ? 'Save Changes' : 'Add Subscription')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;