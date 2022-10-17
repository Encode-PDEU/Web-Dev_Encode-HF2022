
// ------------------------------------------------------------------------

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
});

var alertList = document.querySelectorAll('.alert')
alertList.forEach(function (alert) {
    new bootstrap.Alert(alert)
});

// ------------------------------------------------------------------------

document.getElementById('compare-line-chart').style.display = 'none';
document.getElementById('compare-bar-chart').style.display = 'none';

var compare = document.getElementById("compare");
compare.classList.toggle("disabled");

// Declaring blank charts for all the algorithms
var fcfsCtx = document.getElementById("fcfschart").getContext("2d");
var fcfsChart = new Chart(fcfsCtx, {});

var sstfCtx = document.getElementById("sstfchart").getContext("2d");
var sstfChart = new Chart(sstfCtx, {});

var clookCtx = document.getElementById("clookchart").getContext("2d");
var clookChart = new Chart(clookCtx, {});

var cscanCtx = document.getElementById("cscanchart").getContext("2d");
var cscanChart = new Chart(cscanCtx, {});

var lookCtx = document.getElementById("lookchart").getContext("2d");
var lookChart = new Chart(lookCtx, {});

var scanCtx = document.getElementById("scanchart").getContext("2d");
var scanChart = new Chart(scanCtx, {});

// Inner Carousel elements

var carousel_elements = [];

carousel_elements.push(`<div id="fcfsCarousel" class="carousel-item" data-bs-interval="10000">
<div class="chartres">
    <canvas id="fcfschart"></canvas>
</div>

<div id="fcfsseek" class="seek" style="width: 100%; height: 10%; text-align: center;">
    <h4 id="fcfstemp" class="temp"> </h4>
</div>
</div>`);

carousel_elements.push(`<div id="sstfCarousel" class="carousel-item" data-bs-interval="10000">
<div class="chartres">
    <canvas id="sstfchart"></canvas>
</div>

<div id="sstfseek" class="seek" style="width: 100%; height: 10%; text-align: center;">
    <h4 id="sstftemp" class="temp"> </h4>
</div>
</div>`);

carousel_elements.push(`<div id="scanCarousel" class="carousel-item" data-bs-interval="10000">
<div class="chartres">
    <canvas id="scanchart"></canvas>
</div>

<div id="scanseek" class="seek" style="width: 100%; height: 10%; text-align: center;">
    <h4 id="scantemp" class="temp"> </h4>
</div>
</div>`);

carousel_elements.push(`<div id="cscanCarousel" class="carousel-item" data-bs-interval="10000">
<div class="chartres">
    <canvas id="cscanchart"></canvas>
</div>

<div id="cscanseek" class="seek" style="width: 100%; height: 10%; text-align: center;">
    <h4 id="cscantemp" class="temp"> </h4>
</div>
</div>`);

carousel_elements.push(`<div id="lookCarousel" class="carousel-item" data-bs-interval="10000">
<div class="chartres">
    <canvas id="lookchart"></canvas>
</div>

<div id="lookseek" class="seek" style="width: 100%; height: 10%; text-align: center;">
    <h4 id="looktemp" class="temp"> </h4>
</div>
</div>`);

carousel_elements.push(`<div id="clookCarousel" class="carousel-item" data-bs-interval="10000">
<div class="chartres">
    <canvas id="clookchart"></canvas>
</div>

<div id="clookseek" class="seek" style="width: 100%; height: 10%; text-align: center;">
    <h4 id="clooktemp" class="temp"> </h4>
</div>
</div>`);



// Functions for different algorithms

function sstf(trackRequests, headpos, n) {
    var tr = trackRequests;
    var a = 0; var requestorder = [];
    while (n != 0) {
        var tr1 = [];
        for (var i = 0; i < n; i++) {
            tr1[i] = Math.abs(tr[i] - headpos);
        }
        var min = Math.min(...tr1);
        var index = tr1.indexOf(min);
        headpos = tr[index];
        requestorder[a++] = tr[index];
        tr.splice(index, 1);
        n--;
    }

    return requestorder;
}

function clook(trackRequests, headpos, direction, yrange) {
    let tr = trackRequests;

    var requestorder = [];
    let i;

    if (tr.indexOf(headpos) !== -1) {
        tr.splice(tr.indexOf(headpos), 1);
        yrange-=1;
    }

    if (direction === "right") {
        let startindex;
        for (i = 0; i < yrange; i++) {
            if (tr[i] > headpos) {
                startindex = i;
                break;
            }
        }
        for (i = startindex; i < yrange; i++) {
            requestorder.push(tr[i]);
        };
        for (i = 0; i < startindex; i++) {
            requestorder.push(tr[i]);
        }
    }
    else if (direction === "left") {
        let startindex;
        for (i = 0; i < yrange; i++) {
            if (tr[i] > headpos) {
                startindex = i - 1;
                break;
            }
        }
        for (i = startindex; i > -1; i--) {
            requestorder.push(tr[i]);
        }
        for (i = yrange - 1; i > startindex; i--) {
            requestorder.push(tr[i]);
        }
    }
    return requestorder;
}

function cscan(trackRequests, headpos, direction, yrange) {
    let tr = trackRequests;
    tr.sort(function (b, c) {
        return b - c
    });

    var requestorder = [];
    let i;

    if (tr.indexOf(headpos) !== -1) {
        tr.splice(tr.indexOf(headpos), 1);
        yrange -=1;
    }

    if (direction === "right") {
        let startindex;
        for (i = 0; i < yrange; i++) {
            if (tr[i] > headpos) {
                startindex = i;
                break;
            }
        }
        for (i = startindex; i < yrange; i++) {
            requestorder.push(tr[i]);
        }
        for (i = 0; i < startindex; i++) {
            requestorder.push(tr[i]);
        }
    }
    else if (direction === "left") {

        let startindex;
        for (i = 0; i < yrange; i++) {
            if (tr[i] > headpos) {
                startindex = i - 1;
                break;
            }
        }
        for (i = startindex; i > -1; i--) {
            requestorder.push(tr[i]);
        }
        for (i = yrange - 1; i > startindex; i--) {
            requestorder.push(tr[i]);
        }
    }
    return requestorder;
}


function look(trackRequests, headpos, direction, yrange) {
    let tr = trackRequests;
    var requestorder = [];
    let i = 0;

    if (tr.indexOf(headpos) !== -1) {
        tr.splice(tr.indexOf(headpos), 1);
        yrange -= 1;
    }

    tr.sort(function (b, c) {
        return b - c
    });


    if (direction === "right") {
        let startindex;
        for (i = 0; i < yrange; i++) {
            if (tr[i] > headpos) {
                startindex = i;
                break;
            }
        }
        for (i = startindex; i < yrange; i++) {
            requestorder.push(tr[i]);
        }
        for (i = startindex - 1; i > -1; i--) {
            requestorder.push(tr[i]);
        }
    }
    else if (direction === "left") {
        let startindex;
        for (i = 0; i < yrange; i++) {
            if (tr[i] > headpos) {
                startindex = i - 1;
                break;
            }
        }
        for (i = startindex; i > -1; i--) {
            requestorder.push(tr[i]);
        }
        for (i = startindex+1; i < yrange; i++) {
            requestorder.push(tr[i]);
        }
    }
    return requestorder;
}


