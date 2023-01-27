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

	const requestContributors = () => {
		return Promise.resolve(fetch(`https://api.github.com/repos/kamiri-charles/movie-quote-generator/contributors`)
		.then(response => response.json())
		.then(function (data){
			let noDoubles = document.getElementsByClassName('noDoubles');
			if (noDoubles.length === 0) {
				for (let i = 0; i < data.length; i++) {
				let contUrl = data[i].html_url;
				let contAva = data[i].avatar_url;
				let clist = document.querySelector('.contList');
				let aEl = document.createElement('a');
				let imgEl = document.createElement('img');
				clist.appendChild(aEl);
				aEl.append(imgEl)
				aEl.href = contUrl;
				imgEl.href= contUrl;
				imgEl.src = contAva;
				imgEl.className = 'contributor-avatar noDoubles'
				}
			} else {}
	}));
}


	/* Copy quote */
	const copy_quote = () => {
		navigator.clipboard.writeText(data.quote + " - " + data.origin);
		
		alert("Copied to clipboard!");
	};
	
	useEffect(() => {
		load_quote();
		requestContributors();
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
			<div className="contributors">Contributors:</div>
			<ul className="contList">
			</ul>
		</div>
		);
	};
	
	export default App;