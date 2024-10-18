// GSAP setup
gsap.registerPlugin(ScrollTrigger);

// Custom shape-shifting cursor
const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
document.body.appendChild(cursor);

const cursorShapes = ['square', 'circle', 'triangle', 'rhombus'];
let currentShape = 0;

function updateCursorPosition(e) {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
    });
}

function changeShape() {
    currentShape = (currentShape + 1) % cursorShapes.length;
    
    switch(cursorShapes[currentShape]) {
        case 'square':
            gsap.to(cursor, {
                borderRadius: 0,
                rotation: 0,
                width: 20,
                height: 20,
                duration: 0.3
            });
            break;
        case 'circle':
            gsap.to(cursor, {
                borderRadius: '50%',
                rotation: 0,
                width: 20,
                height: 20,
                duration: 0.3
            });
            break;
        case 'triangle':
            gsap.to(cursor, {
                borderRadius: 0,
                rotation: 0,
                width: 0,
                height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderBottom: '20px solid black',
                duration: 0.3
            });
            break;
        case 'rhombus':
            gsap.to(cursor, {
                borderRadius: 0,
                rotation: 45,
                width: 20,
                height: 20,
                duration: 0.3
            });
            break;
    }
}

document.addEventListener('mousemove', updateCursorPosition);
document.addEventListener('click', changeShape);

// Change shape every 2 seconds
setInterval(changeShape, 2000);

// 3D HIDDENCURVE title
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function(font) {
    const textGeometry = new THREE.TextGeometry('HIDDENCURVE', {
        font: font,
        size: 3.33,
        height: 0.67,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.07,
        bevelSize: 0.03,
        bevelOffset: 0,
        bevelSegments: 5
    });

    textGeometry.computeBoundingBox();
    textGeometry.center();

    const textMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(textMesh);

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
});

// Swiper initialization
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
    y: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// 2. Floating shapes animation
gsap.utils.toArray('.shape').forEach((shape, index) => {
    const xPos = index % 2 === 0 ? -100 : 100;
    gsap.set(shape, { x: xPos });
    
    gsap.to(shape, {
        x: `random(${xPos - 50}, ${xPos + 50})`,
        y: "random(-100, 100)",
        rotation: "random(-180, 180)",
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});

// 3. Mission statement animation
gsap.from('#shape-changing-box', {
    scrollTrigger: {
        trigger: '#mission',
        start: 'top center'
    },
    scale: 0.5,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)'
});

// 4. Customer carousel animation
gsap.from('.swiper-container', {
    scrollTrigger: {
        trigger: '#customers',
        start: 'top center'
    },
    opacity: 0,
    y: 100,
    duration: 1,
    ease: 'power2.out'
});

// 5. Philosophy text animation
const philosophyText = document.getElementById('color-changing-text');
const words = philosophyText.textContent.split(' ');
philosophyText.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');

gsap.from('#color-changing-text span', {
    scrollTrigger: {
        trigger: '#philosophy',
        start: 'top center'
    },
    opacity: 0,
    y: 20,
    stagger: 0.05,
    duration: 0.5,
    ease: 'power2.out'
});

// 6. Services cards animation
gsap.from('.service-card', {
    scrollTrigger: {
        trigger: '#services',
        start: 'top center'
    },
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: 'back.out(1.2)'
});

// 7. Quote form animation
gsap.from('#quote-form', {
    scrollTrigger: {
        trigger: '#request-quote',
        start: 'top center'
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out'
});

// 8. Footer animation
gsap.from('footer', {
    scrollTrigger: {
        trigger: 'footer',
        start: 'top bottom'
    },
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power2.out'
});

// 9. Parallax effect for sections
gsap.utils.toArray('.section').forEach(section => {
    gsap.to(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: -50,
        ease: 'none'
    });
});

// 10. Rotating service cards on hover
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            rotationY: 5,
            rotationX: 5,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// 11. Animated underline for headings
gsap.utils.toArray('h2').forEach(heading => {
    const underline = document.createElement('div');
    underline.style.width = '0';
    underline.style.height = '3px';
    underline.style.backgroundColor = '#000000';
    underline.style.marginTop = '10px';
    heading.appendChild(underline);

    gsap.to(underline, {
        scrollTrigger: {
            trigger: heading,
            start: 'top 80%'
        },
        width: '100%',
        duration: 0.8,
        ease: 'power2.out'
    });
});

// 12. Morphing shapes animation
const shapes = document.querySelectorAll('.shape');
shapes.forEach((shape, index) => {
    const tl = gsap.timeline({
        repeat: -1,
        yoyo: true
    });

    if (index % 2 === 0) {
        tl.to(shape, {
            borderRadius: '50%',
            rotation: 360,
            scale: 1.5,
            duration: 10
        }).to(shape, {
            borderRadius: '0%',
            rotation: 0,
            scale: 1,
            duration: 10
        });
    } else {
        tl.to(shape, {
            borderRadius: '50%',
            rotation: -360,
            scale: 0.5,
            duration: 10
        }).to(shape, {
            borderRadius: '0%',
            rotation: 0,
            scale: 1,
            duration: 10
        });
    }
});
