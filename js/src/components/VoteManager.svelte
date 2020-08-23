<script>
  const INITIAL_VOTE = {
    user_id: null,
    piece_id: 0
  };
  export let votes = [];
</script>

<style lang="postcss">

</style>

<div class="vote-container">
  {#each votes as vote}{vote}{/each}
</div>
