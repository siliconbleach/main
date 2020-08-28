<script>
  import { onMount } from "svelte/internal";
  import VoteManager from "./components/VoteManager.svelte";

  const API_URL = "https://artofkoko.com";
  export let user = {
    votes: Array(5)
  };

  const getPieces = async () => {
    const response = await fetch(`${API_URL}/api/artjam`).then(res =>
      res.json()
    );
    return response;
  };

  onMount(() => {});
</script>

<style lang="postcss">

</style>

<VoteManager {user} />
