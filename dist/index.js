'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Digit = function () {
  function Digit(_ref) {
    var selector = _ref.selector,
        _ref$value = _ref.value,
        value = _ref$value === undefined ? 0 : _ref$value;

    _classCallCheck(this, Digit);

    var digitEl = document.querySelector(selector);

    this.flipperEls = digitEl.querySelectorAll('.flipper');
    this.prevDigitEls = digitEl.querySelectorAll('.prev .digit');
    this.nextDigitEls = digitEl.querySelectorAll('.next .digit');

    this.value = value;
    this.prevValue = null;

    this.renderInitialValue();
  }

  _createClass(Digit, [{
    key: 'setValue',
    value: function setValue(nextValue) {
      this.prevValue = this.value;
      this.value = nextValue;

      if (this.value === this.prevValue) return;

      this.flip();
    }
  }, {
    key: 'renderInitialValue',
    value: function renderInitialValue() {
      var _this = this;

      var prevDigitEls = this.prevDigitEls,
          nextDigitEls = this.nextDigitEls;


      [].concat(_toConsumableArray(prevDigitEls), _toConsumableArray(nextDigitEls)).forEach(function (el) {
        return el.innerHTML = _this.value;
      });
    }
  }, {
    key: 'flip',
    value: function flip() {
      var _this2 = this;

      this.nextDigitEls.forEach(function (el) {
        return el.innerHTML = _this2.value;
      });
      this.flipperEls.forEach(function (el) {
        return el.classList.add('turned');
      });

      setTimeout(function () {
        _this2.prevDigitEls.forEach(function (el) {
          return el.innerHTML = _this2.value;
        });

        _this2.flipperEls.forEach(function (el) {
          el.classList.remove('turned');
        });
      }, 500);
    }
  }]);

  return Digit;
}();

var Clock = function () {
  function Clock(props) {
    _classCallCheck(this, Clock);

    var baseEl = document.querySelector("#clock");
    var currentTime = this.getCurrentTime();

    this.digits = ['hours-tens', 'hours-ones', 'minutes-tens', 'minutes-ones', 'seconds-tens', 'seconds-ones'];

    this.buildDigits(currentTime);
  }

  _createClass(Clock, [{
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      var date = new Date();

      var time = {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
        // ampm: "AM"
      };

      // if (time.hours >= 12) {
      //   time.ampm = "PM";
      //   time.hours -= 12;
      // }

      this.formatValues(time);

      return time;
    }
  }, {
    key: 'formatValues',
    value: function formatValues(time) {
      Object.keys(time).forEach(function (key) {
        if (key === "ampm") return;

        var value = time[key];

        if (parseInt(value) < 10) {
          time[key] = "0" + value;
        }

        time[key] = time[key].toString();
      });
    }
  }, {
    key: 'getDigitProps',
    value: function getDigitProps(digitName) {
      var type = digitName.split('-')[0];
      var position = digitName.split('-')[1];

      var positionIndex = void 0;

      switch (position) {
        case 'tens':
          positionIndex = 0;
          break;

        case 'ones':
          positionIndex = 1;
          break;
      }

      return { type: type, position: position, positionIndex: positionIndex };
    }
  }, {
    key: 'buildDigits',
    value: function buildDigits(time) {
      var _this3 = this;

      this.digits.forEach(function (digitName) {
        var _getDigitProps = _this3.getDigitProps(digitName),
            type = _getDigitProps.type,
            position = _getDigitProps.position,
            positionIndex = _getDigitProps.positionIndex;

        var selector = '#' + type + ' .' + position + '-digit';

        _this3[digitName] = new Digit({
          selector: selector,
          value: time[type][positionIndex]
        });
      });
    }
  }, {
    key: 'tick',
    value: function tick() {
      var _this4 = this;

      var time = this.getCurrentTime();

      this.digits.forEach(function (digitName) {
        var _getDigitProps2 = _this4.getDigitProps(digitName),
            type = _getDigitProps2.type,
            positionIndex = _getDigitProps2.positionIndex;

        _this4[digitName].setValue(time[type][positionIndex]);
      });
    }
  }]);

  return Clock;
}();

var clock = new Clock();

setInterval(function () {
  clock.tick();
}, 1000);