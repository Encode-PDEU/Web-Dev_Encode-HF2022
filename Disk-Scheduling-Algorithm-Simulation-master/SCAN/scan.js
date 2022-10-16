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
// ---------- Time Complexity O (length * log(length)) ----------
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
// ---------- Main Algorithm Ends ---------------

// Reset to empty and none
function resetScanResult() {
  let ele = document.getElementById('scan_totalSeekCount');
  ele.innerText = '';
  ele = document.getElementById('scan_finalOrder');
  ele.innerText = '';
  ele = document.getElementById('scan_averageSeekCount');
  ele.innerText = '';
  ele = document.getElementById('chartContainer');
  ele.style.display = 'none';
}

function scan_click() {
  // initialise the inputs
  let requestSequenceScan = document.getElementById("Sequence").value;
  let headScan = document.getElementById("Head").value;
  let direction = document.getElementById("Direction").value;
  requestSequenceScan = requestSequenceScan
      .split(/ |,/)
      .filter(function (character) {
        return character !== "";
      });
  if (requestSequenceScan.length === 0) {
    alert("invalid input!!!");
    return;
  }

  for (i = 0; i < requestSequenceScan.length; ++i) {
    if (!Number.isInteger(+requestSequenceScan[i]) ||  !(+requestSequenceScan[i] >= 0)
    ) {
      alert("invalid input!!! Only integer values are valid");
      return;
    }
  }
  if (headScan.length === 0) {
    alert("invalid input!!! ");
    return;
  }
  if (!Number.isInteger(+headScan) || Number.isInteger(+headScan) < 0) {
    alert("invalid input!!! Only integer values are valid");
    return;
  }

  // for filtering inputs
  headScan = +headScan;
  requestSequenceScan = requestSequenceScan.toString()
      .split(/ |,/)
      .filter(function (character) {
        return character !== "";
      }).map(function(a){return +a;});
  if(!isValidInputNumbers(requestSequenceScan, headScan)) {
    alert("Got invalid input!!! Integral value(x) should be in the range 0<=x<=199");
    return;
  }

  // get result from sequence (array)
  const result = scan_man(requestSequenceScan, headScan, direction);
  let ele = document.getElementById('scan_totalSeekCount');
  ele.innerText = result[0];
  ele = document.getElementById('scan_finalOrder');
  ele.innerText = '';
  for(h = 0; h < result[1].length; ++h) {
    if(h%6 === 0 && h !== result[1].length - 1) {
      ele.innerText += "\n";
    }
    if(h !== result[1].length - 1) {
      ele.innerText += result[1][h] + ", ";
      continue;
    }
    ele.innerText += result[1][h];
  }
  ele = document.getElementById('scan_averageSeekCount');
  ele.innerText = (result[0]/(result[1].length-1)).toFixed(2);
  ele = document.getElementById('chartContainer');
  ele.style.display = 'block';

  //for graph using canvaJS
  const ary = [];
  result[1].forEach(function(p) {
    ary.push({y: p});
  });

  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    animationDuration: 300 * (ary.length - 1),
    theme: "light2",
    zoomEnabled: true,
    title:{
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

  span.onclick = function() {
    modal.style.display = "none";
  }
}  