function scan(trackRequests, headpos, direction, max, yrange) {
    let tr = trackRequests;
    var requestorder = [];
    let i = 0;

    if (tr.indexOf(headpos) !== -1) {
        tr.splice(tr.indexOf(headpos), 1);
        yrange -= 1;
    }

    if (direction === "right") {
        if (tr.indexOf(max) === -1) {
            tr.push(max);
            yrange += 1;
        }
        tr.sort(function (b, c) {
            return b - c
        });

        let startindex;
        for (i = 0; i < yrange; i++) {
            if (tr[i] > headpos) {
                startindex = i;
                break;
            }
        }
        for (i = startindex; i < yrange; i++) {
            requestorder.push(tr[i]);
        }
        for (i = startindex - 1; i > -1; i--) {
            requestorder.push(tr[i]);
        }
    }
    else if (direction === "left") {
        if (tr.indexOf(0) === -1) {
            tr.push(0);
            yrange += 1;
        }
        tr.sort(function (b, c) {
            return b - c
        });
        let startindex;
        for (i = 0; i < yrange; i++) {
            if (tr[i] > headpos) {
                startindex = i - 1;
                break;
            }
        }
        for (i = startindex; i > -1; i--) {
            requestorder.push(tr[i]);
        }
        for (i = startindex+1; i < yrange; i++) {
            requestorder.push(tr[i]);
        }
    }
    return requestorder;
}

function seekOperations(requestorder, headpos) {
    var seektime = 0;
    seektime += Math.abs(headpos - requestorder[0]);
    for (var i = 0; i < requestorder.length - 1; i++) {
        seektime += Math.abs(requestorder[i + 1] - requestorder[i]);
    }
    return seektime;
}

// Common paramters for all the algorithms
var xlabel = [], ylabel = [];
var firstTime = true;
var requests = document.getElementById("requests");
var maxTrack = document.getElementById("max-track");
var headPosition = document.getElementById("head");
var dir = document.getElementById("direction");
var tracks = document.getElementById("tracks");
var tR;
var seekOpAll = [0, 0, 0, 0, 0, 0];

function fcfsExecute() {
    fcfsChart.destroy();
    if (requests.value !== '' && headPosition.value !== '' && tracks.value !== '') {

        if (firstTime) {
            document.getElementById("chart-container").classList.toggle("show-element");
            firstTime = false;
        }

        let yrange = 0, head = 0, xrange = 0;
        yrange = Number(requests.value); head = Number(headPosition.value);
        xrange = Number(maxTrack.value);

        // CHECK ON THE TYPE OF INPUT BY THE USER
        let trackRequests = [...tR];
        

        if (trackRequests[0] === head) {
            trackRequests.splice(0, 1);
            yrange--;
        }

        for (var i = 0; i <= xrange; i++) {
            xlabel[i] = i;
        }

        var fcfsProgressWrapper = document.getElementById("fcfsseek");
        fcfsProgressWrapper.innerHTML =
            `<div id="fcfsProgressBarContainer" class="progress animate__animated animate__backInUp">
                <div id="fcfsProgressBar" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>`;


        var fcfsProgressBar = document.getElementById("fcfsProgressBar");
        var fcfsProgressBarContainer = document.getElementById("fcfsProgressBarContainer");


        // THE CHART ITSELF

        fcfsChart = new Chart(fcfsCtx, {
            type: 'line',
            data: {
                labels: xlabel,
                datasets: [
                    {
                        label: "Showing",
                        yAxisID: "first",
                        xAxisID: "scale",
                        fill: false,
                        borderColor: 'black',
                        pointBackgroundColor: 'rgba(168, 255, 120,1)',
                        pointHoverBackgroundColor: 'red',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        lineTension: 0.2,
                        data: []
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    fontFamily: 'Roboto Slab',
                    fontSize: 30,
                    fontColor: 'black',
                    text: 'FCFS Graph'
                },
                hover: {
                    mode: 'index',
                    axis: 'x',
                },
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {

                        title: function (tooltipItem, data) {
                            return 'FCFS';
                        },
                        label: function (tooltipItem, data) {
                            return 'Properties';
                        },
                        afterLabel: function (tooltipItem, data) {
                            let rnumber = 'Request: ' + tooltipItem.yLabel;
                            let tnumber = 'Track: ' + data.datasets[tooltipItem.datasetIndex].data[Number(tooltipItem.yLabel)].x;
                            return (
                                [
                                    rnumber,
                                    tnumber
                                ]
                            );
                        }
                    }
                },
                animation: {
                    easing: 'easeInQuad',
                },
                scales: {
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                fontFamily: 'Roboto Slab',
                                fontSize: 12,
                                fontStyle: 'bold',
                                fontColor: 'black',
                                labelString: 'REQUEST NUMBER'
                            },
                            id: 'first',
                            position: 'top',
                            ticks: {
                                reverse: true,
                                max: yrange + 1,
                                min: 0,
                                stepSize: 1,
                            },
                        }
                    ],
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                fontFamily: 'Roboto Slab',
                                fontSize: 12,
                                fontStyle: 'bold',
                                fontColor: 'black',
                                labelString: 'TRACK NUMBER'
                            },
                            id: 'scale',
                            ticks: {
                                max: xrange,
                                min: 0,
                                stepSize: 1,
                            },
                            display: true,
                            position: 'top',
                        }
                    ]
                }

            }
        });

        function displaySeekOp() {
            let temp = document.getElementById('fcfstemp');
            temp.remove();

            var seekOp = document.createElement('h4');
            seekOp.id = 'fcfstemp'; seekOp.class = 'temp';
            seekOp.style.fontWeight = "700"; seekOp.style.margin = '15px';
            seekOpAll[0] = seekOperations(trackRequests, head);

            // JUST FOR DEBUGGING PURPOSES
            console.log('FCFS: '+ trackRequests); 
            console.log(seekOpAll[0]);

            var str = 'Total Seek Operations: ' + seekOperations(trackRequests, head);
            seekOp.append(document.createTextNode(str));
            seekOp.classList.add("animate__animated"); seekOp.classList.add("animate__backInUp");
            document.getElementById('fcfsseek').append(seekOp);
        }

        // UPDATING THE CHART
        var start = {
            x: head,
            y: 0,
        };
        fcfsChart.data.datasets[0].data.push(start);
        fcfsChart.update();

        var a = 0;
        var incrementValue = 100 / yrange, counter = 0;
        var updatingData = setInterval(pushData, 700);
        function pushData() {
            if (a < yrange) {
                var obj = {
                    x: trackRequests[a],
                    y: a + 1
                };
                fcfsChart.data.datasets[0].data.push(obj);
                fcfsChart.update();
                a = a + 1;

                counter += incrementValue;
                fcfsProgressBar.style.width = counter + "%"
            }
            else {
                clearInterval(updatingData);
                fcfsProgressBarContainer.classList.toggle("animate__backOutDown");
                setTimeout(function () {
                    fcfsProgressBarContainer.style.display = "none";
                    fcfsProgressWrapper.innerHTML = `<h4 id="fcfstemp"> </h4>`;
                    displaySeekOp();
                }, 1000
                );
            }
        }
    }
}

