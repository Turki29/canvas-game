import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys = useRef(['w', 'd', 's', 'a']) ;

  useEffect(() => {
    if (canvasRef.current == null) return;
    let pressedKeys : Array<string> = [];
    const canvas: HTMLCanvasElement = canvasRef.current;
    
    canvas.style.background = "#ffffff";
    let window_width : number = 5000;
    let window_height : number = 5000;

    canvas.width = window_width;
    canvas.height = window_height;
    let context = canvas.getContext('2d');

    class Player {
      x: number;
      y: number;
      color: string;
      tail_length: number;
      previousPositions: {x: number, y: number}[] = [];
  
      constructor(x: number, y: number, color: string) {
          this.x = x;
          this.y = y;
          this.color = color;
          this.tail_length = 5;
      }
  
      draw(context) {
          context.beginPath();
          context.strokeStyle = "#ffa6007b";
          context.lineWidth = 20;
          context.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
          context.stroke();
          context.closePath();
          
          context.beginPath();
          context.strokeStyle = this.color;
          context.lineWidth = 20;
          context.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
          context.stroke();
          context.closePath();
      }
  
      update(context) {
          let dx = 0;
          let dy = 0;
          if (pressedKeys.includes('w')) {
              dy -= 5;
              if (this.tail_length < 200) this.tail_length += 2/3;
          }
          if (pressedKeys.includes('d')) dx += 5;
          if (pressedKeys.includes('s')) dy += 5;
          if (pressedKeys.includes('a')) dx -= 5;
  
          if (dx === 0 && dy === 0 && this.tail_length > 70) {
              if (this.tail_length <= 0) this.tail_length = 5;
              this.tail_length -= 1;
          }
  
          // سجل الموقع
          this.previousPositions.push({x: this.x, y: this.y});
          if (this.previousPositions.length > this.tail_length) {
              this.previousPositions.shift();
          }
  
          // ارسم الذيل
          context.beginPath();
          context.strokeStyle = "black";
          context.lineCap = 'round'
          context.lineWidth = 20;
          for (let i = 0; i < this.previousPositions.length - 1; i++) {
              const pos = this.previousPositions[i];
              const nextPos = this.previousPositions[i + 1];
              context.moveTo(pos.x, pos.y);
              context.lineTo(nextPos.x, nextPos.y);
          }
          context.stroke();
          context.closePath();
  
          // تحديث موضع اللاعب
          this.x = 
              (this.x + dx + 5) >= window_width || this.x + dx <= 0
              ? this.x
              : this.x + dx;
  
          this.y =
              (this.y + dy + 5) >= window_height || this.y + dy <= 0
              ? this.y
              : this.y + dy;
  
          this.draw(context);
      }
  }
  

    const player = new Player(window.innerWidth/2, window.innerHeight/2, "orange");

    player.draw(context);

    const updateScreen = () => {
      context.clearRect(0, 0, window_width, window_height);
      context?.beginPath();
      context?.fillRect(1500, 1500, 300, 500);
      context?.closePath();
      context?.beginPath();
      context?.fillText(`x: ${player.x}, y: ${player.y}, tail length: ${player.tail_length}`,player.x , player.y - 50)
      context?.closePath();
      


      player.update(context);
      
      let scrollx = player.x  - window.innerWidth /2;
      let scrolly =  player.y - window.innerHeight/2;
      if(scrollx < 0) scrollx = 0;
      if(scrolly < 0) scrolly = 0 ;
      scrollTo(scrollx, scrolly )
      console.log(`scrollx : ${scrollx}, scrolly: ${scrolly}`);
      requestAnimationFrame(updateScreen);
    }


    addEventListener("keydown", (e) => {

      if(keys.current.includes(e.key) &&  !pressedKeys.includes(e.key))
      {
        
       pressedKeys.push(e.key);
      }

    })

    addEventListener("keyup", (e) => {
      
      if(keys.current.includes(e.key) &&  pressedKeys.includes(e.key))
        {
         pressedKeys.splice(pressedKeys.indexOf(e.key), 1);

        }
    })


    updateScreen();


  }, []);
  return (
    <>

      <canvas ref={canvasRef}>

      </canvas>


    </>
  )
}

export default App
