import React, { Component } from "react";
import PropTypes from "prop-types";

import SavedLevel from "./SavedLevel";

export default class SavedLevels extends Component {
  static propTypes = {
    savedLevels: PropTypes.array.isRequired,
    onSelectLevel: PropTypes.func.isRequired
  };

  render() {
    const { savedLevels, onSelectLevel } = this.props;

    return (
      <div className="Well">
        <h3>Saved Levels</h3>
        {!savedLevels.length && <p className="Placeholder">No saved levels.</p>}
        {savedLevels.map((savedLevel, i) => (
          <div key={i} onClick={() => onSelectLevel(savedLevel)}>
            <SavedLevel savedLevel={savedLevel} />
          </div>
        ))}
      </div>
    );
  }
}
