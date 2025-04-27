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
    let widnow_height : number = 5000;

    canvas.width = window_width;
    canvas.height = widnow_height;
    let context = canvas.getContext('2d');

    class Player {

      x : number;
      y : number;
      color: string;
      

      constructor(x:number , y : number, color: string)
      {
        this.x = x;
        this.y = y;
        this.color = color;


      }

      draw(context)
      {

        context.beginPath();
        context.strokeStyle = "#ffa6007b";
        context.lineWidth = 20;
        context.arc(this.x,this.y, 10,0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
        
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = 20;
        context.arc(this.x,this.y, 5,0, Math.PI * 2, false);
        context.stroke();

        context.closePath();
        


      }

      update()
      {

        let dx = 0;
        let dy = 0;
        if(pressedKeys.includes('w')) dy -=5;
        if(pressedKeys.includes('d')) dx +=5;
        if(pressedKeys.includes('s')) dy +=5;
        if(pressedKeys.includes('a')) dx -=5;

        player.x = 
        (player.x + dx + 5) >= window_width || player.x +dx <= 0 
        ? 
        player.x 
        :
        player.x +dx;

        player.y = 
        (player.y + dy + 5) >= widnow_height || player.y +dy <= 0
        ? 
        player.y
        :
        player.y +dy;

        this.draw(context);
      }

    }

    const player = new Player(window.innerWidth/2, window.innerHeight/2, "orange");

    player.draw(context);

    const updateScreen = () => {
      context.clearRect(0, 0, window_width, widnow_height);
      context?.beginPath();
      context?.fillRect(1500, 1500, 300, 500);
      context?.closePath();
      context?.beginPath();
      context?.fillText(`x: ${player.x}, y: ${player.y}`,player.x , player.y - 50)
      context?.closePath();
      
      player.update();
      
      let scrollx = player.x  - window.innerWidth /2;
      let scrolly =  player.y - window.innerHeight/2;
      if(scrollx < 0) scrollx = player.x;
      if(scrolly < 0) scrolly = player.y + player.y ;
      scrollTo(scrollx, scrolly )
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
