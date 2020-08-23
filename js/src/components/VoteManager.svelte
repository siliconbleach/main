<script>
  import FloatingSubmitButton from "./FloatingSubmitButton.svelte";

  const INITIAL_VOTE = {
    user_id: null,
    piece_id: 0
  };
  export let user = {
    votes: []
  };

  debugger;
</script>

<style lang="postcss">

</style>

<div class="vote-container">
  {#each user.votes as vote}{vote}{/each}
</div>
