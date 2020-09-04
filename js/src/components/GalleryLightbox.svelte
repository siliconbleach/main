<script>
  import { onMount } from "svelte";

  export let activeItem = null;

  $: lightBoxOpen = !!activeItem;

  const toggleOverlay = () => (activeItem = null);
  const closeOverlayByKey = (event) => {
    if (lightBoxOpen && event.keyCode === 13) {
      activeItem = null;
    }

    return false;
  };
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
    margin: 0 auto;
    display: flex;
    position: absolute;
    z-index: 10000;
    top: 25%;
  }
</style>

<svelte:window on:keyup={closeOverlayByKey} />
<div class="gallery-lightbox-overlay" class:is-open={lightBoxOpen} />
<div class="gallery-lightbox">
  <picture>
    <img src={activeItem && activeItem.src} alt="Text for the alt tag" />
  </picture>
</div>
