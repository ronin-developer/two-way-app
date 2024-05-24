// sever side
const express = require("express");
const fs = require("fs");
const app = express();
const port = 3030;

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist/css"));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// showing messages in HTML
app.get("/messages", (req, res) => {
    fs.readFile("./messages.json", "utf8", (err, content) => {
        if (err) {
            res.status(500).send("Error reading messages");
        } else {
            res.send(JSON.parse(content));
        }
    });
});

app.post("/messages", (req, res) => {
    fs.readFile("./messages.json", "utf8", (err, content) => {
        let arr = JSON.parse(content);
        const newMessage = req.body;
        newMessage.date = new Date(); // Add timestamp to new message
        arr.push(newMessage);
        fs.writeFile("./messages.json", JSON.stringify(arr), (err) => {
            res.send(JSON.stringify({ status: "super", data: arr }));
        });
    });
});

app.listen(port, function () {
    console.log(`Server is runing on port ${port}`);
});
