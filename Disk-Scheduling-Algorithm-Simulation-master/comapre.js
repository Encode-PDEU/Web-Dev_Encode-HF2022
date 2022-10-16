function isValidInputNumbers(requestSequence, head) {
    for (i = 0; i < requestSequence.length; ++i)
        if (requestSequence[i] > 199 || requestSequence[i] < 0)
            return false;

    if (head > 199 || head < 0)
        return false;

    return true;
}

function resetResult() {
    let ele = document.getElementById('totalSeekCount');
    ele.innerText = '';
    ele = document.getElementById('finalOrder');
    ele.innerText = '';
    ele = document.getElementById('averageSeekCount');
    ele.innerText = '';
    ele = document.getElementById('chartContainer');
    ele.style.display = 'none';
    ele = document.getElementById("compareBtn");
    ele.style.display = "none";
}

//FCFS
function fcfs_man(requestSequenceFcfs, headFcfs) {
    // array with starting element headFcfs
    requestFinalOrderFcfs = [headFcfs];
    for (i = 0; i < requestSequenceFcfs.length; ++i) {
        requestFinalOrderFcfs.push(requestSequenceFcfs[i]);
    }
    let totalSeekCountFcfs = Math.abs(requestSequenceFcfs[0] - headFcfs);
    for (i = 1; i < requestSequenceFcfs.length; ++i) {
        totalSeekCountFcfs += Math.abs(
            requestSequenceFcfs[i] - requestSequenceFcfs[i - 1]
        );
    }
    // returns an array with two elements (int, array)
    return [totalSeekCountFcfs, requestFinalOrderFcfs];
}
//SSTF
function sstf_man(requestSequenceSstf, headSstf) {

    const len = requestSequenceSstf.length;

    // initialize final sequence
    requestFinalOrderSstf = [headSstf];

    // initialize total seek time
    totalSeekCountSstf = 0;

    for (i = 0; i < len; ++i) {

        // array of difference of sequence nummbers
        let tmp = [];
        for (j = 0; j < requestSequenceSstf.length; ++j)
            tmp.push(Math.abs(requestFinalOrderSstf[requestFinalOrderSstf.length - 1] - requestSequenceSstf[j]));



        // gets the mininum value from tmp[]
        var minIndex = tmp.indexOf(Math.min.apply(null, tmp));

        // add minimum value -> final sequence
        totalSeekCountSstf += tmp[minIndex];
        requestFinalOrderSstf.push(requestSequenceSstf[minIndex]);

        // delete the value pushed to final sequence from request sequence
        requestSequenceSstf.splice(minIndex, 1);
    }

    // returns an array with two elements (int, array)
    return [totalSeekCountSstf, requestFinalOrderSstf];
}
//SCAN
function scan_man(requestSequenceScan, headScan, direction) {

    requestFinalOrderScan = [headScan];
    tmp = 0;

    //Ascending Order
    tmpAry = [];

    for (let i = 0; i < requestSequenceScan.length; ++i)
        tmpAry.push(requestSequenceScan[i]);

    // It will sort array in ascending order
    requestSequenceScanSorted = tmpAry.sort(function (a, b) {
        return a - b;
    });

    //loop will break when headScan is less than ith element and tmp=i
    for (i = 0; i < requestSequenceScanSorted.length; ++i) {
        if (headScan < requestSequenceScanSorted[i]) {
            tmp = i;
            break;
        }
    }

    if (direction === "Left") {
        for (i = tmp - 1; i >= 0; --i)
            requestFinalOrderScan.push(requestSequenceScanSorted[i]);

        if (requestFinalOrderScan[requestFinalOrderScan.length - 1] !== 0)
            requestFinalOrderScan.push(0);


        for (i = tmp; i < requestSequenceScanSorted.length; ++i)
            requestFinalOrderScan.push(requestSequenceScanSorted[i]);

        totalSeekCountScan = Math.abs(headScan + requestFinalOrderScan[requestFinalOrderScan.length - 1]);
    }

    // for direction == right
    else {
        for (i = tmp; i < requestSequenceScanSorted.length; ++i)
            requestFinalOrderScan.push(requestSequenceScanSorted[i]);

        if (requestFinalOrderScan[requestFinalOrderScan.length - 1] !== 0)
            requestFinalOrderScan.push(199);

        for (i = tmp - 1; i >= 0; --i)
            requestFinalOrderScan.push(requestSequenceScanSorted[i]);

        totalSeekCountScan = Math.abs((199 - headScan) + (199 - requestFinalOrderScan[requestFinalOrderScan.length - 1]));
    }

    return [totalSeekCountScan, requestFinalOrderScan];
}
//CSCAN
function cscan_man(requestSequenceCscan, headCscan, direction) {

    requestFinalOrderCscan = [headCscan];
    tmp = 0;

    //Descending Order
    tmpAry = [];
    for (let i = 0; i < requestSequenceCscan.length; ++i)
        tmpAry.push(requestSequenceCscan[i]);

    // It will sort array in descending order
    requestSequenceCscanSorted = tmpAry.sort(function (a, b) {
        return b - a;
    });

    //loop will break when headScan is more than ith element and tmp=i
    for (i = 0; i < requestSequenceCscanSorted.length; ++i) {
        if (headCscan > requestSequenceCscanSorted[i]) {
            tmp = i;
            break;
        }
    }

    if (direction === "Right") {
        for (i = tmp - 1; i >= 0; --i)
            requestFinalOrderCscan.push(requestSequenceCscanSorted[i]);

        if (requestFinalOrderCscan[requestFinalOrderCscan.length - 1] !== 199)
            requestFinalOrderCscan.push(199);

        for (i = requestSequenceCscanSorted.length - 1; i >= tmp; --i) {
            if (i === requestSequenceCscanSorted.length - 1 && requestSequenceCscanSorted[i] !== 0) {
                requestFinalOrderCscan.push(0);
            }
            requestFinalOrderCscan.push(requestSequenceCscanSorted[i]);
        }
        totalSeekCountCscan = Math.abs(199 - headCscan + 199 + requestFinalOrderCscan[requestFinalOrderCscan.length - 1]);
    }

    // for direction == left
    else {

        for (i = tmp; i <= requestSequenceCscanSorted.length - 1; ++i)
            requestFinalOrderCscan.push(requestSequenceCscanSorted[i]);

        if (requestFinalOrderCscan[requestFinalOrderCscan.length - 1] !== 0)
            requestFinalOrderCscan.push(0);

        for (i = 0; i < tmp; ++i) {
            if (i === 0 && requestSequenceCscanSorted[i] !== 199)
                requestFinalOrderCscan.push(199);

            requestFinalOrderCscan.push(requestSequenceCscanSorted[i]);
        }

        totalSeekCountCscan = Math.abs(headCscan + 199 + (199 - requestFinalOrderCscan[requestFinalOrderCscan.length - 1]));
    }
    return [totalSeekCountCscan, requestFinalOrderCscan];
}
//LOOK
function look_man(requestSequenceLook, headLook, direction) {

    requestFinalOrderLook = [headLook];
    tmp = 0;

    //Ascending Order
    tmpAry = [];
    for (let i = 0; i < requestSequenceLook.length; ++i) {
        tmpAry.push(requestSequenceLook[i]);
    }

    // It will sort array in ascending order
    requestSequenceLookSorted = tmpAry.sort(function (a, b) {
        return a - b;
    });

    //loop will break when headLook is less than ith element and tmp=i
    for (i = 0; i < requestSequenceLookSorted.length; ++i) {
        if (requestSequenceLookSorted[i] > headLook) {
            tmp = i;
            break;
        }
    }

    if (direction === "Right") {

        for (i = tmp; i < requestSequenceLookSorted.length; ++i)
            requestFinalOrderLook.push(requestSequenceLookSorted[i]);

        for (i = tmp - 1; i >= 0; --i)
            requestFinalOrderLook.push(requestSequenceLookSorted[i]);

        totalSeekCountLook = Math.abs(requestSequenceLookSorted[requestSequenceLookSorted.length - 1] - headLook +
            (Math.abs(requestSequenceLookSorted[requestSequenceLookSorted.length - 1] - requestSequenceLookSorted[0])));
    }

    // for directon = Left
    else {
        for (i = tmp - 1; i >= 0; --i)
            requestFinalOrderLook.push(requestSequenceLookSorted[i]);

        for (i = tmp; i < requestSequenceLookSorted.length; ++i)
            requestFinalOrderLook.push(requestSequenceLookSorted[i]);

        totalSeekCountLook = Math.abs(headLook - requestSequenceLookSorted[0]) +
            (Math.abs(requestSequenceLookSorted[requestSequenceLookSorted.length - 1] - requestSequenceLookSorted[0]));
    }

    return [totalSeekCountLook, requestFinalOrderLook];
}
//CLOOK
function clook_man(requestSequenceClook, headClook, direction) {

    requestFinalOrderClook = [headClook];
    tmp = 0;

    //Ascending Order
    tmpAry = [];
    for (let i = 0; i < requestSequenceClook.length; ++i)
        tmpAry.push(requestSequenceClook[i]);

    // It will sort array in ascending order
    requestSequenceClookSorted = tmpAry.sort(function (a, b) {
        return a - b;
    });

    //loop will break when headClook is less than ith element and tmp=i
    for (i = 0; i < requestSequenceClookSorted.length; ++i) {
        if (requestSequenceClookSorted[i] > headClook) {
            tmp = i;
            break;
        }
    }

    if (direction === "Right") {
        for (i = tmp; i < requestSequenceClookSorted.length; ++i)
            requestFinalOrderClook.push(requestSequenceClookSorted[i]);

        for (i = 0; i < tmp; ++i)
            requestFinalOrderClook.push(requestSequenceClookSorted[i]);

        totalSeekCountClook =
            Math.abs(requestSequenceClookSorted[requestSequenceClookSorted.length - 1] -
                headClook +
                (Math.abs(requestSequenceClookSorted[requestSequenceClookSorted.length - 1] -
                    requestSequenceClookSorted[0])) +
                (Math.abs(requestFinalOrderClook[requestFinalOrderClook.length - 1] -
                    requestSequenceClookSorted[0])));
    }

    // for direction = left
    else {
        for (i = tmp - 1; i >= 0; --i)
            requestFinalOrderClook.push(requestSequenceClookSorted[i]);

        for (i = requestSequenceClookSorted.length - 1; i >= tmp; --i)
            requestFinalOrderClook.push(requestSequenceClookSorted[i]);

        totalSeekCountClook = Math.abs(headClook - requestSequenceClookSorted[0]) + Math.abs(requestSequenceClookSorted[requestSequenceClookSorted.length - 1] - requestSequenceClookSorted[0]) + Math.abs(requestSequenceClookSorted[requestSequenceClookSorted.length - 1] - requestSequenceClookSorted[tmp]);
    }

    return [totalSeekCountClook, requestFinalOrderClook];
}

