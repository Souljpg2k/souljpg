const galleryData = [
    { description: "Info-CS", img: "img/CSJPG.jpg" },
    { description: "Dream", img: "img/dream.jpg" },
    { description: "Lab-257c", img: "img/lab.jpg" },
    { description: "精神", img: "img/1462568.jpg" },
    { description: "White Demon", img: "img/2572568.jpg" },
    { description: "Night", img: "img/blue!.JPG" },
    { description: "Rkgk", img: "img/xcxcxvsdsesse.jpg" },
    { description: "Rkgk", img: "img/182568.jpg" },
];

const gallery = document.getElementById("gallery");
if (!gallery) {
    console.error("error");
} else {
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // ใส่ delay ไล่ตามลำดับ
                setTimeout(() => {
                    entry.target.classList.add("show");
                }, index * 150); // 150ms ต่อชิ้น

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
