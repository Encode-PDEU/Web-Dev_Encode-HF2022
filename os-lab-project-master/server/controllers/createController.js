// import the DB instance
const DB = require("../services/DB");

// function to validate if the process is a valid one
validateProcess = (process) => {
    return (process.pid >= 0 && process.pname != "" && process.arr_time >= 0 && process.exe_time > 0)
}

exports.create = async (req, res) => {
    // console.log("Request body:", req.body);

    // destructure the request body
    let {pid, pname, arr_time, exe_time, priority} = req.body;

    // to be inserted into DB 
    let processToAdd = {
        pid,
        pname,
        arr_time,
        exe_time,
        priority
    }

    // check for validity coz we can't trust any fucking one
    if(!validateProcess(processToAdd)) {
        console.error("Could not insert process...");
        return res.json({
            // random error code
            "statusCode": 400,
            "status": "NO",
            "message": "Cannot insert process!"
        });
    }

    // Ok process is valid. Insert into DB
    try {
        const dbResult = await DB.insert(processToAdd).into("process");        
    } catch (error) {
        return res.json({
            "statusCode": 400,
            "status": "NO",
            "message": "Cannot insert into Database. Provide valid inputs!"
        })
    }

    // Success
    res.json({
        "statusCode": 200,
        "status": "OK",
        "message": "Process created and saved!"
    });
}