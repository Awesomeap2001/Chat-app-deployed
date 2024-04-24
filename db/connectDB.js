const mongoose = require("mongoose")

const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.CONNECTDB);
        console.log(`Database successfully connected.`);

    } catch (error) {
        console.log(error);
    }
}

module.exports = connectdb;