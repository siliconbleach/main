<script>
  import { onMount } from "svelte/internal";
  import VoteManager from "./components/VoteManager.svelte";

  const API_URL = "https://artofkoko.com";
  const ARTJAM_ID = 5;
  export let user = {
    votes: Array(5)
  };

  const getPieces = async id => await fetch(`${API_URL}/api/artjam/${id}`);

  onMount(() => {});
</script>

<style lang="postcss">

</style>

<VoteManager {user} />
