const hoursElement = document.querySelector('#hours');
const minutesElement = document.querySelector('#minutes');
const secondsElement = document.querySelector('#seconds');
let counterElement = document.querySelector('.counter');
const progressbarElement = document.querySelector('[data-circle="progress"]');
const progressbarTotalLength = progressbarElement.getTotalLength();

progressbarElement.style.strokeDasharray = progressbarTotalLength;
progressbarElement.style.strokeDashoffset = progressbarTotalLength;

// Get the countup time inputs from the Dom
const countupHours = parseInt(counterElement.dataset.startHours);
const countupMinutes = parseInt(counterElement.dataset.startMinutes);
const countupSeconds = parseInt(counterElement.dataset.startSeconds);

// Get the countup time inputs from the Dom
const countdownHours = parseInt((24 - 1) - counterElement.dataset.startHours);
const countdownMinutes = parseInt((60 - 1) - counterElement.dataset.startMinutes);
const countdownSeconds = parseInt((60 - 1) - counterElement.dataset.startSeconds);

// Convert the inputs to milliseconds and set the start date & target date
const countupTime = (countupHours * 60 * 60 + countupMinutes * 60 + countupSeconds) * 1000;
const countdownTime = (countdownHours * 60 * 60 + countdownMinutes * 60 + countdownSeconds) * 1000;

const startDate = new Date().getTime() - countupTime;
const targetDate = new Date().getTime() + countdownTime;

// Update the countup every second
const countup = setInterval(() => {
  // Get the current date and time
  const now = new Date().getTime();

  // Calculate the elapsed time
  const elapsedTime = now - startDate;

  
  // Calculate countup hours, minutes, and seconds
  const countupHours = Math.floor(elapsedTime / (60 * 60 * 1000));
  const countupMinutes = Math.floor((elapsedTime % (60 * 60 * 1000)) / (60 * 1000));
  const countupSeconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);

  progressbarElement.style.strokeDashoffset = progressbarTotalLength - (progressbarTotalLength * countupHours) / 24;

  // Stop the countup after 24 hours
  if (elapsedTime >= 24 * 60 * 60 * 1000) {
    clearInterval(countup);
    console.log("24 hour countup complete!");
  }
}, 1000); // Update every second


// Update the countup every second
const countdown = setInterval(() => {
  // Get the current date and time
  const now = new Date().getTime();

  // Calculate the remaining time
  const remainingTime = targetDate - now;

  // Calculate countdown hours, minutes, and seconds
  const countdownHours = Math.floor(remainingTime / (60 * 60 * 1000));
  const countdownMinutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
  const countdownSeconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

  hoursElement.innerText = countdownHours < 10 ? `0${countdownHours}` : countdownHours;
  minutesElement.innerText = countdownMinutes < 10 ? `0${countdownMinutes}` : countdownMinutes;
  secondsElement.innerText = countdownSeconds < 10 ? `0${countdownSeconds}` : countdownSeconds;

    // Stop the countdown when the target date is reached
    if (remainingTime <= 0) {
        clearInterval(countdown);
        counterElement.innerText = counterElement.dataset.timerEndMessage;
        console.log("24 hour countdown complete!");
    }
}, 1000); // Update every second





