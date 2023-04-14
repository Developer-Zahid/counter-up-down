const hoursElement = document.querySelector('#hours');
const minutesElement = document.querySelector('#minutes');
const secondsElement = document.querySelector('#seconds');
let counterElement = document.querySelector('.counter');
const progressbarElement = document.querySelector('[data-circle="progress"]');
const progressbarTotalLength = progressbarElement.getTotalLength();

progressbarElement.style.strokeDasharray = progressbarTotalLength;
progressbarElement.style.strokeDashoffset = progressbarTotalLength;

// Get the countup time inputs from the Dom
const countupHours = parseInt((24 - 1) - counterElement.dataset.endHours);
const countupMinutes = parseInt((60 - 1) - counterElement.dataset.endMinutes);
const countupSeconds = parseInt((60 - 1) - counterElement.dataset.endSeconds);

// Get the countdown time inputs from the Dom
const countdownHours = parseInt(counterElement.dataset.endHours);
const countdownMinutes = parseInt(counterElement.dataset.endMinutes);
const countdownSeconds = parseInt(counterElement.dataset.endSeconds);

// Convert the inputs to milliseconds and set the start date & target date
const countupTime = (countupHours * 60 * 60 + countupMinutes * 60 + countupSeconds) * 1000;
const countdownTime = (countdownHours * 60 * 60 + countdownMinutes * 60 + countdownSeconds) * 1000;

const startDate = new Date().getTime() - countupTime;
const targetDate = new Date().getTime() + countdownTime;


// Update the countdown every second
const countdown = setInterval(() => {
  // Get the current date and time
  const now = new Date().getTime();

  // Calculate the remaining time
  const remainingTime = targetDate - now;
  const elapsedTime = now - startDate;

  // Calculate countdown hours, minutes, and seconds
  const countdownHours = Math.floor(remainingTime / (60 * 60 * 1000));
  const countdownMinutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
  const countdownSeconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

  hoursElement.innerText = countdownHours < 10 ? `0${countdownHours}` : countdownHours;
  minutesElement.innerText = countdownMinutes < 10 ? `0${countdownMinutes}` : countdownMinutes;
  secondsElement.innerText = countdownSeconds < 10 ? `0${countdownSeconds}` : countdownSeconds;

   // Calculate seconds
   const countupSeconds = Math.floor(elapsedTime / 1000);

   progressbarElement.style.strokeDashoffset = progressbarTotalLength - (progressbarTotalLength * countupSeconds) / (24 * 60 * 60);

    // Stop the countdown when the target date is reached
    if (remainingTime <= 0) {
        clearInterval(countdown);
        counterElement.innerText = counterElement.dataset.timerEndMessage;
    }
}, 1000); // Update every second





