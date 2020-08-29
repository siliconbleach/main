<script>
  import { onMount } from "svelte/internal";

  import VoteManager from "./components/VoteManager.svelte";
  import ContestGallery from "./components/ContestGallery.svelte";

  const API_URL = "https://artofkoko.com";
  const ARTJAM_ID = 5;
  export let user = {
    votes: Array(5),
  };

  const getContest = async (id) => await fetch(`${API_URL}/api/artjam/${id}`);

  let contest = {};

  onMount(() => {
    getContest(ARTJAM_ID)
      .then((res) => res.json())
      .then((data) => (contest = data));
  });

  function handleToggle(event) {
    console.log(this);
    console.log(event);
    debugger;
  }
</script>

<style lang="postcss">

</style>

<VoteManager {user} on:togglevote={handleToggle} />
<ContestGallery {contest} on:togglevote={handleToggle} />
