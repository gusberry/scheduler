import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableHead extends Component {
  render() {
    return (
      <div className="flex-table-head">
        <div className="flex-table-head-item">
          {this.props.year}
        </div>
        {this.props.xAxe.map(text =>
          <div key={text} className="flex-table-head-item">
            {text}
          </div>,
        )}
      </div>
    );
  }
}

TableHead.propTypes = {
  xAxe: PropTypes.array.isRequired,
};

export default TableHead;
