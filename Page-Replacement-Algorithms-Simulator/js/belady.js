class fifo{
    constructor(capacity){
        this.capacity=capacity;
        this.pageFaults=0;
        this.pageHits=0;
        this.searchIndex=-1; 
        this.frames=[];
    }
    refer(token) {
        this.searchIndex=this.frames.indexOf(token);
        if(this.searchIndex==-1){
            this.pageFaults++;
            this.frames.push(token)
            if(this.frames.length>this.capacity){
                this.frames.shift()
            }
        }
        else 
            this.pageHits++;
    }
}
function FIFO(pages,frames){
    let obj=new fifo(frames);
    for(let i=0;i<pages.length;i++){
        obj.refer(pages[i]);
    }
    return obj.pageFaults;
}
document.getElementById("submit").addEventListener("click",BELADY);
function BELADY(){
    let res = document.getElementById("input").value.split(" ");
    let ref=[];
    for (let i = 0; i < res.length; i++) {
        if (res[i] != " " && res[i] != "") {
            ref.push(res[i]);
        }
    }
    let dataset=[];
    for (let i = 0; i <= 16; i++) {
        let record={};
        record['x']=i;record['y']= FIFO(ref,i);
        console.log(dataset);
        if (i != 0 && dataset[i - 1]['y'] < record['y']) {
            record['indexLabel'] = "\u2191 belady's anamoly";
            record['markerColor'] = "red";
            record['markerType'] = "triangle";
        }
        else {
            record['indexLabel'] = "";
            record['markerColor'] = "";
            record['markerType'] = "";
        }
        dataset.push(record);
    }
    let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "dark",
        title: {
            text: "Frames vs Page Faults"
        },
        data: [{
            type: "line",
            indexLabelFontSize: 16,
            click: bldtable,
            dataPoints:dataset
        }],
    });
    chart.render();
    document.querySelector("#chartContainer").style.height=document.querySelector(".canvasjs-chart-canvas").height+"px";
    function bldtable(e){
        if(e.dataPoint.x==0)return;
        createTable("table",e.dataPoint.x,ref);
        let obj = new fifo(e.dataPoint.x);
        for(let i=0;i<ref.length;i++){
            obj.refer(ref[i]);
            fillcol("table",i+1,obj.frames,e.dataPoint.x,obj.searchIndex);
        }
        summary("summary",e.dataPoint.y,obj.pageHits+obj.pageFaults,e.dataPoint.x)
    }
}
function createTable(tablename,frames,ref){
    document.getElementById(tablename).innerHTML="";
    let table = '<tr class="font-weight-bold"><td id="'+tablename+'00">Reference</td>';
    for (let i = 0; i < ref.length; i++) {
        table += '<td id="'+tablename+'0'+(i+1) + '">' + ref[i] + "</td>";
    }
    table += "</tr>";
    for (let i = 0; i < frames; i++) {
        table += '<tr><td class="font-weight-bold" id="' +tablename+ (i + 1) + '0">Frame ' + (i + 1) + "</td>";
        for (let j = 0; j < ref.length; j++) {
            table += '<td id="'+tablename + (i + 1) + (j + 1) + '"></td>';
        }
        table += "</tr>";
    }
    frames++;
    table += '<tr><td class="font-weight-bold" id="' +tablename+ frames + '0">Status</td>';
    for (var j = 1; j <= ref.length; j++) {
        table += '<td id="' +tablename+ frames + j + '"></td>';
    }
    table += "</tr>";
    console.log(table);
    document.getElementById(tablename).innerHTML += table;
}

function summary(id,pagefaults,pages,frames){
    let summary ="";
    let missratio=(pagefaults / pages).toPrecision(2);
    let hitratio=(1-missratio).toPrecision(2);
    summary+=`<div>Pages:${pages}</div>`;
    summary+=`<div>Frames:${frames}</div>`;
    summary+=`<div>Hits:${pages-pagefaults}</div>`;
    summary+=`<div>Faults:${pagefaults}</div>`; 
    summary+=`<div>Hit Ratio:${hitratio}</div>`; 
    summary+=`<div>Miss Ratio:${missratio}</div>`;
    document.getElementById(id).innerHTML=summary;
}
function fillcol(tablename,col,objframes,n,searchindex){
    for(let i=1;i<=objframes.length;i++){
        let cell=document.getElementById(tablename+i+''+col);
        cell.innerHTML=objframes[i-1];
    }
    n++;
    let cell=document.getElementById(tablename+n+col);
    console.log(tablename+n+col);
    if(searchindex==-1)cell.innerHTML="MISS";
    else{
        // console.log(tablename+n+''+col); 
        cell.innerHTML="HIT";
        document.getElementById(tablename+(searchindex+1)+''+col).classList.add("bg-success","text-white");
    }
}


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
