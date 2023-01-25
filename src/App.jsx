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
			<div className="contributers">Contributers:</div>
			<ul>
				<a href="https://github.com/kamiri-charles"> <img href="https://github.com/kamiri-charles" src="https://avatars.githubusercontent.com/u/78848071?v=4" className="contributerAvatars"></img></a>
				<a href="https://github.com/sgtwilko"> <img href="https://github.com/sgtwilko" src="https://avatars.githubusercontent.com/u/658876?v=4" className="contributerAvatars"></img></a>
				<a href="https://github.com/aryan1306"> <img href="https://github.com/aryan1306" src="https://avatars.githubusercontent.com/u/60398102?v=4" className="contributerAvatars"></img></a>
				<a href="https://github.com/JosielMatos"> <img href="https://github.com/JosielMatos" src="https://avatars.githubusercontent.com/u/66519559?v=4" className="contributerAvatars"></img></a>
				<a href="https://github.com/DimensionalDragon"> <img href="https://github.com/DimensionalDragon" src="https://avatars.githubusercontent.com/u/79691052?v=4" className="contributerAvatars"></img></a>
				<a href="https://github.com/mishhuang"> <img href="https://github.com/mishhuang" src="https://avatars.githubusercontent.com/u/111394557?v=4" className="contributerAvatars"></img></a>
			</ul>
		</div>
		);
	};
	
	export default App;