<script>
  export let activeImg = null;
</script>

<style lang="postcss">

</style>

<div class="gallery-lightbox-overlay" />
<div class="gallery-lightbox">
  <picture>
    <img src={activeImg && activeImg.src} alt="Text for the alt tag" />
  </picture>
</div>
