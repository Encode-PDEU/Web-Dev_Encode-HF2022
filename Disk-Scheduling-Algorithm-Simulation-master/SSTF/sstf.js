// checking if input numbers are acceptable
function isValidInputNumbers(requestSequence, head) {
  for (i = 0; i < requestSequence.length; ++i)
    if (requestSequence[i] > 199 || requestSequence[i] < 0)
      return false;
    
  if (head > 199 || head < 0)
    return false;

  return true;
}


// ---------- Main Algorithm ---------------
// --------- Time Complexity = O ( length ^ 2 ) ---------

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
      tmp.push(Math.abs( requestFinalOrderSstf[requestFinalOrderSstf.length - 1] - requestSequenceSstf[j]));



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


// Reset to empty 
function resetSstfResult() {
  let ele = document.getElementById("sstf_totalSeekCount");
  ele.innerText = "";
  ele = document.getElementById("sstf_finalOrder");
  ele.innerText = "";
  ele = document.getElementById("sstf_averageSeekCount");
  ele.innerText = "";
  ele = document.getElementById("chartContainer");
  ele.style.display = "none";
}


function sstf_click() {

  // initialise the inputs
  let requestSequenceSstf = document.getElementById("Sequence").value;
  let headSstf = document.getElementById("Head").value;
  
  requestSequenceSstf = requestSequenceSstf
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    });

  if (requestSequenceSstf.length === 0) {
    alert("invalid input!!!");
    return;
  }

  for (i = 0; i < requestSequenceSstf.length; ++i) {
    if (!Number.isInteger(+requestSequenceSstf[i]) || !(+requestSequenceSstf[i] >= 0)) {
      alert("invalid input!!! Only integer values are valid");
      return;
    }
  }

  if (headSstf.length === 0) {
    alert("invalid input!!! ");
    return;
  }

  if (!Number.isInteger(+headSstf) || Number.isInteger(+headSstf) < 0) {
    alert("invalid input!!! Only integer values are valid");
    return;
  }

  // make every number positive in request sequence
  headSstf = +headSstf;
  requestSequenceSstf = requestSequenceSstf
    .toString()
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    })
    .map(function (a) {
      return +a;
    });

  if (!isValidInputNumbers(requestSequenceSstf, headSstf)) {
    alert("Got invalid input!!! Integral value(x) should be in the range 0<=x<=199");
    return;
  }

  // get result from sequence (array)
  const result = sstf_man(requestSequenceSstf, headSstf);

  let ele = document.getElementById("sstf_totalSeekCount");
  ele.innerText = result[0];
  
  ele = document.getElementById("sstf_finalOrder");
  ele.innerText = "";
  for (h = 0; h < result[1].length; ++h) {
    if (h % 6 === 0 && h !== result[1].length - 1)
      ele.innerText += "\n";
    
    if (h !== result[1].length - 1) {
      ele.innerText += result[1][h] + ", ";
      continue;
    }
    ele.innerText += result[1][h];
  }

  ele = document.getElementById("sstf_averageSeekCount");
  ele.innerText = (result[0] / (result[1].length - 1)).toFixed(2);
  
  ele = document.getElementById("chartContainer");
  ele.style.display = "block";

  const ary = [];
  result[1].forEach(function (p) {
    ary.push({ y: p });
  });

  // Graph Using CanvasJs
  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    animationDuration: 300 * (ary.length - 1),
    theme: "light2",
    zoomEnabled: true,
    title: {
      text: "",
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
    data: [
      {
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: ary,
      },
    ],
    
  });
  chart.render();
  
  let modal = document.getElementById("myModal");

  let span = document.getElementsByClassName("close")[0];

  span.onclick = function () {
    modal.style.display = "none";
  };
}
