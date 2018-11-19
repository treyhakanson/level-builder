import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Dimensions extends Component {
  static propTypes = {
    buildLevel: PropTypes.func.isRequired
  };

  state = {
    height: 0,
    width: 0
  };

  _setWidth = ({ target: { value } }) => {
    this.setState({ width: value });
  };

  _setHeight = ({ target: { value } }) => {
    this.setState({ height: value });
  };

  _onSubmit = () => {
    const { buildLevel } = this.props;
    const { height, width } = this.state;
    buildLevel(height, width);
  };

  render() {
    return (
      <fieldset className="Well">
        <h3 className="Dimensions__Text">Dimensions:</h3>
        <div className="Dimensions__Fields">
          <input
            type="number"
            className="Inpt Dimensions__Width"
            name="width"
            onChange={this._setWidth}
          />
          <label htmlFor="width" className="Inpt__Label">
            Columns
          </label>
          <span className="Dimensions__Text--by">x</span>
          <input
            type="number"
            className="Inpt Dimensions__Height"
            name="height"
            onChange={this._setHeight}
          />
          <label htmlFor="width" className="Inpt__Label">
            Rows
          </label>
        </div>
        <button
          type="button"
          className="Btn Dimensions__Submit"
          onClick={this._onSubmit}
        >
          Submit
        </button>
      </fieldset>
    );
  }
}
