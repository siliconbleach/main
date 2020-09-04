<script>
  export let activeImg = null;

  $: lightBoxOpen = !!activeImg;

  const selectLightboxPicture = (event) => {
    const {
      detail: { entry },
    } = event;

    activeImg = entry;
    debugger;
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
    margin: 0;
  }
</style>

<div class="gallery-lightbox-overlay" class:is-open={lightBoxOpen} />
<div class="gallery-lightbox" on:lightbox-select={selectLightboxPicture}>
  <picture>
    <img src={activeImg && activeImg.src} alt="Text for the alt tag" />
  </picture>
</div>
