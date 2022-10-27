function getBotResponse(input) {
    //responses
    if (input == "lru" || input == "LRU") {
        return String.prototype.link ? lru.link(lru) : '<a href="' + lru + '">' + lru + '</a>';
    } else if (input == "opr" || input == "OPR") {
        return String.prototype.link ? opr.link(opr) : '<a href="' + opr + '">' + opr + '</a>';
    } else if (input == "fifo" || input == "FIFO") {
        return String.prototype.link ? fifo.link(fifo) : '<a href="' + fifo + '">' + fifo + '</a>';
    } else if (input == "lifo" || input == "LIFO") {
        return String.prototype.link ? lifo.link(lifo) : '<a href="' + lifo + '">' + lifo + '</a>';
    }

    // Simple responses
    if (input == "hello") {
        return "Hello there!";
    } else if (input == "goodbye") {
        return "Talk to you later!";
    } else {
        return "Try asking something else!";
    }
}

var lru = "https://www.geeksforgeeks.org/program-for-least-recently-used-lru-page-replacement-algorithm/";
var opr = "https://www.geeksforgeeks.org/optimal-page-replacement-algorithm/";
var fifo = "https://www.geeksforgeeks.org/program-page-replacement-algorithms-set-2-fifo/";
var lifo = "https://www.gatevidyalay.com/page-replacement-algorithms-page-fault/";