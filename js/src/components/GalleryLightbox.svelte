<script>
  export let activeItem = null;

  $: lightBoxOpen = !!activeItem;

  const toggleOverlay = () => (activeItem = null);
</script>

<style lang="postcss">
  .gallery-lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vw;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.75);
    opacity: 0;
    visibility: hidden;
    transition: all 0.75s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .gallery-lightbox-overlay.is-open {
    opacity: 1;
    visibility: visible;
  }

  .gallery-lightbox {
    width: 50vw;
    margin: 0;
    display: flex;
    positon: absolute;
  }
</style>

<div
  class="gallery-lightbox-overlay"
  class:is-open={lightBoxOpen}
  on:keyup={toggleOverlay} />
<div class="gallery-lightbox">
  <picture>
    <img src={activeItem && activeItem.src} alt="Text for the alt tag" />
  </picture>
</div>
