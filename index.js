const express = require("express");
const app = express();
const PORT = process.env.PORT || 5572;
const usersRouter = require("./src/api/users");
const limiter = require("./src/middleware/limiter");

app.use(limiter);

app.use(express.json());

app.use("/api/v1/users", usersRouter);

app.use( (req, res, next) => {
    res.status(404).json({ error: "Not Found" });
});


app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`);    
});