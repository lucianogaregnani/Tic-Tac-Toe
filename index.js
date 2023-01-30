const boxes = document.querySelectorAll('.box');
const turnSpan = document.getElementById('turn')

turno = 'X';

const whoThrows = () => turno === 'X' ? '0' : 'X';

const changeTurn = (box) => {
    if(box.textContent.length === 0) {
        turnSpan.textContent = 'Turno: ' + whoThrows();
        box.textContent = turno;
        turno = whoThrows();
    }
}

boxes.forEach((box) => 
    box.addEventListener('click', () => {
        changeTurn(box);
    })
);


