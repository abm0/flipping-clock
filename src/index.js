class Digit {
  constructor({ selector, value = 0 }) {
    const digitEl = document.querySelector(selector);

    this.flipperEls = digitEl.querySelectorAll('.flipper');
    this.prevDigitEls = digitEl.querySelectorAll('.prev .digit');
    this.nextDigitEls = digitEl.querySelectorAll('.next .digit');

    this.value = value;
    this.prevValue = null;

    this.renderInitialValue();
  }

  setValue(nextValue) {
    this.prevValue = this.value;
    this.value = nextValue;

    if (this.value === this.prevValue) return;

    this.flip();
  }

  renderInitialValue() {
    const {
      prevDigitEls,
      nextDigitEls,
    } = this;

    [...prevDigitEls, ...nextDigitEls].forEach(el => (el.innerHTML = this.value));
  }

  flip() {
    this.nextDigitEls.forEach(el => el.innerHTML = this.value);
    this.flipperEls.forEach(el => el.classList.add('turned'));

    setTimeout(() => {
      this.prevDigitEls.forEach(el => (el.innerHTML = this.value)); 

      this.flipperEls.forEach((el) => {
        el.classList.remove('turned');
      });
    }, 500);
  }
}

class Clock {
  constructor(props) {
    const baseEl = document.querySelector("#clock");
    const currentTime = this.getCurrentTime();

    this.digits = [
      'hours-tens', 
      'hours-ones',
      'minutes-tens',
      'minutes-ones',
      'seconds-tens',
      'seconds-ones'
    ];

    this.buildDigits(currentTime);

    setInterval(this.flip.bind(this), 1000);
  }

  getCurrentTime() {
    const date = new Date();

    const time = {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      // ampm: "AM"
    };

    // if (time.hours >= 12) {
    //   time.ampm = "PM";
    //   time.hours -= 12;
    // }

    this.formatValues(time);

    return time;
  }

  formatValues(time) {
    Object.keys(time).forEach(key => {
      if (key === "ampm") return;

      let value = time[key];

      if (parseInt(value) < 10) {
        time[key] = "0" + value;
      }

      time[key] = time[key].toString();
    });
  }

  getDigitProps(digitName) {
    const type = digitName.split('-')[0];
    const position = digitName.split('-')[1];

    let positionIndex;

    switch (position) {
      case 'tens':
        positionIndex = 0;
        break;

      case 'ones':
        positionIndex = 1;
        break;
    }
    
    return { type, position, positionIndex };
  }

  buildDigits(time) {
    this.digits.forEach((digitName) => {
      const { type, position, positionIndex } = this.getDigitProps(digitName);

      const selector = `#${type} .${position}-digit`;
      
      this[digitName] = new Digit({
        selector,
        value: time[type][positionIndex]
      });
    });
  }

  flip() {
    const time = this.getCurrentTime();

    this.digits.forEach((digitName) => {
      const { type, positionIndex } = this.getDigitProps(digitName);

      this[digitName].setValue(time[type][positionIndex]);
    });

  }
}

new Clock();
