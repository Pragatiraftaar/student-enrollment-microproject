// ===============================
// Local JSON Database Server
// ===============================

const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Path to students.json file
const dataFile = path.join(__dirname, "data", "students.json");

// ===============================
// SAVE RECORD
// ===============================
app.post("/save", (req, res) => {
    let students = JSON.parse(fs.readFileSync(dataFile, "utf8"));
    
    students.push(req.body);

    fs.writeFileSync(dataFile, JSON.stringify(students, null, 4));
    res.json({ message: "Record saved successfully!" });
});

// ===============================
// UPDATE RECORD
// ===============================
app.post("/update", (req, res) => {
    let students = JSON.parse(fs.readFileSync(dataFile, "utf8"));
    let roll = req.body.rollno;

    let index = students.findIndex(s => s.rollno === roll);

    if (index !== -1) {
        students[index] = req.body;
        fs.writeFileSync(dataFile, JSON.stringify(students, null, 4));
        res.json({ message: "Record updated successfully!" });
    } else {
        res.json({ message: "Record not found!" });
    }
});
// ===============================
// CHECK / GET RECORD
// ===============================
app.post("/get", (req, res) => {
    let students = JSON.parse(fs.readFileSync(dataFile, "utf8"));
    let roll = req.body.rollno;

    let record = students.find(s => s.rollno === roll);

    if (record) {
        res.json({ found: true, student: record });
    } else {
        res.json({ found: false });
    }
});

// ===============================
// START SERVER
// ===============================
app.listen(3000, () => {
    console.log("Local database server running at http://localhost:3000");
});
