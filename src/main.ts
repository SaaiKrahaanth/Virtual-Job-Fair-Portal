export const countdownElement: HTMLElement | null = document.getElementById("countdown");
const eventDate: number = new Date("July 15, 2025 10:00:00").getTime();

setInterval(() => {
    const now: number = new Date().getTime();
    const timeLeft: number = eventDate - now;

    const days: number = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours: number = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes: number = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds: number = Math.floor((timeLeft / 1000) % 60);

    if (countdownElement) {
        countdownElement.innerText = `${days}D ${hours}H ${minutes}M ${seconds}S`;
    }

    if (timeLeft < 0) {
        if (countdownElement) {
            countdownElement.innerText = "The event has started!";
        }
    }
}, 1000);