function sstfExecute() {
    if (requests.value !== '' && headPosition.value !== '' && tracks.value !== '') {
        if (firstTime) {
            document.getElementById("chart-container").classList.toggle("show-element");
            firstTime = false;
        }

        let yrange = 0, head = 0, xrange = 0;
        yrange = Number(requests.value); head = Number(headPosition.value);
        xrange = Number(maxTrack.value);

        // INITIALIZING GLOBAL INPUT TO LOCAL COPIES
        let trackRequests = [...tR];

        // CALLING THE REQUIRED FUNCTION FOR GETTING THE FINAL ARRAY
        trackRequests = [...new Set(trackRequests)];
        yrange = Number(trackRequests.length);
        if (trackRequests.indexOf(head) !== -1) {
            trackRequests.splice(trackRequests.indexOf(head), 1);
            yrange--;
        }
        trackRequests = sstf(trackRequests, head, yrange);
        yrange = Number(trackRequests.length);

        for (var i = 0; i <= xrange; i++) {
            xlabel[i] = i;
        }
        for (i = 0; i <= yrange; i++) {
            ylabel[i] = i;
        }


        var sstfProgressWrapper = document.getElementById("sstfseek");
        sstfProgressWrapper.innerHTML =
            `<div id="sstfProgressBarContainer" class="progress animate__animated animate__backInUp">
                <div id="sstfProgressBar" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>`;

        var sstfProgressBar = document.getElementById("sstfProgressBar");
        var sstfProgressBarContainer = document.getElementById("sstfProgressBarContainer");

        // THE CHART ITSELF
        sstfChart.destroy();
        sstfChart = new Chart(sstfCtx, {
            type: 'line',
            data: {
                labels: xlabel,
                datasets: [
                    {
                        label: "Showing",
                        yAxisID: "first",
                        xAxisID: "scale",
                        fill: false,
                        borderColor: 'black',
                        pointBackgroundColor: 'rgba(168, 255, 120,1)',
                        pointHoverBackgroundColor: 'red',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        lineTension: 0.2,
                        data: []
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    fontFamily: 'Roboto Slab',
                    fontSize: 30,
                    fontColor: 'black',
                    text: 'SSTF Graph'
                },
                hover: {
                    mode: 'index',
                    axis: 'x',
                },
                legend: {
                    display: false,
                },
                tooltips: {
                    callbacks: {

                        title: function (tooltipItem, data) {
                            return 'SSTF';
                        },
                        label: function (tooltipItem, data) {
                            return 'Properties';
                        },
                        afterLabel: function (tooltipItem, data) {
                            let rnumber = 'Request: ' + tooltipItem.yLabel;
                            let tnumber = 'Track: ' + data.datasets[tooltipItem.datasetIndex].data[Number(tooltipItem.yLabel)].x;
                            return (
                                [
                                    rnumber,
                                    tnumber
                                ]
                            );
                        }
                    }
                },
                animation: {
                    easing: 'easeInQuad',
                },
                scales: {
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                fontFamily: 'Roboto Slab',
                                fontSize: 12,
                                fontStyle: 'bold',
                                fontColor: 'black',
                                labelString: 'REQUEST NUMBER'
                            },
                            id: 'first',
                            position: 'top',
                            ticks: {
                                reverse: true,
                                max: yrange + 1,
                                min: 0,
                                stepSize: 1,
                            },
                        }
                    ],
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                fontFamily: 'Roboto Slab',
                                fontSize: 12,
                                fontStyle: 'bold',
                                fontColor: 'black',
                                labelString: 'TRACK NUMBER'
                            },
                            id: 'scale',
                            ticks: {
                                max: xrange,
                                min: 0,
                                stepSize: 1,
                            },
                            display: true,
                            position: 'top',
                        }
                    ]
                }

            }
        });

        function displaySeekOp() {
            let temp = document.getElementById('sstftemp');
            temp.remove();

            var seekOp = document.createElement('h4');
            seekOp.id = 'sstftemp'; seekOp.class = 'temp'
            seekOp.style.fontWeight = "700"; seekOp.style.margin = '15px';
            seekOpAll[1] = seekOperations(trackRequests, head);

            // JUST FOR DEBUGGING PURPOSES
            console.log('SSTF: '+ trackRequests); 
            console.log(seekOpAll[1]);

            var str = 'Total Seek Operations: ' + seekOperations(trackRequests, head);
            seekOp.append(document.createTextNode(str));
            seekOp.classList.add("animate__animated"); seekOp.classList.add("animate__backInUp");
            document.getElementById('sstfseek').append(seekOp);
        }

        // UPDATING THE CHART
        var start = {
            x: head,
            y: 0,
        };
        sstfChart.data.datasets[0].data.push(start);
        sstfChart.update();

        var a = 0;
        var incrementValue = 100 / yrange, counter = 0;
        var updatingData = setInterval(pushData, 700);
        function pushData() {
            if (a < yrange) {
                var obj = {
                    x: trackRequests[a],
                    y: a + 1
                };
                sstfChart.data.datasets[0].data.push(obj);
                sstfChart.update();
                a = a + 1;

                counter += incrementValue;
                sstfProgressBar.style.width = counter + "%"
            }
            else {
                clearInterval(updatingData);
                sstfProgressBarContainer.classList.toggle("animate__backOutDown");
                setTimeout(function () {
                    sstfProgressBarContainer.style.display = "none";
                    sstfProgressWrapper.innerHTML = `<h4 id="sstftemp"> </h4>`;
                    displaySeekOp();
                }, 1000
                );
            }
        }
    }
}


