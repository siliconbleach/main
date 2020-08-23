<script>
  const MAX_VOTES_ALLOWED = 5;
  export let votes;

  $: votesRemaining = MAX_VOTES_ALLOWED - votes.length;
</script>

<style lang="postcss">

</style>

<form>
  <button id="submitvotes-button">
    Submit Votes
    <span />
  </button>
</form>
