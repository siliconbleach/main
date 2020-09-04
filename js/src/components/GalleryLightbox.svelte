<script>
  export let activeImg = null;
  export let lightBoxOpen = false;
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

    &.is-open {
      opacity: 1;
      visibility: visible;
    }
  }
</style>

<div class="gallery-lightbox-overlay" class:is-shown={lightBoxOpen} />
<div class="gallery-lightbox">
  <picture>
    <img src={activeImg && activeImg.src} alt="Text for the alt tag" />
  </picture>
</div>
