import React from "react";
import Loader from "react-loaders";

const QuoteGenerator = ({ props }) => {
  const { data } = props;
  return (
    <div className="wrapper">
      <div className="quote-wrapper">
        {!data ? (
          <Loader type="pacman"  />
        ) : (
          <>
            <div className="quote"><q>{data.quote}</q></div>
            <div className="origin">{data.movie + " ~ " + data.year}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuoteGenerator;