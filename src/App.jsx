import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRefresh } from "@fortawesome/free-solid-svg-icons"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faCopy } from "@fortawesome/free-regular-svg-icons"
import Loader from "react-loaders"
import quotes from "./quotes.json"
import "./App.scss";

const App = () => {
	const [data, setData] = useState(null);
	
	const load_quote = () => {
		setData(null);
		setTimeout(() => {
			setData(quotes[Math.floor(Math.random() * quotes.length)])
		}, 3000)

	};
	
	/* Copy quote */
	const copy_quote = () => {
		navigator.clipboard.writeText(data.quote + " - " + data.origin);
		
		alert("Copied to clipboard!");
	};
	
	useEffect(() => {
		load_quote();
	}, []);


	return (
		<div className="App">
			<a href="#main" className="hidden">Skip to main content</a>
			<h1 className='title remove-scrollbar'>Random Movie Quote Generator</h1>

			<div className='wrapper'>

				<div className='quote-wrapper remove-scrollbar'>
					{!data ? <Loader type="pacman" /> : (
						<>
							<div className='quote'>{data.quote}</div>
							<div className='origin remove-scrollbar'>{data.movie + " ~ " + data.year}</div>
						</>
					)}
				</div>

				<div className='buttons'>
					<button onClick={load_quote} disabled={!data} aria-label="Load A New Quote">
						<FontAwesomeIcon icon={faRefresh} color='white' />
					</button>

					<a href='https://twitter.com/intent/tweet' target='_blank' rel='noreferrer' aria-label="Link To Share Current Quote On Twitter" alt="">
						<FontAwesomeIcon icon={faTwitter} color='white' />
					</a>

					<button onClick={copy_quote} aria-label="Copy Current Quote">
						<FontAwesomeIcon icon={faCopy} color='white' />
					</button>
				</div>

			</div>
			<div className="contributors remove-scrollbar">Contributors:</div>
			<ul>
				<a href="https://github.com/kamiri-charles" role="listitem">
					<img alt="contributor-img" href="https://github.com/kamiri-charles" src="https://avatars.githubusercontent.com/u/78848071?v=4" className="contributor-avatar" />
				</a>

				<a href="https://github.com/sgtwilko" role="listitem">
					<img alt="contributor-img" href="https://github.com/sgtwilko" src="https://avatars.githubusercontent.com/u/658876?v=4" className="contributor-avatar" />
				</a>

				<a href="https://github.com/aryan1306" role="listitem">
					<img alt="contributor-img" href="https://github.com/aryan1306" src="https://avatars.githubusercontent.com/u/60398102?v=4" className="contributor-avatar" />
				</a>

				<a href="https://github.com/JosielMatos" role="listitem">
					<img alt="contributor-img" href="https://github.com/JosielMatos" src="https://avatars.githubusercontent.com/u/66519559?v=4" className="contributor-avatar" />
				</a>

				<a href="https://github.com/DimensionalDragon" role="listitem">
					<img alt="contributor-img" href="https://github.com/DimensionalDragon" src="https://avatars.githubusercontent.com/u/79691052?v=4" className="contributor-avatar" />
				</a>

				<a href="https://github.com/mishhuang" role="listitem">
					<img alt="contributor-img" href="https://github.com/mishhuang" src="https://avatars.githubusercontent.com/u/111394557?v=4" className="contributor-avatar" />
				</a>

				<a href="https://github.com/ryanpjhickey" role="listitem">
					<img alt="contributor-img" href="https://github.com/ryanpjhickey" src="https://avatars.githubusercontent.com/u/108383347?v=4" className="contributor-avatar" />
				</a>
			</ul>
		</div>
		);
	};
	
	export default App;