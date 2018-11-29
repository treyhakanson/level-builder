import React, { Component } from "react";
import "highlight.js/styles/github.css";

import { ITEM_INDEX, WARP_PIPE_INDEX } from "../constants";
import { gridToXML } from "../utils/xml";
import LevelBuilder from "./LevelBuilder";
import SchemaInfo from "./SchemaInfo";
import Dimensions from "./Dimensions";
import SavedLevels from "./SavedLevels";
import Help from "./Help";

import "../styles/App.css";

class App extends Component {
  state = {
    width: 0,
    height: 0,
    grid: [],
    savedLevels: JSON.parse(localStorage.getItem("savedLevels") || "[]")
  };

  _buildLevel = () => {
    const { height, width } = this.state;
    this.setState({ grid: this._buildLevelGrid() });
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
    let newCell = {};

    if (activeType >= ITEM_INDEX) {
      newCell.items = gridCopy[i][j].items || [];
      newCell.items.push(activeType - ITEM_INDEX);
      newCell.OffsetX = 0;
      newCell.OffsetY = 0;
    } else if (activeType !== 0) {
      newCell.type = activeType;
      newCell.OffsetX = 0;
      newCell.OffsetY = 0;
    }

    if (activeType === WARP_PIPE_INDEX) {
      newCell.Pipe = {
        WarpId: 1,
        WarpDest: ""
      };
    }

    gridCopy[i][j] = newCell;
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
    const [key1, key2] = key.split(".");
    if (key2) {
      gridCopy[i][j][key1][key2] = value;
    } else {
      gridCopy[i][j][key1] = value;
    }
    this.setState({ grid: gridCopy });
  };

  _onSaveLevel = () => {
    const { savedLevels, grid } = this.state;
    const height = grid.length;
    const width = grid[0].length;
    let overview = {};

    for (let i = 1; i < ITEM_INDEX; i++) {
      overview[i] = 0;
    }

    grid.forEach(row => {
      row.forEach(({ type }) => {
        if (!type) {
          return;
        }
        overview[type] += 1;
      });
    });

    this.setState(
      { savedLevels: [...savedLevels, { height, width, overview, grid }] },
      () => {
        localStorage.setItem(
          "savedLevels",
          JSON.stringify(this.state.savedLevels)
        );
      }
    );
  };

  _onSelectLevel = savedLevel => {
    const { height, width, grid } = savedLevel;
    this.setState({ height, width, grid });
  };

  _setHeight = height => {
    this.setState({ height });
  };

  _setWidth = width => {
    this.setState({ width });
  };

  render() {
    const { height, width, grid, savedLevels } = this.state;

    return (
      <div className="Background">
        <div className="App">
          <h1 className="Header">Mario Level Builder</h1>
          <Dimensions
            buildLevel={this._buildLevel}
            setWidth={this._setWidth}
            setHeight={this._setHeight}
            height={height}
            width={width}
          />
          <LevelBuilder
            height={height}
            width={width}
            grid={grid}
            onClickCell={this._onClickCell}
            onSubmit={this._downloadLevel}
            onUpdateElement={this._onUpdateElement}
            onSaveLevel={this._onSaveLevel}
          />
          <SavedLevels
            savedLevels={savedLevels}
            onSelectLevel={this._onSelectLevel}
          />
          <Help />
          <SchemaInfo />
        </div>
      </div>
    );
  }
}

export default App;
