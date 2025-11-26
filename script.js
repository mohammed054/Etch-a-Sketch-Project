const divContianer = document.getElementById('grid-container');
divContianer.style.display = 'flex';
divContianer.style.width = '400px';
divContianer.style.height = '400px';
divContianer.style.flexWrap = 'wrap';
divContianer.style.alignContent = 'center';
divContianer.style.justifyContent = 'center';
const btn = document.getElementById('input');
btn.addEventListener('mousedown', () => {
    let num = prompt("How many squares do you want?");
    const gridCount = num
const gridSize = 400 / num;
for (let i = 0; i < gridCount * gridCount; i++) {
    const square = document.createElement('div');
    square.style.height = `${gridSize}px`;
    square.style.width = `${gridSize}px`;
    square.style.border = '1px solid #000'
    square.style.boxSizing = 'border-box';
    square.addEventListener('mouseenter', () => {
        let r = Math.floor(Math.random() * 256)
        let g = Math.floor(Math.random() * 256)
        let b = Math.floor(Math.random() * 256)
        square.style.background = `rgb(${r}, ${g}, ${b})`;
    })
    divContianer.appendChild(square);
}
})

const resetbtn = document.getElementById('reset');
resetbtn.addEventListener('mousedown', () => {
    const squaresAll = divContianer.querySelectorAll('div');
    for (let i = 0; i < squaresAll.length; i++) {
        squaresAll[i].style.background ='';
    }

})

