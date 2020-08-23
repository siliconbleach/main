<script>
import VoteManager from "./components/VoteManager.svelte";


imporpt VoteManager from 'components/VoteManager';

  const INITIAL_VOTE = {
    user_id: null,
    piece_id: 0
  };
  export let user = { votes: [] };
  export let votes = Array(5).map(_ => INITIAL_VOTE);

  $: votes = user?.votes?.map((vote, i) => { 
	  return votes[i].piece_id === 0 ? vote : votes[i];
  });

  console.log(votes);


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

<div class="vote-container">
  {#each votes as vote}
    <div class="vote-holder">
      <span>{vote?.piece_id || ''}</span>
    </div>
  {/each}
</div>