function clookExecute() {
    if (requests.value !== '' && headPosition.value !== '' && tracks.value !== '') {
        if (firstTime) {
            document.getElementById("chart-container").classList.toggle("show-element");
            firstTime = false;
        }

        let yrange = 0, head = 0, xrange = 0;
        head = Number(headPosition.value);
        xrange = Number(maxTrack.value);

        let trackRequests = [...tR];

        // CALLING THE REQUIRED FUNCTION FOR GETTING THE FINAL ARRAY
        trackRequests = [...new Set(trackRequests)];
        yrange = Number(trackRequests.length);
        trackRequests.sort(function (b, c) {
            return b - c
        });
        let minimum = trackRequests[0], maximum = trackRequests[yrange - 1];
        trackRequests = clook(trackRequests, head, String(dir.value), yrange);
        yrange = Number(trackRequests.length);

        for (var i = 0; i <= xrange; i++) {
            xlabel[i] = i;
        }
        for (i = 0; i <= yrange; i++) {
            ylabel[i] = i;
        }

        var clookProgressWrapper = document.getElementById("clookseek");
        clookProgressWrapper.innerHTML =
            `<div id="clookProgressBarContainer" class="progress animate__animated animate__backInUp">
                <div id="clookProgressBar" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>`;


        var clookProgressBar = document.getElementById("clookProgressBar");
        var clookProgressBarContainer = document.getElementById("clookProgressBarContainer");

        // THE CHART ITSELF
        clookChart.destroy();
        clookChart = new Chart(clookCtx, {
            type: 'line',
            data: {
                labels: xlabel,
                datasets: [
                    {
                        yAxisID: "first",
                        xAxisID: "scale",
                        fill: false,
                        borderColor: 'black',
                        pointBackgroundColor: 'rgba(168, 255, 120,1)',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 4,
                        lineTension: 0.2,
                        data: []
                    },

                    {
                        yAxisID: "first",
                        xAxisID: "scale",
                        fill: false,
                        borderColor: 'black',
                        borderDash: [10, 15],
                        pointBackgroundColor: 'rgba(168, 255, 120,1)',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 4,
                        lineTension: 0.2,
                        data: []
                    },

                    {
                        yAxisID: "first",
                        xAxisID: "scale",
                        fill: false,
                        borderColor: 'black',
                        pointBackgroundColor: 'rgba(168, 255, 120,1)',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 4,
                        lineTension: 0.2,
                        data: []
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    fontFamily: 'Roboto Slab',
                    fontSize: 30,
                    fontColor: 'black',
                    text: 'C-LOOK Graph'
                },
                hover: {
                    mode: 'index',
                    axis: 'x',
                },
                legend: {
                    display: false,
                },
                tooltips: {
                    filter: function (tooltipItem) {
                        return tooltipItem.datasetIndex === 0 || tooltipItem.datasetIndex === 2;
                    },
                    mode: 'nearest',
                    axis: 'x',
                    callbacks: {

                        title: function (tooltipItem, data) {
                            return 'C-LOOK';
                        },
                        label: function (tooltipItem, data) {
                            return 'Properties';
                        },
                        afterLabel: function (tooltipItem, data) {
                            let rnumber = 'Request: ' + data.datasets[tooltipItem.datasetIndex].data[Number(tooltipItem.index)].y;
                            let tnumber = 'Track: ' + data.datasets[tooltipItem.datasetIndex].data[Number(tooltipItem.index)].x;
                            return (
                                [
                                    rnumber,
                                    tnumber
                                ]
                            );
                        }
                    }
                },
                animation: {
                    easing: 'easeInQuad',
                },
                scales: {
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                fontFamily: 'Roboto Slab',
                                fontSize: 12,
                                fontStyle: 'bold',
                                fontColor: 'black',
                                labelString: 'REQUEST NUMBER'
                            },
                            id: 'first',
                            position: 'top',
                            ticks: {
                                reverse: true,
                                max: yrange + 1,
                                min: 0,
                                stepSize: 1,
                            },
                        }
                    ],
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                fontFamily: 'Roboto Slab',
                                fontSize: 12,
                                fontStyle: 'bold',
                                fontColor: 'black',
                                labelString: 'TRACK NUMBER'
                            },
                            id: 'scale',
                            ticks: {
                                max: xrange,
                                min: 0,
                                stepSize: 1,
                            },
                            display: true,
                            position: 'top',
                        }
                    ]
                }

            }
        });

        function displaySeekOp() {
            let temp = document.getElementById('clooktemp');
            temp.remove();

            var seekOp = document.createElement('h4');
            seekOp.id = 'clooktemp'; seekOp.class = 'temp';
            seekOp.style.fontWeight = "700"; seekOp.style.margin = '15px';
            seekOpAll[5] = seekOperations(trackRequests, head);

            // JUST FOR DEBUGGING PURPOSES
            console.log('CLOOK: '+ trackRequests); 
            console.log(seekOpAll[5]);

            var str = 'Total Seek Operations: ' + seekOperations(trackRequests, head);
            seekOp.append(document.createTextNode(str));
            seekOp.classList.add("animate__animated"); seekOp.classList.add("animate__backInUp");
            document.getElementById('clookseek').append(seekOp);
        }

        // UPDATING THE CHART
        var start = {
            x: head,
            y: 0,
        };
        clookChart.data.datasets[0].data.push(start);
        clookChart.update();

        var a = 0;
        var firstover = false;
        var incrementValue = 100 / yrange, counter = 0;
        var updatingData = setInterval(pushData, 700);
        function pushData(direction) {

            if (a < yrange) {

                var obj = {
                    x: trackRequests[a],
                    y: a + 1
                };

                if (firstover === false) {
                    if (obj.x === maximum || obj.x === minimum) {
                        clookChart.data.datasets[0].data.push(obj);
                        clookChart.update();

                        clookChart.data.datasets[1].data.push(obj);
                        a += 1;

                        counter += incrementValue;
                        clookProgressBar.style.width = counter + "%";

                        var obj_temp = {
                            x: trackRequests[a],
                            y: a + 1
                        };
                        clookChart.data.datasets[1].data.push(obj_temp);
                        clookChart.update();

                        clookChart.data.datasets[2].data.push(obj_temp);
                        a += 1;

                        firstover = true;
                        clookChart.update();

                        counter += incrementValue;
                        clookProgressBar.style.width = counter + "%";
                    }
                    else {
                        clookChart.data.datasets[0].data.push(obj);
                        clookChart.update();
                        a = a + 1;

                        counter += incrementValue;
                        clookProgressBar.style.width = counter + "%";
                    }
                }
                else {
                    clookChart.data.datasets[2].data.push(obj);
                    clookChart.update();
                    a = a + 1;

                    counter += incrementValue;
                    clookProgressBar.style.width = counter + "%";
                }
            }
            else {
                clearInterval(updatingData);
                clookProgressBarContainer.classList.toggle("animate__backOutDown");
                setTimeout(function () {
                    clookProgressBarContainer.style.display = "none";
                    clookProgressWrapper.innerHTML = `<h4 id="clooktemp"> </h4>`;
                    displaySeekOp();
                }, 1000
                );
            }
        }
    }
}


