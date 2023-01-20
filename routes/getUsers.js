const express = require("express");
const router = express.Router();

const mongoUsers = require("../controllers/getUsers");

router.get("/", mongoUsers.allUsers);
router.get("/:id", mongoUsers.userID);
router.post("/", mongoUsers.postUser);
router.delete("/:id", mongoUsers.delUser);
router.patch("/:id", mongoUsers.editUser);

module.exports = router;
