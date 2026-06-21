const button = document.getElementById("startTimer");
const message = document.getElementById("message");

let countdown;

button.addEventListener("click", () => {
    let timeLeft = 20;

    button.style.display = "none";

    message.classList.add("timer");
    message.innerText = timeLeft;

    countdown = setInterval(() => {
        timeLeft--;

        message.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);

            message.classList.add("timesup");
            message.innerText = "DONE! 🎉";

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, 1000);
});