import React, { Component } from "react";
import PropTypes from "prop-types";

import { SOURCES } from "../constants";

export default class SavedLevel extends Component {
  static propTypes = {
    savedLevel: PropTypes.object
  };

  render() {
    const { height, width, overview } = this.props.savedLevel;

    return (
      <div className="SavedLevel">
        <div>
          <p>
            <strong>Rows:</strong>&nbsp;{height}
          </p>
          <p>
            <strong>Columns:</strong>&nbsp;{width}
          </p>
        </div>
        {Object.entries(overview).map(([key, value], i) => (
          <div key={i} className="SavedLevel__Element">
            <img src={SOURCES[key]} alt={`sources[${key}]`} />
            <span>{value}</span>
          </div>
        ))}
      </div>
    );
  }
}
