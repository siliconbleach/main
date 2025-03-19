document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalCaption = document.getElementById("modalCaption");
    const closeModal = document.querySelector(".modal-close");
    const prevBtn = document.querySelector(".modal-prev");
    const nextBtn = document.querySelector(".modal-next");

    let images = Array.from(document.querySelectorAll(".sqs-gallery img"));
    let currentIndex = 0;
    let startX = 0; // For touch swipes

    function openModal(index) {
        currentIndex = index;
        modal.style.display = "flex";
        modalImage.src = images[currentIndex].src;
        modalCaption.textContent = images[currentIndex].alt || "Image " + (currentIndex + 1);
        document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    function closeModalFunc() {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Restore scrolling
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        openModal(currentIndex);
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openModal(currentIndex);
    }

    images.forEach((image, index) => {
        image.style.cursor = "pointer";
        image.addEventListener("click", function() {
            openModal(index);
        });
    });

    closeModal.addEventListener("click", closeModalFunc);

    modal.addEventListener("click", function(event) {
        if (event.target === modal) closeModalFunc();
    });

    prevBtn.addEventListener("click", showPrevImage);
    nextBtn.addEventListener("click", showNextImage);

    document.addEventListener("keydown", function(event) {
        if (modal.style.display === "flex") {
            if (event.key === "ArrowLeft") showPrevImage();
            if (event.key === "ArrowRight") showNextImage();
            if (event.key === "Escape") closeModalFunc();
        }
    });

    // Enable touch/swipe navigation for mobile
    modal.addEventListener("touchstart", function(event) {
        startX = event.touches[0].clientX;
    });

    modal.addEventListener("touchend", function(event) {
        let endX = event.changedTouches[0].clientX;
        let diffX = startX - endX;

        if (diffX > 50) {
            // Swipe left → Next image
            showNextImage();
        } else if (diffX < -50) {
            // Swipe right → Previous image
            showPrevImage();
        }
    });
});