function cscanExecute() {
    if (requests.value !== '' && headPosition.value !== '' && tracks.value !== '') {
        if (firstTime) {
            document.getElementById("chart-container").classList.toggle("show-element");
            firstTime = false;
        }

        let yrange = 0, head = 0, xrange = 0;
        head = Number(headPosition.value);
        xrange = Number(maxTrack.value);

        // CHECK ON THE TYPE OF INPUT BY THE USER
        let trackRequests = [...tR];

        // CALLING THE REQUIRED FUNCTION FOR GETTING THE FINAL ARRAY
        trackRequests.push(0); trackRequests.push(xrange);
        trackRequests = [...new Set(trackRequests)];
        yrange = Number(trackRequests.length);
        trackRequests = cscan(trackRequests, head, String(dir.value), yrange);
        yrange = Number(trackRequests.length);

        for (var i = 0; i <= xrange; i++) {
            xlabel[i] = i;
        }
        for (i = 0; i <= yrange; i++) {
            ylabel[i] = i;
        }

        var cscanProgressWrapper = document.getElementById("cscanseek");
        cscanProgressWrapper.innerHTML =
            `<div id="cscanProgressBarContainer" class="progress animate__animated animate__backInUp">
                <div id="cscanProgressBar" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>`;

        var cscanProgressBar = document.getElementById("cscanProgressBar");
        var cscanProgressBarContainer = document.getElementById("cscanProgressBarContainer");

        // THE CHART ITSELF
        cscanChart.destroy();
        cscanChart = new Chart(cscanCtx, {
            type: 'line',
            data: {
                labels: xlabel,
                datasets: [
                    {
                        label: "Showing",
                        yAxisID: "first",
                        xAxisID: "scale",
                        fill: false,
                        borderColor: 'black',
                        pointBackgroundColor: 'rgba(168, 255, 120,1)',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 4,
                        lineTension: 0.2,
                        data: []
                    },

                    {
                        label: "Showing",
                        yAxisID: "first",
                        xAxisID: "scale",
                        fill: false,
                        borderColor: 'black',
                        borderDash: [10, 15],
                        pointBackgroundColor: 'rgba(168, 255, 120,1)',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 4,
                        lineTension: 0.2,
                        data: []
                    },

                    {
                        label: "Showing",
                        yAxisID: "first",
                        xAxisID: "scale",
                        fill: false,
                        borderColor: 'black',
                        pointBackgroundColor: 'rgba(168, 255, 120,1)',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 4,
                        lineTension: 0.2,
                        data: []
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    fontFamily: 'Roboto Slab',
                    fontSize: 30,
                    fontColor: 'black',
                    text: 'C-SCAN Graph'
                },
                hover: {
                    mode: 'index',
                    axis: 'x',
                },
                legend: {
                    display: false,
                },
                tooltips: {
                    filter: function (tooltipItem) {
                        return tooltipItem.datasetIndex === 0 || tooltipItem.datasetIndex === 2;
                    },
                    mode: 'nearest',
                    axis: 'x',
                    callbacks: {

                        title: function (tooltipItem, data) {
                            return 'C-SCAN';
                        },
                        label: function (tooltipItem, data) {
                            return 'Properties';
                        },
                        afterLabel: function (tooltipItem, data) {
                            let rnumber = 'Request: ' + data.datasets[tooltipItem.datasetIndex].data[Number(tooltipItem.index)].y;

                            let tnumber = 'Track: ' + data.datasets[tooltipItem.datasetIndex].data[Number(tooltipItem.index)].x;
                            return (
                                [
                                    rnumber,
                                    tnumber
                                ]
                            );
                        }
                    }
                },
                animation: {
                    easing: 'easeInQuad',
                },
                scales: {
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                fontFamily: 'Roboto Slab',
                                fontSize: 12,
                                fontStyle: 'bold',
                                fontColor: 'black',
                                labelString: 'REQUEST NUMBER'
                            },
                            id: 'first',
                            position: 'top',
                            ticks: {
                                reverse: true,
                                max: yrange + 1,
                                min: 0,
                                stepSize: 1,
                            },
                        }
                    ],
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                fontFamily: 'Roboto Slab',
                                fontSize: 12,
                                fontStyle: 'bold',
                                fontColor: 'black',
                                labelString: 'TRACK NUMBER'
                            },
                            id: 'scale',
                            ticks: {
                                max: xrange,
                                min: 0,
                                stepSize: 1,
                            },
                            display: true,
                            position: 'top',
                        }
                    ]
                }

            }
        });

        function displaySeekOp() {
            let temp = document.getElementById('cscantemp');
            temp.remove();

            var seekOp = document.createElement('h4');
            seekOp.id = 'cscantemp'; seekOp.class = 'temp';
            seekOp.style.fontWeight = "700"; seekOp.style.margin = '15px';
            seekOpAll[3] = seekOperations(trackRequests, head);

            // JUST FOR DEBUGGING PURPOSES
            console.log('CSCAN: '+ trackRequests); 
            console.log(seekOpAll[3]);

            var str = 'Total Seek Operations: ' + seekOperations(trackRequests, head);
            seekOp.append(document.createTextNode(str));
            seekOp.classList.add("animate__animated"); seekOp.classList.add("animate__backInUp");
            document.getElementById('cscanseek').append(seekOp);

        }

        // UPDATING THE CHART
        var start = {
            x: head,
            y: 0,
        };
        cscanChart.data.datasets[0].data.push(start);
        cscanChart.update();

        var a = 0;
        var firstover = false;
        var incrementValue = 100 / yrange, counter = 0;
        var updatingData = setInterval(pushData, 700);

        function pushData(direction) {

            if (a < yrange) {
                var obj = {
                    x: trackRequests[a],
                    y: a + 1
                };

                if (firstover === false) {
                    if (obj.x === xrange || obj.x === 0) {
                        cscanChart.data.datasets[0].data.push(obj);
                        cscanChart.update();

                        cscanChart.data.datasets[1].data.push(obj);
                        a += 1;

                        counter += incrementValue;
                        cscanProgressBar.style.width = counter + '%';

                        var obj_temp = {
                            x: trackRequests[a],
                            y: a + 1
                        };
                        cscanChart.data.datasets[1].data.push(obj_temp);
                        cscanChart.update();

                        cscanChart.data.datasets[2].data.push(obj_temp);
                        a += 1;

                        firstover = true;
                        cscanChart.update();

                        counter += incrementValue;
                        cscanProgressBar.style.width = counter + "%";
                    }
                    else {
                        cscanChart.data.datasets[0].data.push(obj);
                        cscanChart.update();
                        a = a + 1;

                        counter += incrementValue;
                        cscanProgressBar.style.width = counter + "%";
                    }
                }
                else {
                    cscanChart.data.datasets[2].data.push(obj);
                    cscanChart.update();
                    a = a + 1;

                    counter += incrementValue;
                    cscanProgressBar.style.width = counter + "%";
                }
            }
            else {
                clearInterval(updatingData);
                cscanProgressBarContainer.classList.toggle("animate__backOutDown");
                setTimeout(function () {
                    cscanProgressBarContainer.style.display = "none";
                    cscanProgressWrapper.innerHTML = `<h4 id="cscantemp"> </h4>`;
                    displaySeekOp();
                }, 1000
                );
            }
        }
    }
}


