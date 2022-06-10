const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session= require('express-session')
var Keycloak = require('keycloak-connect');

const app = express();

var corsOptions = {
  origin: ["http://cc-pilots-vm2.westeurope.cloudapp.azure.com:3000","https://cc-pilots-vm2.westeurope.cloudapp.azure.com","http://localhost:3000","https://localhost","http://20.86.113.148:3000","https://20.86.113.148",/\.azure\.com$/]
};
// Create a session-store to be used by both the express-session
// middleware and the keycloak middleware.

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });

// Provide the session store to the Keycloak so that sessions
// can be invalidated from the Keycloak console callback.
//
// Additional configuration is read from keycloak.json file
// installed from the Keycloak web console.

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

var keycloak = new Keycloak({
  store: memoryStore
});

app.use( keycloak.middleware() );



app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", keycloak.protect(),(req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
require("./app/routes/customer.routes")(app);
require("./app/routes/asset.routes")(app);
require("./app/routes/transaction.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });



