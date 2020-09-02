<script>
  import { createEventDispatcher } from "svelte";
  const MAX_VOTES_ALLOWED = 5;
  export let hasChanged = false;

  const dispatch = createEventDispatcher();

  export const votes = Array(5);

  const handleSubmit = dispatch("submitVotes", {
    votes,
  });
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
    opacity: 0;
    visibility: hidden;
    transition: all 0.75s ease-in-out;
  }

  #submitvotes-button.is-shown {
    opacity: 1;
    visibility: visible;
  }
</style>

<form id="vote-submission" on:submit={handleSubmit}>
  <button id="submitvotes-button" class:isShown={hasChanged} type="submit">
    Submit Votes
  </button>
</form>
