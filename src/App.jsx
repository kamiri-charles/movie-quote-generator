import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import quotes from "./quotes.json";
import "./App.scss";
import { useRef } from "react";
import Contributors from "./components/Contributors/Contributors";
import QuoteGenerator from "./components/QuoteGenerator/QuoteGenerator";



const App = () => {
  const [data, setData] = useState(null);
  let [contributors, setContributors] = useState();
  let contrib = useRef();
  const infoRef = useRef(null);


  const load_quote = () => {
    setData(null);
    setTimeout(() => {
      setData(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 3000);
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
    navigator.clipboard.writeText(data.quote + " - " + data.movie);

    let toast = document.getElementById("toast");
    toast.className = "showToast";
    setTimeout(function(){toast.className = toast.className.replace("showToast", "");}, 3000);
  };

  useEffect(() => {
    load_quote();
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
      <div className="title" >
       Random movie quotes generator
        <div className="info" onClick={contrib_view} ref={infoRef}>
          <FontAwesomeIcon icon={faCircleInfo} color="grey" />
          </div>
      </div>
      <QuoteGenerator props={{ data, copy_quote, load_quote }} />

      <Contributors props={{ contributors, contrib, infoRef }} />
      {/* <div className="info" onClick={contrib_view} ref={infoRef}>
        <FontAwesomeIcon icon={faCircleInfo} color="white" />
      </div> */}
            <div className="buttons">
        <button
          onClick={() => {
            load_quote();
          }}

          disabled={!data}
          aria-label="Load A New Quote"
        >
          <FontAwesomeIcon icon={faRefresh} color="white" />
        </button>
        {!data ? (
          <>
            <button
              href={"https://twitter.com/intent/tweet?text="}
              target="_blank"
              rel="noreferrer"
              aria-label="Link To Share Current Quote On Twitter"
              disabled
            >
              <FontAwesomeIcon icon={faTwitter} color="white" />
            </button>
          </>
        ) : (
          <>
            <a
              href={"https://twitter.com/intent/tweet?text=" + data.quote + " - " + data.movie}
              target="_blank"
              rel="noreferrer"
              aria-label="Link To Share Current Quote On Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} color="white" />
            </a>
          </>
        )}


        <button onClick={copy_quote} aria-label="Copy Current Quote" disabled={!data}>
          <FontAwesomeIcon icon={faCopy} color="white" />
        </button>
      </div>
      <div id="toast">
        Copied to clipboard!
      </div>
    </div>
  );
};
export default App;
