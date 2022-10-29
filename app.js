const canvasElement = document.getElementById('canvas')
//canvas rendering context 2d
const canvas = canvasElement.getContext('2d')



//click på dem som et spil
//de kunne collide

let drawIsOn = false
let ballColor = 'random'
let backgroundColor = 'white'

let numberOfBalls = 1
let refreshRate = 3000 //20 til 60
let balls = []
const colors = ['red','green','blue','pink','brown','black','yellow']
//ball size randomize


class Ball{
    constructor(){
        //sætter tilfældigt tall mellem -5 til 5
        this.xDirection = this.setDirection()
        this.yDirection = this.setDirection()
        this.size = Math.floor(Math.random() * 7)+5
        this.color = this.setColor(ballColor)
        this.x = randomIntFromInterval(this.size,canvasElement.width-this.size)//Math.floor((Math.random() * canvasElement.width)+this.size)    
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
            return colors[number]
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


function updateCanvas(){
    //opdaterer canvas med baggrunden så vi får en illusion af at bolden bevæger sig
    if(!drawIsOn){
    canvas.fillStyle = backgroundColor
    canvas.fillRect(0,0,800,800) 
    }
    balls.forEach(ball => {
        //tegner vi bolden
        canvas.beginPath();
        canvas.arc(ball.x,ball.y,ball.size,0,Math.PI *2)
        canvas.fillStyle = ball.color
        canvas.fill();
        //flytter vi på boldens x og y koordinater
        ball.move()
      
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
        refreshRate = button.innerHTML * 10
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
canvasElement.addEventListener("mousemove", (e) => {

    
    mousex = e.clientX;
    mousey = e.clientY;
    console.log(balls[0].y)
    console.log(e.clientY/4.466666666666667)
  });
  
