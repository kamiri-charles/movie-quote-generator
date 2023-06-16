import React from 'react';
import Loader from 'react-loaders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

const QuoteGenerator = ({ data, copy_quote, load_quote, change_color }) => {
  return (
    <div className='wrapper'>
      <div className='quote-wrapper'>
        {!data ? (
          <Loader type='pacman' />
        ) : (
          <>
            <div className='quote'>{data.quote}</div>
            <div className='origin'>{data.movie + ' ~ ' + data.year}</div>
          </>
        )}
      </div>

      <div className='buttons'>
        <button
          onClick={() => {
            load_quote();
            change_color();
          }}
          aria-label='Load A New Quote'
          disabled={!data}>
          <FontAwesomeIcon icon={faRefresh} color='white' />
        </button>
        <button
          onClick={() => {
            window.open(
              'https://twitter.com/intent/tweet?text=' +
                data.quote +
                ' - ' +
                data.movie
            );
          }}
          aria-label='Link To Share Current Quote On Twitter'
          disabled={!data}>
          <FontAwesomeIcon icon={faTwitter} color='white' />
        </button>
        <button
          onClick={copy_quote}
          aria-label='Copy Current Quote'
          disabled={!data}>
          <FontAwesomeIcon icon={faCopy} color='white' />
        </button>
      </div>
    </div>
  );
};

export default QuoteGenerator;
