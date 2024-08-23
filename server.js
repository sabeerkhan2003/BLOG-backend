import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "brfw86g28ww40iukczcf-mysql.services.clever-cloud.com",
    user: "utrcxxp3il1rw9y8",
    password: "j3zgJN15mbBIxVbUz6kR",
    database: "brfw86g28ww40iukczcf",
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("MySQL connected...");
});


app.get('/blogs', (req, res) => {
    const sql = 'SELECT * FROM blog';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching blogs:', err);
            return res.status(500).json({ message: 'Error fetching blogs' });
        }
        return res.json(result);
    });
});


// Add a new blog
app.post('/blogs', (req, res) => {
    const sql = "INSERT INTO blog (`Title`, `Content`, `Author`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.content,
        req.body.author
    ];
    db.query(sql, [values], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(201).json(result);
    });
});

app.get('/blogs/:ID', (req, res) => {
    const sql = "SELECT * FROM blog WHERE ID = ?";
    const id = req.params.ID;
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "Blog not found" });
        return res.json(result);
    });
});

// Update a blog by ID
app.put('/blogs/:id', (req, res) => {
    const sql = "UPDATE blog SET `Title` = ?, `Content` = ?, `Author` = ? WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [req.body.title, req.body.content, req.body.author, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(result);
    });
});

// Delete a blog by ID
app.delete('/blogs/:id', (req, res) => {
    const sql = "DELETE FROM blog WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Blog not found" });
        return res.json({ message: "Blog deleted successfully" });
    });
});

app.listen(8081, () => {
    console.log("Server is running on port 5176");
});


// import express from "express";
// import mysql from "mysql";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "sabeer@20",
//     database: "database1"
// });

// // Get all blogs
// app.get('/', (req, res) => {
//     const sql = "SELECT * FROM blog";
//     db.query(sql, (err, result) => {
//         if (err) return res.json({ message: err });
//         return res.json(result);
//     });
// });

// // Add a new blog
// app.post('/blogs', (req, res) => {
//     const sql = "INSERT INTO blog (`Title`, `Content`, `Author`) VALUES (?)";
//     const values = [
//         req.body.title,
//         req.body.content,
//         req.body.author
//     ];
//     db.query(sql, [values], (err, result) => {
//         if (err) return res.json(err);
//         return res.json(result);
//     });
// });

// // Get a single blog by ID
// app.get('/blogs/:ID', (req, res) => {
//     const sql = "SELECT * FROM blog WHERE ID = ?";
//     const id = req.params.ID;
//     db.query(sql, [id], (err, result) => {
//         if (err) return res.json({ message: err });
//         return res.json(result);
//     });
// });

// // Update a blog by ID
// app.put('/blogs/:id', (req, res) => {
//     const sql = "UPDATE blog SET `Title` = ?, `Content` = ?, `Author` = ? WHERE ID = ?";
//     const id = req.params.id;
//     db.query(sql, [req.body.title, req.body.content, req.body.author, id], (err, result) => {
//         if (err) return res.json({ message: err });
//         return res.json(result);
//     });
// });

// // Delete a blog by ID
// app.delete('/blogs/:id', (req, res) => {
//     const sql = "DELETE FROM blog WHERE ID = ?";
//     const id = req.params.id;
//     db.query(sql, [id], (err, result) => {
//         if (err) return res.json({ message: err });
//         return res.json(result);
//     });
// });

// app.listen(8081, () => {
//     console.log("Server is running on port 8081");
// });