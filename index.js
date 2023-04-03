import { knightMoves } from "./knightTravales.js";

let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
let knightOriginPos = null;
let knightDestinationPos = null;
let path = null;

let knightOriginRect;
let destinationRect;
let canvas;
let ctx;

(function createChessboard(){
    let xAxis = document.getElementById("x")
    for(let i=0;i<8;i++){
        let div = document.createElement("div")
        div.textContent = alphabet[i]
        xAxis.append(div)
    }

    let yAxis = document.getElementById("y")
    for(let i=0;i<8;i++){
        let div = document.createElement("div")
        div.textContent = i+1
        yAxis.append(div)
    }

    let chessboard = document.createElement("div")
    document.querySelector("main").append(chessboard)
    chessboard.id = "chessboard"

    canvas = document.createElement("canvas")
    canvas.id = "canvasOverlay"
    canvas.width = 320
    canvas.height = 320
    canvas.className = "canvasOverlay"
    ctx = canvas.getContext("2d");
    chessboard.append(canvas)
    document.getElementById("chessboardContainer").append(chessboard)

    for(let i = 8; i > 0; i--){
        for(let y = 0; y < 8; y++){
            let square = document.createElement("div")
            document.getElementById("chessboard").appendChild(square)
            square.id = `${alphabet[y]}${i}`
            let p = document.createElement("p")
            p.textContent = `${alphabet[y]}${i}`
            square.append(p)
            square.classList.add("square")
            
            square.addEventListener("click", (e)=>{
                reset()
                if(knightDestinationPos!==null){
                    document.getElementById(arrayToString(knightDestinationPos)).classList.remove("selected")
                }
                if(knightOriginPos!==null){
                    document.getElementById(e.target.id).classList.add("selected");

                    knightDestinationPos = stringToArray(e.target.id);
                    
                    path = knightMoves(knightOriginPos,knightDestinationPos);
                    path.shift();
                    path.pop();

                    ctx.moveTo((knightOriginRect.x-28), (knightOriginRect.y-28))

                    for(let i = 0; i < path.length; i++){
                        let element = path[i]
                        let div = document.getElementById(arrayToString(element))
                        div.classList.add("path")
                        let divRect = div.getBoundingClientRect()
                        ctx.lineTo((divRect.x-28), (divRect.y-28))
                        ctx.stroke()
                        ctx.beginPath()
                        ctx.arc((divRect.x-28), (divRect.y-28), 15, 0, 2 * Math.PI);
                        ctx.fill()
                        ctx.moveTo((divRect.x-28), (divRect.y-28))
                    }

                    destinationRect = e.target.getBoundingClientRect()
                    ctx.lineTo((destinationRect.x-28), (destinationRect.y-28))
                    ctx.stroke()
                    ctx.beginPath()
                    ctx.arc((destinationRect.x-28), (destinationRect.y-28), 15, 0, 2 * Math.PI);
                    ctx.fill()
                }else{
                    knightOriginPos = stringToArray(e.target.id)
                    let icon = new Image()
                    icon.src = "img/chess-knight.svg"
                    e.target.append(icon)

                    knightOriginRect = e.target.getBoundingClientRect()

                    document.getElementById("messageDisplay").textContent = "Click a square to set the destination."
                }
            })
            if(i%2==0){
                if(y%2==0){
                    square.classList.add("white")
                } else {
                    square.classList.add("black")
                }
            } else {
                if(y%2==0){
                    square.classList.add("black")
                } else {
                    square.classList.add("white")
                }
            }
        }
    }

document.getElementById("randomKnightPosButton").addEventListener("click", randomKnightPos)
})();

function reset(){

    document.getElementById("canvasOverlay").remove()
    canvas = document.createElement("canvas")
    canvas.id = "canvasOverlay"
    canvas.width = 320
    canvas.height = 320
    canvas.className = "canvasOverlay"
    ctx = canvas.getContext("2d");
    chessboard.append(canvas)

    for(let i = 8; i > 0; i--){
        for(let y = 0; y < 8; y++){
            let div = document.getElementById(`${alphabet[y]}${i}`)
            div.classList.remove("selected")
            div.classList.remove("path")
        }
    }
}

function randomKnightPos(){
    if(knightOriginPos!==null){
        document.getElementById(arrayToString(knightOriginPos)).children[1].remove()
    }
    reset()
    let x = Math.floor(Math.random()*8)
    let y = Math.floor(Math.random()*(8-1)+1)
    knightOriginPos = [x,(y-1)]
    let pos = document.getElementById(`${alphabet[x]}${y}`)
    let icon = new Image()
    icon.src = "img/chess-knight.svg"
    pos.append(icon)

    knightOriginRect = pos.getBoundingClientRect()
    ctx.beginPath()
    ctx.lineTo((knightOriginRect.x-8), (knightOriginRect.y-29))

    document.getElementById("messageDisplay").textContent = "Click a square to set the destination."
}

function stringToArray(string){
    let array = string.split('')
    array[0] = alphabet.findIndex(ele=>ele==array[0])
    array[1] = Number(array[1]-1)
    return array
}

function arrayToString(array){
    array[0]=alphabet[array[0]]
    array[1]=array[1]+1
    let string = array.join().replace(/,/g, "")
    return string
}
