import { useEffect, useState, useRef } from 'react';
import quotes from './quotes.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Contributors from './components/Contributors/Contributors';
import QuoteGenerator from './components/QuoteGenerator/QuoteGenerator';
import './App.scss';

// Use HSL to better control the saturation and lightness
const getRandomHSL = () => {
  // Saturation can be between 50 and 90
  const saturation = Math.floor(Math.random() * 10) + 80;
  // Lightness can be between 70 and 90
  const lightness = Math.floor(Math.random() * 20) + 70;
  // Hue can be totally random - from 0 to 360
  const hue = Math.floor(Math.random() * 360);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const App = () => {
  const [data, setData] = useState(null);
  let [contributors, setContributors] = useState();
  let contrib = useRef();
  const [bgcolor, setbgColor] = useState(getRandomHSL());
  const infoRef = useRef(null);

  const load_quote = () => {
    setData(null);
    setTimeout(() => {
      setData(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 2000);
  };

  const change_color = () => {
    setbgColor(getRandomHSL());
  };

  const setHtmlBackground = (bgcolor) => {
    const root = document.querySelector('html');
    root.style.backgroundColor = `${bgcolor}`;
    root.style.transition = 'all .51s ease';
  };
  setHtmlBackground(bgcolor);

  const fetch_contributors = async () => {
    fetch(
      'https://api.github.com/repos/kamiri-charles/movie-quote-generator/contributors'
    )
      .then((res) => res.json())
      .then((data) => setContributors(data));
  };

  let contrib_view = () => {
    if (contrib.current.classList.contains('hidden')) {
      contrib.current.classList.remove('hidden');
    } else {
      contrib.current.classList.add('hidden');
    }
  };

  /* Copy quote */
  const copy_quote = () => {
    navigator.clipboard.writeText(data.quote + ' - ' + data.movie);

    let toast = document.getElementById('toast');
    toast.className = 'showToast';
    setTimeout(function () {
      toast.className = toast.className.replace('showToast', '');
    }, 3000);
  };

  useEffect(() => {
    load_quote();
    change_color();
    fetch_contributors();
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleClick = (event) => {
    if (contrib.current && !infoRef.current.contains(event.target)) {
      contrib.current.classList.add('hidden');
    }
  };

  return (
    <div className='App'>
      <a href='#main' className='hidden'>
        Skip to main content
      </a>
      <h1 className='title' tabIndex='0'>
        Random Movie Quote Generator
        <div className='info' onClick={contrib_view} ref={infoRef}>
          <FontAwesomeIcon icon={faCircleInfo} color='grey' />
        </div>
      </h1>

      <QuoteGenerator
        data={data}
        copy_quote={copy_quote}
        load_quote={load_quote}
        change_color={change_color}
      />

      <Contributors
        contributors={contributors}
        contrib={contrib}
        infoRef={infoRef}
      />
      {/* <div className="info" onClick={contrib_view} ref={infoRef}>
        <FontAwesomeIcon icon={faCircleInfo} color="white" />
      </div> */}
      <div id='toast'>Copied to clipboard!</div>
    </div>
  );
};
export default App;