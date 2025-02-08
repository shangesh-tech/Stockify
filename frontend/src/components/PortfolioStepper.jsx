import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPortfolio } from '../app/slices/portfolioSlice';

const PortfolioStepper = ({ onClose }) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    portfolio_name: '',
    amount: '',
    investment_type: 'sip',
    experience: 'Beginner',
    risk: 'Low',
  });

  const steps = [
    { number: 1, title: 'Basic Details' },
    { number: 2, title: 'Investment Type' },
    { number: 3, title: 'Risk Profile' },
    { number: 4, title: 'Confirmation' },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    await dispatch(createPortfolio(formData));
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Portfolio Name</label>
              <input
                type="text"
                name="portfolio_name"
                value={formData.portfolio_name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Investment Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">Investment Type</label>
            <select
              name="investment_type"
              value={formData.investment_type}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="sip">SIP (Systematic Investment Plan)</option>
              <option value="lumpsum">Lumpsum Investment</option>
            </select>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Experience Level</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Risk Tolerance</label>
              <select
                name="risk"
                value={formData.risk}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Conservative">Conservative</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Confirm Your Portfolio Details</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <dl className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <dt className="font-medium mb-1 sm:mb-0">Portfolio Name:</dt>
                  <dd className="text-gray-600">{formData.portfolio_name}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <dt className="font-medium mb-1 sm:mb-0">Investment Amount:</dt>
                  <dd className="text-gray-600">₹{formData.amount}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <dt className="font-medium mb-1 sm:mb-0">Investment Type:</dt>
                  <dd className="text-gray-600">{formData.investment_type.toUpperCase()}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <dt className="font-medium mb-1 sm:mb-0">Experience Level:</dt>
                  <dd className="text-gray-600">{formData.experience}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <dt className="font-medium mb-1 sm:mb-0">Risk Tolerance:</dt>
                  <dd className="text-gray-600">{formData.risk}</dd>
                </div>
              </dl>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-4 sm:p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
      {/* Stepper Header */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex flex-col sm:flex-row min-w-max sm:min-w-0">
          {/* Mobile Step Indicator */}
          <div className="block sm:hidden mb-4 text-center">
            <span className="text-lg font-medium text-gray-900">
              Step {currentStep} of {steps.length}:
            </span>
            <span className="ml-2 text-blue-600 font-medium">
              {steps[currentStep - 1].title}
            </span>
          </div>

          {/* Desktop/Tablet Stepper */}
          <div className="hidden sm:flex justify-between items-center w-full">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    currentStep >= step.number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.number}
                </div>
                <div
                  className={`ml-2 text-sm hidden sm:block ${
                    currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-full mx-4 ${
                      currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">{renderStepContent()}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
          className={`px-4 py-2 rounded-md ${
            currentStep === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Previous
        </button>
        {currentStep < 4 ? (
          <button
            onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Create Portfolio
          </button>
        )}
      </div>
    </div>
  );
};

// EditPortfolioModal.jsx
const EditPortfolioModal = ({ portfolio, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    portfolio_name: portfolio?.portfolio_name || '',
    amount: portfolio?.portfolio_balance || '',
    investment_type: portfolio?.investment_type || 'sip',
    experience: portfolio?.user_info?.[0]?.Experience || 'Beginner',
    risk: portfolio?.user_info?.[0]?.risk || 'Low',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Edit Portfolio</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Portfolio Name</label>
          <input
            type="text"
            name="portfolio_name"
            value={formData.portfolio_name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Investment Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Investment Type</label>
          <select
            name="investment_type"
            value={formData.investment_type}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="sip">SIP</option>
            <option value="lumpsum">Lumpsum</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Experience Level</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Risk Level</label>
          <select
            name="risk"
            value={formData.risk}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Conservative">Conservative</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export { PortfolioStepper, EditPortfolioModal };
