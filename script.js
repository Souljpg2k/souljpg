const galleryData = [
    { description: "蛾", img: "img/182568.png" },
    { description: "穿著白色洋裝的年輕女孩", img: "img/3172568.png" },
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
