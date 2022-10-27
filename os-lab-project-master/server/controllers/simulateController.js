/*
    Essentially, the request body will provide which algorithm
    to simulate. Currently they are:

    1. FCFS (first come first serve)
    2. SJFN (shortest job first non preemptive)
    3. SJFP (shortest job first preemptive)

    This controller will simulate the algorithm for all the processes
    currently in the database
*/

// database instance
const DB = require("../services/DB");

// simulators
const Fcfs = require("../simulator/fcfs");
const Sjfn = require("../simulator/sjfNonPreemptive"); 
const Sjfp = require("../simulator/sjfPreemptive");
const Rr = require("../simulator/rr");

// utils
const Process = require("../utils/process");

exports.simulate = async (req, res) => {
    // get the algo and make it uppercase for case-insensitivity
    const algo = req.body.algo.toString().toUpperCase();

    // fetch all the processes from the database
    let procs = await DB.select().table("process");
    let processes = [];

    for(let i = 0; i<procs.length; i++) {
        let proc = new Process(procs[i].pid, procs[i].pname, procs[i].arr_time, procs[i].exe_time);
        processes.push(proc);
    }

    // Now simulate for the processes and return the response
    let response;
    switch (algo) {
        case "FCFS":
            response = Fcfs.SimulateAndReturn(processes);
            break;
        case "SJFN":
            response = Sjfn.SimulateAndReturn(processes);
            break;
        case "SJFP":
            response = Sjfp.SimulateAndReturn(processes);
            break;
        case "RR":
            response = Rr.SimulateAndReturn(processes);
            break;
        default:
            response = {
                "statusCode": 400,
                "status": "NO",
                "message": "Please provide a valid algorithm to run the simulation :("
            }
            break;
    }

    return res.json({
        "statusCode": 200,
        "status": "OK",
        "simulationResult": response
    });
}