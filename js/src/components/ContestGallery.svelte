<script>
  import GalleryLightbox from "./GalleryLightbox.svelte";

  import { createEventDispatcher } from "svelte";
  const CDN_BASE_URL = "https://assets.artofkoko.com/artjam/5";
  export let contest = {
    entries: [],
  };

  let activeItem = null;

  $: contest = $$props.contest;

  const dispatch = createEventDispatcher();

  const toggleVote = (entry) => dispatch("togglevote", { entry });
  const activateItem = (entry) => {
    entry.src = `${CDN_BASE_URL}/${entry.id}.jpg`;
    activeItem = entry;
  };

  const closeOverlayByKey = (event) => {
    console.log("Hit");

    if (event.keyCode === 13) {
      activeItem = null;
    }

    return false;
  };
</script>

<style lang="postcss">
  .artjam-gallery-container {
    display: grid;
    grid-template-columns: 49vw 49vw;
    margin: 0 auto;
    width: 100%;
    position: relative;
  }

  .artjam-entry {
    display: flex;
    width: 100%;
    max-width: 49vw;
    background-color: lightslategray;
    color: white;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin: 1rem auto;
  }

  @media all and (min-width: 960px) {
    .artjam-gallery-container {
      grid-template-columns: repeat(4, 23vw);
      grid-column-gap: 1vw;
      max-width: 960px;
    }

    .artjam-entry {
      max-width: 23vw;
    }
  }
</style>

<div class="artjam-gallery-container">
  <GalleryLightbox {activeItem} on:keypress={closeOverlayByKey} />
  {#if contest.entries}
    {#each contest.entries as entry}
      <button class="artjam-entry" on:click={() => activateItem(entry)}>
        {entry.name}
      </button>
    {/each}
  {/if}
</div>
