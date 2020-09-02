<script>
  import { onMount } from "svelte/internal";

  import VoteManager from "./components/VoteManager.svelte";
  import ContestGallery from "./components/ContestGallery.svelte";

  const API_URL = "https://artofkoko.com";
  const ARTJAM_ID = 5;
  const MAX_VOTES = 5;

  let count = 0;

  export let user = {
    votes: Array(5),
  };

  $: remaining = MAX_VOTES - user.votes.length;

  const getContest = async (id) => await fetch(`${API_URL}/api/artjam/${id}`);
  let pictureVoter = {};
  let contest = {};
  const handleToggle = (event) => {
    const {
      detail: { entry },
    } = event;

    const newValue = !pictureVoter[entry.id];

    pictureVoter[entry.id] = newValue;
    return newValue;
  };
  onMount(() => {
    getContest(ARTJAM_ID)
      .then((res) => res.json())
      .then((data) => (contest = data));
  });
</script>

<style lang="postcss">

</style>

<VoteManager {user} on:togglevote={handleToggle} />
<ContestGallery {contest} on:togglevote={handleToggle} />
