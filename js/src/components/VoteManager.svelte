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
  $: votes = user?.votes || Array(5)
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
      margin: 8px auto;
    }
  }
</style>

<div class="vote-container">
  {#each votes as vote}
 	 <span class="vote-holder">
	  {vote?.piece_id}
	  </span>
  {/each}

  <FloatingSubmitButton />
</div>