function lookExecute() {
    if (requests.value !== '' && headPosition.value !== '' && tracks.value !== '') {
        if (firstTime) {
            document.getElementById("chart-container").classList.toggle("show-element");
            firstTime = false;
        }

        let yrange = 0, head = 0, xrange = 0;
        head = Number(headPosition.value);
        xrange = Number(maxTrack.value);

        let trackRequests = [...tR];

        // CALLING THE REQUIRED FUNCTION FOR GETTING THE FINAL ARRAY
        trackRequests = [...new Set(trackRequests)];
        yrange = Number(trackRequests.length);
        trackRequests = look(trackRequests, head, String(dir.value), yrange);
        yrange = Number(trackRequests.length);

        for (var i = 0; i <= xrange; i++) {
            xlabel[i] = i;
        }
        for (i = 0; i <= yrange; i++) {
            ylabel[i] = i;
        }


        var lookProgressWrapper = document.getElementById("lookseek");
        lookProgressWrapper.innerHTML =
            `<div id="lookProgressBarContainer" class="progress animate__animated animate__backInUp">
                <div id="lookProgressBar" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>`;

        var lookProgressBar = document.getElementById("lookProgressBar");
        var lookProgressBarContainer = document.getElementById("lookProgressBarContainer");

        // THE CHART ITSELF
        lookChart.destroy();
        lookChart = new Chart(lookCtx, {
            type: 'line',
            data: {
                labels: xlabel,
                datasets: [
                    {
                        label: "Showing",
                        yAxisID: "first",
                        xAxisID: "scale",
                        fill: false,
                        borderColor: 'black',
                        pointBackgroundColor: 'rgba(168, 255, 120,1)',
                        pointHoverBackgroundColor: 'red',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        lineTension: 0.2,
                        data: []
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    fontFamily: 'Roboto Slab',
                    fontSize: 30,
                    fontColor: 'black',
                    text: 'LOOK Graph'
                },
                hover: {
                    mode: 'index',
                    axis: 'x',
                },
                legend: {
                    display: false,
                },
                tooltips: {
                    callbacks: {

                        title: function (tooltipItem, data) {
                            return 'LOOK';
                        },
                        label: function (tooltipItem, data) {
                            return 'Properties';
                        },
                        afterLabel: function (tooltipItem, data) {
                            let rnumber = 'Request: ' + tooltipItem.yLabel;
                            let tnumber = 'Track: ' + data.datasets[tooltipItem.datasetIndex].data[Number(tooltipItem.yLabel)].x;
                            return (
                                [
                                    rnumber,
                                    tnumber
                                ]
                            );
                        }
                    }
                },
                animation: {
                    easing: 'easeInQuad',
                },
                scales: {
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                fontFamily: 'Roboto Slab',
                                fontSize: 12,
                                fontStyle: 'bold',
                                fontColor: 'black',
                                labelString: 'REQUEST NUMBER'
                            },
                            id: 'first',
                            position: 'top',
                            ticks: {
                                reverse: true,
                                max: yrange + 1,
                                min: 0,
                                stepSize: 1,
                            },
                        }
                    ],
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                fontFamily: 'Roboto Slab',
                                fontSize: 12,
                                fontStyle: 'bold',
                                fontColor: 'black',
                                labelString: 'TRACK NUMBER'
                            },
                            id: 'scale',
                            ticks: {
                                max: xrange,
                                min: 0,
                                stepSize: 1,
                            },
                            display: true,
                            position: 'top',
                        }
                    ]
                }

            }
        });

        function displaySeekOp() {
            let temp = document.getElementById('looktemp');
            temp.remove();

            var seekOp = document.createElement('h4');
            seekOp.id = 'looktemp'; seekOp.class = 'temp';
            seekOp.style.fontWeight = "700"; seekOp.style.margin = '15px';
            seekOpAll[4] = seekOperations(trackRequests, head);

            // JUST FOR DEBUGGING PURPOSES
            console.log('LOOK: '+ trackRequests); 
            console.log(seekOpAll[4]);

            var str = 'Total Seek Operations: ' + seekOperations(trackRequests, head);
            seekOp.append(document.createTextNode(str));
            seekOp.classList.add("animate__animated"); seekOp.classList.add("animate__backInUp");
            document.getElementById('lookseek').append(seekOp);

        }

        // UPDATING THE CHART
        var start = {
            x: head,
            y: 0,
        };
        lookChart.data.datasets[0].data.push(start);
        lookChart.update();

        var a = 0;
        var incrementValue = 100 / yrange, counter = 0;
        var updatingData = setInterval(pushData, 700);
        function pushData() {
            if (a < yrange) {
                var obj = {
                    x: trackRequests[a],
                    y: a + 1
                };
                lookChart.data.datasets[0].data.push(obj);
                lookChart.update();
                a = a + 1;

                counter += incrementValue;
                lookProgressBar.style.width = counter + "%"
            }
            else {
                clearInterval(updatingData);
                lookProgressBarContainer.classList.toggle("animate__backOutDown");
                setTimeout(function () {
                    lookProgressBarContainer.style.display = "none";
                    lookProgressWrapper.innerHTML = `<h4 id="looktemp"> </h4>`;
                    displaySeekOp();
                }, 1000
                );
            }
        }
    }
}


function scanExecute() {
    if (requests.value !== '' && headPosition.value !== '' && tracks.value !== '') {
        if (firstTime) {
            document.getElementById("chart-container").classList.toggle("show-element");
            firstTime = false;
        }

        let yrange = 0, head = 0, xrange = 0;
        head = Number(headPosition.value);
        xrange = Number(maxTrack.value);

        let trackRequests = [...tR];


        // CALLING THE REQUIRED FUNCTION FOR GETTING THE FINAL ARRAY
        trackRequests = [...new Set(trackRequests)];
        yrange = Number(trackRequests.length);
        trackRequests = scan(trackRequests, head, String(dir.value), xrange, yrange);
        yrange = Number(trackRequests.length);

        for (var i = 0; i <= xrange; i++) {
            xlabel[i] = i;
        }
        for (i = 0; i <= yrange; i++) {
            ylabel[i] = i;
        }

        var scanProgressWrapper = document.getElementById("scanseek");
        scanProgressWrapper.innerHTML =
            `<div id="scanProgressBarContainer" class="progress animate__animated animate__backInUp">
                <div id="scanProgressBar" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>`;

        var scanProgressBar = document.getElementById("scanProgressBar");
        var scanProgressBarContainer = document.getElementById("scanProgressBarContainer");

        // THE CHART ITSELF
        scanChart.destroy();
        scanChart = new Chart(scanCtx, {
            type: 'line',
            data: {
                labels: xlabel,
                datasets: [
                    {
                        label: "Showing",
                        yAxisID: "first",
                        xAxisID: "scale",
                        fill: false,
                        borderColor: 'black',
                        pointBackgroundColor: 'rgba(168, 255, 120,1)',
                        pointHoverBackgroundColor: 'red',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        lineTension: 0.2,
                        data: []
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    fontFamily: 'Roboto Slab',
                    fontSize: 30,
                    fontColor: 'black',
                    text: 'SCAN Graph'
                },
                hover: {
                    mode: 'index',
                    axis: 'x',
                },
                legend: {
                    display: false,
                },
                tooltips: {
                    callbacks: {

                        title: function (tooltipItem, data) {
                            return 'SCAN';
                        },
                        label: function (tooltipItem, data) {
                            return 'Properties';
                        },
                        afterLabel: function (tooltipItem, data) {
                            let rnumber = 'Request: ' + tooltipItem.yLabel;
                            let tnumber = 'Track: ' + data.datasets[tooltipItem.datasetIndex].data[Number(tooltipItem.yLabel)].x;
                            return (
                                [
                                    rnumber,
                                    tnumber
                                ]
                            );
                        }
                    }
                },
                animation: {
                    easing: 'easeInQuad',
                },
                scales: {
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                fontFamily: 'Roboto Slab',
                                fontSize: 12,
                                fontStyle: 'bold',
                                fontColor: 'black',
                                labelString: 'REQUEST NUMBER'
                            },
                            id: 'first',
                            position: 'top',
                            ticks: {
                                reverse: true,
                                max: yrange + 1,
                                min: 0,
                                stepSize: 1,
                            },
                        }
                    ],
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                fontFamily: 'Roboto Slab',
                                fontSize: 12,
                                fontStyle: 'bold',
                                fontColor: 'black',
                                labelString: 'TRACK NUMBER'
                            },
                            id: 'scale',
                            ticks: {
                                max: xrange,
                                min: 0,
                                stepSize: 1,
                            },
                            display: true,
                            position: 'top',
                        }
                    ]
                }

            }
        });

        function displaySeekOp() {
            let temp = document.getElementById('scantemp');
            temp.remove();

            var seekOp = document.createElement('h4');
            seekOp.id = 'scantemp'; seekOp.class = 'temp'
            seekOp.style.fontWeight = "700"; seekOp.style.margin = '15px';
            seekOpAll[2] = seekOperations(trackRequests, head);

            // JUST FOR DEBUGGING PURPOSES
            console.log('SCAN: '+ trackRequests); 
            console.log(seekOpAll[2]);

            var str = 'Total Seek Operations: ' + seekOperations(trackRequests, head);
            seekOp.append(document.createTextNode(str));
            seekOp.classList.add("animate__animated"); seekOp.classList.add("animate__backInUp");
            document.getElementById('scanseek').append(seekOp);
        }

        // UPDATING THE CHART
        var start = {
            x: head,
            y: 0,
        };
        scanChart.data.datasets[0].data.push(start);
        scanChart.update();

        var a = 0;
        var incrementValue = 100 / yrange, counter = 0;
        var updatingData = setInterval(pushData, 700);
        function pushData() {
            if (a < yrange) {
                var obj = {
                    x: trackRequests[a],
                    y: a + 1
                };
                scanChart.data.datasets[0].data.push(obj);
                scanChart.update();
                a = a + 1;

                counter += incrementValue;
                scanProgressBar.style.width = counter + "%"
            }
            else {
                clearInterval(updatingData);
                scanProgressBarContainer.classList.toggle("animate__backOutDown");
                setTimeout(function () {
                    scanProgressBarContainer.style.display = "none";
                    scanProgressWrapper.innerHTML = `<h4 id="scantemp"> </h4>`;
                    displaySeekOp();
                }, 1000
                );
            }
        }
    }
}

