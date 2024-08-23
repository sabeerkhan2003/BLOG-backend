const db = require("../Frontend/models/db") ;


const CreateUsersTable=()=>{
    const sql=`CREATE TABLE blog (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255),
    Content TEXT,
    Author VARCHAR(255),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

    `;
db.query(sql,(err,result)=>{
    if (err) {
        console.error("error creating table:",err);
    }
    else{
        console.log("users table created successful.");
    }
});
};

// Get all blogs
app.get('/', (req, res) => {
    const sql = "SELECT * FROM blog";
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: err });
        return res.json(result);
    });
});


CreateUsersTable();