// Shortest Job First (SJN) simulator
// Well, this algorithm's implementation is realllllyyyy similar to FCFS
// Only we select the process whose execution time is lowest
// from the ready queue.
// Rest everything is the same as FCFS!

const Queue = require("../utils/queue");
const calcAverage = require("../utils/calcAverage");

// Global vars
const timeStep = 1;
let waitingQueue = new Queue();

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
const addToWaitingQueue = (proc) => {
    if(proc) {
        waitingQueue.enqueue(proc);
    }
}

// Checks which process arrived
const checkWhichArrived = (currTime, processes) => {
    for(let i=0; i<processes.length; i++) {
        // process arrived
        if(currTime === processes[i].arrTime) {
            // console.log(`${processes[i].pid} arrived`);
            addToWaitingQueue(processes[i]);
        }
    }
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

// self explanatory
const removeFromList = (proc, processes) => {
    for(let i=0; i<processes.length; i++) {
        if(proc === processes[i]) {
            let procArr = processes.splice(i, 1);
            orderOfProcesses.push(procArr[0]);
        }
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

// Process with minimum burst time
const findMinBurTime = (waitingQueue) => {
    let minProc = null;
    let minIndex = 0;
    let minBurTime = Infinity;

    for(let i=0; i<waitingQueue.items.length; i++) {
        if(waitingQueue.items[i].exeTime < minBurTime) {
            minBurTime = waitingQueue.items[i].exeTime;
            minProc = waitingQueue.items[i];
            minIndex = i;
        }
    }

    // remove the process from queue and return it
    let proc = waitingQueue.items.splice(minIndex, 1);
    return proc[0];
}

// Simulate
// Driver code
const simulate = (processes) => {
    let currTime = 0;
    let currExecuting = null;
    let currExecStartTime = 0;

    // Infinite loop
    while(1) {
        if(processes.length <= 0) {
            return currTime;
        }

        checkWhichArrived(currTime, processes);

        if(!waitingQueue.isEmpty()) {
            if(!anyOtherExecuting(processes)) {
                let proc = findMinBurTime(waitingQueue);
                proc.isExecuting = true;
                currExecuting = proc;
                currExecStartTime = currTime;
            }
        }

        currTime += timeStep;

        // await sleep(1000);

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