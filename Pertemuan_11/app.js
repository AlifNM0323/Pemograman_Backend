const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello Express");
});

app.get("/students", (req, res) => {
    res.send("Get All Students");
});

app.post("/students", (req, res) => {
    res.send("Add a Students");
});

app.put("/students", (req, res) => {
    res.send("Edit Students");
});

app.delete("/students", (req, res) => {
    res.send("delete Students");
});
// app.listen(8000);
export default app;