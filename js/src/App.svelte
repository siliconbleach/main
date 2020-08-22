<script>
import { current_component } from "svelte/internal";


  const INITIAL_VOTE = {
    user_id: null,
    piece_id: 0
  };
  export let user;
  export let votes;

  $: userVotes = Array(5).map((cur, i) => {
	  return user.votes[i] ?? {piece_id: 0};
  });
</script>

<style>
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

<div class="vote-container">
  {#each user.votes as vote}
    <div class="vote-holder">
      <span>{vote.piece_id}</span>
    </div>
  {/each}
</div>
