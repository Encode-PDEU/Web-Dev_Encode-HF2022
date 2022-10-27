// The SJF algorithm (Preemptive version)

const calcAverage = require("../utils/calcAverage");

// Global vars
const timeStep = 1;

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

const simulate = (processes) => {
    let n = processes.length;
    // Remaining time list
    let rt = [];

    // copy the burst time of processes in rt
    for(let i=0; i<n; i++) {
        rt.push({
            pid : processes[i].pid,
            remTime : processes[i].exeTime
        });
    }

    // various initialisations
    let numComplete = 0, currTime = 0, minRt = Infinity, minRtPid = 0;
    let shortest = 0, finishTime;
    let found = false;
    
    // loop till completion
    while(numComplete != n) {
        // Find process with minimum rt
        // which arrived till currTime
        for(let i = 0; i<n; i++) {
            if((processes[i].arrTime <= currTime) && (rt[i].remTime < minRt) && rt[i].remTime > 0) {
                minRt = rt[i].remTime;
                minRtPid = rt[i].pid;
                shortest = i;
                found = true;
            }
        }

        // continue if not found
        if(!found) {
            currTime += timeStep;
            continue;
        }

        // Reduce remaining time of current process
        rt[shortest].remTime -= timeStep;

        // push only if processes pid is different from previous one
        let lenO = orderOfProcesses.length;
        if(lenO <= 0 || orderOfProcesses[lenO - 1].pid != processes[shortest].pid)
            orderOfProcesses.push(processes[shortest]);
        
        // update minRt and if remTime gets to 0, set it back to infinity
        minRt = rt[shortest].remTime;
        minRtPid = rt[shortest].pid;
        if(minRt == 0) {
            minRt = Infinity;
        }

        // If process is terminated
        if(rt[shortest].remTime == 0) {
            // completion count increases
            numComplete++;
            found = false;

            // for waiting times
            finishTime = currTime + timeStep;
            
            processes[shortest].waitTime = finishTime - processes[shortest].exeTime - processes[shortest].arrTime;
            processes[shortest].tarTime = finishTime - processes[shortest].arrTime;

            waitingTimes.push({
                pid: processes[shortest].pid,
                wt: processes[shortest].waitTime
            });
            tarTimes.push({
                pid: processes[shortest].pid,
                tar: processes[shortest].tarTime
            });

            let len = waitingTimes.length;
            if(waitingTimes[len - 1].wt < 0) {
                waitingTimes[len - 1].wt = 0;
            }
        }

        // increase the simulation current time by timeStep
        currTime += timeStep;
    }

    return currTime;
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

// let result = SimulateAndReturn(procs);
// console.log(result);

module.exports = {
    SimulateAndReturn
}