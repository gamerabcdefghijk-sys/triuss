const projectDetails = [
    { name: "Suraksha Hospital", role: "Healthcare Solutions", link: "https://surakshahosp.com" },
    { name: "ASPL Tech Solutions", role: "IT Services & Consulting", link: "https://aspltech.in" },

    { name: "Attendance System", role: "Internal Tools", link: "#" },
    { name: "Blue Mind Surf", role: "Surf & Water Sports School", link: "https://surfschool.asia/" },
    { name: "E-Commerce", role: "Digital Retail", link: "#" },
    { name: "Angel's Empyrean", role: "School Project", link: "https://angel-s-empyrean.netlify.app" },
    { name: "Badminton Site", role: "Court Rentals & Pro-Tier Gear", link: "https://badminton-site.netlify.app" }
];

const cards = document.querySelectorAll(".team-card");
const dots = document.querySelectorAll(".team-dot");
const memberName = document.querySelector(".team-member-name");
const memberRole = document.querySelector(".team-member-role");
const liveLink = document.querySelector(".team-live-link");
let currentIndex = 0;
let isAnimating = false;

function updateCarousel(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex = (newIndex + cards.length) % cards.length;

    cards.forEach((card, i) => {
        const offset = (i - currentIndex + cards.length) % cards.length;

        card.classList.remove(
            "center",
            "up-1",
            "up-2",
            "down-1",
            "down-2",
            "hidden"
        );

        if (offset === 0) {
            card.classList.add("center");
        } else if (offset === 1) {
            card.classList.add("down-1");
        } else if (offset === 2) {
            card.classList.add("down-2");
        } else if (offset === cards.length - 1) {
            card.classList.add("up-1");
        } else if (offset === cards.length - 2) {
            card.classList.add("up-2");
        } else {
            card.classList.add("hidden");
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });

    if (memberName && memberRole) {
        memberName.style.opacity = "0";
        memberRole.style.opacity = "0";
        if (liveLink) liveLink.style.opacity = "0";

        setTimeout(() => {
            memberName.textContent = projectDetails[currentIndex].name;
            memberRole.textContent = projectDetails[currentIndex].role;
            if (liveLink) {
                liveLink.href = projectDetails[currentIndex].link;
                liveLink.style.opacity = "1";
            }
            memberName.style.opacity = "1";
            memberRole.style.opacity = "1";
        }, 300);
    }

    setTimeout(() => {
        isAnimating = false;
    }, 800);
}


dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        updateCarousel(i);
    });
});

cards.forEach((card, i) => {
    card.addEventListener("click", () => {
        updateCarousel(i);
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        updateCarousel(currentIndex - 1);
    } else if (e.key === "ArrowDown") {
        updateCarousel(currentIndex + 1);
    }
});

let touchStartX = 0;
let touchEndX = 0;



document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenY;
});

document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            updateCarousel(currentIndex + 1);
        } else {
            updateCarousel(currentIndex - 1);
        }
    }
}
const prevBtn = document.querySelector(".nav-arrow.prev");
const nextBtn = document.querySelector(".nav-arrow.next");

if (prevBtn) {
    prevBtn.addEventListener("click", () => updateCarousel(currentIndex - 1));
}
if (nextBtn) {
    nextBtn.addEventListener("click", () => updateCarousel(currentIndex + 1));
}

updateCarousel(0);
