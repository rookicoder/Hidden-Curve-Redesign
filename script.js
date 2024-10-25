//10/25/24

// HIDDENCURVE Website JavaScript

// Set up GSAP (GreenSock Animation Platform) for smooth animations
gsap.registerPlugin(ScrollTrigger);

// Custom shape-shifting cursor setup
const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
document.body.appendChild(cursor);

const cursorShapes = ['square', 'circle', 'triangle', 'rhombus'];
let currentShape = 0;

// Function to update cursor position
function updateCursorPosition(e) {
    // Update cursor position based on mouse movement
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
}

// Function to change cursor shape
function changeShape() {
    // Cycle through cursor shapes and apply new styles
    currentShape = (currentShape + 1) % cursorShapes.length;

    // Adjust cursor size
    const cursorSize = 52; // Increased size to 2x

    switch(cursorShapes[currentShape]) {
        case 'square':
            cursor.style.borderRadius = '0';
            cursor.style.transform = 'translate(-50%, -50%) rotate(0deg)';
            cursor.style.width = `${cursorSize}px`;
            cursor.style.height = `${cursorSize}px`;
            cursor.style.background = '#000';
            cursor.style.borderLeft = 'none';
            cursor.style.borderRight = 'none';
            cursor.style.borderBottom = 'none';
            break;
        case 'circle':
            cursor.style.borderRadius = '50%';
            cursor.style.transform = 'translate(-50%, -50%) rotate(0deg)';
            cursor.style.width = `${cursorSize}px`;
            cursor.style.height = `${cursorSize}px`;
            cursor.style.background = '#000';
            cursor.style.borderLeft = 'none';
            cursor.style.borderRight = 'none';
            cursor.style.borderBottom = 'none';
            break;
        case 'triangle':
            cursor.style.width = '0';
            cursor.style.height = '0';
            cursor.style.borderLeft = `${cursorSize / 2}px solid transparent`;
            cursor.style.borderRight = `${cursorSize / 2}px solid transparent`;
            cursor.style.borderBottom = `${cursorSize}px solid black`;
            cursor.style.background = 'none';
            cursor.style.borderRadius = '0';
            cursor.style.transform = 'translate(-50%, -50%) rotate(0deg)';
            break;
        case 'rhombus':
            cursor.style.borderRadius = '0';
            cursor.style.transform = 'translate(-50%, -50%) rotate(45deg)';
            cursor.style.width = `${cursorSize}px`;
            cursor.style.height = `${cursorSize}px`;
            cursor.style.background = '#000';
            cursor.style.borderLeft = 'none';
            cursor.style.borderRight = 'none';
            cursor.style.borderBottom = 'none';
            break;
    }
}

// Add event listeners for cursor movement and shape change
document.addEventListener('mousemove', updateCursorPosition);
document.addEventListener('click', changeShape);

// Automatically change cursor shape every 2 seconds
setInterval(changeShape, 2000);

// Windmill Rotation Based on Scrolling
gsap.to("#windmill-blades", {
    rotation: 360 * 5, // Rotate 5 full circles during scroll
    transformOrigin: "center center",
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
    },
});

// 3D HIDDENCURVE title setup using Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Load 3D font and create HIDDENCURVE text
const loader = new THREE.FontLoader();
loader.load(
    'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
    function (font) {
        // Create 3D text geometry, material, and mesh
        const textGeometry = new THREE.TextGeometry('HIDDENCURVE', {
            font: font,
            size: 3.33,
            height: 0.67,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.07,
            bevelSize: 0.03,
            bevelOffset: 0,
            bevelSegments: 5,
        });

        textGeometry.computeBoundingBox();
        textGeometry.center();

        const textMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(textMesh);

        // Set up lighting and animation for 3D text
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0, 0, 10);
        scene.add(light);

        camera.position.z = 20;

        function animate() {
            requestAnimationFrame(animate);
            textMesh.rotation.y += 0.005;
            renderer.render(scene, camera);
        }
        animate();
    }
);

// Initialize Swiper for customer testimonial slider
const swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    loop: true,
});

// GSAP Animations

// 1. Top bar animation
gsap.from('#top-bar', {
    // Animate top bar sliding down
    y: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
});

// 2. Floating shapes animation
gsap.utils.toArray('.shape').forEach((shape, index) => {
    // Animate decorative shapes floating around
    const xPos = index % 2 === 0 ? -100 : 100;
    gsap.set(shape, { x: xPos });

    gsap.to(shape, {
        x: `random(${xPos - 50}, ${xPos + 50})`,
        y: 'random(-100, 100)',
        rotation: 'random(-180, 180)',
        duration: 'random(10, 20)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
    });
});

// 3. Mission statement animation
gsap.from('#shape-changing-box', {
    scrollTrigger: {
        trigger: '#mission',
        start: 'top center',
    },
    // Animate mission statement box appearing
    scale: 0.5,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)',
});

// 4. Customer carousel animation
gsap.from('.swiper-container', {
    scrollTrigger: {
        trigger: '#customers',
        start: 'top center',
    },
    // Animate customer testimonial slider appearing
    opacity: 0,
    y: 100,
    duration: 1,
    ease: 'power2.out',
});

// 5. Philosophy text animation
const philosophyText = document.getElementById('color-changing-text');
const words = philosophyText.textContent.split(' ');
philosophyText.innerHTML = words.map((word) => `<span>${word}</span>`).join(' ');

gsap.from('#color-changing-text span', {
    scrollTrigger: {
        trigger: '#philosophy',
        start: 'top center',
    },
    // Animate each word in the philosophy text
    opacity: 0,
    y: 20,
    stagger: 0.05,
    duration: 0.5,
    ease: 'power2.out',
});

// 6. Services cards animation
gsap.from('.service-card', {
    scrollTrigger: {
        trigger: '#services',
        start: 'top center',
    },
    // Animate service cards appearing
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: 'back.out(1.2)',
});

// 7. Quote form animation
gsap.from('#quote-form', {
    scrollTrigger: {
        trigger: '#request-quote',
        start: 'top center',
    },
    // Animate quote form appearing
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out',
});

// 8. Footer animation
gsap.from('footer', {
    scrollTrigger: {
        trigger: 'footer',
        start: 'top bottom',
    },
    // Animate footer sliding up
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power2.out',
});

// 9. Parallax effect for sections
gsap.utils.toArray('.section').forEach((section) => {
    // Create parallax scrolling effect for each section
    gsap.to(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
        y: -50,
        ease: 'none',
    });
});

// 10. Rotating service cards on hover
document.querySelectorAll('.service-card').forEach((card) => {
    // Add hover effect to service cards
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            rotationY: 5,
            rotationX: 5,
            duration: 0.3,
            ease: 'power2.out',
        });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.3,
            ease: 'power2.out',
        });
    });
});

// 11. Animated underline for headings
gsap.utils.toArray('h2').forEach((heading) => {
    // Create and animate underlines for headings
    const underline = document.createElement('div');
    underline.style.width = '0';
    underline.style.height = '3px';
    underline.style.backgroundColor = '#000000';
    underline.style.marginTop = '10px';
    heading.appendChild(underline);

    gsap.to(underline, {
        scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
        },
        width: '100%',
        duration: 0.8,
        ease: 'power2.out',
    });
});

// 12. Morphing shapes animation
const shapes = document.querySelectorAll('.shape');
shapes.forEach((shape, index) => {
    // Animate shapes morphing between different forms
    const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
    });

    if (index % 2 === 0) {
        tl.to(shape, {
            borderRadius: '50%',
            rotation: 360,
            scale: 1.5,
            duration: 10,
        }).to(shape, {
            borderRadius: '0%',
            rotation: 0,
            scale: 1,
            duration: 10,
        });
    } else {
        tl.to(shape, {
            borderRadius: '50%',
            rotation: -360,
            scale: 0.5,
            duration: 10,
        }).to(shape, {
            borderRadius: '0%',
            rotation: 0,
            scale: 1,
            duration: 10,
        });
    }
});
