<script>
  export let contest;
</script>

<style lang="postcss">

</style>

<div class="artjam-gallery-container">
  {#each contest.entries as entry}
    <span>{entry.name} - {entry.artist}</span>
  {/each}
</div>
