// Process class to identify and encapsulate
// a particular Process

/*
    pid: Id of the process
    pName: Name of the process (can be anything really)
    arrTime: Arrival time of the process
    exeTime: Execution time of the process
    serTime: Service time of the process
*/
class Process {
    constructor(pid, pName, arrTime, exeTime) {
        this.pid = pid;
        this.pname = pName;
        this.arrTime = arrTime;
        this.exeTime = exeTime;
        
        this.tarTime = -1;
        this.waitTime = -1;
        this.isExecuting = false;
    }
}

module.exports = Process;