const { registerHandler, loginHandler, getAllUsers } = require("../controllers/userControllers");

const router = require("express").Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/allusers/:id", getAllUsers)

module.exports = router;