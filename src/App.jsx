/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import quotes from "./quotes.json";

import "./App.scss";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [Dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  /* Quote script */
  const load_quote = () => {
    const load_canvas = document.getElementById("load_canvas");
    if (load_canvas) {
      setLoaded(false);
      setTimeout(() => {
        quote_wrapper.style.color = "white";
        load_canvas.style.opacity = 0;
        setLoaded(true);
      }, 2000);
      load_canvas.width = 100;
      load_canvas.height = 100;
      const load_ctx = load_canvas.getContext("2d");

      let particle = {
        x: load_canvas.width / 2,
        y: load_canvas.height / 3,
        radius: 5,
        radians: 0,
        color: "white",
      };

      quote_wrapper.style.color = "transparent";
      load_canvas.style.opacity = 1;
      const load_animate = () => {
        // Draw particle
        load_ctx.beginPath();
        load_ctx.fillStyle = particle.color;
        load_ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        load_ctx.fill();
        load_ctx.closePath();

        // Particle circular movement
        particle.radians += 0.2;
        particle.x += Math.cos(particle.radians) * 5;
        particle.y += Math.sin(particle.radians) * 5;

        load_ctx.beginPath();
        load_ctx.fillStyle = "rgba(107, 22, 225, 0.2)";
        load_ctx.fillRect(0, 0, load_canvas.width, load_canvas.height);
        if (!loaded) requestAnimationFrame(load_animate);
      };
      load_animate();
    }

    const selected_quote = quotes[Math.floor(Math.random() * quotes.length)];
    quote_el.innerHTML = selected_quote.quote;
    origin_el.innerHTML =
      "~ " + selected_quote.movie + ", " + selected_quote.year;
  };

  /* Copy text from quote wrapper */
  const copy_quote = () => {
    const quote = quote_el.innerHTML;
    const origin = origin_el.innerHTML;
    const text = quote + " " + origin;
    navigator.clipboard.writeText(text);

    alert("Copied to clipboard!");
  };

  useEffect(() => {
    function resizeHandler() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    /* Canvas script */
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById("bg_canvas");
    // canvas.width = Dimensions.width;
    // canvas.height = Dimensions.height;
    const ctx = canvas.getContext("2d");

    let canvas_color = { new_r: 255, new_g: 240, new_b: 255 }; // azure

    new_quote.addEventListener("click", () => {
      const random_color = () => Math.floor(Math.random() * 255);
      canvas_color = {
        new_r: random_color(),
        new_g: random_color(),
        new_b: random_color(),
      };
    });

    const animate = () => {
      const steps = 50;
      const [current_r, current_g, current_b] = ctx.getImageData(
        5,
        5,
        1,
        1,
      ).data;
      const { new_r, new_g, new_b } = canvas_color;
      const step_r = (new_r - current_r) / steps;
      const step_g = (new_g - current_g) / steps;
      const step_b = (new_b - current_b) / steps;
      ctx.fillStyle = `rgb(${current_r + step_r}, ${current_g + step_g}, ${
        current_b + step_b
      })`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(animate);
    };
    animate();
    load_quote();
    window.addEventListener("resize", resizeHandler);
    // return (_) => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, []);

  return (
    <main>
      <canvas
        id='bg_canvas'
        width={Dimensions.width}
        height={Dimensions.height}></canvas>
      <div className='title'>Random Movie Quote Generator</div>
      <div className='wrapper'>
        <div className='quote-wrapper' id='quote_wrapper'>
          <canvas id='load_canvas'></canvas>
          <div className='quote' id='quote_el'></div>
          <div className='origin' id='origin_el'></div>
        </div>
        <div className='buttons'>
          <button onClick={load_quote} id='new_quote' disabled={!loaded}>
            <FontAwesomeIcon icon={faRefresh} />
          </button>
          <a
            href='https://twitter.com/intent/tweet'
            target='_blank'
            rel='noreferrer'>
            <button>
              <FontAwesomeIcon icon={faTwitter} />
            </button>
          </a>
          <button onClick={copy_quote}>
            <FontAwesomeIcon icon={faCopy} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default App;
