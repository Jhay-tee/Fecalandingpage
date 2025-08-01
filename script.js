const background = document.getElementById('background');
const whatsappBtn = document.getElementById('whatsapp-btn');
const images = [
"image1.jpg",
"image2.jpg",
"image3.jpg",
"image4.jpg",
"image5.jpg",
"image6.jpg",
"image7.jpg",
"image8.jpg",
"image9.jpg",
"image10.jpg",
"image11.jpg",
"image12.jpg",
"image13.jpg",
"image14.jpg",
"image22.jpg",
"image16.jpg",
"image17.jpg",
"image18.jpg",
"image19.jpg",
"image20.jpg",
"image21.jpg",


];
images.class = "backImg";
const whatsappLinks = [
"https://wa.me/2349026093462",
"https://wa.me/2347026439424"

]


let currentIndex = Math.floor(Math.random() * images.length);
background.style.backgroundImage = `url('${images[currentIndex]}')`;
background.style.backgroundSize='cover';

function changeBackground() {
    background.style.filter = 'brightness(0.7) blur(10px)';
    setTimeout(() => {
        currentIndex = Math.floor(Math.random() * images.length);
        background.style.backgroundImage = `url('${images[currentIndex]}')`;
        background.style.backgroundSize= 'cover';
        background.style.filter = 'brightness(0.7)';
    }, 1000);
}

setInterval(changeBackground, 4000);

whatsappBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * whatsappLinks.length);
    window.open(whatsappLinks[randomIndex], '_blank');
});

