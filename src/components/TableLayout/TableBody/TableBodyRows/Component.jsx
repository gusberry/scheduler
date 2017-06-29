import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RowDataElement from './RowDataElement';

const dateIsInRange = (date, start, end) =>
  new Date(start).toDateString() === new Date(date).toDateString() ||
  new Date(date).toDateString() === new Date(end).toDateString() ||
  (new Date(start) < new Date(date) && new Date(date) < new Date(end));

class TableLayout extends Component {
  state = {
    items: [
      {
        Start: '2017-06-27T12:20:00+03:00',
        End: '2017-06-28T01:20:00+03:00',
      },
      {
        Start: '2017-06-01T12:20:00+03:00',
        End: '2017-06-02T01:20:00+03:00',
      },
      {
        Start: '2017-06-04T12:20:00+03:00',
        End: '2017-06-07T01:20:00+03:00',
      },
      {
        Start: '2017-06-22T12:20:00+03:00',
        End: '2017-06-23T01:20:00+03:00',
      },
      {
        Start: '2017-06-14T12:20:00+03:00',
        End: '2017-06-15T01:20:00+03:00',
      },
    ],
    axeMapping: {},
  };

  componentWillMount() {
    this.updateAxeMapping();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.items !== nextState.items) {
      this.updateAxeMapping();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      position: { x, y },
      elementDimensions: { height, width },
      yAxe,
    } = nextProps;

    const dateIndex = Math.ceil(y / height * yAxe.length) - 1;
    const nextDate = yAxe[dateIndex];
    const nextTime = x / width * 24;
    if (this.state.isDragging && this.state.elemIndex !== undefined) {
      const elem = this.state.items[this.state.elemIndex];
      const timeDiff = nextDate - this.date;
      const hourDiff = Math.ceil((nextTime - this.time) * 60 * 60 * 1000);
      const oldStart = new Date(elem.Start);
      const oldEnd = new Date(elem.End);
      this.setState({
        items: [
          ...this.state.items.slice(0, this.state.elemIndex),
          {
            ...elem,
            Start: !this.state.time || this.state.time === 'start'
              ? new Date(+oldStart + timeDiff + hourDiff).toString()
              : elem.Start,
            End: !this.state.time || this.state.time === 'end'
              ? new Date(+oldEnd + timeDiff + hourDiff).toString()
              : elem.End,
            index: this.state.elemIndex,
          },
          ...this.state.items.slice(this.state.elemIndex + 1),
        ],
      });
    }
    this.date = nextDate;
    this.time = nextTime;
  }

  updateAxeMapping = () => {
    const updatedAxesMapping = {};
    this.props.yAxe.forEach(
      axe =>
        (updatedAxesMapping[axe] = this.state.items
          .map((item, i) => ({ ...item, index: i }))
          .filter(item => dateIsInRange(axe, item.Start, item.End))),
    );

    this.setState({
      axeMapping: updatedAxesMapping,
    });
  };

  onStartDragging = (elemIndex, time) =>
    this.setState({ isDragging: true, elemIndex, time });

  onEndDragging = () =>
    this.setState({
      isDragging: false,
      elemIndex: undefined,
      initialDate: null,
      time: null,
    });

  render() {
    return (
      <div
        className="flex-table-body-data"
        onMouseUp={this.onEndDragging}
        onMouseLeave={this.onEndDragging}
      >
        {this.props.yAxe.map((axeDate, i) =>
          <div key={axeDate} className="flex-table-body-data-row">
            {this.state.axeMapping[axeDate].map(item =>
              <RowDataElement
                key={item}
                start={item.Start}
                current={axeDate}
                end={item.End}
                itemIndex={item.index}
                onStartDragging={this.onStartDragging}
              />,
            )}
            {!this.state.axeMapping[axeDate].length && 'nothing'}
          </div>,
        )}
      </div>
    );
  }
}

TableLayout.propTypes = {
  yAxe: PropTypes.array.isRequired,
};

export default TableLayout;
