import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: new Date()
    });
  }

  formatTime() {
    const { format = '24', timezone = 'local' } = this.props;
    let time = this.state.time;

    // Обработка часового пояса
    if (timezone !== 'local') {
      const offset = this.parseTimezone(timezone);
      const utc = time.getTime() + (time.getTimezoneOffset() * 60000);
      time = new Date(utc + (3600000 * offset));
    }

    let hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    if (format === '12') {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 часов становится 12
      return `${hours}:${minutes}:${seconds} ${ampm}`;
    } else {
      return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
    }
  }

  parseTimezone(timezone) {
    const match = timezone.match(/^([+-])(\d{1,2}):(\d{2})$/);
    if (!match) return 0;
    
    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3], 10);
    
    return sign * (hours + minutes / 60);
  }

  render() {
    return (
      <div className="clock">
        <h2>Текущее время: {this.formatTime()}</h2>
        <p>Формат: {this.props.format || '24'}-часовой</p>
        <p>Часовой пояс: {this.props.timezone === 'local' ? 'локальный' : this.props.timezone}</p>
      </div>
    );
  }
}

export default Clock;