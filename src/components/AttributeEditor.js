import React, { Component } from "react";
import PropTypes from "prop-types";

import Element from "./Element";

export default class AttributeEditor extends Component {
  static propsTypes = {
    grid: PropTypes.array.isRequired,
    onUpdateElement: PropTypes.func.isRequired
  };

  render() {
    const { grid, onUpdateElement } = this.props;
    let elements = [];
    let content;

    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (Object.keys(cell).length) {
          elements.push({ i, j, cell });
        }
      });
    });

    if (elements.length) {
      content = elements.map(({ i, j, cell }) => (
        <Element
          key={`${i}${j}`}
          row={i}
          column={j}
          element={cell}
          onUpdateElement={onUpdateElement}
        />
      ));
    } else {
      content = <p className="Placeholder">No elements placed.</p>;
    }

    return (
      <div className="AttributeEditor">
        <h3>Attribute Editor</h3>
        <div className="AttributeEditor__Elements">{content}</div>
      </div>
    );
  }
}
