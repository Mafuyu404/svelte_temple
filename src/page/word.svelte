<script>
  import { onMount, beforeUpdate } from "svelte";
  import { fade, scale } from "svelte/transition";
  import { tag, prop, Admin, role, dustbin, setting } from "../store";

  let element = [];

  onMount(function () {
    element[1].onclick = (e) => console.log(e);
  });

  function menu(e, i, type) {
    $Admin.menu
      .content([
        {
          display: "删除",
          handle: (_) => {
            if (type == "prop") deleteProp(i);
            if (type == "tag") deleteTag(i);
          },
        },
      ])
      .at(e);
  }
  function createProp() {
    $role.forEach((r) => (r.prop[$prop.length] = "空"));
    $dustbin.forEach((r) => (r.prop[$prop.length] = "空"));
    $prop = [...$prop, "新属性"];
    setTimeout((_) => (element[0].scrollTop = element[0].scrollHeight + 70));
  }
  function deleteProp(i) {
    $role.forEach((r) => r.prop.splice(i, 1));
    $dustbin.forEach((r) => r.prop.splice(i, 1));
    $prop.splice(i, 1);
    $prop = $prop;
  }
  function createTag() {
    $tag = [...$tag, "新标签"];
    setTimeout((_) => (element[1].scrollTop = element[1].scrollHeight + 70));
  }
  function deleteTag(i) {
    $role.forEach((r) => (r.tag = r.tag.filter((t) => t != $tag[i])));
    $dustbin.forEach((r) => (r.tag = r.tag.filter((t) => t != $tag[i])));
    $tag.splice(i, 1);
    $tag = $tag;
  }
</script>

<div class="word" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
  <div class="prop">
    <txt class="title">属性</txt>
    <div class="container" bind:this={element[0]}>
      {#each $prop as p, i (i)}
        <input
          on:contextmenu={(e) => menu(e, i, "prop")}
          bind:value={p}
          in:scale={{ duration: 150 }}
          out:scale={{ duration: 150 }}
        />
      {/each}
    </div>
    <div class="create" on:click={createProp}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"
        ></path>
      </svg>
    </div>
  </div>
  <div class="tag">
    <txt class="title">标签</txt>
    <div class="container" bind:this={element[1]}>
      {#each $tag as t, i (i)}
        <input
          on:contextmenu={(e) => menu(e, i, "tag")}
          bind:value={t}
          in:scale={{ duration: 150 }}
          out:scale={{ duration: 150 }}
        />
      {/each}
    </div>
    <div class="create" on:click={createTag}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"
        ></path>
      </svg>
    </div>
  </div>
  <div class="env">
    <txt class="title">环境</txt>
    <div class="setting">
      <div>
        <txt>每行卡片个数:&ensp;</txt>
        <txt
          on:click={(_) =>
            ($setting.role_amount_of_line = Math.max(
              1,
              $setting.role_amount_of_line - 1,
            ))}>&ensp;-&ensp;</txt
        >
        <txt>{$setting.role_amount_of_line}</txt>
        <txt
          on:click={(_) =>
            ($setting.role_amount_of_line = Math.min(
              3,
              $setting.role_amount_of_line + 1,
            ))}>&ensp;+&ensp;</txt
        >
      </div>
      <div>
        <txt>背景图片:&ensp;</txt>
        <txt
          on:click={(_) =>
            ($setting.background = Math.max(-1, $setting.background - 1))}
          >&ensp;-&ensp;</txt
        >
        <txt>{$setting.background == -1 ? "随机" : $setting.background}</txt>
        <txt
          on:click={(_) =>
            ($setting.background = Math.min(8, $setting.background + 1))}
          >&ensp;+&ensp;</txt
        >
      </div>
    </div>
    <div class="intro">
      <txt class="head">一些说明</txt>
      <div class="content">
        <txt>此应用有自动保存，才怪，鼠标点击的时候会保存，反正按照大多数人的习惯，打完字肯定要在框外面点一下的。</txt>
        <txt>在选中标签进行筛选的时候，新建角色的按钮是还在的，点一下就可以新建一个自带选中标签的新角色哦。</txt>
        <txt>暂时不打算做移动端。</txt>
      </div>
    </div>
  </div>
</div>

<style>
  .word {
    flex-direction: row;
    z-index: 1;
    position: absolute;
  }
  .word > div {
    margin: 0 10px;
    align-items: center;
  }
  .title {
    font-size: 23px;
    margin: 10px;
    text-shadow:
      0 0 2px white,
      0 0 2px white,
      0 0 2px white,
      0 0 2px white,
      0 0 2px white,
      0 0 2px white,
      0 0 2px white;
  }
  input {
    display: block;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.2);
    margin: 5px;
    width: 200px;
    font-size: 26px;
    line-height: 60px;
    color: #555;
    text-align: center;
    font-family: normal;
    font-weight: bold;
  }
  .create {
    filter: drop-shadow(0 0 6px #888);
    transition: 0.4s;
    cursor: pointer;
    margin: 10px;
  }
  .create:hover {
    transform: scale(1.1);
  }
  .create svg {
    width: 40px;
    transform: rotate(45deg);
    fill: #fff;
  }
  .container {
    padding: 5px;
    height: 370px;
  }
  .intro,
  .setting {
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.2);
    width: 300px;
    padding: 10px;
    margin-top: 10px;
  }
  .setting > div {
    flex-direction: row;
    border-bottom: 2px solid #acacac;
    margin: 0px 7px;
    line-height: 32px;
    align-items: center;
    font-size: 18px;
  }
  .setting > div:last-child {
    border-bottom: none;
  }
  .intro > .head {
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
  }
  .intro > .content {
    background-color: rgba(255, 255, 255, 0.7);
    margin: 10px;
    font-size: 16px;
    padding: 5px;
  }
</style>
