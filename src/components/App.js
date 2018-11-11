import React, { Component } from "react";

import { cellToXML } from "../utils/xml";
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
import hiddenImg from "../assets/hidden-img.png";
import flagImg from "../assets/flag-img.png";
import redMushroomImg from "../assets/red-mushroom-img.png";
import greenMushroomImg from "../assets/green-mushroom-img.png";
import starmanImg from "../assets/starman-img.png";
import fireImg from "../assets/fire-img.png";
import coinImg from "../assets/coin-img.png";

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
  goombaImg,
  hiddenImg,
  flagImg,
  // Item indexes (start at 12)
  greenMushroomImg,
  redMushroomImg,
  coinImg,
  fireImg,
  starmanImg
];

const LEVEL_EXAMPLE = `
<?xml version="1.0" encoding="utf-8"?>
<LevelAsset>
  <Height>int</Height>
  <Width>int</Width>
  <Entities>
    <Item>
      <EntityType>int</EntityType>
      <Row>int</Row>
      <Column>int</Column>
      <OffsetX>int</OffsetX>
      <OffsetY>int</OffsetY>
      <EntityItems>
        <Item>
          <ItemType>int</ItemType>
        </Item>
      </EntityItems>
    </Item>
  </Entities>
</LevelAsset>
`;

class Cell extends Component {
  static defaultProps = {
    type: 0,
    items: []
  };

  render() {
    let extraProps = {};
    if (this.props.items.length) {
      extraProps.itemcount = this.props.items.length;
    }

    return (
      <div
        className="LevelBuilder__Cell"
        onClick={this.props.onClick}
        {...extraProps}
      >
        <img src={SOURCES[this.props.type]} className="Cell__Image" />
      </div>
    );
  }
}

class App extends Component {
  state = {
    width: 0,
    height: 0,
    activeType: 0,
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
    if (this.state.activeType > 11) {
      gridCopy[i][j].items = gridCopy[i][j].items || [];
      gridCopy[i][j].items.push(this.state.activeType - 12);
      gridCopy[i][j].collidable = true;
    } else {
      gridCopy[i][j].type = this.state.activeType;
      gridCopy[i][j].collidable = true;
    }
    this.setState({ grid: gridCopy });
  };

  _changeType = i => {
    this.setState({ activeType: i });
  };

  _downloadLevel = () => {
    let cells = [];
    this.state.grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell.type === undefined) {
          return;
        }
        let cellCopy = { ...cell };
        cellCopy.row = i;
        cellCopy.column = j;
        cells.push(cellToXML(cellCopy));
      });
    });
    const xml =
      '<?xml version="1.0" encoding="utf-8"?>' +
      "<LevelAsset>" +
      `<Height>${this.state.grid.length * 16}</Height>` +
      `<Width>${this.state.grid[0].length * 16}</Width>` +
      `<Entities>${cells.join("\n")}</Entities>` +
      "</LevelAsset>";
    const blob = new Blob([xml]);
    let a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
    a.download = "LevelDefinition.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  _renderSources = (start, stop) => {
    let typeSelectionClasses = ["TypeSelection"];
    (!this.state.height || !this.state.width || !this.state.grid.length) &&
      typeSelectionClasses.push("TypeSelection--inactive");

    return (
      <div className={typeSelectionClasses.join(" ")}>
        {SOURCES.slice(start, stop).map((source, i) => {
          i += start;
          let classNames = ["TypeSelection__Img"];
          this.state.activeType === i &&
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
    );
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
        {this._renderSources(0, 12)}
        {this._renderSources(12, SOURCES.length)}
        <button
          className="DownloadLevel"
          type="button"
          onClick={this._downloadLevel}
          disabled={!this.state.grid.length}
        >
          Download Level
        </button>
        <div className="SchemaInfo">
          <p>The XML schema for the level is as follows:</p>
          <pre>
            <code>{LEVEL_EXAMPLE}</code>
          </pre>
        </div>
      </div>
    );
  }
}

export default App;
