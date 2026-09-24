// add Strict Mode.
(function() {
    'use strict'; 
    // Declare Global variables
    const cardsBox = document.querySelector('.deck');
    let openCards = [];
    let matchedCards = [];
    const restartBtn = document.querySelector('.restart');
    let moves = 0;
    const movesContainer = document.querySelector('.moves');
    movesContainer.innerHTML = 0;
    const timerContainers = document.querySelector('.timer');
    let liveTimer, totalSeconds = 0;
    timerContainers.innerHTML = totalSeconds;
    let firstClick = true;
    const stars = document.querySelector('.stars');
    stars.innerHTML = `<li><i class="fa fa-star"></i></li>
                       <li><i class="fa fa-star"></i></li>
                       <li><i class="fa fa-star"></i></li>`;
    /*
     * Create list that holds all cards.
     */
    const cardList = [ 'fa-music', 'fa-space-shuttle', 'fa-terminal', 'fa-code', 'fa-headphones', 'fa-bug', 'fa-magic', 'fa-rocket'];
    
    const cards = cardList.concat(cardList);
    
    // Initialize Game
    
    function init () {
        const icons = shuffle(cards);
        for (let i = 0; i < icons.length; i++) {
            const card = document.createElement('li');
            card.classList.add('card');
            card.innerHTML = `<i class="fa ${icons[i]}"></i>`;
            cardsBox.appendChild(card);
            click(card);
        }
    }
    init();
    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    }
    
    
    // EventListnener handle click for open & show.
    
    function click(card) {
        card.addEventListener('click', function(){
            if(firstClick){
                startTimer();
                firstClick = false;
            }
            const currentCard = this;
            const previousCard = openCards[0];
    
            if(openCards.length === 1) {
                card.classList.add('open', 'show', 'disable');
                openCards.push(this);
                compareCards(currentCard, previousCard);
            }else {
                card.classList.add('open', 'show', 'disable');
                openCards.push(this);
            }
        });
    }
    
    // comparing between two pairs.
    
    function compareCards (currentCard, previousCard) {
        if(currentCard.innerHTML === previousCard.innerHTML) {
            currentCard.classList.add('match');
            previousCard.classList.add('match');
            matchedCards.push(currentCard,previousCard);
            openCards = [];
    
        }else {
            setTimeout(function(){
                currentCard.classList.remove('open', 'show', 'disable');
                previousCard.classList.remove('open', 'show', 'disable');
            },300);
            openCards = [];
        }
        addmoves();
        gameOver();
        gameWon();
    }
    
    restartBtn.addEventListener('click', function(){
        resetGame();
    });
    
    // Reset Current Values.
    
    function resetVal(){
        cardsBox.innerHTML = '';
        matchedCards = [];
        moves = 0;
        openCards = [];
        movesContainer.innerHTML = moves;
        stars.innerHTML = `<li><i class="fa fa-star"></i></li>
                           <li><i class="fa fa-star"></i></li>
                           <li><i class="fa fa-star"></i></li>`;
        totalSeconds = 0;
        timerContainers.innerHTML = totalSeconds;
        stopTimer();
        firstClick = true;
    }
    
    // restart Game.
    
    function resetGame() {
        resetVal();
        init();
    }
    
    // Add Moves.
    
    function addmoves() {
        moves++;
        movesContainer.innerHTML = moves;
        starRating();
    }
    
    // Timer.
    
    function startTimer() {
        liveTimer = setInterval(function(){
            totalSeconds++;
            timerContainers.innerHTML = totalSeconds;
        }, 1000);
    }
    
    // Timer [Stop].
    
    function stopTimer() {
        clearInterval(liveTimer);
    }
    
    // Add Stars.
    
    function starRating() {
        switch (moves) {
            case 18:
            stars.innerHTML = `<li><i class="fa fa-star"></i></li>
                               <li><i class="fa fa-star"></i></li>`;
            break;
            case 25:
            stars.innerHTML = `<li><i class="fa fa-star"></i></li>`;
            break;
        }
    }
    
    // Game over Message
    
    function gameOver() {
        if(moves >= 40) {
            alert ('Game Over');
            resetGame();
        }
    }
    
    // Display Modal if player won!.
    
    function modal() {
        const modal = document.getElementById('endGame');
        modal.classList.add('appear');
        
    }
    
    // Gamewon function handle winning process if play won!.
    
    function gameWon() {
        if(matchedCards.length == cards.length) {
            clearInterval(liveTimer);
            modal();
            let modalStars = document.querySelector('.modal-stars');
            let star = stars.innerHTML;
            modalStars.innerHTML = `Stars : ${star}`;
    
            let modalMoves = document.querySelector('.modal-moves');
            modalMoves.innerHTML = `Moves : ${moves}`;
            const time = document.querySelector('.modal-time');
            time.innerHTML = `Total Seconds : ${totalSeconds}`;
            const playAgain = document.querySelector('.button');
            playAgain.addEventListener('click', function() {
            resetGame();
            const modal = document.getElementById('endGame');
            modal.classList.remove('appear');
            
        }); 
        }
    }
}());
