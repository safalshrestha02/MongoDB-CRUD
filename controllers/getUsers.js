const { ObjectID } = require("mongodb");
const { connectToDb, getDb } = require("../dbConnect");

let getDB;

connectToDb((err) => {
  if (!err) {
    getDB = getDb();
    //console.log(getDB);
  }
});

exports.allUsers = (req, res) => {
  const page = req.query.p || 0;
  const usersPerPage = 3;

  let users = [];
  getDB
    .collection("employee")
    .find()
    .sort({ id: 1 })
    .skip(page * usersPerPage)
    .limit(usersPerPage)
    .forEach((user) => {
      users.push(user);
    })
    .then(() => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500);
    });
};

exports.userID = (req, res) => {
  if (ObjectID.isValid(req.params.id)) {
    getDB
      .collection("employee")
      .findOne({ _id: ObjectID(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "couldnot fetch" });
      });
  } else {
    res.status(500).json({ err: "invalid ID" });
  }
};

exports.postUser = (req, res) => {
  const user = req.body;

  getDB
    .collection("employee")
    .insertOne(user)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      req.status(500).json({ err: "could not create new user" });
    });
};

exports.delUser = (req, res) => {
  if (ObjectID.isValid(req.params.id)) {
    getDB
      .collection("employee")
      .deleteOne({ _id: ObjectID(req.params.id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "couldnot delete" });
      });
  } else {
    res.status(500).json({ err: "invalid ID" });
  }
};

exports.editUser = (req, res) => {
  const update = req.body;

  if (ObjectID.isValid(req.params.id)) {
    getDB
      .collection("employee")
      .updateOne({ _id: ObjectID(req.params.id) }, { $set: update })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "couldnot delete" });
      });
  } else {
    res.status(500).json({ err: "invalid ID" });
  }
};
