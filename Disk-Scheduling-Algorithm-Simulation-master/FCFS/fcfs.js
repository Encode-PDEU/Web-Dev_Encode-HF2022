function isValidInputNumbers(requestSequence, head) {
  for (i = 0; i < requestSequence.length; ++i) 
    if (requestSequence[i] > 199 || requestSequence[i] < 0) 
      return false;
    
  if (head > 199 || head < 0) 
    return false;
  
  return true;
}

// ---------- Main Algorithm ---------------
// ---------- Time Complexity O (length) ----------

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

// Reset to empty and none
function resetFcfsResult() {
  let ele = document.getElementById('fcfs_totalSeekCount');
  ele.innerText = '';
  ele = document.getElementById('fcfs_finalOrder');
  ele.innerText = '';
  ele = document.getElementById('fcfs_averageSeekCount');
  ele.innerText = '';
  ele = document.getElementById('chartContainer');
  ele.style.display = 'none';
}

function fcfs_click() {
  // initialise the inputs
  let requestSequenceFcfs = document.getElementById("Sequence").value;
  let headFcfs = document.getElementById("Head").value;
  requestSequenceFcfs = requestSequenceFcfs
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    });
  if (requestSequenceFcfs.length === 0) {
    alert("invalid input!!!");
    return;
  }

  for (i = 0; i < requestSequenceFcfs.length; ++i) {
    if (!Number.isInteger(+requestSequenceFcfs[i])) {
      alert("invalid input!!! Only integer values are valid");
      return;
    }
  }

  if (headFcfs.length === 0 || headFcfs.length > 2) {
    alert("invalid input!!! ");
    return;
  }

  if (!Number.isInteger(+headFcfs) || Number.isInteger(+headFcfs) < 0 ) {
    alert("invalid input!!! Only integer values are valid");
    return;
  }

  // make every number positive in request sequence
  headFcfs = +headFcfs;
  requestSequenceFcfs = requestSequenceFcfs.toString()
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    }).map(function (a) { return +a; });

  if (!isValidInputNumbers(requestSequenceFcfs, headFcfs)) {
    alert(
      "invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  // get result from sequence (array)
  const result = fcfs_man(requestSequenceFcfs, headFcfs);

  let ele = document.getElementById('fcfs_totalSeekCount');
  ele.innerText = result[0];
  
  ele = document.getElementById('fcfs_finalOrder');
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

  ele = document.getElementById('fcfs_averageSeekCount');
  ele.innerText = (result[0] / (result[1].length - 1)).toFixed(2);
  
  ele = document.getElementById('chartContainer');
  ele.style.display = 'block';

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