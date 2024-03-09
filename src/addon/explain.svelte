<script>
  import { fade, scale } from "svelte/transition";
  import { Explain } from "../store";

  let title;
  let detail;
  let color;
  let x;
  let y;
  let visibility = "hide";
  let E;

  $Explain = explain;
  const handle = {
    move: (e, info, c) => {
      title = info.name;
      detail = info.detail;
      color = c;
      x = document.body.clientWidth - e.x > 240 ? e.x + 5 : e.x - 240;
      y = e.y - E.offsetHeight - 5;
    },
    show: (e) => {
      visibility = "show";
      x = document.body.clientWidth - e.x > 240 ? e.x + 5 : e.x - 240;
    },
    hide: (_) => (visibility = "hide"),
  };
  function explain(element) {
    return {
      color: function (color) {
        this.Color = color;
        return this;
      },
      with: function (info) {
        let color = this.Color ? this.Color : "blue";
        this.color = false;
        element.onmouseenter = (e) => handle.show(e);
        element.onmousemove = (e) => handle.move(e, info, color);
        element.onmouseleave = (_) => handle.hide();
      },
    };
  }
</script>

{#if visibility == "show"}
  <div
    class="explain"
    style="left:{x}px;top:{y}px;visibility:{title ? 'visible' : 'hidden'}"
    bind:this={E}
    in:fade={{ duration: 100 }}
    out:fade={{ duration: 100 }}
  >
    <span style="background-color:var(--{color})">{title}</span>
    <a>{detail}</a>
  </div>
{/if}

<style>
  .explain {
    z-index: 9;
    position: fixed;
    color: white;
    text-shadow:
      0 0 3px #666,
      0 0 3px #666,
      0 0 3px #666,
      0 0 3px #666,
      0 0 3px #666,
      0 0 3px #666,
      0 0 3px #666;
    box-shadow: 0 0 5px 4px rgba(255, 255, 255, 0.5);
  }

  .explain > span {
    --blue: rgb(103, 186, 255);
    --purple: #c84df0;
    --green: #60d560;
    --red: #e55c5c;
    --gold: #ffe661;
    width: 225px;
    height: 26px;
    font-size: 18px;
    line-height: 24px;
    font-family: normal;
    padding-left: 10px;
  }

  .explain > a {
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    width: 225px;
    padding: 10px;
    font-size: 14px;
    font-family: remark;
    white-space: pre-wrap;
  }
</style>
