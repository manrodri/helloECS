const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql');
const bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host: '192.168.3.12',
  user: 'root',
  password: 'password',
  database: 'test'
});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    
	connection.connect();

   connection.query("SELECT name FROM employees WHERE location='Australia'", function (err, rows, fields) {
      if (err) throw err

   var name = ('The solution is: ', rows[0].name);
    res.render("landing", {name: name});
   connection.end();
});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
