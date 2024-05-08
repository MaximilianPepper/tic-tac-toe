const GameObject = (function(){
    let array= ["","","","","","","","",""];
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let board = document.querySelector(".gameboard");
    const createBoard = array.forEach((i)=>{
        let div = document.createElement("div");
        
        board.appendChild(div);
    })
    const update = () => {
        let divs = document.querySelectorAll(".gameboard div");
        divs.forEach((div, index) => {
            array[index] = div.textContent;
        });
    };
    const reset = () => {
        let divs = document.querySelectorAll(".gameboard div");
        divs.forEach((div, index) => {
            array[index] = "";
            div.textContent = "";
        });
    };
    
    const winCheck = (sign) => {
        for (let condition of winConditions) {
            if (condition.every(index => array[index] === sign)) {
                return true; 
            }
        }
        return false; 
    };

    const isTie = () => {
        for (let i= 0; i < array.length; i++){
           if (array[i] === "") return false;

        }
        return true;
    }

    return {
        createBoard,
        update,
        winCheck,
        reset,
        isTie,
        array
    };
})()

const Game = (function(){
    let gameOver = false;
    let currentPlayer = 0;
    let players = [];
    const p1 = document.querySelector(".players p:first-child");
    const p2 = document.querySelector(".players p:last-child");
    const init = () => {
        players = [{
            name: "Player 1",
            sign: "X",
        },
        {
            name: "Player 2",
            sign: "O",
            
        }]
        gameOver = false;
        p1.style.backgroundColor = "yellow";
        p2.style.backgroundColor = "white";
    }
    let board = document.querySelectorAll(".gameboard > div");
    
    function playAgain(player){
        const window = document.querySelector(".play");
        const result = document.querySelector(".winner");
        result.innerHTML = `Winner is ${player}`;
        window.style.display = "block";
        document.body.style.backgroundColor = "rgba(0,0,0,0.9)";
        const playBtn = document.querySelector("#restart");
        playBtn.addEventListener("click",()=>{
            window.style.display = "none";
            document.body.style.backgroundColor = "white";
            GameObject.reset();
            currentPlayer = 0;
            p1.style.backgroundColor = "yellow";
            p2.style.backgroundColor = "white";
            gameOver = false;
            GameObject.update();
        })
    }
    

    board.forEach(div => {
            div.addEventListener('click', function() {
                if (gameOver === false){
                    if (!div.textContent){
                        div.textContent = players[currentPlayer].sign;
                        GameObject.update();
                        if (GameObject.winCheck(players[currentPlayer].sign)) {
                            gameOver = true;
                            playAgain(players[currentPlayer].name);
                        }
                        else if (GameObject.isTie()){
                            gameOver = true;
                            playAgain("... No one, You Tie!");
                        }
                        if (currentPlayer === 0){
                            p2.style.backgroundColor = "yellow";
                            p1.style.backgroundColor = "white";
                        }
                        else {
                            p1.style.backgroundColor = "yellow";
                            p2.style.backgroundColor = "white";
                        }
                        currentPlayer = (currentPlayer === 0) ? 1 : 0;
                    }
                }
        });
       
    }   ); 
    

    return {
        players,
        init,
    }

})()

Game.init();
