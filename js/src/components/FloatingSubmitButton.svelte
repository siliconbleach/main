<script>
  const MAX_VOTES_ALLOWED = 5;
  let isSubmitButtonActive = false;


</script>

<style lang="postcss">
  #vote-submission {
    position: fixed;
    left: 3.7rem;
    bottom: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #submitvotes-button {
    background: rgba(0, 0, 0, 0.6);
    appearance: none;
    border: none;
    padding: 0.75rem;
    color: #fff;
    border-radius: 0.25rem;
	font-size: 20px;
	
	&.is-shown P
	opacity: .90;

	}
  }
</style>

<form id="vote-submission">
  <button
    id="submitvotes-button"
    class:isShowing={(this.isSubmitButtonActive))}>
    Submit Votes
  </button>
</form>
