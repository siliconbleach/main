<script>
console.log("Fullscreen Swipable Gallery is active!");
  import { onMount } from 'svelte';
  let images = [
    { src: '/path-to-your-image1.jpg', title: 'Artwork 1', medium: 'Oil on Canvas', date: '2024' },
    { src: '/path-to-your-image2.jpg', title: 'Artwork 2', medium: 'Charcoal', date: '2023' },
    { src: '/path-to-your-image3.jpg', title: 'Artwork 3', medium: 'Digital', date: '2022' }
  ];
  let currentIndex = 0;
  let showDetails = false;
  let touchStartX = 0;
  let touchEndX = 0;

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
  }
  function toggleDetails() {
    showDetails = !showDetails;
  }
  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
  }
  function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) nextImage();
    if (touchStartX - touchEndX < -50) prevImage();
  }
</script>

<style>
  .gallery-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
  }
  .gallery-image {
    max-width: 90vw;
    max-height: 90vh;
    transition: opacity 0.3s ease-in-out;
  }
  .controls {
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .details-overlay {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
  }
</style>

<div class="gallery-container" on:touchstart={handleTouchStart} on:touchend={handleTouchEnd}>
  <button on:click={prevImage}>&lt;</button>
  <img src={images[currentIndex].src} class="gallery-image" on:click={toggleDetails} />
  <button on:click={nextImage}>&gt;</button>
  {#if showDetails}
    <div class="details-overlay">
      <h3>{images[currentIndex].title}</h3>
      <p>{images[currentIndex].medium} - {images[currentIndex].date}</p>
    </div>
  {/if}
</div>
