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

  const load_quote = () => {
    setData(null);
    setTimeout(() => {
      setData(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 3000);
  };

  const change_color = () => {
    const bgcolor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${bgcolor}`;
  };


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
    navigator.clipboard.writeText(data.quote + " - " + data.origin);

    alert("Copied to clipboard!");
  };

  useEffect(() => {
    load_quote();
    fetch_contributors();
  }, []);

  return (
    <div className="App" style={{backgroundColor: change_color()}}> 
      
      <a href="#main" className="hidden">
        Skip to main content
      </a>
      <div className="info" onClick={contrib_view}>
        <FontAwesomeIcon icon={faCircleInfo} color="blue" />
      </div>
      <h1 className="title" tabIndex="0">
        Random Movie Quote Generator
      </h1>

      <QuoteGenerator props={{ data, copy_quote, load_quote }} />

      <Contributors props={{ contributors, contrib }} />
    </div>
  );
};

export default App;
