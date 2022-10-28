const canvasElement = document.getElementById('canvas')
//canvas rendering context 2d
const canvas = canvasElement.getContext('2d')

const canvasWidth = 800
const canvasHeight = 800
const refreshRate = 30
const balls = []

//ball size randomize


class Ball{
    constructor(x,y,speed,xDirection,yDirection,size){
        this.x = x
        this.y = y
        this.speed = speed
        this.xDirection = xDirection
        this.yDirection = yDirection
        this.size = size
    }
}




//balls hardcoded
let ball1 = new Ball(25,25,5,-1,-1,10)
let ball2 = new Ball(50,50,5,1,1)
balls.push(ball1)
//balls.push(ball2)


setInterval(updateCanvas, refreshRate)


function updateCanvas(){
    canvas.fillStyle = 'lightblue'
    canvas.fillRect(0,0,canvasWidth,canvasHeight) //canvasElement.style.width,canvasElement.style.height
    
    balls.forEach(ball => {
        canvas.beginPath();
        canvas.arc(ball.x,ball.y,20,0,Math.PI * 2)
        canvas.fillStyle = 'black'
        canvas.fill();
        canvas.closePath()
        //canvas.fillRect(ball.x,ball.y,ball.size,ball.size)
        ball.x = ball.x + 1
        ball.y = ball.y + 1
    })
}





