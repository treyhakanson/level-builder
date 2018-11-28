import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Help extends Component {
  render() {
    return (
      <div className="Well Help">
        <h3>Help</h3>
        <div>
          <div className="Help__Section">
            <h4>Warp Pipe</h4>
            <p>Note the following about the Warp Pipe element:</p>
            <ul className="Help__List">
              <li>
                The WarpDest attribute should correspond to the WarpId of the
                destination pipe
              </li>
              <li>
                If no items are provided on the warp pipe, it will contain a
                pirhana plant
              </li>
              <li>
                The Warp Pipe takes up approximately 4 in game squares. The
                placement of pipe represents the bottom left hand corner.
              </li>
            </ul>
          </div>
          <div className="Help__Section">
            <h4>Items</h4>
            <p>
              Items must be placed on an entity. An item can be placed on any
              entity (even Mario), but will only have an effect on the
              following:
            </p>
            <ul className="Help__List">
              <li>
                <strong>Brick Block:</strong> items revealed on bump
              </li>
              <li>
                <strong>Question Block:</strong> items revealed on bump
              </li>
              <li>
                <strong>Hidden Block:</strong> items revealed on bump
              </li>
              <li>
                <strong>Warp Pipe:</strong> items revealed on Mario approaching
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
