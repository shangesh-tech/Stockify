import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Configure axios defaults for credentials
axios.defaults.withCredentials = true;

const BASE_URL = 'https://stockify-backend-3mmq.onrender.com/api/v1/portfolio';

const initialState = {
  portfolios: [],
  selectedPortfolio: null,
  isLoading: false,
  error: '',
};

// Create Portfolio - Updated to match backend controller
export const createPortfolio = createAsyncThunk(
  'portfolio/createPortfolio',
  async (portfolioData, { rejectWithValue }) => {
    try {
      const formattedData = {
        portfolio_name: portfolioData.portfolio_name,
        portfolio_balance: parseFloat(portfolioData.amount),
        investment_type: portfolioData.investment_type,
        experience: portfolioData.experience,
        risk: portfolioData.risk,
        amount: parseFloat(portfolioData.amount)
      };

      const response = await axios.post(`${BASE_URL}/create`, formattedData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      return response.data.portfolio;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to create portfolio'
      );
    }
  }
);

// Get Portfolio by ID
export const getPortfolioById = createAsyncThunk(
  'portfolio/getPortfolioById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`, {
        withCredentials: true
      });
      return response.data.portfolio;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch portfolio'
      );
    }
  }
);

// Get All Portfolios for User
export const getUserPortfolios = createAsyncThunk(
  'portfolio/getUserPortfolios',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/all`, {
        withCredentials: true
      });
      return response.data.portfolios;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch portfolios'
      );
    }
  }
);

// Update Portfolio - Updated to match backend controller
export const updatePortfolio = createAsyncThunk(
  'portfolio/updatePortfolio',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const formattedData = {
        portfolio_name: updatedData.portfolio_name,
        portfolio_balance: parseFloat(updatedData.amount),
        investment_type: updatedData.investment_type,
        user_info: [
          {
            Experience: updatedData.experience,
            risk: updatedData.risk
          }
        ]
      };

      const response = await axios.put(`${BASE_URL}/${id}`, formattedData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      return response.data.portfolio;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to update portfolio'
      );
    }
  }
);

// Delete Portfolio
export const deletePortfolio = createAsyncThunk(
  'portfolio/deletePortfolio',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        withCredentials: true
      });
      return id; // Return ID to remove from state
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to delete portfolio'
      );
    }
  }
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    clearSelectedPortfolio: (state) => {
      state.selectedPortfolio = null;
    },
    clearPortfolioError: (state) => {
      state.error = '';
    },
    setSelectedPortfolio: (state, action) => {
      state.selectedPortfolio = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Portfolio
      .addCase(createPortfolio.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(createPortfolio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.portfolios.push(action.payload);
        state.error = '';
      })
      .addCase(createPortfolio.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get Portfolio by ID
      .addCase(getPortfolioById.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getPortfolioById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedPortfolio = action.payload;
        state.error = '';
      })
      .addCase(getPortfolioById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get All Portfolios by User
      .addCase(getUserPortfolios.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getUserPortfolios.fulfilled, (state, action) => {
        state.isLoading = false;
        state.portfolios = action.payload;
        state.error = '';
      })
      .addCase(getUserPortfolios.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Portfolio
      .addCase(updatePortfolio.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(updatePortfolio.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.portfolios.findIndex(
          (portfolio) => portfolio._id === action.payload._id
        );
        if (index !== -1) {
          state.portfolios[index] = action.payload;
        }
        if (state.selectedPortfolio?._id === action.payload._id) {
          state.selectedPortfolio = action.payload;
        }
        state.error = '';
      })
      .addCase(updatePortfolio.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Portfolio
      .addCase(deletePortfolio.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(deletePortfolio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.portfolios = state.portfolios.filter(
          (portfolio) => portfolio._id !== action.payload
        );
        if (state.selectedPortfolio?._id === action.payload) {
          state.selectedPortfolio = null;
        }
        state.error = '';
      })
      .addCase(deletePortfolio.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedPortfolio, clearPortfolioError, setSelectedPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
