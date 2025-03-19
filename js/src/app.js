$(document).ready(function () {
  $("#block-yui_3_17_2_1_1587646755522_24810 .slide").append(
    '<button class="vote-button" id="vote button">    &uarr; SELECT     &uarr;</button'
  );

});

import App from "./App.svelte";

((window) => {
  const isJamPage = window.location.pathname === "/jam";
  const hasDevCookie = cookie.get("jamDev") === "true";

  const urlParams = new URLSearchParams(window.location.search);

  const API_URL = "https://artofkoko.com";

  const YUI_PREFIX = "yui_";
  let yui_gallery_id = "";
  let settings = { user: { votes: [] } };

  const buttonTemplate = `<button class="artjam-vote-button" type="button">Vote</button>`;
  const svelteRoot = `<div id="jam-app"></div>`;

  $(document).on("ready", function () {
  

    $("body").append(svelteRoot);

    const app = new App({
      target: document.getElementById("jam-app"),
      props: {
        user: settings.user,
      },
    });

    const $slides = Array.from(document.querySelectorAll(".slide"));
    yui_gallery_id = $slides[0].id.split("_");
    yui_gallery_id =
      yui_gallery_id.slice(1, yui_gallery_id.length - 1).join("_") + "_";

    $(".image-slide-anchor").append(buttonTemplate);



  });
})(window);
