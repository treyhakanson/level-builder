import React, { Component } from "react";
import PropTypes from "prop-types";
import Highlight from "react-highlight";

import { LEVEL_EXAMPLE } from "../constants";

export default class SchemaInfo extends Component {
  render() {
    return (
      <div className="Well">
        <div className="SchemaInfo">
          <p>The XML schema for the level is as follows:</p>
          <Highlight className="xml">{LEVEL_EXAMPLE}</Highlight>
        </div>
      </div>
    );
  }
}
