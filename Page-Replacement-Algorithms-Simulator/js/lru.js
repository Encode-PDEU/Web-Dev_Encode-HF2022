class node {
    constructor(data) {
        this.data = data;
        this.l = null;
        this.r = null;
    }
}
class Dequeue {
    constructor() {
        this.left = null;
        this.right = null;
        this.size=0;
    }
    addFront(x) {
        let newNode = new node(x);
        newNode.r =this.left;
        if(this.left!=null)
            this.left.l = newNode;
        else{
            this.right=newNode;
        }
        this.left=newNode;
        this.size++;
    }

    deleteLast(){
        let tmp=this.right;
        this.right=tmp.l;
        this.right.r=null;
        this.size--;
    }
    delete(x) {
        if(x==null) return;
        //first element
        if(x==this.left && x==this.right){
            this.left=null;
            this.right=null;
            this.size--;
            return;
        }
        if(x==this.left){
            this.left=x.r;
            x.r.l=null;
            this.size--;
            return;
        }
        if(x==this.right){
            this.right=x.l;
            this.right.r=null;
            this.size--;
            return;
        }
        x.l.r=x.r;
        x.r.l=x.l;
        this.size--;
    }
    display(){
        let fr=[];
        let temp=this.left;
        while(temp!=null){
            fr.push(temp.data);
            temp=temp.r;
        }
        return fr;
    }
}
class lru{
    constructor(capacity){
        this.capacity=capacity;
        this.pageFaults=0;
        this.pageHits=0;
        this.searchIndex=-1; 
        this.map = new Map();
        this.dequeue = new Dequeue();   
    }
    refer(token) {
        if(this.map.has(token)){
            this.pageHits++;
            this.searchIndex=0;
            this.dequeue.delete(this.map.get(token));
            this.map.delete(token);
        }
        else{ 
            this.pageFaults++;
            this.searchIndex=-1;
            if(this.capacity==this.dequeue.size){
                this.dequeue.deleteLast();
                this.map.delete(this.frames[this.frames.length-1]);
            }
        }
        this.dequeue.addFront(token);
        this.map.set(token,this.dequeue.left);
        this.frames =this.dequeue.display();   
    }
}

document.getElementById("submit").addEventListener("click",LRU);
function LRU(){
    let res = document.getElementById("input").value.split(" ");
    let frames = document.getElementById("frames").value;
    let ref=[];
    for (let i = 0; i < res.length; i++) {
        if (res[i] != " " && res[i] != "") {
            ref.push(res[i]);
        }
    }
    createTable("table",frames,ref);
    let obj = new lru(frames);
    for(let i=0;i<ref.length;i++){
        obj.refer(ref[i]);
        fillcol("table",i+1,obj.frames,frames,obj.searchIndex);
    }
    summary('summary',obj.pageFaults,obj.pageFaults+obj.pageHits,frames);
}
function fillcol(tablename,col,objframes,n,searchindex){
    for(let i=1;i<=objframes.length;i++){
        let cell=document.getElementById(tablename+i+''+col);
        cell.innerHTML=objframes[i-1];
    }
    n++;
    let cell=document.getElementById(tablename+n+''+col);
    if(searchindex==-1)cell.innerHTML="MISS";
    else{
        // console.log(tablename+n+''+col); 
        cell.innerHTML="HIT";
        document.getElementById(tablename+(searchindex+1)+''+col).classList.add("bg-success","text-white");
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