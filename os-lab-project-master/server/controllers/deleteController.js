// get the DB instance
const DB = require("../services/DB");

// Function to check if pid is valid
const isValidPid = (pid) => {
    return pid > 0;
}

// The request body contains a pid (which is unique)
// and that will be deleted from the database 'process'
exports.delete = async (req, res) => {
    let pid = parseInt(req.body.pid);
    
    // check validity
    if(!isValidPid(pid)) {
        console.error("Couldn't delete process...");
        return res.json({
            "statusCode": 400,
            "status": "NO",
            "message": `Cannot delete process with pid ${pid}`
        })
    }

    // DELETE FROM process WHERE 'pid' = pid
    const dbResult = await DB("process").where("pid", pid).del();
    if(!dbResult) {
        return res.json({
            "statusCode": 400,
            "status": "NO",
            "message": `Process with pid ${pid} does not exist!`
        })
    }

    // Success
    return res.json({
        "statusCode": 200,
        "status": "OK",
        "message": `Process with pid ${pid} deleted successfully!`
    });
}