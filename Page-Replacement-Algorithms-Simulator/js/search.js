var suggestions = [
    {
        'text': 'First Come First Served',
        'display': 'First Come First Served (FCFS)',
        'href': 'fcfs.html'
    },
    {
        'text': 'FCFS',
        'display': 'First Come First Served (FCFS)',
        'href': 'fcfs.html'
    },
    {
        'text': 'Circular LOOK',
        'display': 'Circular LOOK (CLOOK)',
        'href': 'clook.html'
    },
    {
        'text': 'CLOOK',
        'display': 'Circular LOOK (CLOOK)',
        'href': 'clook.html'
    },
    {
        'text': 'Circular SCAN',
        'display': 'Circular SCAN (CSCAN)',
        'href': 'cscan.html'
    },
    {
        'text': 'CSCAN',
        'display': 'Circular SCAN (CSCAN)',
        'href': 'cscan.html'
    },
    {
        'text': 'SCAN',
        'display': 'SCAN',
        'href': 'scan.html'
    },
    {
        'text': 'LOOK',
        'display': 'LOOK',
        'href': 'look.html'
    },
    {
        'text': 'Shortest Seek Time First',
        'display': 'Shortest Seek Time First (SSTF)',
        'href': 'sstf.html'
    },
    {
        'text': 'SSTF',
        'display': 'Shortest Seek Time First (SSTF)',
        'href': 'sstf.html'
    },
    {
        'text': 'Compare Algorithms',
        'display': 'Compare Algorithms',
        'href': 'compare.html'
    },
    {
        'text': 'First In First Out',
        'display': 'First In First Out (FIFO)',
        'href': 'fifo.html'
    },
    {
        'text': 'FIFO',
        'display': 'First In First Out (FIFO)',
        'href': 'fifo.html'
    },
    {
        'text': 'Last In First Out',
        'display': 'Last In First Out (LIFO)',
        'href': 'lifo.html'
    },
    {
        'text': 'LIFO',
        'display': 'Last In First Out (LIFO)',
        'href': 'lifo.html'
    },
    {
        'text': 'Least Recently Used',
        'display': 'Least Recently Used (LRU)',
        'href': 'lru.html'
    },
    {
        'text': 'LRU',
        'display': 'Least Recently Used (LRU)',
        'href': 'lru.html'
    },
    {
        'text': 'Optimal',
        'display': 'Optimal',
        'href': 'optimal.html'
    },
    {
        'text': 'Random',
        'display': 'Random',
        'href': 'random.html'
    },
    {
        'text': "Belady's Anamoly",
        'display': "Belady's Anamoly",
        'href': 'belady.html'
    },
    {
        'text': "Beladys Anamoly",
        'display': "Belady's Anamoly",
        'href': 'belady.html'
    },
    {
        'text': "Anamoly",
        'display': "Belady's Anamoly",
        'href': 'belady.html'
    },
    {
        'text': 'Disk Scheduling',
        'display': 'Disk Scheduling',
        'href': 'diskscheduling_index.html'
    },
    {
        'text': 'Page Replacement',
        'display': 'Page Replacement',
        'href': 'pagereplacement_index.html'
    }
]; 

var dropdownMenu = document.getElementById('suggestions');
dropdownMenu.style.display = 'none';
var searchInput = document.getElementById('search-input');

searchInput.addEventListener('keyup', () => {
    dropdownMenu.innerHTML = ``;
    dropdownMenu.style.display = 'none';
    let userData = searchInput.value.toLowerCase().split(' ').join('');
    let relatedSuggestions = [];
    if(userData!=''){
        relatedSuggestions = suggestions.filter((obj) =>{
            return obj.text.toLowerCase().split(' ').join('').startsWith(userData);
        });
    }

    const uniqueKeyToRelatedSuggestions = new Map(
        relatedSuggestions.map((relatedSuggestions) => [relatedSuggestions.display, relatedSuggestions])
    );

    relatedSuggestions = [...uniqueKeyToRelatedSuggestions.values()];
    console.log(relatedSuggestions);

    if(relatedSuggestions.length === 0 && userData!=''){
        dropdownMenu.innerHTML = `<li class='dropdown-item'>No search results</li>`;
        dropdownMenu.style.display = 'block';
        dropdownMenu.style.fontSize = "14px";
    }
    else if(userData!=''){
        relatedSuggestions.forEach((value) => {
            let newDropItem = document.createElement('li');
            let newLink = document.createElement('a');
            newLink.className = 'dropdown-item'; newLink.href = value.href; newLink.innerText = value.display;
            newDropItem.appendChild(newLink);
            dropdownMenu.appendChild(newDropItem);
            newLink.style = "font-size: 14px";
        });
        dropdownMenu.style.display = 'block';
    }
})


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
