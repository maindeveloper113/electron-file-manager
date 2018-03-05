
import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Col, Button, Glyphicon } from 'react-bootstrap';

import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import Calendar from './Calendar';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

class DateSelect extends Component {
	constructor(props) {
    super(props);
    this.state={
      openMenu: false,
      openCalendar: false,
      selectedDate: "Any time",
    };
  }
  
  handleCustomRange(event) {
    event.preventDefault();
    this.setState({
      openCalendar: true,
      anchorEl1: event.currentTarget,
    })
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({
      openMenu: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      openMenu: false,
    });
  };

  handleItemClick(selectedDate) {
    this.setState({
      selectedDate,
      openMenu: false,
      openCalendar: false
    })
    this.props.handleSelectDate(selectedDate);
  }

  handleCloseCalendar() {
    this.setState({
      openCalendar: false,
    });
  }

  setCustomRange(startDate, endDate) {
    const selectedDate = this.formatDate(startDate) + ' - '+ this.formatDate(endDate);
    this.setState({
      openMenu: false,
      openCalendar: false,
      selectedDate,
    });
    this.props.handleSelectDate(startDate, endDate);
  }
  
  formatDate(value) {
    if (!value) return '';
    const year = value.getYear() + 1900;
    return value.getMonth()+1 + "/" + value.getDate() + "/" + year;
  }

	render() {
    const today = new Date();
    const lastWeek = new Date(1900, 1, 1);
		return (
			<div style={this.props.style}>
        <ControlLabel style={{fontWeight: '400'}}>{this.props.title}</ControlLabel>
        <FormControl type="text"  onClick={this.handleClick} value={this.state.selectedDate} onChange={() => {}}/>
        <Popover
          open={this.state.openMenu}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
          animation={PopoverAnimationVertical}
        >
          <Menu style={this.props.style}>
            <MenuItem primaryText="Any time" onClick={this.handleItemClick.bind(this, 'Any time')}/>
            <MenuItem primaryText="Past hour" onClick={this.handleItemClick.bind(this, 'Past hour')}/>
            <MenuItem primaryText="Past 24 hours" onClick={this.handleItemClick.bind(this, 'Past 24 hours')}/>
            <MenuItem primaryText="Past week" onClick={this.handleItemClick.bind(this, 'Past week')}/>
            <MenuItem primaryText="Past month" onClick={this.handleItemClick.bind(this, 'Past month')}/>
            <MenuItem primaryText="Past year" onClick={this.handleItemClick.bind(this, 'Past year')}/>
            <Divider />
            <MenuItem primaryText="Custom Range" onClick={this.handleCustomRange.bind(this)}/>
          </Menu>
        </Popover>
        {
          this.state.openCalendar &&
          <Calendar
            open={this.state.openCalendar}
            handleRequestClose={this.handleCloseCalendar.bind(this)}
            setCustomRange={this.setCustomRange.bind(this)}
          />
        }
			</div>
		);
	}
}

export default DateSelect;
