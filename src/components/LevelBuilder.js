import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { SOURCES } from "../constants";
import GridCell from "./GridCell";

export default class LevelBuilder extends Component {
  static propTypes = {
    grid: PropTypes.array.isRequired,
    onClickCell: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  state = {
    activeType: 0
  };

  _changeType = i => {
    this.setState({ activeType: i });
  };

  _renderSources = (start, stop) => {
    const { height, width, grid } = this.props;
    const { activeType } = this.state;
    let typeSelectionClasses = ["TypeSelection"];

    if (!height || !width || !grid.length) {
      typeSelectionClasses.push("TypeSelection--inactive");
    }

    return (
      <div className={typeSelectionClasses.join(" ")}>
        {SOURCES.slice(start, stop).map((source, i) => {
          i += start;
          let classNames = ["TypeSelection__Img"];
          activeType === i && classNames.push("TypeSelection__Img--active");
          return (
            <img
              key={i}
              src={source}
              onClick={() => this._changeType(i)}
              className={classNames.join(" ")}
            />
          );
        })}
      </div>
    );
  };

  render() {
    const { grid, onClickCell, onSubmit } = this.props;
    const { activeType } = this.state;
    let content;

    if (grid.length) {
      content = (
        <Fragment>
          <div className="LevelBuilder__Content">
            {grid.map((row, i) => (
              <div
                key={i}
                className="LevelBuilder__Row"
                style={{
                  width: row.length * 40
                }}
              >
                {row.map((cellProps, j) => (
                  <GridCell
                    key={`${i}.${j}`}
                    onClick={() => onClickCell(activeType, i, j)}
                    {...cellProps}
                  />
                ))}
              </div>
            ))}
          </div>
          <p>Elements</p>
          {this._renderSources(0, 12)}
          <p>Items</p>
          {this._renderSources(12, SOURCES.length)}
          <button
            className="Btn DownloadLevel"
            type="button"
            onClick={onSubmit}
            disabled={!grid.length}
          >
            Download Level
          </button>
        </Fragment>
      );
    } else {
      content = <p className="Placeholder">Please select dimensions above.</p>;
    }

    return (
      <div className="Well LevelBuilder">
        <h3>Level Builder</h3>
        {content}
      </div>
    );
  }
}
