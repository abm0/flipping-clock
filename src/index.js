;(() => {
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

    next(value) {
      this.prevValue = this.value;
      this.value = value;

      if (this.value === this.prevValue) return;

      this.flip();
    }

    renderInitialValue() {
      [...this.prevDigitEls, ...this.nextDigitEls].forEach(el => (el.innerText = this.value));
    }

    flip() {
      this.nextDigitEls.forEach(el => el.innerText = this.value);
      this.flipperEls.forEach(el => el.classList.add('turned'));

      setTimeout(() => {
        this.prevDigitEls.forEach(el => (el.innerText = this.value)); 

        this.flipperEls.forEach((el) => {
          el.classList.remove('turned');
        });
      }, 500);
    }
  }

  class Clock {
    constructor() {
      this.digitNames = [
        'hours-tens', 
        'hours-ones',
        'minutes-tens',
        'minutes-ones',
        'seconds-tens',
        'seconds-ones'
      ];

      this.buildDigits(this.getCurrentTime());
    }

    getCurrentTime() {
      const date = new Date();

      const time = {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      };

      this.formatValues(time);

      return time;
    }

    getDigitProps(digitName) {
      const type = digitName.split('-')[0];
      const position = digitName.split('-')[1];
      const positionIndexHash = {
        'tens': 0,
        'ones': 1,
      };

      let positionIndex = positionIndexHash[position];

      return {
        type,
        position,
        positionIndex
      };
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

    buildDigits(time) {
      this.digitNames.forEach((digitName) => {
        const { type, position, positionIndex } = this.getDigitProps(digitName);

        const selector = `#${type} .${position}-digit`;
        
        this[digitName] = new Digit({
          selector,
          value: time[type][positionIndex]
        });
      });
    }

    tick() {
      const time = this.getCurrentTime();

      this.digitNames.forEach((digitName) => {
        const { type, positionIndex } = this.getDigitProps(digitName);

        this[digitName].next(time[type][positionIndex]);
      });
    }
  }

  const clock = new Clock();

  setInterval(() => {
    clock.tick();
  }, 1000);
})();
