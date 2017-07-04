import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import CursorPosition from 'react-cursor-position';

import TableHead from './TableHead';
import TableBody from './TableBody';
import { getXAxe, getYAxe } from '../../axesService';

class TableLayout extends Component {
  constructor(props) {
    super();

    this.state = {
      yAxe: getYAxe(props.year, props.month),
      xAxe: getXAxe(),
    };
  }

  render() {
    return (
      <div className="flex-table">
        <TableHead xAxe={this.state.xAxe} year={this.props.year} />
        <CursorPosition>
          <TableBody yAxe={this.state.yAxe} />
        </CursorPosition>
      </div>
    );
  }
}

TableLayout.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
};

export default TableLayout;
