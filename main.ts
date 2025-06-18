const eventDate: number = new Date("July 15, 2025 10:00:00").getTime();
const countdownElement = document.getElementById("countdown");

if (countdownElement) {
  setInterval(() => {
    const now: number = new Date().getTime();
    const timeLeft: number = eventDate - now;

    if (timeLeft < 0) {
      countdownElement.innerText = "The event has started!";
      return;
    }

    const days: number = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours: number = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes: number = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds: number = Math.floor((timeLeft / 1000) % 60);

    countdownElement.innerText = `${days}D ${hours}H ${minutes}M ${seconds}S`;
  }, 1000);
} else {
  console.error("Element with id 'countdown' not found.");
}
