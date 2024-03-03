const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const transferRoutes = require('./routes/transferRoutes');
const accountRoutes = require('./routes/accountRoutes');
const connectDB = require('./config/db');
const cookiesParser = require('cookie-parser');

connectDB();

app.use(cookiesParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/transfer", transferRoutes);
app.use("/account", accountRoutes);

const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Server running on port ${port}`));