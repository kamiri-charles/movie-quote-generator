import React from "react";
import Loader from "react-loaders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

const QuoteGenerator = ({ props }) => {
  const { data, copy_quote, load_quote, change_color } = props;
  return (
    <div className="wrapper">
      <div className="quote-wrapper">
        {!data ? (
          <Loader type="pacman" />
        ) : (
          <>
            <div className="quote">{data.quote}</div>
            <div className="origin">{data.movie + " ~ " + data.year}</div>
          </>
        )}
      </div>

      <div className="buttons">
        <button
          onClick={() => {
            load_quote();
            change_color();
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
    </div>
  );
};

export default QuoteGenerator;