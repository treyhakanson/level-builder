import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Dimensions extends Component {
  static propTypes = {
    buildLevel: PropTypes.func.isRequired,
    setHeight: PropTypes.func.isRequired,
    setWidth: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  };

  _setWidth = ({ target: { value } }) => {
    const { setWidth } = this.props;
    setWidth(value);
  };

  _setHeight = ({ target: { value } }) => {
    const { setHeight } = this.props;
    setHeight(value);
  };

  _onSubmit = () => {
    const { buildLevel } = this.props;
    buildLevel();
  };

  render() {
    const { height, width } = this.props;

    return (
      <fieldset className="Well">
        <h3 className="Dimensions__Text">Dimensions</h3>
        <div className="Dimensions__Fields">
          <input
            type="number"
            className="Inpt Dimensions__Width"
            name="width"
            onChange={this._setWidth}
            value={width}
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
            value={height}
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
