const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
    res.send('Stock Optimizer API Running');
});

app.listen(5000, () => console.log('Server running on port 5000'));

const stockRoutes = require('./routes/stocks');
app.use('/stocks', stockRoutes);
