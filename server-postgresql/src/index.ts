import express from "express";

const app = express();

app.get('/api/users', (req, res, next) => {
    res.json({
        status: "success",
    })
})

app.listen(3000, () => console.log("Server is running on port 3000"));