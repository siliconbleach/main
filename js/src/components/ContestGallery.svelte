<script>
  import { createEventDispatcher } from "svelte";
  export let contest = {
    entries: [],
  };

  $: contest = $$props.contest;

  const dispatch = createEventDispatcher();

  const toggleVote = (entry) => dispatch("togglevote", { entry });
</script>

<style lang="postcss">
  .artjam-gallery-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 auto;
    width: 100%;
  }

  .artjam-entry {
    display: flex;
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
      max-width: 960px;
    }

    .artjam-entry {
      max-width: 23vw;
      width: 100%;
    }
  }
</style>

<div class="artjam-gallery-container">
  {#if contest.entries}
    {#each contest.entries as entry}
      <button class="artjam-entry" on:click={() => toggleVote(entry)}>
        {entry.name}
      </button>
    {/each}
  {/if}
</div>
