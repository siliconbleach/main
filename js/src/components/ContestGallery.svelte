<script>
  import { createEventDispatcher } from "svelte";
  export let contest = {
    entries: [],
  };

  const dispatch = createEventDispatcher();

  const toggleVote = (entry) => {
    console.log("Toggle-vote being dispatched");
    dispatch("toggle-vote", {
      entry,
    });
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
    max-width: 23vw;
    background-color: lightslategray;
    color: white;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin: 1rem auto;
  }
</style>

<div class="artjam-gallery-container">
  {#each contest?.entries as entry}
    <button class="artjam-entry" on:click={toggleVote(entry)}>
      {entry.name}
    </button>
  {/each}
</div>
