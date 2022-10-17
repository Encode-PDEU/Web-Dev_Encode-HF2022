const TypeWriter = function(txtElement, words, wait = "3000"){
    this.txtElement = txtElement;
    this.words = words;
    this.txt='';
    this.wordIndex = 0;
    this.wait = Number(wait);
    this.type();
    this.isDeleting = false;
}

//Type Method
TypeWriter.prototype.type = function() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if(this.isDeleting) {
        //Remove a character
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    }
    else {
        // Add a character
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element 
    this.txtElement.innerHTML = `<h2 class="txt" style="color: black; font-weight:200%; margin: 0px;">${this.txt}</h2>`;
    
    // Initial Type Speed
    let typeSpeed = 150;
    
    if(this.isDeleting){
        typeSpeed /= 2;

    } 

    // TO check if the word is complete

    if(!this.isDeleting && this.txt === fullTxt) {
        // Make a pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
    }
    else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Now move to the next word
        this.wordIndex++;
        // Pause before start typing a new word
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
}
// Init On DOM Load

document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.type-writer');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

