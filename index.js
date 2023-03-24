const boxes = Array.from(document.querySelectorAll('.box'));
const turnSpan = document.getElementById('turn');

let plays = new Array(9).fill(null);

let turno = 'X';
let isPlayerWinner = false;

const isTie = () => !plays.includes(null);

const whoThrows = () => turno === 'X' ? '0' : 'X';

const changeTurn = (box, index) => {
    if(box.textContent.length === 0 && !isPlayerWinner) {
        turnSpan.textContent = 'Turn: ' + whoThrows();
        box.textContent = turno;
        plays[index] = turno === 'X';
        turno = whoThrows();
    }
}

const addEventListenerToBoxes = () => {

    boxes.forEach((box, index) => {
            box.addEventListener('click', () => {
                changeTurn(box, index);
                playerWins();
            })
        })
    }

const playerWins = () => {

    const turnSpanContent = isWinner() ? `Win ${whoThrows()}!` : 'It was a tie';

    if(isWinner() || isTie()) {
        isPlayerWinner = true;
        turnSpan.textContent = turnSpanContent;
        addEffectWinner(isWinner());
        removeHoverOfBoxes();
    }

}

const addEffectWinner = (play) => {
    if(isWinner() || !isTie()) {
        play.forEach(symbol => {
        document.getElementById(`divSymbol${symbol}`).classList.add('win');
        })
    }
}

const removeHoverOfBoxes = () => {
    boxes.forEach(box => {
        box.classList.remove('box-hover');
    })
}

const addHoverOfBoxes = () => {
    boxes.forEach(box => {
        box.classList.add('box-hover');
    })
}

const deleteSymbols = () => {

    plays.fill(null);
    boxes.forEach(box => {
        box.textContent = '';
        if(box.classList.contains('win')) 
            box.classList.remove('win');
    }) 
    
}

const reset = () => {
    const resetButton = document.querySelector('.reset');

    resetButton.addEventListener('click', () => {
        
        turnSpan.textContent = 'Turn: X';
        isPlayerWinner = false;
        turno = 'X';
        deleteSymbols();
        addHoverOfBoxes();

    })

}

const isWinner =() => {
    if(isWin(0,1,2))
        return [0,1,2];
    if(isWin(3,4,5))
        return [3,4,5];
    if(isWin(6,7,8))
        return [6,7,8];
    if(isWin(0,4,8))
        return [0,4,8];
    if (isWin(2,4,6))
        return [2,4,6];
    if (isWin(0,3,6))
        return [0,3,6];
    if (isWin(1,4,7))
        return [1,4,7];
    if (isWin(2,5,8))
        return [2,5,8];
    return null;
}

const isWin = (i,j,k) => {

    return (plays[i] === plays[j]) && (plays[j] === plays[k]) && (plays[k] !== null);

}

const play = () => {
    reset();
    addEventListenerToBoxes();
}

play();


