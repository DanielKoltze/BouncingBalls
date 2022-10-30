const canvasElement = document.getElementById('canvas')
//canvas rendering context 2d
const canvas = canvasElement.getContext('2d')



canvasElement.width = 1000;
canvasElement.height = 600;



//click på dem som et spil
//de kunne collide

let drawIsOn = false
let ballColor = 'random'
let backgroundColor = 'white'

let balls = []
let numberOfBalls = 1
let refreshRate = 15  


const colors = ['red','green','blue','pink','brown','black','yellow']
//ball size randomize


class Ball{
    constructor(){
        //sætter tilfældigt tall mellem -5 til 5
        this.xDirection = this.setDirection()
        this.yDirection = this.setDirection()
        this.size = randomIntFromInterval(20,40)
        this.color = this.setColor(ballColor)
        this.x = randomIntFromInterval(this.size,canvasElement.width-this.size)  
        this.y = randomIntFromInterval(this.size,canvasElement.height-this.size)
    }
    move(){
        //checker collision inden der køreres videre
        this.checkCollision()
        this.x = this.x + this.xDirection
        this.y = this.y + this.yDirection
    }

    checkCollision(){
        // over 0 eller under height-size på ball så ganger vi med .1 altså skifter fortegn
        if(this.y < 0+this.size || this.y > canvasElement.height-this.size){
            this.yDirection = this.yDirection*-1
        }
        if(this.x < 0+this.size || this.x > canvasElement.width-this.size){
            this.xDirection = this.xDirection*-1
        }
    }
    setColor(color){
        //giver et random tal fra 0-6 og returnerer så farven i arrayet
        if(color === 'random'){
            let number = randomIntFromInterval(0,6)
            return `rgba(${Math.random() * 256},
            ${Math.random() * 256},
            ${Math.random() * 256},
            ${Math.random()}
            )`
        }else{
            return color
        }
        
    }
    setDirection(){
        //tilfældigt tal fra 1-5
        let number = randomIntFromInterval(1,5)
        //50 procent for at tallet bliver -
        if(Math.random() < 0.5){
            number = number * -1
        }
        return number
    }

    //checker om bolden bliver ramt af onHit
    checkHit(mouseX,mouseY){
        if(mouseX-this.size < this.x && mouseX+this.size > this.x && mouseY-this.size < this.y && mouseY+this.size > this.y){
            return true
        }else{
            return false
        }
    }

}



//pusher en bold til starten
balls.push(new Ball())


//tager et number og så fjerner den bolde hvis tallet er lavere end det antal bolde der allerede er og omcendt
function createBalls(number){
    if(number > numberOfBalls){
        for (let i = 0; i < number-numberOfBalls; i++) { 
            balls.push(new Ball())
        }
    }else if(number < numberOfBalls){
        for (let i = 0; i < numberOfBalls-number; i++) {
            balls.pop()
        }
    }
    numberOfBalls = number
    
}


let interval = setInterval(updateCanvas, refreshRate)

//requestAnimationFrame(updateCanvas)

function updateCanvas(){
    //opdaterer canvas med baggrunden så vi får en illusion af at bolden bevæger sig
    if(!drawIsOn){
    canvas.fillStyle = backgroundColor
    canvas.fillRect(0,0,40000,40000) 
    }
    balls.forEach(ball => {
        //tegner vi bolden
        canvas.beginPath();
        canvas.arc(ball.x,ball.y,ball.size,0,Math.PI *2)
        canvas.fillStyle = ball.color
        canvas.fill();
        //flytter vi på boldens x og y koordinater
        ball.move()
      
        //requestAnimationFrame(updateCanvas)
    })
    
}




//random function da det bruges meget
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }










let backgroundColorDropdown = document.querySelectorAll('.backgroundColors .dropdown-item')

backgroundColorDropdown.forEach(color => {
    color.addEventListener('click', (e) => {
        backgroundColor = e.target.innerHTML
    })
})

let ballColorDropdown = document.querySelectorAll('.ballColor .dropdown-item')
ballColorDropdown.forEach(color => {
    color.addEventListener('click', (e) => {
        balls.forEach(ball => {
            ball.color = ball.setColor(color.innerHTML)
            ballColor = color.innerHTML
        })
    })
})

let numberOfBallsElement = document.querySelector('#numberOfBalls')
numberOfBallsElement.addEventListener('input', (e) => {
    if(!(e.target.value === '')){
        createBalls(numberOfBallsElement.value)
    }
})
let speedDrowndown = document.querySelectorAll('#speedDropdown option')
speedDrowndown.forEach(button => {
    button.addEventListener('click', (e) => {
        clearInterval(interval)
        refreshRate = button.innerHTML * 4
        interval = setInterval(updateCanvas,refreshRate)
    })
})



let drawMode = document.getElementById('drawMode')
drawMode.addEventListener('click', (e) => {
    if(!e.target.checked){
        drawIsOn = false
    }else {
        drawIsOn = true
    }
    
    

})



//noget med at trykke på knapperne
canvasElement.addEventListener("click", (e) => {

    balls.forEach((ball,i) => {
        let ballHit = ball.checkHit(e.offsetX,e.offsetY)
        if(ballHit){
            balls.splice(i,1)
            numberOfBalls = numberOfBalls - 1
        }
    })
    
    
    
  });
  

  class Timer{
    constructor(){
        this.tens = 0
        this.seconds = 0
        this.timer = null
        this.updateP = document.querySelector('.timer')

    }
    startTimer(){
        this.timer = setInterval(() => {
            this.tens = this.tens + 1
            if(this.seconds < 10){
                this.updateP.innerHTML = '0' + this.seconds + ':'
            }else{
                this.updateP.innerHTML = this.seconds + ':'
            }
            if(this.tens < 10){
                this.updateP.innerHTML = this.updateP.innerHTML + '0' + this.tens
            }else if(this.tens < 100){
                this.updateP.innerHTML = this.updateP.innerHTML + this.tens
            }else{
                this.tens = 0
                this.seconds = this.seconds + 1
            }
            
            
            if(balls.length === 0){
                this.stopTimer()
            }
        },10)
    }
    stopTimer(){

        clearInterval(this.timer)
    }

  }


const startGame = document.querySelector('#startGameButton')
startGame.addEventListener('click', (e) => {
    const timerHTML = document.querySelector('.timer')
    let timer = new Timer()
    timer.startTimer()
})



