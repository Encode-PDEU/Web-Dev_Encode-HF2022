//for validation and input won't be greater than 199 and less than 0
function isValidInputNumbers(requestSequence, head) {
  for (i = 0; i < requestSequence.length; ++i)
    if (requestSequence[i] > 199 || requestSequence[i] < 0)
      return false;

  if (head > 199 || head < 0)
    return false;

  return true;
}

// ---------- Main Algorithm ---------------

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

// Reset to empty and none
function resetCscanResult() {
  let ele = document.getElementById('cscan_totalSeekCount');
  ele.innerText = '';
  ele = document.getElementById('cscan_finalOrder');
  ele.innerText = '';
  ele = document.getElementById('cscan_averageSeekCount');
  ele.innerText = '';
  ele = document.getElementById('chartContainer');
  ele.style.display = 'none';
}

function cscan_click() {
  // initialise the inputs
  let requestSequenceCscan = document.getElementById("Sequence").value;
  let headCscan = document.getElementById("Head").value;
  let direction = document.getElementById("Direction").value;
  requestSequenceCscan = requestSequenceCscan
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    });
  if (requestSequenceCscan.length === 0) {
    alert("invalid input!!!");
    return;
  }

  for (i = 0; i < requestSequenceCscan.length; ++i) {
    if (!Number.isInteger(+requestSequenceCscan[i]) || !(+requestSequenceCscan[i] >= 0)) {
      alert("invalid input!!! Only integer values are valid");
      return;
    }
  }
  if (headCscan.length === 0) {
    alert("invalid input!!! ");
    return;
  }
  if (!Number.isInteger(+headCscan) || Number.isInteger(+headCscan) < 0) {
    alert("invalid input!!! Only integer values are valid");
    return;
  }

  // for filtering inputs
  headCscan = +headCscan;
  requestSequenceCscan = requestSequenceCscan.toString()
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    }).map(function (a) { return +a; });
  if (!isValidInputNumbers(requestSequenceCscan, headCscan)) {
    alert("Got invalid input!!! Integral value(x) should be in the range 0<=x<=199");
    return;
  }

  // get result from sequence (array)
  const result = cscan_man(requestSequenceCscan, headCscan, direction);
  let ele = document.getElementById('cscan_totalSeekCount');
  ele.innerText = result[0];
  ele = document.getElementById('cscan_finalOrder');
  ele.innerText = '';
  for (h = 0; h < result[1].length; ++h) {
    if (h % 6 === 0 && h !== result[1].length - 1) {
      ele.innerText += "\n";
    }
    if (h !== result[1].length - 1) {
      ele.innerText += result[1][h] + ", ";
      continue;
    }
    ele.innerText += result[1][h];
  }
  ele = document.getElementById('cscan_averageSeekCount');
  ele.innerText = (result[0] / (result[1].length - 1)).toFixed(2);
  ele = document.getElementById('chartContainer');
  ele.style.display = 'block';

  //for graph using canvaJS
  const ary = [];
  result[1].forEach(function (p) {
    ary.push({ y: p });
  });

  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    animationDuration: 300 * (ary.length - 1),
    theme: "light2",
    zoomEnabled: true,
    title: {
      text: ""
    },
    axisY: {
      title: "Disk Numbers",
      titleFontColor: "rgb(0,0,0)"
    },
    axisX: {
      title: "Request sequence",
      titleFontColor: "rgb(0,0,0)",
      minimum: 0,
      interval: 1
    },
    data: [{
      type: "line",
      indexLabelFontSize: 16,
      dataPoints: ary
    }]
  });
  chart.render();

  let modal = document.getElementById("myModal");

  let span = document.getElementsByClassName("close")[0];

  span.onclick = function () {
    modal.style.display = "none";
  }
}