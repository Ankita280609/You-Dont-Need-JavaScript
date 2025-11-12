import React from 'react';
import { PencilIcon, TrashIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

const SubscriptionItem = ({ subscription, onEdit, onDelete }) => {
  const { name, cost, billingCycle, category, startDate } = subscription;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center">
      {/* Left Side - Info */}
      <div className="flex-1 mb-4 md:mb-0">
        <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium text-lg">${cost.toFixed(2)}</span> / {billingCycle}
        </p>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2 space-x-4">
          <span className="inline-flex items-center bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {category}
          </span>
          <span className="flex items-center">
             <CalendarDaysIcon className="h-4 w-4 mr-1" />
             Started: {formatDate(startDate)}
          </span>
        </div>
      </div>

      {/* Right Side - Actions */}
      <div className="flex space-x-3">
        <button
          onClick={onEdit}
          className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 p-2 rounded-full"
          title="Edit"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          onClick={onDelete}
          className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-2 rounded-full"
          title="Delete"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SubscriptionItem;