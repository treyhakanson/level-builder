import React, { Component } from "react";
import "highlight.js/styles/github.css";

import { gridToXML } from "../utils/xml";
import LevelBuilder from "./LevelBuilder";
import SchemaInfo from "./SchemaInfo";
import Dimensions from "./Dimensions";

import bg from "../assets/bg.png";
import "../styles/App.css";

class App extends Component {
  state = {
    width: 0,
    height: 0,
    grid: []
  };

  _buildLevel = (height, width) => {
    this.setState({ height, width }, () => {
      this.setState({ grid: this._buildLevelGrid() });
    });
  };

  _buildLevelGrid = (copy = false) => {
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
  };

  _onClickCell = (activeType, i, j) => {
    let gridCopy = this._buildLevelGrid(true);

    if (activeType > 11) {
      gridCopy[i][j].items = gridCopy[i][j].items || [];
      gridCopy[i][j].items.push(activeType - 12);
      gridCopy[i][j].collidable = true;
    } else {
      gridCopy[i][j].type = activeType;
      gridCopy[i][j].collidable = true;
    }

    this.setState({ grid: gridCopy });
  };

  _downloadLevel = () => {
    const { grid } = this.state;
    const xml = gridToXML(grid);
    const blob = new Blob([xml]);
    let a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
    a.download = "LevelDefinition.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  _onUpdateElement = (i, j, key, value) => {
    let gridCopy = this._buildLevelGrid(true);
    gridCopy[i][j][key] = value;
    this.setState({ grid: gridCopy });
  };

  render() {
    const { height, width, grid } = this.state;

    return (
      <div className="Background" style={{ backgroundImage: `url(${bg})` }}>
        <div className="App">
          <h1 className="Header">Mario Level Builder</h1>
          <Dimensions buildLevel={this._buildLevel} />
          <LevelBuilder
            height={height}
            width={width}
            grid={grid}
            onClickCell={this._onClickCell}
            onSubmit={this._downloadLevel}
            onUpdateElement={this._onUpdateElement}
          />
          <SchemaInfo />
        </div>
      </div>
    );
  }
}

export default App;
