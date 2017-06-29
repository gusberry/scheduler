import React, { Component } from 'react';
import TableLayout from '../TableLayout';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

class Layout extends Component {
  render() {
    return (
      <div style={{ margin: 40 }}>
        <TableLayout year={currentYear} month={currentMonth} />
      </div>
    );
  }
}

export default Layout;
