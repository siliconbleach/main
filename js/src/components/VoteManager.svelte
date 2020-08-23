<script>
  import FloatingSubmitButton from "./FloatingSubmitButton.svelte";

  const INITIAL_VOTE = {
    user_id: null,
    piece_id: 0
  };
  export let user = {
    votes: []
  };

  $: user.votes;
  $: votes = user.votes;
</script>

<style lang="postcss">
  .vote-container {
    position: fixed;
    bottom: 8px;
    left: 8px;

    display: flex;
    flex-direction: row;
  }

  .vote-holder {
    width: 64px;
    height: 64px;

    border: 2px inset #fff;
    border-radius: 6px;
    margin: 0 8px;
  }

  @media screen and (min-width: 768px) {
    .vote-container {
      flex-direction: column;
    }

    .vote-holder {
      margin: 0.5rem auto;
    }
  }
</style>

<div class="vote-container">

{@debug votes}
  {#each votes as vote}
 	 <span class="vote-holder">
	  {vote?.piece_id}
	  </span>
    {:else}
      <span>No votes yet, what are you waiting for?</span>
  {/each}

  <FloatingSubmitButton />
</div>
