<script>
  import { onMount } from "svelte/internal";
  import VoteManager from "./components/VoteManager.svelte";

  export let user = {
    votes: Array(5)
  };

  onMount(() => {
    console.log("Mounted");
  });
</script>

<style lang="postcss">

</style>

<VoteManager {user} />
