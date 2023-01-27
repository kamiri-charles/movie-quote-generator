import { useEffect, useState } from "react";
import quotes from "./quotes.json";
import "./App.scss";
import React, { lazy, Suspense } from "react";

const App = () => {
  const [data, setData] = useState(null);

  const ContributorsComponent = lazy(() =>
    import("./components/Contributors/Contributors")
  );

  const QuoteGeneratorComponent = lazy(() =>
    import("./components/QuoteGenerator/QuoteGenerator")
  );
  const renderLoader = () => <p>Loading...</p>;

  const load_quote = async () => {
    setData(null);
    setTimeout(() => {
      setData(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 3000);
  };

  /* Copy quote */
  const copy_quote = () => {
    navigator.clipboard.writeText(data.quote + " - " + data.origin);
    alert("Copied to clipboard!");
  };

  useEffect(() => {
    const loadingFunction = async () => {
      await load_quote();
    };
    loadingFunction();
  }, []);

  return (
    <div className="App">
      <a href="#main" className="hidden">
        Skip to main content
      </a>
      <h1 className="title remove-scrollbar">Random Movie Quote Generator</h1>
      <Suspense fallback={renderLoader()}>
        <QuoteGeneratorComponent props={{ data, copy_quote, load_quote }} />
        <ContributorsComponent />
      </Suspense>
    </div>
  );
};

export default App;
