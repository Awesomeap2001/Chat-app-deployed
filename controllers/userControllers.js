const userModel = require("../model/userModel");
const bcrypt = require("bcrypt")


module.exports.registerHandler = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check for Existing user 
        const existUser = await userModel.findOne({ email })
        if (existUser) {
            return res.json({
                msg: "Email already Exists",
                status: false
            })
        }

        // Hashing Password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            email,
            username,
            password: hashedPassword,
        })

        return res.json({
            status: true,
            user
        })

    } catch (error) {
        next(error)
    }
}


module.exports.loginHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check for Existing user 
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({
                msg: "Incorrect Email or Password",
                status: false
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({
                msg: "Incorrect Email or Password",
                status: false
            })
        }

        return res.json({
            status: true,
            user
        })

    } catch (error) {
        next(error)
    }
}


module.exports.getAllUsers = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const users = await userModel.find({ _id: { $ne: userId } }).select([
            "email",
            "username",
            "_id"
        ])
        res.json(users);

    } catch (error) {
        next(error)
    }
}