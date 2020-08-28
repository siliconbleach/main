<script>
  import FloatingSubmitButton from "./FloatingSubmitButton.svelte";
  const CDN_BASE_URL = 'https://assets.artofkoko.com/artjam/5/';
  
  const INITIAL_VOTE = {
    user_id: null,
    piece_id: 0
  };

  
  
  export const user = {votes:[]};
  $: votes = $$props.user.votes;
</script>

<style lang="postcss">
  .vote-container {
    position: fixed;
    bottom: 8px;
    left: 8px;

    display: flex;
    flex-direction: row;
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
      margin: 0.5rem auto;
      position: relative;
      overflow: hidden;

      img {
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: auto;
        max-height: 100%;
      }
    }
  }
</style>

<div class="vote-container">

  {#each votes as vote}

 	 <div class="vote-holder">
	  {vote?.piece_id}
    <img src={`${CDN_BASE_URL}/${vote.piece_id}.jpg`} alt="Artjam entry vote thumbnail" />
	  </div>
    {:else}
      <span>No votes yet, what are you waiting for?</span>
  {/each}

  <FloatingSubmitButton />
</div>
