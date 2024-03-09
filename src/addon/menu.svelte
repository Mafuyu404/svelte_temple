<script>
  import { fade, scale } from "svelte/transition";
  import { Admin } from "../store";

  let content = [];
  let x;
  let y;
  let display = false;

  const menu = {
    content: function (info) {
      content = info;
      return this;
    },
    at: function (e) {
      x = e.x;
      y = e.y;
      display = true;
    },
    close: function () {
      display = false;
    },
  };

  $Admin.menu = menu;
</script>

{#if display}
  <div
    class="menu"
    style="left:{x}px;top:{y}px;"
    in:fade={{ duration: 100 }}
    out:fade={{ duration: 100 }}
  >
    {#each content as c}
      <txt on:click={c.handle}>{c.display}</txt>
    {/each}
  </div>
{/if}

<style>
  .menu {
    padding: 5px;
    position: absolute;
    z-index: 10;
    overflow: hidden;
    width: 180px;
    border-radius: 9px;
    backdrop-filter: blur(6px);
    background: rgba(255, 255, 255, 0.7);
    box-shadow:
      0 4px 8px 0 rgb(0 0 0 / 20%),
      0 3px 10px 0 rgb(0 0 0 / 19%);
    transition: 0.1s;
    font-family: normal;
  }
  .menu txt {
    display: flex;
    align-items:center;
    font-size: 18px;
    color: #666;
    border-bottom: 2px solid #acacac;
    margin: 0px 7px;
    line-height: 32px;
    cursor: pointer;
    transition: 0.3s;
  }
  .menu txt:nth-last-child(1) {
    border-bottom: none;
  }
  .menu txt:hover {
    background-color: #ffffffa8;
  }
  .menu txt::before {
    content: "";
    display: inline-block;
    margin: 10px;
    background-color: #888;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transition: 0.4s;
  }
  .menu txt:hover:before {
    transform: rotate(405deg);
    border-radius: 0;
  }
</style>
