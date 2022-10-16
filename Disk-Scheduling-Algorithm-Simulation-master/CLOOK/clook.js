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

// ---------- Main Algorithm Ends ---------------

// Reset to empty and none
function resetClookResult() {
  let ele = document.getElementById('clook_totalSeekCount');
  ele.innerText = '';
  ele = document.getElementById('clook_finalOrder');
  ele.innerText = '';
  ele = document.getElementById('clook_averageSeekCount');
  ele.innerText = '';
  ele = document.getElementById('chartContainer');
  ele.style.display = 'none';
}

function clook_click() {
  // initialise the inputs
  let requestSequenceClook = document.getElementById("Sequence").value;
  let headClook = document.getElementById("Head").value;
  let direction = document.getElementById("Direction").value;
  requestSequenceClook = requestSequenceClook
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    });
  if (requestSequenceClook.length === 0) {
    alert("invalid input!!!");
    return;
  }

  for (i = 0; i < requestSequenceClook.length; ++i) {
    if (!Number.isInteger(+requestSequenceClook[i]) || !(+requestSequenceClook[i] >= 0)) {
      alert("invalid input!!! Only integer values are valid");
      return;
    }
  }

  if (headClook.length === 0) {
    alert("invalid input!!! ");
    return;
  }

  if (!Number.isInteger(+headClook) || Number.isInteger(+headClook) < 0) {
    alert("invalid input!!! Only integer values are valid");
    return;
  }

  // for filtering inputs
  headClook = +headClook;
  requestSequenceClook = requestSequenceClook.toString()
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    }).map(function (a) { return +a; });
  if (!isValidInputNumbers(requestSequenceClook, headClook)) {
    alert("Got invalid input!!! Integral value(x) should be in the range 0<=x<=199");
    return;
  }

  // get result from sequence (array)
  const result = clook_man(requestSequenceClook, headClook, direction);
  let ele = document.getElementById('clook_totalSeekCount');
  ele.innerText = result[0];
  ele = document.getElementById('clook_finalOrder');
  ele.innerText = '';
  for (h = 0; h < result[1].length; ++h) {
    if (h % 6 === 0 && h !== result[1].length - 1)
      ele.innerText += "\n";
    if (h !== result[1].length - 1) {
      ele.innerText += result[1][h] + ", ";
      continue;
    }
    ele.innerText += result[1][h];
  }
  ele = document.getElementById('clook_averageSeekCount');
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