class fifo {
  constructor(capacity) {
    this.capacity = capacity;
    this.pageFaults = 0;
    this.pageHits = 0;
    this.searchIndex = -1;
    this.frames = [];
  }
  refer(token) {
    this.searchIndex = this.frames.indexOf(token);
    if (this.searchIndex == -1) {
      this.pageFaults++;
      this.frames.push(token);
      if (this.frames.length > this.capacity) {
        this.frames.shift();
      }
    } else this.pageHits++;
  }
}

function FIFO() {
  let res = document.getElementById("pages").value.split(" ");
  let frames = document.getElementById("frame").value;

  // creating array of page sequence
  let ref = [];
  for (let i = 0; i < res.length; i++) {
    if (res[i] != " " && res[i] != "") {
      ref.push(res[i]);
    }
  }

  // calling the table function
  createTable("table", frames, ref);
  let obj = new fifo(frames);
  for (let i = 0; i < ref.length; i++) {
    obj.refer(ref[i]);

    // calling the function to add data in table
    fillcol("table", i + 1, obj.frames, frames, obj.searchIndex);
  }
  summary("summary", obj.pageFaults, obj.pageFaults + obj.pageHits, frames);
}

// function to add data in table
function fillcol(tablename, col, objframes, n, searchindex) {
  for (let i = 1; i <= objframes.length; i++) {
    let cell = document.getElementById(tablename + i + "" + col);
    cell.innerHTML = objframes[i - 1];
  }
  n++;
  let cell = document.getElementById(tablename + n + "" + col);
  if (searchindex == -1) cell.innerHTML = "MISS";
  else {
    // console.log(tablename+n+''+col);
    cell.innerHTML = "HIT";
    document
      .getElementById(tablename + (searchindex + 1) + "" + col)
      .classList.add("bg-success", "text-white");
  }
}

// function to create table
function createTable(tablename, frames, ref) {
  document.getElementById(tablename).innerHTML = "";
  let table =
    '<tr><td id="' +
    tablename +
    '00" style="font-weight:bolder;">Reference</td>';
  for (let i = 0; i < ref.length; i++) {
    table +=
      '<td style="font-weight:bolder;" id="' +
      tablename +
      "0" +
      (i + 1) +
      '">' +
      ref[i] +
      "</td>";
  }
  table += "</tr>";
  for (let i = 0; i < frames; i++) {
    table +=
      '<tr><td style="font-weight:bolder;"id="' +
      tablename +
      (i + 1) +
      '0">Frame ' +
      (i + 1) +
      "</td>";
    for (let j = 0; j < ref.length; j++) {
      table += '<td id="' + tablename + (i + 1) + (j + 1) + '"></td>';
    }
    table += "</tr>";
  }
  frames++;
  table +=
    '<tr><td style="font-weight:bolder;"id="' +
    tablename +
    frames +
    '0">Status</td>';
  for (var j = 1; j <= ref.length; j++) {
    table += '<td id="' + tablename + frames + j + '"></td>';
  }
  table += "</tr>";
  // console.log(table);
  document.getElementById(tablename).innerHTML += table;
}

// function to print the output
function summary(id, pagefaults, pages, frames) {
  let summary = "";
  let missratio = (pagefaults / pages).toPrecision(2);
  let hitratio = (1 - missratio).toPrecision(2);
  summary += `<div>Pages: ${pages}</div>`;
  summary += `<div>Frames: ${frames}</div>`;
  summary += `<div>Hits: ${pages - pagefaults}</div>`;
  summary += `<div>Faults: ${pagefaults}</div>`;
  summary += `<div>Hit Ratio: ${hitratio}</div>`;
  summary += `<div>Miss Ratio: ${missratio}</div>`;
  document.getElementById(id).innerHTML = summary;
}

// function to validate that input is only integer
function validation(event) {
  let pages = event.target.value;
  if (!/^(?=.*\d)[\d ]+$/.test(pages)) {
    event.target.value = pages.substring(0, pages.length - 1);
  }
}
