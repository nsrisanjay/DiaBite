const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

// Import user routes
const userRoutes = require("./APIs/userAPI");
app.use("/users", userRoutes);

// **MongoDB Connection**
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Database Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Stop server if DB connection fails
    }
};

// **Start Server only after DB is connected**
connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
