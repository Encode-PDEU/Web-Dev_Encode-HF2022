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
// ---------- Main Algorithm Ends ---------------

// Reset to empty and none
function resetLookResult() {
  let ele = document.getElementById('look_totalSeekCount');
  ele.innerText = '';
  ele = document.getElementById('look_finalOrder');
  ele.innerText = '';
  ele = document.getElementById('look_averageSeekCount');
  ele.innerText = '';
  ele = document.getElementById('chartContainer');
  ele.style.display = 'none';
}

function look_click() {

  // initialise the inputs
  let requestSequenceLook = document.getElementById("Sequence").value;
  let headLook = document.getElementById("Head").value;
  let direction = document.getElementById("Direction").value;

  requestSequenceLook = requestSequenceLook
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    });

  if (requestSequenceLook.length === 0) {
    alert("invalid input!!!");
    return;
  }

  for (i = 0; i < requestSequenceLook.length; ++i) {
    if (!Number.isInteger(+requestSequenceLook[i]) || !(+requestSequenceLook[i] >= 0)) {
      alert("invalid input!!! Only integer values are valid");
      return;
    }
  }

  if (headLook.length === 0) {
    alert("invalid input!!!");
    return;
  }
  if (!Number.isInteger(+headLook) || Number.isInteger(+headLook) < 0) {
    alert("invalid input!!! Only integer values are valid");
    return;
  }

  // for filtering inputs
  headLook = +headLook;
  requestSequenceLook = requestSequenceLook.toString()
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    }).map(function (a) { return +a; });

  if (!isValidInputNumbers(requestSequenceLook, headLook)) {
    alert("Got invalid input!!! Integral value(x) should be in the range 0<=x<=199");
    return;
  }

  // get result from sequence (array)
  const result = look_man(requestSequenceLook, headLook, direction);
  let ele = document.getElementById('look_totalSeekCount');
  ele.innerText = result[0];
  ele = document.getElementById('look_finalOrder');
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
  ele = document.getElementById('look_averageSeekCount');
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