function comparison_click_from_algo() {
    let requestSequenceComparison = document.getElementById("Sequence").value;
    let headComparison = document.getElementById("Head").value;
    let direction = document.getElementById("Direction").value;
    requestSequenceComparison = requestSequenceComparison
        .split(/ |,/)
        .filter(function (character) {
            return character !== "";
        });

    if (requestSequenceComparison.length === 0) {
        alert("invalid input!!!");
        return;
    }

    for (i = 0; i < requestSequenceComparison.length; ++i) {
        if (!Number.isInteger(+requestSequenceComparison[i]) || !(+requestSequenceComparison[i] >= 0)) {
            alert("invalid input!!! Only integer values are valid");
            return;
        }
    }
    if (headComparison.length === 0) {
        alert("invalid input!!!");
        return;
    }
    if (!Number.isInteger(+headComparison) || Number.isInteger(+headComparison) < 0) {
        alert("invalid input!!! Only integer values are valid");
        return;
    }
    headComparison = +headComparison;
    requestSequenceComparison = requestSequenceComparison
        .toString()
        .split(/ |,/)
        .filter(function (character) {
            return character !== "";
        })
        .map(function (a) {
            return +a;
        });
    if (!isValidInputNumbers(requestSequenceComparison, headComparison)) {
        alert("invalid input!!! Integral value(x) should be in the range 0<=x<=199");
        return;
    }

    ary = [];
    bry = [[]];
    cry = [];

    requestSequenceFcfs = requestSequenceComparison.slice();
    requestSequenceSstf = requestSequenceComparison.slice();
    requestSequenceScan = requestSequenceComparison.slice();
    requestSequenceCscan = requestSequenceComparison.slice();
    requestSequenceLook = requestSequenceComparison.slice();
    requestSequenceClook = requestSequenceComparison.slice();

    resultFcfs = fcfs_man(requestSequenceFcfs, headComparison);
    resultSstf = sstf_man(requestSequenceSstf, headComparison);
    resultScan = scan_man(requestSequenceScan, headComparison, direction);
    resultCscan = cscan_man(requestSequenceCscan, headComparison, direction);
    resultLook = look_man(requestSequenceLook, headComparison, direction);
    resultClook = clook_man(requestSequenceClook, headComparison, direction);

    let ele1 = document.getElementById("fcfs_totalSeekCount");
    ele1.innerText = resultFcfs[0];
    let ele2 = document.getElementById("sstf_totalSeekCount");
    ele2.innerText = resultSstf[0];
    let ele3 = document.getElementById("scan_totalSeekCount");
    ele3.innerText = resultScan[0];
    let ele4 = document.getElementById("cscan_totalSeekCount");
    ele4.innerText = resultCscan[0];
    let ele5 = document.getElementById("look_totalSeekCount");
    ele5.innerText = resultLook[0];
    let ele6 = document.getElementById("clook_totalSeekCount");
    ele6.innerText = resultClook[0];

    min_ary = []
    min_ary.push(resultFcfs[0]);
    min_ary.push(resultSstf[0]);
    min_ary.push(resultScan[0]);
    min_ary.push(resultCscan[0]);
    min_ary.push(resultLook[0]);
    min_ary.push(resultClook[0]);
    let minimum = min_ary[0];
    for (let i = 1; i < min_ary.length; ++i){
        if(min_ary[i] < minimum){
            minimum = min_ary[i];
        }
    }

    let ele7 = document.getElementById("minimum_SeekCount");
    ele7.innerText = minimum;

    ele = document.getElementById("chartContainer");
    ele.style.display = "block";

    ary.push(resultFcfs[1]);
    ary.push(resultSstf[1]);
    ary.push(resultScan[1]);
    ary.push(resultCscan[1]);
    ary.push(resultLook[1]);
    ary.push(resultClook[1]);
  
    i = 0;
    ary.forEach(function (p)
    {
        p.forEach(function (q) 
        {
            bry[i].push({ y: q });
        });
        if (i !== 6) {
            bry.push([]);
            ++i;
        }
    });

    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        animationDuration: 5000,
        theme: "light2",
        zoomEnabled: true,
        title: {
            text: "Comparison Chart",
        },
        axisY: {
            title: "Disk Numbers",
            titleFontColor: "rgb(0,0,0)",
        },
        axisX: {
            title: "Request sequence",
            titleFontColor: "rgb(0,0,0)",
            minimum: 0,
            interval: 1
        },
        legend: {
            cursor: "pointer",
            fontSize: 16,
            itemclick: function (e) {
                if (
                    typeof e.dataSeries.visible === "undefined" ||
                    e.dataSeries.visible
                ) {
                    e.dataSeries.visible = false;
                } else {
                    e.dataSeries.visible = true;
                }
                e.chart.render();
            },
            //itemclick: toggleDataSeries
        },
        toolTip: {
            shared: true,
        },
        data: [
            {
                type: "line",
                lineColor: "#85ff6e",
                indexLabelFontSize: 16,
                name: "FCFS",
                showInLegend: true,
                dataPoints: bry[0],
            },
            {
                type: "line",
                lineColor: "#0b3bfc",
                indexLabelFontSize: 16,
                name: "SSTF",
                showInLegend: true,
                dataPoints: bry[1],
            },
            {
                type: "line",
                lineColor: "#ff6cfb",
                indexLabelFontSize: 16,
                name: "SCAN",
                showInLegend: true,
                dataPoints: bry[2],
            },
            {
                type: "line",
                lineColor: "#ff413f",
                indexLabelFontSize: 16,
                name: "CSCAN",
                showInLegend: true,
                dataPoints: bry[3],
            },
            {
                type: "line",
                lineColor: "#ff9b04",
                indexLabelFontSize: 16,
                name: "LOOK",
                showInLegend: true,
                dataPoints: bry[4],
            },
            {
                type: "line",
                lineColor: "#a800f7",
                indexLabelFontSize: 16,
                name: "CLOOK",
                showInLegend: true,
                dataPoints: bry[5],
            },
        ],
    });
    chart.render();
    document.getElementById("chartContainer2").style.display = "block";
    document.getElementById("title").innerText = title;
    document.getElementById("title").style.display = "block";
    document.getElementById("answers").innerText = ans;
    document.getElementById("answers").style.display = "block";
}
