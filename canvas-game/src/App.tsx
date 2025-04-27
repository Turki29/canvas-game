import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current == null) return;

    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
    canvas.style.background = "#000000";

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
        context.strokeStyle = this.color;
        context.lineWidth = 20;
        context.arc(this.x,this.y, 5,0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
        


      }

      update()
      {
        this.draw(context);
      }

    }

    const player = new Player(window.innerWidth/2, window.innerHeight/2, "orange");

    player.draw(context);

    const updateScreen = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      player.update();
      requestAnimationFrame(updateScreen);
    }


    addEventListener("keydown", (e) => {
      if(e.key.toLowerCase() == 'w')
      {
        
        player.y -= 5;
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
