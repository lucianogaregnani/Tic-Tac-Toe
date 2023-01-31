const boxes = Array.from(document.querySelectorAll('.box'));
const turnSpan = document.getElementById('turn');

let plays = new Array(9).fill(null)

let turno = 'X';


const whoThrows = () => turno === 'X' ? '0' : 'X';

const changeTurn = (box) => {
    if(box.textContent.length === 0) {
        turnSpan.textContent = 'Turno: ' + whoThrows();
        box.textContent = turno;
        turno = whoThrows();
    }
}

const addEventListenerToBoxes = () => {

    boxes.forEach((box, index) => {
            box.addEventListener('click', () => {
                plays[index] = turno === 'X';
                changeTurn(box);
                playerWins();
            })
        })
    }

const playerWins = () => {

    const winningPlay = isWinner();
    if(winningPlay) {
        plays.fill(null);
        addEffectWinner(winningPlay)
        turnSpan.textContent = `Gano ${whoThrows()}!`
    }

}

const addEffectWinner = (play) => {
    console.log(play)
    play.forEach((symbol) => {
       document.getElementById(`divSymbol${symbol}`).classList.add('win');
    })
}


const deleteSymbols = () => {

    boxes.forEach(box => {
        box.textContent = '';
        if(box.classList.contains('win')) 
            box.classList.remove('win');

    }) 
    
}

const reset = () => {
    const resetButton = document.querySelector('.reset');

    resetButton.addEventListener('click', () => {
        
        turnSpan.textContent = 'Turno: X'
        turno = 'X'
        deleteSymbols();

    })

}

const isWinner =() => {
    if(isWin(0,1,2))
        return [0,1,2]
    if(isWin(3,4,5))
        return [3,4,5]
    if(isWin(6,7,8))
        return [6,7,8]
    if(isWin(0,4,8))
        return [0,4,8]
    if (isWin(2,4,6))
        return [2,4,6]
    if (isWin(0,3,6))
        return [0,3,6]
    if (isWin(1,4,7))
        return [0,4,7]
    if (isWin(2,5,8))
        return [2,5,8]
    return null
}

const isWin = (i,j,k) => {

    return plays[i] === plays[j] && plays[j] === plays[k] && plays[k] !== null;

}

reset()
addEventListenerToBoxes()
