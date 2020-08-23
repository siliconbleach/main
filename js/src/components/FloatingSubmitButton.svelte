<script>
  const MAX_VOTES_ALLOWED = 5;
</script>

<style lang="postcss">
  #vote-submission {
    position: fixed;
    left: 3%;
    bottom: 2%;

    & #submitvotes-button {
      background: rgba(0, 0, 0, 0.6);
      appearance: none;
      border: none;
      padding: 0.75rem;
      color: #fff;
      border-radius: 0.25rem;
      font-size: 20px;
    }
  }
</style>

<form id="vote-submission">
  <button id="submitvotes-button">
    Submit Votes
    <span />
  </button>
</form>
