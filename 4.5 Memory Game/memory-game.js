document.addEventListener('DOMContentLoaded' , () => {
  // card options
  const cardArray = [
    {
      name: 'p1',
      image: 'img/p1.jpg'
    },
    {
      name: 'p1',
      image: 'img/p1.jpg'
    },
    {
      name: 'p2',
      image: 'img/p2.jpg'
    }, 
    {
      name: 'p2',
      image: 'img/p2.jpg'
    },
    {
      name: 'p3',
      image: 'img/p3.jpg'
    }, 
    {
      name: 'p3',
      image: 'img/p3.jpg'
    },
    {
      name: 'p4',
      image: 'img/p4.jpg'
    },
    {
      name: 'p4',
      image: 'img/p4.jpg'
    },
    {
      name: 'p5',
      image: 'img/p5.jpg'
    },
    {
      name: 'p5',
      image: 'img/p5.jpg'
    },
    {
      name: 'p6',
      image: 'img/p6.jpg'
    },
    {
      name: 'p6',
      image: 'img/p6.jpg'
    },
  ]

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  const messageDisplay = document.querySelector('#message');
  var cardsChosen = [];
  var cardsChosenId = [];
  var cardsWon = [];

// create board  
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement('img');
      card.setAttribute('src', 'img/blank.jpg');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    }
  }
  // check for matches
  function checkForMatch() {
    var cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (cardsChosen[0] === cardsChosen[1]) {
      messageDisplay.textContent = 'You found a match';
      cards[optionOneId].setAttribute('src', 'img/white.jpg');
      cards[optionTwoId].setAttribute('src', 'img/white.jpg');
      cardsWon.push(cardsChosen);
    } else {
      messageDisplay.textContent = '';
      cards[optionOneId].setAttribute('src', 'img/blank.jpg');
      cards[optionTwoId].setAttribute('src', 'img/blank.jpg');
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = " " + cardsWon.length;
    if (cardsWon.length === cardArray.length/2) {
      messageDisplay.textContent = 'Congratulations! You found them all!'
    }
  }
  // flip card
  function flipCard() {
    var cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].image);
    if(cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }
  createBoard()

})
