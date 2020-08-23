<script>
  const MAX_VOTES_ALLOWED = 5;
  export let user = {
    votes: []
  };
  export let votes = Array(5);

  $: votesRemaining = MAX_VOTES_ALLOWED - user.votes.length;
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
    z-index: 111111111110;
    left: 1%;
    bottom: 2%;
  }
</style>

<form>
  <button id="submitvotes-button">
    Submit Votes
    <span />
  </button>
</form>
