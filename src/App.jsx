/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faRefresh, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import quotes from './quotes.json';

import './App.scss';

const App = () => {
  /* Quote script */
  const load_quote = () => {
    const load_canvas = document.getElementById('load_canvas');
    if (load_canvas) {
      let loaded = false;
      setTimeout(() => {
        quote_wrapper.style.color = 'white';
        load_canvas.style.opacity = 0;
        loaded = true;
      }, 2000)
      load_canvas.width = 100;
      load_canvas.height = 100;
      const load_ctx = load_canvas.getContext('2d');
      
      let particle = {
        x: load_canvas.width / 2,
        y: load_canvas.height / 3,
        radius: 5,
        radians: 0,
        color: 'white'
      }
      
      quote_wrapper.style.color = 'transparent';
      load_canvas.style.opacity = 1;
      const load_animate = () => {
        // Draw particle
        load_ctx.beginPath();
        load_ctx.fillStyle = particle.color;
        load_ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        load_ctx.fill()
        load_ctx.closePath();
        
        
        // Particle circular movement
        particle.radians += 0.2;
        particle.x += Math.cos(particle.radians) * 5;
        particle.y += Math.sin(particle.radians) * 5;
        
        load_ctx.beginPath();
        load_ctx.fillStyle = 'rgba(89, 50, 173, 0.2)';
        load_ctx.fillRect(0, 0, load_canvas.width, load_canvas.height);
        if (!loaded) requestAnimationFrame(load_animate);
    }
      load_animate()
    }
    
    const selected_quote = quotes[Math.floor(Math.random() * quotes.length)];
    quote_el.innerHTML = selected_quote.quote;
    origin_el.innerHTML = '~ ' + selected_quote.movie + ', ' + selected_quote.year;
  }

  useEffect(() => {
    /* Canvas script */
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById("bg_canvas");
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      ctx.fillStyle = 'azure';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(animate);
    };
    animate();
    load_quote();
  })


  return (
    <>
      <canvas id="bg_canvas"></canvas>
      <div className="title">Random Movie Quote Generator</div>
      <div className="wrapper">
        <div className="quote-wrapper" id='quote_wrapper'>
          <canvas id='load_canvas'></canvas>
          <div className="quote" id="quote_el"></div>
          <div className="origin" id="origin_el"></div>
        </div>
        <div className="buttons">
          <button onClick={load_quote}>
            <FontAwesomeIcon icon={ faRefresh } />
          </button>
          <button>
            <FontAwesomeIcon icon={ faShareAlt } />
          </button>
          <button>
            <FontAwesomeIcon icon={ faCopy } />
          </button>
        </div>
      </div>
    </>
  )
}

export default App;