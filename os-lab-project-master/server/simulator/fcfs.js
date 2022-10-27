// Simulator for FCFS (First Come First Serve algorithm)

// We proceed by a time step (kind of a frame of the simulation)
// Then we check the ready queue and execute the process or
// add any process into the ready queue

// 1) We initialise global time counter (currTime) and move step by step forward in time
//     - We also create variables to store the current executing Process and its start time
// 2) At each step: 
//     - We check which Process is arrived (if any) and add it to readyQueue
//     - Then if readyQueue is not empty, we check if any other process is currently executing
//     - If not, we dequeue a Process from readyQueue and let it execute
//     - We move one step forward in time and check for the current executing Process to finish
//     - If the process is finished executing, we kill it and remove it from the list
// 3) We stop the algorithm when no Process is left to execute in the original list

const Queue = require("../utils/queue");
const calcAverage = require("../utils/calcAverage");

// Simulation time step
const timeStep = 1;
let readyQueue = new Queue();

let waitingTimes = [];
let tarTimes = [];          // turn around times
let orderOfProcesses = [];  // gannt order of execution

const findAvgWaitingTime = () => {
    let wts = [];

    for(let i=0; i<waitingTimes.length; i++) {
        wts.push(waitingTimes[i].wt);
    }

    return calcAverage.average(wts);
}

// Adds the process to ready queue
const addToReadyQueue = (proc) => {
    if(proc) {
        readyQueue.enqueue(proc);
    } 
}

// Check if any other process is executing already
const anyOtherExecuting = (processes) => {
    for(let i=0; i<processes.length; i++) {
        if(processes[i].isExecuting) {
            return true;
        }
    }

    return false;
}

// Check if Process has finished execution
const checkKillProcess = (currTime, startTime, proc) => {
    if(proc) {
        if(currTime - startTime === proc.exeTime) {
            proc.isExecuting = false;
            proc.waitTime = startTime - proc.arrTime;
            proc.tarTime = currTime - proc.arrTime;

            waitingTimes.push({
                pid: proc.pid,
                wt: proc.waitTime
            });
            tarTimes.push({
                pid: proc.pid,
                tar: proc.tarTime
            });
            // console.log(`${proc.pid} is killed...`);
        }
    }
}

// Checks which process arrived
const checkWhichArrived = (currTime, processes) => {
    for(let i=0; i<processes.length; i++) {
        // process arrived
        if(currTime === processes[i].arrTime) {
            // console.log(`${processes[i].pid} arrived`);
            addToReadyQueue(processes[i]);
        }
    }
}

// self explanatory
const removeFromList = (proc, processes) => {
    for(let i=0; i<processes.length; i++) {
        if(proc === processes[i]) {
            let procArr = processes.splice(i, 1);
            orderOfProcesses.push(procArr[0]);
        }
    }
}

// Simulate
// This is the main function
const simulate = (processes) => {
    // Step 1
    let currTime = 0;
    let currExecuting = null;       // which Process is executing currently?
    let currExecStartTime = 0;      // when did it start its execution?

    waitingTimes = [];
    tarTimes = [];
    orderOfProcesses = [];
    
    // Infinite loop
    while(1) {
        // Step 3
        if(processes.length <= 0) {
            // console.log("Done...");
            return currTime;
        }

        // Step 2
        checkWhichArrived(currTime, processes);
        
        if(!readyQueue.isEmpty()) {
            if(!anyOtherExecuting(processes)) {
                let proc = readyQueue.dequeue();
                proc.isExecuting = true;
                currExecuting = proc;
                currExecStartTime = currTime;
                // console.log(`${currExecuting.pid} started at time ${currExecStartTime}`);
            }    
        }
        // await sleep(1000);
        
        // move forward in time
        currTime += timeStep;

        checkKillProcess(currTime, currExecStartTime, currExecuting);
        if(currExecuting && !currExecuting.isExecuting) {
            removeFromList(currExecuting, processes);
        }
    }
}

// Final function to return all results
const SimulateAndReturn = (processes) => {
    waitingTimes = [];
    tarTimes = [];          // turn around times
    orderOfProcesses = [];  // gannt order of execution

    let endTime = simulate(processes);
    let avgWaitTime = findAvgWaitingTime();

    let result = {
        "simulationEndTime": endTime,
        "averageWaitingTime": avgWaitTime,
        "waitingTimes": waitingTimes,
        "turnAroundTimes": tarTimes,
        "ganttChart": orderOfProcesses
    }
    return result;
}

// // Sleep function for debugging if necessary
// function sleep(ms) {
//     return new Promise((resolve) => {
//       setTimeout(resolve, ms);
//     });
//   }

// // Testing
// let p2 = new Process(1, "P1", 2, 6, 0);
// let p1 = new Process(2, "P2", 5, 2, 0);
// let p3 = new Process(3, "P3", 1, 8, 0);
// let p4 = new Process(4, "P4", 0, 3, 0);
// let p5 = new Process(5, "P3", 4, 4, 0);

// let procs = [p1, p2, p3, p4, p5];

// let res = SimulateAndReturn(procs);
// console.log(res);

module.exports = {
    SimulateAndReturn
}