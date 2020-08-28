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
  }
</style>

<div class="artjam-gallery-container">
  {#each contest?.entries as entry}
    <span>{entry.name} - {entry.artist}</span>
  {/each}
</div>
