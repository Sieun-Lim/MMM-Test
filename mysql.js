
var mysql = require("mysql")

var con = mysql.createConnection({
    host: '172.30.1.58',
    port: 3306,
    user: 'tlsl13',
    password: '1234',
    database: 'DBtest' 
});

con.connect()

sql = "SELECT * FROM temperature"

con.query(sql, function(err, rows) {
    if(err) throw error;
    console.log(rows)
});

con.end()

