<script>
  export let name;
  let votes = [];
  console.log(window.settings);
</script>

<style>
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
  <div class="vote-holder">
    <span>Piece name</span>
  </div>
  <div class="vote-holder">
    <span>Piece name</span>
  </div>
  <div class="vote-holder">
    <span>Piece name</span>
  </div>
  <div class="vote-holder">
    <span>Piece name</span>
  </div>
  <div class="vote-holder">
    <span>Piece name</span>
  </div>
</div>