var barCtx = document.getElementById("barchart").getContext('2d');
Chart.defaults.scale.ticks.beginAtZero = true;
var barChart = new Chart(barCtx, {});

// FUNCTION EXECUTED  
function execute() {

    // Part to be added to other js files 

    // ------------------------------------------------------------------------
    document.getElementById("alert-wrapper").innerHTML = ``;

    let allOk = true;
    var str = '';
    if (requests.value === '') {
        str = 'Number of requests cannot be left blank!';
        document.getElementById("alert-wrapper").innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert" style="margin: 15px;">
            <strong>Warning!</strong> ${str}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        allOk = false;
    }
    if (Number(requests.value) <= 0 && allOk) {
        str = 'The number of request should be greater than 0!';
        document.getElementById("alert-wrapper").innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert" style="margin: 15px;">
            <strong>Warning!</strong> ${str}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        allOk = false;
    }
    if (maxTrack.value === '' && allOk) {
        str = 'Maximum number of tracks cannot be left blank!';
        document.getElementById("alert-wrapper").innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert" style="margin: 15px;">
            <strong>Warning!</strong> ${str}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        allOk = false;
    }
    if (Number(maxTrack.value) <= 0 && allOk) {
        str = 'Maximum number of tracks should be greater than 0!';
        document.getElementById("alert-wrapper").innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert" style="margin: 15px;">
            <strong>Warning!</strong> ${str}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        allOk = false;
    }
    if (headPosition.value === '' && allOk) {
        str = 'The starting head position needs to be mentioned! It cannot be left blank.'
        document.getElementById("alert-wrapper").innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert" style="margin: 15px;">
            <strong>Warning!</strong> ${str}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        allOk = false;
    }
    if ((Number(headPosition.value) < 0 || Number(headPosition.value) > Number(maxTrack.value)) && allOk) {
        str = 'The starting head position of must lie between 0 and maximum track number.';
        document.getElementById("alert-wrapper").innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert" style="margin: 15px;">
            <strong>Warning!</strong> ${str}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        allOk = false;
    }

    tR = [];
    if ((tracks.value.split('')).indexOf(',') === -1) {
        tR = (tracks.value.split(' ')).map(Number);
    }
    else {
        tR = (tracks.value.split(',')).map(Number);
    }
    console.log(tR);
    tR.forEach((x) => {
        if (x < 0 || x > Number(maxTrack.value) && allOk) {
            str = 'All the track requests must lie between 0 and maximum track number.';
            document.getElementById("alert-wrapper").innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert" style="margin: 15px;">
                <strong>Warning!</strong> ${str}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
            allOk = false;
        }
    });

    if (tR.length != Number(requests.value) && allOk) {
        str = 'Please make sure that the number of track requests in the array match the total number of requests.';
        document.getElementById("alert-wrapper").innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert" style="margin: 15px;">
            <strong>Warning!</strong> ${str}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        allOk = false;
    }

    // ------------------------------------------------------------------------



    seekOpAll = [0, 0, 0, 0, 0, 0];
    let selected = [0, 0, 0, 0, 0, 0];
    let total_selected_algos = 0;

    if (document.getElementById('fcfs').checked === true) {
        selected[0] = 1;
        total_selected_algos += 1;

    }
    if (document.getElementById('sstf').checked === true) {
        selected[1] = 1;
        total_selected_algos += 1;
    }
    if (document.getElementById('scan').checked === true) {
        selected[2] = 1;
        total_selected_algos += 1;
    }
    if (document.getElementById('cscan').checked === true) {
        selected[3] = 1;
        total_selected_algos += 1;
    }
    if (document.getElementById('look').checked === true) {
        selected[4] = 1;
        total_selected_algos += 1;
    }
    if (document.getElementById('clook').checked === true) {
        selected[5] = 1;
        total_selected_algos += 1;
    }

    if(total_selected_algos<2 && allOk){
        str = 'Please select atleast two algorithms for comparison.';
        document.getElementById("alert-wrapper").innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert" style="margin: 15px;">
            <strong>Warning!</strong> ${str}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        allOk = false;
    }

    if (allOk) {

        // REVEALING THE CHARTS
        document.getElementById('compare-line-chart').style.display = 'flex';

        window.scrollTo(0, 1328.6666259765625); // Window scrolling

        document.getElementById("text").style.display = "block";

        document.getElementById('cindicators').innerHTML = ``;
        document.getElementById('cinner').innerHTML = ``;

        let functions = [];

        functions.push(fcfsExecute);
        functions.push(sstfExecute);
        functions.push(scanExecute);
        functions.push(cscanExecute);
        functions.push(lookExecute);
        functions.push(clookExecute);

        str = ``;

        for (let i = 0; i < total_selected_algos; i++) {
            if (i === 0) {
                str = str + `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${i}"
            aria-label="Slide ${i + 1}" class="active" aria-current="true"></button>`;
            }
            else {
                str = str + `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${i}"
            aria-label="Slide ${i + 1}" class="" aria-current="true"></button>`;
            }
        }
        document.getElementById('cindicators').innerHTML = str;

        str = ``;

        for (let i = 0; i < 6; i++) {
            if (selected[i] === 1) {
                str = str + carousel_elements[i];
            }
        }
        document.getElementById('cinner').innerHTML = str;
        document.getElementById('cinner').children.item(0).classList.add('active');

        let labelBar = [];

        for (let i = 0; i < 6; i++) {
            if (selected[i] === 1) {
                if (i === 0) {
                    fcfsCtx = document.getElementById("fcfschart").getContext("2d");
                    fcfsChart = new Chart(fcfsCtx, {});
                    labelBar.push('FCFS');

                }
                if (i === 1) {
                    sstfCtx = document.getElementById("sstfchart").getContext("2d");
                    sstfChart = new Chart(sstfCtx, {});
                    labelBar.push('SSTF');
                }
                if (i === 2) {
                    scanCtx = document.getElementById("scanchart").getContext("2d");
                    scanChart = new Chart(scanCtx, {});
                    labelBar.push('SCAN');
                }
                if (i === 3) {
                    cscanCtx = document.getElementById("cscanchart").getContext("2d");
                    cscanChart = new Chart(cscanCtx, {});
                    labelBar.push('CSCAN');
                }
                if (i === 4) {
                    lookCtx = document.getElementById("lookchart").getContext("2d");
                    lookChart = new Chart(lookCtx, {});
                    labelBar.push('LOOK');
                }
                if (i === 5) {
                    clookCtx = document.getElementById("clookchart").getContext("2d");
                    clookChart = new Chart(clookCtx, {});
                    labelBar.push('CLOOK');
                }
            }
        }

        compare.classList.toggle("disabled");
        for (let i = 0; i < 6; i++) {
            if (selected[i] === 1) {
                functions[i]();
            }
        }

        // DISABLING THE COMPARE BUTTON UNTIL THE GRAPH LOADS COMPLETELY

        setTimeout(() => {
            compare.classList.toggle("disabled");
            barChart.destroy();
            document.getElementById('compare-bar-chart').style.display = 'flex';
            bar(labelBar);
            window.scrollTo(0, 1956.6666259765625); // Window Scrolling
        }, (requests.value * 700) + 2500);

    }
}


