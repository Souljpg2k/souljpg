const galleryData = [
    { description: "蛾", img: "img/182568.png" },
    { description: "失蹤的孩子", img: "img/CSJPG.jpg" },
    { description: "深夜廚房", img: "img/Girl with glasses.jpg" },
    { description: "狐女", img: "img/red.png" },
    { description: "只是一個夢", img: "img/dream.jpg" },
    { description: "護士", img: "img/nurse.jpg" },
    { description: "精神", img: "img/1462568.jpg" },
];

const gallery = document.getElementById('gallery');

galleryData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'gallery-item';
    card.innerHTML = `
        <img src="${item.img}" alt="${item.title}" />
        <div class="caption">
          <p>${item.description}</p>
        </div>
      `;
    gallery.appendChild(card);
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.gallery-item').forEach(item => {
    observer.observe(item);
});


let drops = [];
let chars = "SOULJPG";

function setup() {
    let container = document.getElementById('canvas-container');
    let canvasWidth = container.offsetWidth;
    let canvas = createCanvas(canvasWidth, 180);
    canvas.id('rainCanvas');
    canvas.parent('canvas-container');
    for (let i = 0; i < 100; i++) {
        drops[i] = new Drop();
    }
}

function draw() {
    background(0, 100);
    for (let drop of drops) {
        drop.fall();
        drop.show();
    }
}

class Drop {
    constructor() {
        this.x = random(0, width - 100);
        this.y = random(-500, -50);
        this.z = random(0, 20);
        this.speed = map(this.z, 0, 20, 1, 5);
        this.length = map(this.z, 0, 20, 10, 20);
        this.char = random(chars.split(""));
    }

    fall() {
        this.y += this.speed;
        if (this.y > height) {
            this.y = random(-200, -100);
            this.x = random(0, width - 20);
            this.char = random(chars.split(""));
        }
    }

    show() {
        let alpha = map(this.z, 0, 20, 50, 255);
        fill(255, 255, 255, alpha);
        textSize(map(this.z, 0, 20, 10, 12));
        text(this.char, this.x, this.y);
    }
}

function windowResized() {
    let container = document.getElementById('canvas-container');
    let canvasWidth = container.offsetWidth;
    resizeCanvas(canvasWidth, 180);
}


