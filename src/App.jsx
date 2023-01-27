import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo, faRefresh } from "@fortawesome/free-solid-svg-icons"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faCopy } from "@fortawesome/free-regular-svg-icons"
import Loader from "react-loaders"
import quotes from "./quotes.json"
import "./App.scss";
import Contributor from "./Contributor"
import { useRef } from "react"

const App = () => {
	const [data, setData] = useState(null);
	let [contributors, setContributors] = useState();
	let contrib = useRef();
	
	
	const load_quote = () => {
		setData(null);
		setTimeout(() => {
			setData(quotes[Math.floor(Math.random() * quotes.length)])
		}, 3000)
		
	};
	
	
	const fetch_contributors = async () => {
		fetch('https://api.github.com/repos/kamiri-charles/movie-quote-generator/contributors')
		.then(res => res.json())
		.then(data => setContributors(data))
	}

	let contrib_view = () => {
		if (contrib.current.classList.contains('hidden')) {
			contrib.current.classList.remove('hidden')
		} else {contrib.current.classList.add('hidden')}
	}
	
	
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
		<div className="App">

			<div className='title'>Random Movie Quote Generator</div>

			<div className='wrapper'>

				<div className='quote-wrapper'>
					{!data ? <Loader type="pacman" /> : (
						<>
							<div className='quote'>{data.quote}</div>
							<div className='origin'>{data.movie + " ~ " + data.year}</div>
						</>
						) }
				</div>
					
					<div className='buttons'>
						<button onClick={load_quote} disabled={!data}>
							<FontAwesomeIcon icon={faRefresh} color='white' />
						</button>
					
						<a href='https://twitter.com/intent/tweet' target='_blank' rel='noreferrer'>
							<FontAwesomeIcon icon={faTwitter} color='white' />
						</a>
					
						<button onClick={copy_quote}>
							<FontAwesomeIcon icon={faCopy} color='white' />
						</button>
					</div>
				
				</div>

				<div className="info" onClick={contrib_view}>
					<FontAwesomeIcon icon={faCircleInfo} color='blue' />
				</div>

				<div className="contributors hidden" ref={contrib}>
					<span>Contributors</span>
					{!contributors ? <Loader type="ball-pulse" /> : contributors.map((c, idx) => (
						<Contributor data={c} key={idx}/>
					))}
				</div>
			</div>
			
			);
		};
		
		export default App;