const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/userRoute");
const PortfolioRoutes = require("./routes/portfolioRoutes");
const cors = require('cors');
const cookieParser = require('cookie-parser');

//Middleware

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log("path " + req.path + " method " + req.method);
    next();
  });
}

app.use(cors({
  origin: 'https://stockify-pink.vercel.app',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Routes Middleware
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/portfolio', PortfolioRoutes);


// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });
