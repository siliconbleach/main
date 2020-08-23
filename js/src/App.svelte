<script>
  import { onMount } from "svelte/internal";
  import VoteManager from "./components/VoteManager.svelte";
  import FloatingSubmitButton from "./components/FloatingSubmitButton.svelte";
  export let user = {
    votes: []
  };

  onMount(() => {});
</script>

<style lang="postcss">

</style>

<VoteManager {user} />
<FloatingSubmitButton {user} />
