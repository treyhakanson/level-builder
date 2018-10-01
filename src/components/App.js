import React, { Component } from "react";
import "../styles/App.css";

import emptyImg from "../assets/empty-img.png";
import marioImg from "../assets/mario-img.png";
import usedImg from "../assets/used-img.png";
import brickImg from "../assets/brick-img.png";
import questionImg from "../assets/question-img.png";
import floorImg from "../assets/floor-img.png";
import stairImg from "../assets/stair-img.png";
import redKoopaImg from "../assets/red-koopa-img.png";
import greenKoopaImg from "../assets/green-koopa-img.png";
import goombaImg from "../assets/goomba-img.png";

const SOURCES = [
  emptyImg,
  marioImg,
  usedImg,
  brickImg,
  questionImg,
  floorImg,
  stairImg,
  redKoopaImg,
  greenKoopaImg,
  goombaImg
];

class Cell extends Component {
  static defaultProps = {
    typeIndex: 0
  };

  render() {
    return (
      <div className="LevelBuilder__Cell" onClick={this.props.onClick}>
        <img src={SOURCES[this.props.typeIndex]} className="Cell__Image" />
      </div>
    );
  }
}

class App extends Component {
  state = {
    width: 0,
    height: 0,
    activeTypeIndex: 0,
    grid: []
  };

  _setWidth = ({ target: { value } }) => {
    this.setState({ width: value });
  };

  _setHeight = ({ target: { value } }) => {
    this.setState({ height: value });
  };

  _onSubmit = () => {
    this.setState({ grid: this._buildLevelGrid() });
  };

  _buildLevelGrid(copy = false) {
    const { width, height } = this.state;
    let grid = [];

    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        row.push(copy ? { ...this.state.grid[i][j] } : {});
      }
      grid.push(row);
    }

    return grid;
  }

  _onClickCell = (i, j) => {
    let gridCopy = this._buildLevelGrid(true);
    gridCopy[i][j].typeIndex = this.state.activeTypeIndex;
    this.setState({ grid: gridCopy });
  };

  _changeType = i => {
    this.setState({ activeTypeIndex: i });
  };

  _downloadLevel = () => {
    const csvString = this.state.grid
      .map(row => row.map(cell => cell.typeIndex || 0).join(","))
      .join("\n");
    const blob = new Blob([csvString]);
    let a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
    a.download = "level.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  render() {
    return (
      <div className="App">
        <fieldset className="Dimensions">
          <span className="Dimensions__Text">Dimensions:&nbsp;</span>
          <input
            type="number"
            className="Dimensions__Width"
            name="width"
            onChange={this._setWidth}
          />
          <span className="Dimensions__Text">&nbsp;x&nbsp;</span>
          <input
            type="number"
            className="Dimensions__Height"
            name="height"
            onChange={this._setHeight}
          />
          <br />
          <button
            type="button"
            className="Dimensions__Submit"
            onClick={this._onSubmit}
          >
            Submit
          </button>
        </fieldset>
        <div className="LevelBuilder">
          {this.state.grid.map((row, i) => (
            <div
              key={i}
              className="LevelBuilder__Row"
              style={{
                width: row.length * 40
              }}
            >
              {row.map((cellProps, j) => (
                <Cell
                  key={`${i}.${j}`}
                  onClick={() => this._onClickCell(i, j)}
                  {...cellProps}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="TypeSelection">
          {SOURCES.map((source, i) => {
            let classNames = ["TypeSelection__Img"];
            this.state.activeTypeIndex === i &&
              classNames.push("TypeSelection__Img--active");
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
        <button
          type="button"
          onClick={this._downloadLevel}
          disabled={!this.state.grid.length}
        >
          Download Level
        </button>
      </div>
    );
  }
}

export default App;
