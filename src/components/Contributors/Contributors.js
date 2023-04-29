import React, { Fragment } from "react"
import Loader from "react-loaders"
import Contributor from "./Contributor"

const Contributors = ({ props }) => {
  let { contrib, contributors } = props;

  return (
    <div className="contributors hidden" ref={contrib}>
      <span className="contributor-title">Contributors</span>
      {!contributors ? (
        <Loader type="ball-pulse" />
      ) : (
        contributors.map((c, idx) => (
          <Fragment key={idx}>
            <Contributor data={c} />
          </Fragment>
        ))
      )}
    </div>
  );
};

export default Contributors;
