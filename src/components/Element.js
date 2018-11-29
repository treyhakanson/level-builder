import React, { Component } from "react";
import PropTypes from "prop-types";

import { SOURCES, ITEM_INDEX } from "../constants";

export default class Element extends Component {
  static propTypes = {
    element: PropTypes.object.isRequired,
    onUpdateElement: PropTypes.func.isRequired,
    row: PropTypes.number.isRequired,
    column: PropTypes.number.isRequired
  };

  componentWillReceiveProps(nextProps) {
    let state = { ...this.state };
    for (let [key, value] of Object.entries(nextProps.element)) {
      state[key] = {
        value,
        type: Array.isArray(value) ? "array" : typeof value
      };
    }
    this.setState(state);
  }

  constructor(props) {
    super(props);
    this.state = {};
    for (let [key, value] of Object.entries(props.element)) {
      this.state[key] = {
        value,
        type: Array.isArray(value) ? "array" : typeof value
      };
    }
  }

  _updateField = (key, value) => {
    const { row, column, onUpdateElement } = this.props;
    const [key1, key2] = key.split(".");
    let obj = { ...this.state[key1] };
    if (key2) {
      obj.value[key2] = value;
    } else {
      obj.value = value;
    }
    this.setState({ ...this.state, [key1]: obj });
    onUpdateElement(row, column, key, value);
  };

  _removeElement = (key, value, i) => {
    const { row, column, onUpdateElement } = this.props;
    value = [...this.state[key].value];
    value.splice(i, 1);
    this.setState({ [key]: { ...this.state[key], value } });
    onUpdateElement(row, column, key, value);
  };

  _renderField = key => {
    console.log("Render field", key, this.state[key]);
    if (!this.state[key]) {
      return;
    }

    const { value, type } = this.state[key];
    const fieldProps = {
      className: "Inpt",
      name: key,
      value,
      onChange: ({ target: { value } }) => this._updateField(key, value)
    };
    let field;

    switch (type) {
      case "boolean":
        field = (
          <div className="Element__Field" key={key}>
            <label htmlFor={key}>{key}</label>
            <select {...fieldProps}>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
        );
        break;
      case "object":
        field = Object.entries(value).map(([innerKey, value]) => {
          const compoundKey = `${key}.${innerKey}`;
          let innerFieldProps = { ...fieldProps };
          innerFieldProps.name = compoundKey;
          innerFieldProps.value = value;
          innerFieldProps.onChange = ({ target: { value } }) =>
            this._updateField(compoundKey, value);
          return (
            <div className="Element__Field" key={compoundKey}>
              <label htmlFor={compoundKey}>{compoundKey}</label>
              <input {...innerFieldProps} type="text" />
            </div>
          );
        });
        break;
      case "array":
        field = (
          <div className="Element__Field" key={key}>
            <label htmlFor={key}>{key}</label>
            <div>
              {value.map((value, i) => (
                <div key={i} className="Well--small Element__Item">
                  <img
                    src={SOURCES[value + ITEM_INDEX]}
                    alt={`item[${value}]`}
                    className="Element__ItemImage"
                  />
                  <span
                    className="Element__Remove"
                    onClick={() => this._removeElement(key, value, i)}
                  >
                    x
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
        break;
      default:
        field = (
          <div className="Element__Field" key={key}>
            <label htmlFor={key}>{key}</label>
            <input {...fieldProps} type="text" />
          </div>
        );
        break;
    }

    return field;
  };

  render() {
    const { row, column, element } = this.props;
    return (
      <div className="Well--small AttributeEditor__Element">
        <div className="AttributeEditor__ElementCol AttributeEditor__ElementCol--image">
          <img src={SOURCES[element.type]} alt={`element[${element.type}]`} />
          <p>
            {row},&nbsp;{column}
          </p>
        </div>
        <div className="AttributeEditor__ElementCol">
          {Object.keys(element)
            .filter(key => key !== "type")
            .map(key => this._renderField(key))}
        </div>
      </div>
    );
  }
}
