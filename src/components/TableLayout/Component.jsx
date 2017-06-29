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

  onMouseMove = e => {
    // const { nativeEvent, target } = e;
    // const nonRoundedMinutesBasedOnPosition =
    //   nativeEvent.offsetX / target.getBoundingClientRect().width * 60;
    // console.log('----------------------------');
    // console.log(nativeEvent);
    // console.log(nativeEvent.screenX);
    // console.log(nativeEvent.screenY);
    // const minutes = Math.ceil(nonRoundedMinutesBasedOnPosition / 5) * 5;
    // const dateBasedOnMousePosition = new Date(year, month, day, hour, minutes);
    // console.log(dateBasedOnMousePosition);
  };

  throttledOnMouseMove = throttle(this.onMouseMove, 1000, { leading: false });

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
