const express = require("express");
const path = require("path");
const sendMail = require("./sendMail.js");

const app = express();
const PORT = 5000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post("/mail", async function(req, res) {
        await sendMail(req.body);
        res.send("<h4>mail has been sent succesfully </h4>");
});

const start = async function() {
        app.listen(PORT, function() {
            console.log("Server is running on port " + PORT);
        });

};
start();
