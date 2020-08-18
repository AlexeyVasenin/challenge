(function () {
  // body...


  window.onload = init;

  function init() {

    var button = document.querySelector('.add_button');
    button.onclick = createSticky;
    
    var btnRandom = document.querySelector('.btnRandom');
    btnRandom.onclick = randomCard;
    
    var stickiesArray = getStickiesArray();

    for (var i = 0; i < stickiesArray.length; i++) {
      var key = stickiesArray[i];
      var value = localStorage[key];
      addStickyToDOM(key, value);
      
    }
  }

  function addStickyToDOM(key, value) {
    var stickies = document.querySelector('.memory-game');
    var cards = document.createElement('div');
    cards.setAttribute('id', key);
    cards.setAttribute('class', 'memory-card');
    var p = document.createElement('p');
    p.setAttribute('class', 'front-face');
    p.innerHTML = value;
    var backFace = document.createElement('p');
    backFace.setAttribute('class', 'back-face');
    cards.appendChild(p);
    cards.appendChild(backFace);
    stickies.appendChild(cards);
    cards.onmousedown = flipCard;
    cards.ondblclick = deleteSticky;
  }

  function createSticky() {
    var stickiesArray = getStickiesArray();
    var currentDate = new Date();
    var key = 'sticky_' + currentDate.getTime();
    var value = document.querySelector('.note_text').value;
    
    localStorage.setItem(key, value);
    stickiesArray.push(key);
    localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray));
    addStickyToDOM(key, value);
  }

  function getStickiesArray() {
    var stickiesArray = localStorage.getItem('stickiesArray');
    if (!stickiesArray) {
      stickiesArray = [];
      localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray));
    } else {

      stickiesArray = JSON.parse(stickiesArray);

    }

    return stickiesArray;

  }

  function flipCard() {
    this.classList.add('flip')
  }
  
  function randomCard() {
    var memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
      let randomPos = Math.floor(Math.random() * memoryCards.length);
      card.style.order = randomPos;
    });
  }


  function deleteSticky(e) {
    var key = e.target.id;
    if (e.target.tagName.toLowerCase() == 'p') {
      key = e.target.parentNode.id;
    }

    localStorage.removeItem(key);
    var stickiesArray = getStickiesArray();
    if (stickiesArray) {
      for (var i = 0; i < stickiesArray.length; i++) {
        if (key == stickiesArray[i]) {
          stickiesArray.splice(i,1);
        }
      }

      localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray));
      

    }
    removeStickyFromDOM(key);
  }

  function removeStickyFromDOM(key) {
    var sticky = document.querySelector(key);
    sticky.parentNode.removeChild(sticky);
  }
})();