function bar(labelBar) {
    barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: labelBar,
            datasets: [
                {
                    label: 'Seek Time',
                    backgroundColor: ["rgba(255, 102, 102, 0.4)", "rgba(102, 255, 255, 0.4)", "rgba(204, 102, 255, 0.4)", "rgba(255, 204, 153, 0.4)", "rgba(255, 255, 153, 0.4)", "rgba(153, 255, 153, 0.4)"],
                    borderColor: ['rgba(255, 102, 102, 1)', 'rgba(102, 255, 255, 1)', 'rgba(204, 102, 255, 1)', 'rgba(255, 204, 153, 1)', 'rgba(255, 255, 153, 1)', 'rgba(153, 255, 153, 1)'],
                    borderWidth: 2,
                    data: []
                }
            ]
        },
        options:{
            legend: {
                display: false
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            fontFamily: 'Roboto Slab',
                            fontSize: 12,
                            fontStyle: 'bold',
                            fontColor: 'black',
                            labelString: 'TOTAL SEEK TIME (ms)'
                        },
                    }
                ],
                xAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            fontFamily: 'Roboto Slab',
                            fontSize: 12,
                            fontStyle: 'bold',
                            fontColor: 'black',
                            labelString: 'ALGORITHMS'
                        },
                        id: 'scale',
                    }
                ]
            }
        }
    });

    document.getElementById("dImageIcon").innerHTML = `<a id="url"></a>`;
    document.getElementById("download-buttons").style.display = 'none';

    let url = document.getElementById("url");
    url.remove();

    var dIcon = document.createElement("a");
    dIcon.id = 'url'; dIcon.download = "Compare.jpeg";
    var dButton = document.createElement("button");
    dButton.type = 'button'; dButton.className = 'dButton btn btn-outline-dark animate__animated animate__backInUp';
    dButton.style.padding = '0';
    dButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="black" class="bi bi-download" viewBox="0 0 16 16" style="margin: 6px;">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
        </svg>`;
    dIcon.append(dButton);
    document.getElementById('dImageIcon').append(dIcon);

    function done() {
        let dbut = document.getElementById("download-buttons");
        dbut.style.display = 'flex';
        dbut.style.justifyContent='center';
        dbut.style.alignItems='center';
        dbut.style.flexDirection = 'row';
        dbut.style.width = '100%';
        var url = barChart.toBase64Image();
        document.getElementById("url").href = url;
    }

    var updatingBar = setInterval(pushBar, 700);
    var isTrue = true;
    function pushBar() {
        if (isTrue) {
            for (let i = 0; i < labelBar.length; i++) {
                if (labelBar[i] == "FCFS") {
                    barChart.data.datasets[0].data.push(seekOpAll[0]);
                    barChart.update();
                }
                if (labelBar[i] == "SSTF") {
                    barChart.data.datasets[0].data.push(seekOpAll[1]);
                    barChart.update();
                }
                if (labelBar[i] == "SCAN") {
                    barChart.data.datasets[0].data.push(seekOpAll[2]);
                    barChart.update();
                }
                if (labelBar[i] == "CSCAN") {
                    barChart.data.datasets[0].data.push(seekOpAll[3]);
                    barChart.update();
                }
                if (labelBar[i] == "LOOK") {
                    barChart.data.datasets[0].data.push(seekOpAll[4]);
                    barChart.update();
                }
                if (labelBar[i] == "CLOOK") {
                    barChart.data.datasets[0].data.push(seekOpAll[5]);
                    barChart.update();
                }
            }
            isTrue = false;
        }
        else {
            clearInterval(updatingBar);
            done();
        }
    }
}
compare.addEventListener("click", execute);

window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        document.getElementsByClassName('navbar')[0].classList.add('animate__slideOutUp');
        setTimeout(() => {
            document.getElementsByClassName('navbar')[0].style.display = 'none';

            document.getElementsByClassName('navbar')[0].classList.remove('animate__slideOutUp');
        }, 100);
    }
    else {
        if (document.getElementsByClassName('navbar')[0].style.display === 'none') {
            document.getElementsByClassName('navbar')[0].classList.add('animate__slideInDown');
            setTimeout(() => {
                document.getElementsByClassName('navbar')[0].style.display = 'block';
            }, 50);
            setTimeout(() => {
                document.getElementsByClassName('navbar')[0].classList.remove('animate__slideInDown');
            }, 500);
        }

    }
});