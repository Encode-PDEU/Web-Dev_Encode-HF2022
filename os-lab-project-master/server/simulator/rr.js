// The Round Robin cpu scheduling algorithm
// Every process will get the equal share of cpu (i.e. for an equal small amount of time)
// It will only depend on burst times

const calcAverage = require("../utils/calcAverage");

// Global vars
const timeQuantum = 2;
let waitingTimes = [];
let tarTimes = [];
let orderOfProcesses = [];

// ez
const findAvgWaitingTime = () => {
    let wts = [];

    for(let i=0; i<waitingTimes.length; i++) {
        wts.push(waitingTimes[i].wt);
    }

    return calcAverage.average(wts);
}

// run simulation
const simulate = (processes) => {
    let n = processes.length;
    let remBt = [];                 // remaining execution times

    // Enqueue all the processes
    for(let i=0; i<n; i++) {
        remBt.push({
            pid: processes[i].pid,
            rt: processes[i].exeTime
        });
    }

    // simulation time
    let currTime = 0;

    // Infinite loop
    while(1) {
        // Everything done
        let done = true;

        // Loop through all processes one by one
        for(let i=0; i<n; i++) {
            // When we find an unfinished process
            if(remBt[i].rt > 0) {
                done = false;

                // for gantt chart
                orderOfProcesses.push(processes[i]);
                
                // when the process execution time is larger than time quantum,
                // we just subtract from its execution
                if(remBt[i].rt > timeQuantum) {
                    currTime += timeQuantum;

                    remBt[i].rt -= timeQuantum;
                }
                // Last cycle of the process
                else {
                    currTime += remBt[i].rt;

                    // waiting time will be difference of current time and burst time
                    processes[i].waitTime = currTime - processes[i].exeTime;
                    processes[i].tarTime = processes[i].exeTime + processes[i].waitTime;

                    waitingTimes.push({
                        pid: processes[i].pid,
                        wt: processes[i].waitTime
                    });
                    tarTimes.push({
                        pid: processes[i].pid,
                        tar: processes[i].tarTime
                    });

                    // since this process is over
                    remBt[i].rt = 0;
                }
            }
        }
        // exit condition
        if(done)
            break;
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

// // Testing
// let p1 = new Process(1, "P1", 2, 4, 0);
// let p2 = new Process(2, "P2", 5, 3, 0);
// let p3 = new Process(3, "P3", 1, 5, 0);

// let procs = [p1, p2, p3];

// let result = SimulateAndReturn(procs);
// console.log(result);

module.exports = {
    SimulateAndReturn
}