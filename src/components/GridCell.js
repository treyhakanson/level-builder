import React, { Component } from "react";
import PropTypes from "prop-types";

import { SOURCES } from "../constants";

export default class Cell extends Component {
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
