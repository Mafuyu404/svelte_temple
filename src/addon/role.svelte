<script>
  import { onMount, beforeUpdate } from "svelte";
  import { fade, scale } from "svelte/transition";
  import { Explain, prop, Admin, tag } from "../store";

  export let role;
  export let index;
  export let dustbin;

  const element_index = [];
  let element_role;
  role.display = "preview";

  onMount(function () {
    $Explain(element_index[0]).with({
      name: "概览",
      detail: "展示角色的大致信息。",
    });
    $Explain(element_index[1]).with({
      name: "详细设定",
      detail: "有更多的空间描述角色的详细情况，以及大量复杂的设定。",
    });
    $Explain(element_index[2]).with({
      name: "相关剧情",
      detail: "过去发生过的，或是将来要发生的，对这个角色非常关键的剧情。",
    });
    element_role.oncontextmenu = function (e) {
      let content = [
        {
          display: "删除角色",
          handle: (_) => $Admin.deleteRole(index),
        },
        {
          display: "添加标签",
          handle: (_) => addTag(e),
        },
        {
          display: "移除标签",
          handle: (_) => removeTag(e),
        },
      ];
      if (dustbin)
        content[0] = {
          display: "恢复",
          handle: (_) => $Admin.recoverRole(index),
        };
      $Admin.menu.content(content).at(e);
    };
  });
  function addTag(e) {
    let content = $tag
      .filter((_, i) => !role.tag.includes(i))
      .map((t, i) => {
        return {
          display: t,
          handle: (_) => role.tag.push(i),
        };
      });
    setTimeout((_) => $Admin.menu.content(content).at(e));
  }
  function removeTag(e) {
    let content = role.tag.map((i) => {
      return {
        display: $tag[i],
        handle: (_) => (role.tag = role.tag.filter((u) => u != i)),
      };
    });
    if (content.length == 0)
      content.push({
        display: "暂无标签",
        handle: (_) => null,
      });
    setTimeout((_) => $Admin.menu.content(content).at(e));
  }
</script>

<div
  class="role"
  in:scale={{ duration: 200 }}
  out:scale={{ duration: 200 }}
  bind:this={element_role}
  on:click={(_) => console.log(role)}
>
  <div class="index">
    {#each ["preview", "detail", "story"] as key, ii (ii)}
      <div
        class="btn"
        bind:this={element_index[ii]}
        on:click={(_) => (role.display = key)}
      ></div>
    {/each}
  </div>
  {#if role.display == "preview"}
    <div
      class="preview"
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}
    >
      <div class="main">
        <img class="avatar" src="/img/avatar.webp" />
        <div class="prop">
          {#each $prop as p, i (i)}
            <txt>
              <span>{p}</span>:&ensp;<input bind:value={role.prop[i]} />
            </txt>
          {/each}
        </div>
      </div>
      <div class="intro">
        <textarea class="container" bind:value={role.intro}></textarea>
      </div>
    </div>
  {/if}
  {#if role.display == "detail"}
    <txt class="title" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}
      >详细设定</txt
    >
    <div
      class="detail"
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}
    >
      <textarea class="container" bind:value={role.detail}></textarea>
    </div>
  {/if}
  {#if role.display == "story"}
    <txt class="title" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}
      >相关剧情</txt
    >
    <div
      class="story"
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}
    >
      <textarea class="container" bind:value={role.story}></textarea>
    </div>
  {/if}
</div>

<style>
  textarea {
    font-size: 16px;
    font-family: normal;
    color: #555;
    height: 100%;
  }
  input {
    font-size: 18px;
    font-family: normal;
    color: #555;
  }
  .role {
    background-color: rgba(255, 255, 255, 0.6);
    width: 360px;
    height: 250px;
    border-radius: 16px;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.2);
    padding: 10px;
    position: relative;
    margin: 10px;
  }
  .role .avatar {
    border-radius: 50%;
    width: 100px;
    margin-left: 10px;
  }
  .role .preview .main {
    flex-direction: row;
  }
  .role .prop {
    font-size: 18px;
    height: 100px;
    justify-content: center;
    margin-left: 10px;
  }
  .role .intro {
    width: 290px;
    height: 110px;
    margin: 10px 10px;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 5px;
  }
  .role .prop span {
    font-weight: bold;
  }
  .role .prop input {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 145px;
  }
  .role .index {
    position: absolute;
    right: 20px;
    height: 230px;
    justify-content: center;
  }
  .role .index .btn {
    background-color: #888;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 15px 0;
    cursor: pointer;
    transition: 0.4s;
  }
  .role .index .btn:hover {
    transform: scale(1.8) rotate(405deg);
    border-radius: 0;
  }
  .role .title {
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
    position: absolute;
  }
  .role .detail,
  .role .story {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.7);
    width: 290px;
    height: 185px;
    margin: 35px 10px 10px 10px;
    padding: 5px;
  }
</style>
