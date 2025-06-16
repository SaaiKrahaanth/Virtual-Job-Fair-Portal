const eventDate = new Date("July 15, 2025 10:00:00").getTime();
const coundownElement = document.getElementById("countdown");

setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    coundownElement.innerText = `${days}D ${hours}H ${minutes}M ${seconds}S`;
    
    if(timeLeft < 0){
        coundownElement.innerText("The event has started!");
    }
}, 1000);