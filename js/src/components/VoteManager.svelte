<script>
  import { afterUpdate, beforeUpdate, onMount } from "svelte";

  import FloatingSubmitButton from "./FloatingSubmitButton.svelte";
  const CDN_BASE_URL = "https://assets.artofkoko.com/artjam/5";

  const INITIAL_VOTE = {
    user_id: null,
    piece_id: 0,
  };

  export let handleSubmit = () => {
    console.log("Not overriden");
  };

  export let user = { votes: [] };

  let changeCount = 0;

  $: votes = user.votes;
  $: offset = Array(5 - votes.length);
  $: currentVotes = votes.concat(offset);
  $: hasChanged = changeCount > 0;

  const clearVote = (index) => {
    const currentVotes = votes.filter((v, i) => i !== index);
    votes = currentVotes;
  };

  afterUpdate(() => {
    changeCount += 1;
  });
</script>

<style lang="postcss">
  .vote-container {
    position: fixed;
    bottom: 8px;
    left: 8px;

    display: flex;
    flex-direction: row;
    z-index: 9999;
  }

  .vote-holder {
    width: 64px;
    height: 64px;

    border: 2px solid #fff;
    border-radius: 6px;
    margin: 0 8px;
  }

  @media screen and (min-width: 768px) {
    .vote-container {
      flex-direction: column-reverse;
    }

    .vote-holder {
      margin: 0.5rem auto;
      position: relative;
      overflow: hidden;
    }

    .vote-holder img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
      max-height: 100%;
    }

    img:hover {
      cursor: pointer;
    }
  }
</style>

<div class="vote-container">
  {#if currentVotes}
    {#each currentVotes as vote, index}
      <div class="vote-holder" on:click={() => clearVote(index)}>
        {#if vote}
          <img
            src={`${CDN_BASE_URL}/${vote.piece_id || vote.id}.jpg`}
            srcset={`${CDN_BASE_URL}/${vote.piece_id || vote.id}.png`}
            alt="Artjam entry vote thumbnail" />
        {/if}
      </div>
    {:else}<span>No votes yet, what are you waiting for?</span>{/each}
  {/if}
  {#if hasChanged}
    <FloatingSubmitButton {hasChanged} on:submitVotes={handleSubmit} />
  {/if}
</div>
