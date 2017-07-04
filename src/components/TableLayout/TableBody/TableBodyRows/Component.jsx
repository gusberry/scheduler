import React, { Component } from "react";
import PropTypes from "prop-types";

import RowDataElement from "./RowDataElement";
import { dateIsInRange } from "../../../../dateService";

const itemStub = [
  {
    start: new Date("2017-06-27T12:20:00+03:00"),
    end: new Date("2017-06-28T01:20:00+03:00")
  },
  {
    start: new Date("2017-06-01T12:20:00+03:00"),
    end: new Date("2017-06-02T01:20:00+03:00")
  },
  {
    start: new Date("2017-06-04T12:20:00+03:00"),
    end: new Date("2017-06-07T01:20:00+03:00")
  },
  {
    start: new Date("2017-06-22T12:20:00+03:00"),
    end: new Date("2017-06-23T01:20:00+03:00")
  },
  {
    start: new Date("2017-06-14T12:20:00+03:00"),
    end: new Date("2017-06-15T01:20:00+03:00")
  }
];

class TableLayout extends Component {
  state = {
    items: itemStub,
    axeMapping: {}
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
    const timeDiff = this.calculateTimeDiffWithCursorMove(nextProps);
    const shouldUpdateItem =
      this.state.isDragging && this.state.itemIndex !== undefined && timeDiff;

    if (shouldUpdateItem) {
      const elem = this.state.items[this.state.itemIndex];

      const oldStart = elem.start;
      const oldEnd = elem.end;

      let nextStart =
        !this.state.dragDatePart || this.state.dragDatePart === "start"
          ? new Date(+oldStart + timeDiff)
          : elem.start;

      let nextEnd =
        !this.state.dragDatePart || this.state.dragDatePart === "end"
          ? new Date(+oldEnd + timeDiff)
          : elem.end;

      if (nextStart > nextEnd) {
        const tempDate = nextStart;
        nextStart = nextEnd;
        nextEnd = tempDate;

        this.state.dragDatePart =
          this.state.dragDatePart === "end" ? "start" : "end";
      }

      this.setState({
        items: [
          ...this.state.items.slice(0, this.state.itemIndex),
          {
            ...elem,
            start: nextStart,
            end: nextEnd,
            index: this.state.itemIndex
          },
          ...this.state.items.slice(this.state.itemIndex + 1)
        ]
      });
    }
  }

  calculateTimeDiffWithCursorMove = nextProps => {
    const {
      position: { x, y },
      elementDimensions: { height, width },
      yAxe
    } = nextProps;

    const totalDaysCount = yAxe.length;
    const dayIndex = Math.ceil(y / height * totalDaysCount) - 1;

    const nextDate = yAxe[dayIndex];
    const nextTime = x / width * 24;
    const daysDiff = nextDate - this.previousDay;

    const hoursDiff = Math.ceil(
      (nextTime - this.previousTime) * 60 * 60 * 1000
    );

    this.previousDay = nextDate;
    this.previousTime = nextTime;

    return daysDiff + hoursDiff;
  };

  updateAxeMapping = () => {
    const updatedAxesMapping = {};

    this.props.yAxe.forEach(
      axe =>
        (updatedAxesMapping[axe] = this.state.items
          .map((item, i) => ({
            ...item,
            start: new Date(item.start),
            end: new Date(item.end),
            index: i
          }))
          .filter(item => dateIsInRange(axe, item.start, item.end)))
    );

    this.setState({
      axeMapping: updatedAxesMapping
    });
  };

  onStartDragging = (itemIndex, dragDatePart) =>
    this.setState({ isDragging: true, itemIndex, dragDatePart });

  onEndDragging = () =>
    this.setState({
      isDragging: false,
      itemIndex: undefined,
      dragDatePart: null
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
                key={item.start}
                start={item.start}
                current={new Date(axeDate)}
                end={item.end}
                itemIndex={item.index}
                onStartDragging={this.onStartDragging}
              />
            )}
            {!this.state.axeMapping[axeDate].length && "nothing"}
          </div>
        )}
      </div>
    );
  }
}

TableLayout.propTypes = {
  yAxe: PropTypes.array.isRequired
};

export default TableLayout;
