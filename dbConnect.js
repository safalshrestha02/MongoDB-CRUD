const mongo = require("mongodb");

let dbConnection;
let uri =
  "mongodb+srv://safal1234:safal1234@cluster0.cgli9ia.mongodb.net/?retryWrites=true&w=majority";

module.exports = {
  //function to connect to a db
  connectToDb: (cb) => {
    mongo.MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  //return the database connection after connecting
  getDb: () => dbConnection,
};
