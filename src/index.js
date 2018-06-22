const entities = ['hours', 'minutes', 'seconds', 'ampm'];

const elements = {};

entities.forEach((entity) => {
	elements[`${entity}El`] = document.getElementById(entity);
});

const formatValues = (time) => {
  Object.keys(time).forEach((key) => {
  	if (key === 'ampm') return;

    let value = time[key];

    if (parseInt(value) < 10) {
      time[key] = '0' + value;
    }
  });
}

const getCurrentTime = () => {
  const date = new Date();

  const time = {
  	hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    ampm: 'AM',
  };

  if (time.hours >= 12) {
    time.ampm = 'PM';
    time.hours -= 12;
  }

  formatValues(time);

  return time;
}

const renderAMPM = (time) => {
  elements.ampmEl.innerHTML = time.ampm;
}

const renderHours = (time) => {
	elements.hoursEl.innerHTML = time.hours;

  if (time.hours === '00') {
    renderAMPM(time);
  }
}

const renderMinutes = (time) => {
  elements.minutesEl.innerHTML = time.minutes;

  if (time.minutes === '00') {
    renderHours(time);
  }
}

const renderSeconds = (time) => {
	elements.secondsEl.innerHTML = time.seconds;

  if (time.seconds === '00') {
    renderMinutes(time);
  }
}

(function init() {
  const initialTime = getCurrentTime();

  renderSeconds(initialTime);
  renderMinutes(initialTime);
  renderHours(initialTime);
  renderAMPM(initialTime);

	setInterval(() => {
    const time = getCurrentTime();

    renderSeconds(time);
  }, 1000);
})();

let i = 1;

const movingEls = document.querySelectorAll('.moving');
const prevDigitEls = document.querySelectorAll('.prev .digit');
const nextDigitEls = document.querySelectorAll('.next .digit');

setInterval(() => {
  const prevVal = i;
  i = i >= 9 ? i = 1 : i += 1;

  nextDigitEls.forEach(el => el.innerHTML = i);
  movingEls.forEach(el => el.classList.add('turned'));

  setTimeout(() => {
    prevDigitEls.forEach(el => (el.innerHTML = prevVal));
    prevDigitEls.forEach(el => (el.innerHTML = i)); 
    movingEls.forEach((el) => {
      el.classList.remove('turned');
    });
  }, 500);
}, 1000);
