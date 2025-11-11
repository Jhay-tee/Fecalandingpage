// DOM Elements
const background = document.getElementById('background');
const whatsappBtn = document.getElementById('whatsapp-btn');
const loader = document.getElementById('loader');

// Configuration
const TOTAL_IMAGES = 295; // Total number of images available
const IMAGE_BASE_PATH = './fecapictures/pics';

// To Generate image paths dynamically with both extensions
function generateImagePaths() {
    const images = [];
    for (let i = 1; i <= TOTAL_IMAGES; i++) {
        // Trying both .jpg and .JPG extensions
        images.push(`${IMAGE_BASE_PATH}${i}.jpg`);
        images.push(`${IMAGE_BASE_PATH}${i}.JPG`);
    }
    return images;
}

const images = generateImagePaths();

// WhatsApp links
const whatsappLinks = [
    "https://www.instagram.com/fecanigeria/",
];

// Track which images actually exist - MAKE THESE GLOBAL
let availableImages = [];
let currentIndex = 1; // ADD THIS GLOBAL VARIABLE
let backgroundInterval; // ADD THIS TO CONTROL THE INTERVAL

// Initialize
async function initializeBackground() {
    // Discover which images actually exist
    availableImages = await discoverExistingImages();
    
    if (availableImages.length === 0) {
        console.warn('No images found, using fallback');
        background.style.backgroundColor = '#333';
        return;
    }
    
    currentIndex = Math.floor(Math.random() * availableImages.length);
    setBackgroundImage(availableImages[currentIndex]);
    
    // Start background transitions after initialization
    startBackgroundTransitions();
}

// Start background transitions
function startBackgroundTransitions() {
    if (availableImages.length > 0) {
        // Clear any existing interval first
        if (backgroundInterval) {
            clearInterval(backgroundInterval);
        }
        
        // Start new interval that changes every 5 seconds
        backgroundInterval = setInterval(changeBackground, 5000);
        console.log('Background transitions started - changing every 5 seconds');
    }
}

// Discover which images actually exist
async function discoverExistingImages() {
    const existingImages = [];
    
    for (const imagePath of images) {
        if (await imageExists(imagePath)) {
            existingImages.push(imagePath);
        }
    }
    
    console.log(`Found ${existingImages.length} existing images`);
    return existingImages;
}

// Check if image exists
function imageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

// Set background image with quality preservation
function setBackgroundImage(imageUrl) {
    background.style.backgroundImage = `url('${imageUrl}')`;
    background.style.backgroundSize = 'cover';
    background.style.backgroundPosition = 'center';
    background.style.backgroundRepeat = 'no-repeat';
    background.style.backgroundAttachment = 'fixed';
    
    // Ensure high quality rendering
    background.style.imageRendering = '-webkit-optimize-contrast';
    background.style.imageRendering = 'crisp-edges';
    background.style.transform = 'translateZ(0)';
}

// Preload images for smoother transitions
function preloadImages() {
    availableImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Background image transition - FIXED VERSION
function changeBackground() {
    if (availableImages.length === 0) return;
    
    console.log('Changing background...', 'Current index:', currentIndex);
    
    // Apply blur and darken effect
    background.style.filter = 'brightness(0.5) blur(3px)';
    background.style.transition = 'filter 1s ease-in-out';
    
    setTimeout(() => {
        // Get a new random image (different from current)
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * availableImages.length);
        } while (newIndex === currentIndex && availableImages.length > 1);
        
        // UPDATE THE GLOBAL currentIndex variable
        currentIndex = newIndex;
        
        // Change background image
        setBackgroundImage(availableImages[currentIndex]);
        console.log('New background set:', availableImages[currentIndex]);
        
        // Remove blur and restore brightness smoothly
        setTimeout(() => {
            background.style.filter = 'brightness(0.7)';
        }, 50);
    }, 1000);
}

// Loader animation and removal
window.addEventListener('load', function() {
    // Initialize background first
    initializeBackground();
    
    // Animate loader elements
    anime({
        targets: '.loader-logo',
        scale: [0.8, 1],
        rotate: [0, 360],
        duration: 2000,
        easing: 'easeOutElastic(1, .8)'
    });
    
    anime({
        targets: '.loader-text',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1500,
        easing: 'easeOutExpo'
    });
    
    // Remove loader after animation completes
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        // Animate main content after loader is hidden
        anime({
            targets: 'nav',
            translateY: [-100, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo'
        });
        
        anime({
            targets: 'main',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1200,
            easing: 'easeOutExpo',
            delay: 300
        });
        
        anime({
            targets: '.whatsapp-btn',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: 600
        });
    }, 3000);
});

// WhatsApp button functionality
whatsappBtn.addEventListener('click', () => {
    // Add click animation
    anime({
        targets: whatsappBtn,
        scale: [1, 0.9, 1],
        duration: 300,
        easing: 'easeInOutQuad'
    });
    
    const randomIndex = Math.floor(Math.random() * whatsappLinks.length);
    setTimeout(() => {
        window.open(whatsappLinks[randomIndex], '_blank');
    }, 300);
});

// Add hover animations for buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        anime({
            targets: this,
            scale: 1.05,
            duration: 200,
            easing: 'easeOutQuad'
        });
    });
    
    button.addEventListener('mouseleave', function() {
        anime({
            targets: this,
            scale: 1,
            duration: 200,
            easing: 'easeOutQuad'
        });
    });
});

// Enhanced CSS for image quality and responsiveness
const style = document.createElement('style');
style.textContent = `
    #background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        /* Enhanced quality settings */
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        image-rendering: pixelated;
        -ms-interpolation-mode: nearest-neighbor;
        /* Smooth transitions */
        transition: background-image 1s ease-in-out, filter 1s ease-in-out;
        /* Responsive sizing */
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        /* Prevent blurriness on scale */
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000;
    }
    
    /* Ensure high DPI display quality */
    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        #background {
            image-rendering: -webkit-optimize-contrast;
        }
    }
    
    /* Mobile responsiveness */
    @media (max-width: 768px) {
        #background {
            background-size: cover;
            background-position: center;
            background-attachment: scroll;
        }
    }
`;
document.head.appendChild(style);

// Preload images on page load
setTimeout(() => {
    preloadImages();
}, 1000);
console.clear();