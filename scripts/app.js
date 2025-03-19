document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  const closeModal = document.querySelector(".modal-close");
  const prevBtn = document.querySelector(".modal-prev");
  const nextBtn = document.querySelector(".modal-next");

  let images = Array.from(document.querySelectorAll(".sqs-gallery img"));
  let currentIndex = 0;

  function openModal(index) {
      currentIndex = index;
      modal.style.display = "flex";
      modalImage.src = images[currentIndex].src;
      modalCaption.textContent = images[currentIndex].alt || "Image " + (currentIndex + 1);
  }

  images.forEach((image, index) => {
      image.style.cursor = "pointer";
      image.addEventListener("click", function() {
          openModal(index);
      });
  });

  closeModal.addEventListener("click", function() {
      modal.style.display = "none";
  });

  modal.addEventListener("click", function(event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  });

  prevBtn.addEventListener("click", function() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      openModal(currentIndex);
  });

  nextBtn.addEventListener("click", function() {
      currentIndex = (currentIndex + 1) % images.length;
      openModal(currentIndex);
  });

  document.addEventListener("keydown", function(event) {
      if (modal.style.display === "flex") {
          if (event.key === "ArrowLeft") prevBtn.click();
          if (event.key === "ArrowRight") nextBtn.click();
          if (event.key === "Escape") modal.style.display = "none";
      }
  });
});