// Get the form data and send a post request to server

const API_URL = "http://localhost:3301";

const process_form = document.querySelector("#process_form");
const sim_form = document.querySelector("#sim_form");
const del_form = document.querySelector("#del_proc");

const ooe_heading = document.querySelector("#order-of-exe");
ooe_heading.style.display = "none";

const tar_heading = document.querySelector("#tar-time");
tar_heading.style.display = "none";

const wait_heading = document.querySelector("#wait-time");
wait_heading.style.display = "none";

const avg_wait_heading = document.querySelector("#avg-wait-time");
const sim_end_time = document.querySelector("#sim-end-time");

// show the table for processes
const showProcessTable = () => {
    // get all processes
    fetch(API_URL + "/processes")
        .then(response => response.json())
        .then(res => {
            let ptable = new Tabulator("#process-table", {
                data: res,
                layout: "fitColumns",
                columns: [
                    { title: "Process ID", field: "pid" },
                    { title: "Process Name", field: "pname" },
                    { title: "Arrival Time", field: "arr_time", sorter: "number" },
                    { title: "Execution Time", field: "exe_time" },
                    { title: "Priority", field: "priority" },
                ],
                // sort according to arrival time
                initialSort: [
                    { column: "arr_time", dir: "asc" }
                ]
            });
        });
}
showProcessTable();

// To add process...
process_form.addEventListener('submit', (event) => {
    event.preventDefault();
    // form data creates key value pair
    const formData = new FormData(process_form);

    // get values and send to server
    const pid = formData.get('pid');
    const pname = formData.get('pname');
    const arr_time = parseInt(formData.get('arr_time'));
    const exe_time = parseInt(formData.get('exe_time'));

    const process = {
        pid,
        pname,
        arr_time,
        exe_time,
        priority: null,
    }

    // reset the form fields
    process_form.reset();

    fetch(API_URL + '/create', {
        method: 'POST',
        body: JSON.stringify(process),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(res => {
            alert(res.message);
            showProcessTable();
        });

    // alert("Form submitted!");
});

// delete process from database
del_form.addEventListener('submit', (event) => {
    event.preventDefault();

    // get form value
    const formData = new FormData(del_form);

    // send request to server
    const data = {
        pid: formData.get("pid")
    };

    // reset the fields
    del_form.reset();

    fetch(API_URL + "/delete", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(res => {
            alert(res.message);
            showProcessTable();
        });
});

// For simulating...
sim_form.addEventListener('submit', (event) => {
    event.preventDefault();

    // get the value of algo
    const formData = new FormData(sim_form);
    const algo_name = formData.get('algo');

    // send request to server
    const data = {
        algo: algo_name
    };

    // send a request to the server for simulation
    fetch(API_URL + "/simulate", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(res => {
            let tableData = [];
            let tarTableData = [];
            let waitTableData = [];

            let ganttChart = res["simulationResult"]["ganttChart"];
            let tarTimes = res["simulationResult"]["turnAroundTimes"];
            let waitTimes = res["simulationResult"]["waitingTimes"];

            // Order of execution
            for (let i = 0; i < ganttChart.length; i++) {
                // remove isExecuting field from ganttChart
                let { isExecuting, arrTime, endTime, tarTime, waitTime, ...data } = ganttChart[i];
                tableData.push(data);
            }

            // Turn around times
            for (let i = 0; i < tarTimes.length; i++) {
                // remove isExecuting field from ganttChart
                tarTableData.push(tarTimes[i]);
            }

            // Waiting times
            for (let i = 0; i < waitTimes.length; i++) {
                // remove isExecuting field from ganttChart
                waitTableData.push(waitTimes[i]);
            }

            // Show simulation table
            ooe_heading.style.display = "block";
            let simTable = new Tabulator("#simulator-table", {
                data: tableData,
                layout: "fitColumns",
                columns: [
                    { title: "Process ID", field: "pid" },
                    { title: "Order of Execution", field: "pname" },
                ]
            });

            // Show turn around time table
            tar_heading.style.display = "block";
            let tarTable = new Tabulator("#tar-table", {
                data: tarTableData,
                layout: "fitColumns",
                columns: [
                    { title: "Process ID", field: "pid" },
                    { title: "Turn around Time", field: "tar" },
                ]
            });

            // Show waiting time table
            wait_heading.style.display = "block";
            let waitTable = new Tabulator("#wait-table", {
                data: waitTableData,
                layout: "fitColumns",
                columns: [
                    { title: "Process ID", field: "pid" },
                    { title: "Waiting Time", field: "wt" },
                ]
            });

            // Average waiting time and simulation end time
            let avgWaitTime = res["simulationResult"]["averageWaitingTime"];
            let simEndTime = res["simulationResult"]["simulationEndTime"];

            if (!avgWaitTime) {
                avgWaitTime = 0;
            }
            avg_wait_heading.innerHTML = "Average Waiting Time (in seconds):&nbsp;&nbsp;&nbsp;&nbsp;" + avgWaitTime;
            sim_end_time.innerHTML = "Simulation End Time (in seconds):&nbsp;&nbsp;&nbsp;&nbsp;" + simEndTime;
        });
});