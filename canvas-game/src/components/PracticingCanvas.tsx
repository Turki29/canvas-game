import React, { useEffect, useRef } from 'react'

function PracticingCanvas() {
    
    
     const canvasRef = useRef<HTMLCanvasElement>(null);
    
      useEffect(() => {
        if (canvasRef.current == null) return;
    
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth;
        canvas.style.background = "#ff8";
    
        let context = canvas.getContext('2d');
    
    
    class Circle {
        x: number;
        y: number;
        rad: number;
        color: string;
        text: string | number;
  
        speed: number;
        dx: number;
        dy: number;
  
  
  
        constructor(x: number, y: number, rad: number,
          color: string, text: string | number, speed: number) {
          this.x = x;
          this.y = y;
          this.rad = rad;
          this.color = color;
          this.text = text;
  
          this.speed = speed;
          this.dx = speed * 1;
          this.dy = speed * 1;
        }
  
        draw(context: CanvasRenderingContext2D | null) {
          if (!context) return;
  
          context.beginPath();
          context.strokeStyle = this.color;
          context.lineWidth = 5;
          context.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
          context.stroke();
          context.closePath();
  
          // Text settings
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.font = '20px Arial';
          context.fillText(this.text + "", this.x, this.y);
        }
  
        update() {
  
          // context.clearRect(0, 0, window.innerWidth, window.innerHeight);
          this.draw(context);
  
          if (this.x + this.rad > window.innerWidth || this.x - this.rad < 0) {
            hit_counter++;
            this.dx *= -1;
          }
  
          if (this.y + this.rad > window.innerHeight || this.y - this.rad < 0) {
            hit_counter++;
            this.dy *= -1;
          }
  
          this.x += this.dx;
          this.y += this.dy;
        }
      }
  
      class ConnectingLine {
  
        x1: number;
        x2: number;
        y1: number;
        y2: number;
        color: string;
  
        constructor(x1: number, y1: number, x2: number,
          y2: number, color: string) {
          this.x1 = x1;
          this.y1 = y1;
          this.x2 = x2;
          this.y2 = y2;
          this.color = color;
  
        }
  
        draw(context: CanvasRenderingContext2D | null) {
          if (!context) return;
  
          context.beginPath();
          context.strokeStyle = this.color;
          context.lineWidth = 5;
          context.strokeStyle = this.color;
          context.moveTo(this.x1, this.y1);
          context.lineTo(this.x2, this.y2);
          context.stroke();
          context.closePath();
        }
  
        update() {
          this.draw(context);
        }
      }
  
  
      let hit_counter: number = 0;
      let circle1 = new Circle(102, 100, 50,
        "black", hit_counter, 3);
  
      let circle2 = new Circle((window.innerWidth / 2) + 5, (window.innerHeight / 2) + 10, 100,
        "black", "تركي", 0);
      let line1 = new ConnectingLine(circle1.x, circle1.y, circle2.x, circle2.y, "red");
  
      circle1.draw(context);
      circle2.draw(context);
      line1.draw(context);
  
      const getDistance = (x1: number, y1: number
        , x2: number, y2: number) => {
  
  
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  
      }
  
  
      const updateScreen = () => {
  
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        circle1.text = hit_counter;
  
        if (getDistance(circle2.x, circle2.y, circle1.x, circle1.y) < circle2.rad + circle1.rad) {
          console.log(circle2.color);
          if ( circle2.color == 'black') 
          {
            circle2.color = 'red';
            
          }
          else circle2.color = 'black'
          
          // circle1.dx *= -1;
          // circle1.dy *= -1;
  
          let normalX = circle2.x - circle1.x;
          let normalY = circle2.y - circle1.y;
          let magnitude = Math.sqrt(normalX * normalX + normalY * normalY);
      
          // Normalize the normal vector
          normalX /= magnitude;
          normalY /= magnitude;
      
          // Find the dot product between velocity and normal
          let dot = circle1.dx * normalX + circle1.dy * normalY;
      
          // Reflect the velocity along the normal
          circle1.dx = circle1.dx - 2 * dot * normalX;
          circle1.dy = circle1.dy - 2 * dot * normalY;
        }
        
  
  
        circle1.update();
        circle2.update();
        line1.x1 = circle1.x;
        line1.y1 = circle1.y;
        line1.x2 = circle2.x;
        line1.y2 = circle2.y;
        line1.update();
  
        requestAnimationFrame(updateScreen);
      }
  
      updateScreen();
  
    }, []);
    
  return (
    <div>
      
    </div>
  )
}

export default PracticingCanvas
