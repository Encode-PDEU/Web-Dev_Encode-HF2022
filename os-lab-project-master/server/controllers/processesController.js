// import the DB service
const DB = require("../services/DB");
const Process = require("../utils/process");

// Select all the processes and store in an array
exports.getAll = async (req, res) => {
    // fetch from DB
    let processes = await DB.select().table("process");
    
    // send response of all the processes
    res.json(processes);
}