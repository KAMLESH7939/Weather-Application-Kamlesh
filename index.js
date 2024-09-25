const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".button-49");


let currentPlayer;
let gameGrid;


const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];



function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    //UI par empty bhi karna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";  //b pointer on the game grid...
        //one more thing is missing ,, initialise all propertiezs of boxes again...
        boxes[index].style.color ="white";
        box.classList = `box${index+1} box`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText =  `Current Player - ${currentPlayer}`;
}

initGame();
function  checkGameOver(){
    let answer= "";

    winningPositions.forEach((position) => {
           if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
                  if(gameGrid[position[0]] === "X"){
                      answer = "X";
                  }
                  else{
                    answer= "O";
                  }
                  boxes[position[0]].classList.add("winn");
                  boxes[position[1]].classList.add("winn");
                  boxes[position[2]].classList.add("winn");

                  boxes[position[0]].style.color ="black";
                  boxes[position[1]].style.color ="black";
                  boxes[position[2]].style.color ="black";
                  

                  boxes.forEach(box => {
                        box.style.pointerEvents = "none" ;
                        
                   });
           }
        });
     //means i have a winner
     if(answer !== ""){
        gameInfo.innerText =  `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
     }

     //check for tie case

     let count=0;
     gameGrid.forEach((box) => {
         if(box !== ""){
            count++;
         }
     });
     if( count === 9 ){
          gameInfo.innerText = "Game tied !";
          newGameBtn.classList.add("active");
     }
}

function swapTurn(){
     if(currentPlayer === "X"){
         currentPlayer = "O";
     }
     else{
        currentPlayer = "X";
     }
     gameInfo.innerText =  `Current Player - ${currentPlayer}`;
}
function handleClick(index){
     if(gameGrid[index] === ""){
         boxes[index].innerText = currentPlayer;
         gameGrid[index] = currentPlayer;
          //not able to applyb pointer on the game grid
         boxes[index].style.pointerEvents = "none" ;
        ///swap karna hai turn ko..
        swapTurn();
        checkGameOver();
     }
}

boxes.forEach((box, index) => {
     box.addEventListener("click", ()=>{
         handleClick(index);
     });
});


newGameBtn.addEventListener("click", ()=>{
    initGame();
});




