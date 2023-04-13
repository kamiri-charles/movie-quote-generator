import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import quotes from "./quotes.json";
import "./App.scss";
import { useRef } from "react";
import Contributors from "./components/Contributors/Contributors";
import QuoteGenerator from "./components/QuoteGenerator/QuoteGenerator";



const App = () => {
  const [data, setData] = useState(null);
  let [contributors, setContributors] = useState();
  let contrib = useRef();
  const [bgcolor, setbgColor] = useState("#fffff");
  const infoRef = useRef(null);


  const load_quote = () => {
    setData(null);
    setTimeout(() => {
      setData(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 3000);
  };

  const change_color = () => {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setbgColor(color)
  }

  const setHtmlBackground = (bgcolor) => {
    const root = document.querySelector("html");
    root.style.backgroundColor = `${bgcolor}`;
    root.style.transition = "all .5s ease";
  };
  setHtmlBackground(bgcolor);

  const fetch_contributors = async () => {
    fetch(
      "https://api.github.com/repos/kamiri-charles/movie-quote-generator/contributors"
    )
      .then((res) => res.json())
      .then((data) => setContributors(data));
  };

  let contrib_view = () => {
    if (contrib.current.classList.contains("hidden")) {
      contrib.current.classList.remove("hidden");
    } else {
      contrib.current.classList.add("hidden");
    }
  };

  /* Copy quote */
  const copy_quote = () => {
    navigator.clipboard.writeText(data.quote + " - " + data.movie);

    // alert("Copied to clipboard!");
    let toast = document.getElementById("toast");
    toast.className = "showToast";
    setTimeout(function(){toast.className = toast.className.replace("showToast", "");}, 3000);
  };

  useEffect(() => {
    load_quote();
    change_color();
    fetch_contributors(); document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleClick = (event) => {
    if (!infoRef.current.contains(event.target)) {
      contrib.current.classList.add("hidden");
    }
  };

  return (
    <div className="App">
      <a href="#main" className="hidden">
        Skip to main content
      </a>
      <h1 className="title" tabIndex="0">
          Random Movie Quote Generator
          <div className="info" onClick={contrib_view} ref={infoRef}>
            <FontAwesomeIcon icon={faCircleInfo} color="white" />
          </div>
      </h1>

      <QuoteGenerator props={{ data, copy_quote, load_quote, change_color }} />

      <Contributors props={{ contributors, contrib, infoRef }} />
      {/* <div className="info" onClick={contrib_view} ref={infoRef}>
        <FontAwesomeIcon icon={faCircleInfo} color="white" />
      </div> */}
      <div id="toast">
        Copied to clipboard!
      </div>
    </div>
  );
};
export default App;
