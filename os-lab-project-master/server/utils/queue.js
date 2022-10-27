// Implementation of Queue using inbuilt javascript lists
// since the processes need to be added in a "Ready Queue"
// in CPU scheduling algorithms like FCFS
// NOTE: Queues follow FIFO (First In First Out) principle

class Queue {
    constructor() {
        // the processes to be added
        this.items = [];
    }

    // Adds any process to the Queue
    enqueue(process) {
        return this.items.push(process);
    }

    // Removes the first process from items to follow FIFO
    dequeue() {
        if(this.items.length > 0) {
            return this.items.shift();
        }
    }

    // View the last process added to the queue
    peek() {
        return this.items[this.items.length - 1];
    }

    // Check if queue is empty
    isEmpty() {
        return this.items.length == 0;
    }

    // Get the size of the current queue
    getSize() {
        return this.items.length;
    }

    // Empty the queue at once
    clear() {
        this.items = [];
    }
}

module.exports = Queue;