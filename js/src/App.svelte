<script>
  import VoteManager from "./components/VoteManager.svelte";
  import FloatingSubmitButton from "./components/FloatingSubmitButton.svelte";
  export let user = {
    votes: []
  };
</script>

<style lang="postcss">
  .vote-container {
    display: flex;
    position: fixed;
    bottom: 8px;
    left: 8px;
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

<VoteManager {user} />
<FloatingSubmitButton {user} votes={user.votes} />
