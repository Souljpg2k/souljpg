const galleryData = [
    { description: "情報-CS", img: "img/CSJPG.jpg" },
    { description: "夢ただの夢", img: "img/dream.jpg" },
    { description: "ラボ-257c", img: "img/lab.jpg" },
    { description: "霊", img: "img/1462568.jpg" },
    { description: "白い悪魔", img: "img/2572568.jpg" },
    { description: "ナイト", img: "img/blue!.JPG" },
    { description: "Rkgk", img: "img/xcxcxvsdsesse.jpg" },
    { description: "Rkgk", img: "img/182568.jpg" },
    { description: "キーボード", img: "img/keyboard.jpg" },
    { description: "ナース", img: "img/nurse.png" },
    { description: "パーフェクトブルー", img: "img/perfect blue.jpg" },

];

const gallery = document.getElementById("gallery");
if (!gallery) {
    console.error("error");
} else {
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("show");
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });



    galleryData.forEach(item => {
        const card = document.createElement("div");
        card.className = "gallery-item";

        const img = document.createElement("img");
        img.src = item.img;
        img.alt = item.description;

        const caption = document.createElement("div");
        caption.className = "caption";

        const p = document.createElement("p");
        p.textContent = item.description;

        caption.appendChild(p);
        card.append(img, caption);

        gallery.appendChild(card);
        observer.observe(card);
    });
}

const lightbox = document.createElement("div");
lightbox.id = "lightbox";
lightbox.innerHTML = `
  <span class="close-btn">&times;</span>
  <img class="lightbox-img" src="" alt="" />
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector(".lightbox-img");
const closeBtn = lightbox.querySelector(".close-btn");


document.addEventListener("click", e => {
    if (e.target.tagName === "IMG" && e.target.closest(".gallery-item")) {
        lightboxImg.src = e.target.src;
        lightboxImg.alt = e.target.alt;
        lightbox.classList.add("active");
    }
});


closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
});


lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
        lightbox.classList.remove("active");
    }
});

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const sections = document.querySelectorAll('section');
let isScrolling = false;

function snapToSection(direction) {
    const currentSection = Math.round(window.scrollY / window.innerHeight);
    let targetSection = currentSection + direction;


    targetSection = Math.max(0, Math.min(targetSection, sections.length - 1));

    sections[targetSection].scrollIntoView({ behavior: 'smooth' });


    const checkScroll = () => {
        const scrollY = window.scrollY;
        const targetY = sections[targetSection].offsetTop;
        if (Math.abs(scrollY - targetY) < 2) {
            isScrolling = false;
        } else {
            requestAnimationFrame(checkScroll);
        }
    };
    requestAnimationFrame(checkScroll);
}


window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    isScrolling = true;
    const direction = e.deltaY > 0 ? 1 : -1;
    snapToSection(direction);
});

