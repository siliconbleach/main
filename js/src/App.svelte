<script>
  import { onMount } from "svelte/internal";
  import VoteManager from "./components/VoteManager.svelte";

  export let user = {
    votes: []
  };

  onMount(() => {});
</script>

<style lang="postcss">

</style>

<VoteManager {user} />
