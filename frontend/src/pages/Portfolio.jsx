import { useEffect, useState } from "react";
import { FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { HiTrendingUp } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; 

import {
  getUserPortfolios,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../app/slices/portfolioSlice";
import Modal from "../components/Modal";
import {
  PortfolioStepper,
  EditPortfolioModal,
} from "../components/PortfolioStepper";
import PortfolioAllocationChart from "../components/Assest_chart";
import SIPProjection from "../components/SIPProjection";
import LumpsumProjection from "../components/LumpsumProjection";

const Portfolio = () => {
  const dispatch = useDispatch();
  const {
    portfolios = [],
    isLoading,
    error,
  } = useSelector((state) => state.portfolio);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    portfolio_name: "",
    portfolio_balance: "",
    investment_type: "sip",
    experience: "Beginner",
    risk: "Low",
    amount: "",
  });

  useEffect(() => {
    dispatch(getUserPortfolios());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      updatePortfolio({
        id: selectedPortfolio._id,
        updatedData: formData,
      })
    );
    setIsEditModalOpen(false);
    setSelectedPortfolio(null);
  };

  const handleDelete = async () => {
    await dispatch(deletePortfolio(selectedPortfolio._id));
    setIsDeleteModalOpen(false);
    setSelectedPortfolio(null);
  };

  const openEditModal = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setFormData({
      portfolio_name: portfolio.portfolio_name,
      portfolio_balance: portfolio.portfolio_balance,
      investment_type: portfolio.investment_type,
      experience: portfolio.user_info[0].Experience,
      risk: portfolio.user_info[0].risk,
      amount: portfolio.portfolio_balance,
    });
    setIsEditModalOpen(true);
  };

  const totalInvestment = portfolios
    .reduce((acc, curr) => acc + Number(curr.portfolio_balance), 0)
    .toFixed(2);

  return (
    <>
      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <h2 className="text-2xl font-semibold mb-6 col-span-2 text-gray-800">
          Portfolio Overview
        </h2>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 col-span-2 sm:col-span-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">Total Invested</p>
            <p className="text-3xl font-bold text-gray-900">
              ₹{totalInvestment}
            </p>
          </div>

          <div className="flex justify-evenly items-center gap-6">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex justify-center items-center gap-3 text-lg bg-black text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-900 transition-all"
            >
              <IoIosAdd size={25} /> Add Portfolio
            </button>
            <button className="flex justify-center items-center gap-3 text-lg bg-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-500 transition-all">
              <HiTrendingUp size={25} /><Link to={"/analysis"}>Analyze Stocks</Link> 
            </button>
          </div>
        </div>

        <div className="col-span-2">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolios.map((portfolio) => (
                <div
                  key={portfolio._id}
                  className="bg-white p-6 rounded-lg shadow border border-gray-100 relative group"
                >
                  <div className="absolute top-4 right-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEditModal(portfolio)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPortfolio(portfolio);
                        setIsDeleteModalOpen(true);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800">
                    {portfolio.portfolio_name}
                  </h3>
                  <p className="text-gray-600">
                    Balance: ₹{Number(portfolio.portfolio_balance).toFixed(2)}
                  </p>
                  <p className="text-gray-600">
                    Type: {portfolio.investment_type}
                  </p>
                  <p className="text-gray-600">
                    Risk: {portfolio.user_info[0].risk}
                  </p>
                  <button
                    onClick={() => setSelectedPortfolio(portfolio)}
                    className="mt-4 text-blue-600 hover:text-blue-800 flex items-center gap-2"
                  >
                    View Details <FaArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Create Portfolio Modal with Stepper */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <PortfolioStepper onClose={() => setIsCreateModalOpen(false)} />
      </Modal>

      {/* Edit Portfolio Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditPortfolioModal
          portfolio={selectedPortfolio}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={async (formData) => {
            await dispatch(
              updatePortfolio({
                id: selectedPortfolio._id,
                updatedData: formData,
              })
            );
            setIsEditModalOpen(false);
            setSelectedPortfolio(null);
          }}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <h2 className="text-2xl font-semibold mb-4">Delete Portfolio</h2>
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete this portfolio? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* View Portfolio Details Modal */}
      <Modal
        isOpen={!!selectedPortfolio && !isEditModalOpen && !isDeleteModalOpen}
        onClose={() => setSelectedPortfolio(null)}
      >
        <h2 className="text-2xl font-semibold mb-4">
          {selectedPortfolio?.portfolio_name}
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <p className="text-gray-600">
                Balance: ₹
                {Number(selectedPortfolio?.portfolio_balance).toFixed(2)}
              </p>
              <p className="text-gray-600">
                Investment Type: {selectedPortfolio?.investment_type}
              </p>
              <p className="text-gray-600">
                Experience Level: {selectedPortfolio?.user_info[0].Experience}
              </p>
              <p className="text-gray-600">
                Risk Level: {selectedPortfolio?.user_info[0].risk}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Current Portfolio Allocation
              </h3>
              <PortfolioAllocationChart
                portfolioData={selectedPortfolio?.portfolio_data}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Future Portfolio Projections
              </h3>
              {selectedPortfolio?.investment_type?.toLowerCase() === 'sip' ? (
                <SIPProjection
                  portfolioData={selectedPortfolio}
                  currentBalance={Number(selectedPortfolio?.portfolio_balance)}
                />
              ) : (
                <LumpsumProjection
                  portfolioData={selectedPortfolio}
                  currentBalance={Number(selectedPortfolio?.portfolio_balance)}
                />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Portfolio;
