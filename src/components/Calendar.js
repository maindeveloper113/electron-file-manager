
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

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

class Calendar extends Component {
	constructor(props) {
    super(props);
    this.state={
      selectedField: 'start',
      startDate: null,
      endDate: null,
    };
  }

  handleSelectDate(date) {
    if (this.state.selectedField === 'start') {
      this.setState({
        startDate: date,
      });
    }
    else {
      date.setHours(23, 59, 59);
      this.setState({
        endDate: date,
      });
    }
  }

  formatDate(value) {
    if (!value) return '';
    const year = value.getYear() + 1900;
    return value.getMonth()+1 + "/" + value.getDate() + "/" + year;
  }

  handleClick() {
    this.props.setCustomRange(this.state.startDate, this.state.endDate);
  }
 
	render() {
    const { startDate, endDate, selectedField } = this.state; 
    const selectedDate = this.state.selectedField === 'start' ? this.state.startDate : this.state.endDate;
    const disabled = startDate && endDate && startDate < endDate ? false : true;
    const startFiledStyle = selectedField === 'start' ? {border: '1px solid rgb(95, 171, 221)'} : {};
    const endFiledStyle = selectedField === 'end' ? {border: '1px solid rgb(95, 171, 221)'} : {};
		return (
      <Dialog
        open={this.props.open}
        modal={true}
        onRequestClose={this.props.handleRequestClose}
        style={{width: 800, height: 480, textAlign: 'center', zIndex: '3000'}}
      >
        <div style={{marginTop: 20}}>
          <span style={{fontSize: 20}}>Customised date range</span>
          <span 
            className="glyphicon glyphicon-remove" 
            style={{position: 'absolute', top: '20px', right: '20px'}}
            onClick={this.props.handleRequestClose}
          />
        </div>
        <div className="row" style={{marginTop: 25}}>
          <div className="col-md-5" style={{marginLeft: 10}}>
            <Form horizontal>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  <span style={{fontWeight: 400}}>From</span>
                </Col>
                <Col sm={10}>
                  <FormControl style={startFiledStyle} type="text" value={this.formatDate(startDate)} onClick={() => {this.setState({selectedField: 'start'})}}/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  <span style={{fontWeight: 400}}>To</span>
                </Col>
                <Col sm={10}>
                  <FormControl style={endFiledStyle} type="text" value={this.formatDate(endDate)} onClick={() => {this.setState({selectedField: 'end'})}}/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button disabled={disabled} onClick={this.handleClick.bind(this)}>Go</Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
          <div className="col-md-6">
            <InfiniteCalendar
              width={300}
              height={250}
              selected={selectedDate}
              disabledDays={[]}
              minDate={new Date(1900, 1, 1)}
              onSelect={this.handleSelectDate.bind(this)}
            />
          </div>
        </div>
      </Dialog>
		);
	}
}

export default Calendar;
