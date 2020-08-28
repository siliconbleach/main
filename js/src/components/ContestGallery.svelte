<script>
  export let contest = {
    entries: [],
  };
</script>

<style lang="postcss">
  .artjam-gallery-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    max-width: 960px;
  }

  .artjam-entry {
    width: 100%;
    max-width: 25vw;
    background: purple;
    border-radius: 0.5rem;
    padding: 0.5rem;
  }
</style>

<div class="artjam-gallery-container">
  {#each contest?.entries as entry}
    <button class="artjam-entry">{entry.name}</button>
  {/each}
</div>
