/*
  This is the code for the OPR algorithm.
  The time complexity of this program ins O(n^2), due to the nested for loop in the create table funtion.
  This is the most efficient algorithm as it has the least amount of page faults.
*/

class optimal {
  //This is a constructor class that allows us to initialize values to be used later.
  constructor(capacity) {
    this.capacity = capacity;
    this.pageFaults = 0;
    this.pageHits = 0;
    this.searchIndex = -1;
    this.frames = [];
    this.sr = [];
  }
  
  
  refer(token, remaining) {
    this.searchIndex = this.frames.indexOf(token);
    
    if (this.searchIndex != -1) 
      this.pageHits++;
    else {
      this.pageFaults++;   
      
      if (this.capacity == this.frames.length) {
        let t = this.sr.indexOf(-1);
        
        if (t == -1) 
          t = this.sr.indexOf(Math.max(...this.sr));
        
        this.frames[t] = token;
        
        if (remaining.indexOf(token) == -1) 
          this.sr[t] = -1;
        else 
          this.sr[t] = this.frames.length + 1 + remaining.indexOf(token);
      } 
      else {
        if (remaining.indexOf(token) == -1) 
          this.sr.push(-1);
        else 
          this.sr.push(this.frames.length + 1 + remaining.indexOf(token));
        
        this.frames.push(token);
      }
    }
  }
}

//O(n^2)
function OPTIMAL() {
  //We create an array to store and split the input string.
  let res = document.getElementById("pages").value.split(" ");
  let frames = document.getElementById("frame").value;
  let ref = [];
  
  //This for loop pushes in the store values to be used later.
  for (let i = 0; i < res.length; i++) 
    if (res[i] != " " && res[i] != "") 
      ref.push(res[i]);

  //This funciton call creates the table.
  createTable("table", frames, ref);
  let obj = new optimal(frames);
  
  for (let i = 0; i < ref.length; i++) {
    obj.refer(ref[i], ref.slice(i + 1));
    //This function populates the created table from above.
    fillcol("table", i + 1, obj.frames, frames, obj.searchIndex);
  }
  
  //This function prints out the summary and information about the page hits and faults, as well as thier ratios.
  summary("summary", obj.pageFaults, obj.pageFaults + obj.pageHits, frames);
}

//O(n)
function fillcol(tablename, col, objframes, n, searchindex) {
  for (let i = 1; i <= objframes.length; i++) {
    let cell = document.getElementById(tablename + i + "" + col);
    cell.innerHTML = objframes[i - 1];
  }
  
  //The code below adds a row at the bottom showing wheteher there was a hit or a miss on that particular page.
  n++;
  let cell = document.getElementById(tablename + n + "" + col);
  
  if (searchindex == -1) 
    cell.innerHTML = "MISS";
  else {
    cell.innerHTML = "HIT";
    document
      .getElementById(tablename + (searchindex + 1) + "" + col)
      .classList.add("bg-success", "text-white");
  }
}

//O(n^2)
function createTable(tablename, frames, ref) {
  document.getElementById(tablename).innerHTML = "";
  let table = '<tr class="font-weight-bold"><td  id="' + tablename + '00">Reference</td>';
  
  //This loop fills the table headings of the table.
  for (let i = 0; i < ref.length; i++)
    table += '<td id="' + tablename + "0" + (i + 1) + '">' + ref[i] + "</td>";
  
  table += "</tr>";
  
  //This iterates through every coloumn and row in order to create a table of perfect size.
  for (let i = 0; i < frames; i++) {
    table += '<tr><td class="font-weight-bold" id="' + tablename +(i + 1) + '0">Frame ' + (i + 1) + "</td>";
    
    for (let j = 0; j < ref.length; j++) 
      table += '<td id="' + tablename + (i + 1) + (j + 1) + '"></td>';
    
    table += "</tr>";
  }
  
  frames++;
  table += '<tr><td class="font-weight-bold" id="' + tablename + frames + '0">Status</td>';
  
  for (var j = 1; j <= ref.length; j++) 
    table += '<td id="' + tablename + frames + j + '"></td>';

  table += "</tr>";
  console.log(table);
  document.getElementById(tablename).innerHTML += table;
}

//This function adds all the data displayed under the table.
//O(1)
function summary(id, pagefaults, pages, frames) {
  let summary = "";
  let missratio = (pagefaults / pages).toPrecision(2);
  summary += `<div>Pages:${pages}</div>`;
  summary += `<div>Frames:${frames}</div>`;
  summary += `<div>Hits:${pages - pagefaults}</div>`;
  summary += `<div>Faults:${pagefaults}</div>`;
  summary += `<div>Hit Ratio:${1 - missratio}</div>`;
  summary += `<div>Miss Ratio:${missratio}</div>`;
  document.getElementById(id).innerHTML = summary;
}

//This ensures no negatives in the input string or the page frames.
//O(1)
function validation(event) {
  let pages = event.target.value;
  
  //This is regular expression in order to validate data.
  if (!/^(?=.*\d)[\d ]+$/.test(pages)) 
    event.target.value = pages.substring(0, pages.length - 1);
}
