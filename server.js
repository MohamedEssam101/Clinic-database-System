var express = require("express");
var app = express();
var sql = require("mssql");
var config = {
  user: "sa",
  password: "1234",
  server: "DESKTOP-ADS2FFE",
  database: "Hospital",
  synchronize: true,
  trustServerCertificate: true,
};
app.use(express.static("public"));
app.use(express.json());

app.get("/patient", async function (req, res) {
  var request = new sql.Request();
  await request.query("select * from patient", function (err, recordset) {
    if (err) console.log(err);
    console.log(recordset);
    // send records as a response
    res.send(recordset.recordset);
  });
});

app.post("/delete/:collection", async function (req, res) {
  const collection = req.params.collection;
  console.log(req.body);
  const item = req.body;
  const itemKeys = Object.keys(item);
  var request = new sql.Request();
  request.query(
    `delete from ${collection} where ${itemKeys[0]} = ${item[itemKeys[0]]}`,
    function (err, records) {
      if (err) console.log(err);
      // send records as a response
      console.log("deleted!");
      res.send();
    }
  );
});

app.post("/add/:collection", async function (req, res) {
  const collection = req.params.collection;
  const item = req.body;
  const itemCols = item.map((el) => Object.keys(el)[0]).join(", ");
  const itemColsVals = item
    .map((el) => `'${el[Object.keys(el)[0]]}'`)
    .join(", ");
  console.log(itemCols);
  console.log(itemColsVals);
  var request = new sql.Request();
  request.query(
    `INSERT INTO ${req.params.collection} (${itemCols}) VALUES (${itemColsVals}) `,
    function (err, recordset) {
      if (err) console.log(err);
      // send records as a response
      res.send();
    }
  );
});

app.get("/Bill", async function (req, res) {
  var request = new sql.Request();
  await request.query("select * from Bill", function (err, recordset) {
    if (err) console.log(err);
    console.log(recordset.recordsets);
    // send records as a response
    res.send(recordset.recordset);
  });
});

app.get("/Department", async function (req, res) {
  var request = new sql.Request();
  await request.query("select * from Department", function (err, recordset) {
    if (err) console.log(err);
    console.log(recordset.recordsets);
    // send records as a response
    res.send(recordset.recordset);
  });
});

app.get("/Doctor", async function (req, res) {
  var request = new sql.Request();
  await request.query("select * from Doctor", function (err, recordset) {
    if (err) console.log(err);
    console.log(recordset.recordsets);
    // send records as a response
    res.send(recordset.recordset);
  });
});

app.get("/given", async function (req, res) {
  var request = new sql.Request();
  await request.query("select * from given", function (err, recordset) {
    if (err) console.log(err);
    console.log(recordset.recordsets);
    // send records as a response
    res.send(recordset.recordset);
  });
});

app.get("/Medicine", async function (req, res) {
  var request = new sql.Request();
  await request.query("select * from Medicine", function (err, recordset) {
    if (err) console.log(err);
    console.log(recordset.recordsets);
    // send records as a response
    res.send(recordset.recordset);
  });
});
app.get("/Assign", async function (req, res) {
  var request = new sql.Request();
  await request.query("select * from Assign", function (err, recordset) {
    if (err) console.log(err);
    console.log(recordset.recordsets);
    // send records as a response
    res.send(recordset.recordset);
  });
});
app.get("/Records", async function (req, res) {
  var request = new sql.Request();
  await request.query("select * from Records", function (err, recordset) {
    if (err) console.log(err);
    console.log(recordset.recordsets);
    // send records as a response
    res.send(recordset.recordset);
  });
});
app.get("/room", async function (req, res) {
  var request = new sql.Request();
  await request.query("select * from room", function (err, recordset) {
    if (err) console.log(err);
    console.log(recordset.recordsets);
    // send records as a response
    res.send(recordset.recordset);
  });
});
app.get("/treats", async function (req, res) {
  var request = new sql.Request();
  await request.query("select * from treats", function (err, recordset) {
    if (err) console.log(err);
    console.log(recordset.recordsets);
    // send records as a response
    res.send(recordset.recordset);
  });
});

sql.connect(config, function (err) {
  if (err) console.log(err);
  console.log("database connected");
  // create Request object
  // var request = new sql.Request();

  // query to the database and get the records
  // request.query("select * from Student", function (err, recordset) {
  //   if (err) console.log(err);
  //   console.log("database connected!");
  //   // send records as a response
  // });
});

var server = app.listen(5000, function () {
  console.log("Server is running on http://localhost:5000/");
});
