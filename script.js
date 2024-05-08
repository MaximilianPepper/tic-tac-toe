const GameObject = (function(){
    let array= ["","","","","","","","",""];

    const createBoard = array.forEach((i)=>{
        let div = document.createElement("div");
        let board = document.querySelector(".gameboard");
        board.appendChild(div);
    })
    
    return {
        createBoard,
    };
})()

const Game = (function(){
    let currentPlayer = 0;
    let gameOver = false;
    let players = [];
    const init = () => {
        players = [{
            name: "Player 1",
            sign: "X",
        },
        {
            name: "Player 2",
            sign: "O",
            
        }]
    }
    let board = document.querySelectorAll(".gameboard > div");
    board.forEach(div => {
        div.addEventListener('click', function() {
            div.textContent = players[currentPlayer].sign;
        });
    });

    return {
        players,
        init,
    }

})()

Game.init();
