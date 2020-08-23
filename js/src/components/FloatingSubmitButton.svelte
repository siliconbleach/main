<script>
  const MAX_VOTES_ALLOWED = 5;
  export let votes;

  $: votesRemaining = MAX_VOTES_ALLOWED - votes.length;
</script>

<style lang="postcss">
  #submitvotes-button {
    background: rgba(0, 0, 0, 0.6);
    appearance: none;
    border: none;
    padding: 0.75rem;
    color: #fff;
    border-radius: 0.25rem;
    font-size: 20px;
    position: fixed;
    bottom: 24px;
    z-index: 111111111110;
	left: 1%
	bottom: 2%;
  }
</style>

<form>
  <button id="submitvotes-button">
    Submit Votes
    <span />
  </button>
</form>
