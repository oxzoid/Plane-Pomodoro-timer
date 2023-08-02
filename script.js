const minutesInput = document.querySelector(".minutes");
const secondsInput = document.querySelector(".seconds");
const startButton = document.getElementById("start-stop");

minutesInput.addEventListener("keydown", handleMinutesInput);
secondsInput.addEventListener("keydown", handleSecondsInput);

minutesInput.addEventListener("blur", handleBlur);
secondsInput.addEventListener("blur", handleBlur);

function handleMinutesInput(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    secondsInput.focus();
  }
}

function handleSecondsInput(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    startButton.focus();
  }
}

function handleBlur(event) {
  const input = event.target;
  let inputValue = input.textContent.trim();

  if (inputValue === "") {
    input.textContent = "00";
  } else if (Number(inputValue) >= 60) { // Adjusted to handle values greater than or equal to 60
    if (input === secondsInput) {
      const minutesValue = Number(minutesInput.textContent);
      if (minutesValue < 60) {
        minutesInput.textContent = String(minutesValue + 1).padStart(2, "0");
      }
      input.textContent = "00";
    } else {
      input.textContent = "60";
    }
  } else if (inputValue.length === 1) {
    input.textContent = "0" + inputValue;
  }
}

const bells = new Audio('./Sounds/bell.mp3'); 
const startBtn = document.getElementById('start-stop');  // Corrected selector
const session = document.querySelector('.minutes'); 
let myInterval; 
let state = true;
let finish = new Audio('./Sounds/finish.mp3')

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent)

  if (state) {
    state = false;
    bells.play();
    let totalSeconds = sessionAmount * 60;

    const updateSeconds = () => {
      const minuteDiv = document.querySelector('.minutes');
      const secondDiv = document.querySelector('.seconds');

      totalSeconds--;

      let minutesLeft = Math.floor(totalSeconds / 60);
      let secondsLeft = totalSeconds % 60;

      if (secondsLeft < 10) {
        secondDiv.textContent = '0' + secondsLeft;
      } else {
        secondDiv.textContent = secondsLeft;
      }
      minuteDiv.textContent = `${minutesLeft}`

      if (minutesLeft === 0 && secondsLeft === 0) {
        bells.play()
        clearInterval(myInterval);
      }
    }

    updateSeconds(); // Call it once to set initial time before starting the interval
    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Session has already started.')
  }
}

startBtn.addEventListener('click', appTimer);
