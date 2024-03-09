<script>
  import { onMount, beforeUpdate } from "svelte";
  import { fade, scale } from "svelte/transition";
  import { Explain, setting, prop, role, Admin, dustbin, tag } from "../store";
  import Role from "../addon/role.svelte";
  import Word from "./word.svelte";

  const color = ["red", "green", "blue", "purple", "yellow", "pink", "orange"];
  let Setting = {};
  let element_bg;
  let display = "role";
  const banList = {
    byKey: [],
  };
  let selectTag = [];
  let searchKey = "";
  $: source = display == "role" ? $role : $dustbin;
  setting.subscribe(settingApply);

  readData();
  settingApply();
  window.onclick = function () {
    saveData();
    $Admin.menu.close();
  };
  window.oncontextmenu = (e) => e.preventDefault();
  window.importRole = importRole;
  $Admin.deleteRole = deleteRole;
  $Admin.recoverRole = recoverRole;

  onMount(function () {
    element_bg.oncontextmenu = function (e) {
      let content = [
        {
          display: "回收站",
          handle: (_) => (display = "dustbin"),
        },
      ];
      if (display != "role") {
        content[0] = {
          display: "角色列表",
          handle: (_) => (display = "role"),
        };
      }
      if (display == "dustbin") {
        content.push({
          display: "清空回收站",
          handle: clearDustbin,
        });
      }
      if (display == "role") {
        content.push({
          display: "设置",
          handle: (_) => (display = "word"),
        });
      }
      $Admin.menu.content(content).at(e);
    };
  });

  function settingApply() {
    let role_amount_of_line;
    if ($setting.role_amount_of_line == 3) role_amount_of_line = 1140;
    if ($setting.role_amount_of_line == 2) role_amount_of_line = 760;
    if ($setting.role_amount_of_line == 1) role_amount_of_line = 380;
    let _setting = {
      font_family: `font-family: ${$setting.font_family};`,
      role_amount_of_line: `width: ${role_amount_of_line}px;`,
      background:
        $setting.background == -1
          ? [...Array(9).keys()].rd()[0]
          : $setting.background,
    };
    Setting = _setting;
    return _setting;
  }
  function createRole() {
    $role = [
      ...$role,
      {
        avatar: "",
        prop: $prop.map((_) => "空"),
        intro: "写一个简单的介绍吧！",
        detail: "描述角色的详细情况，以及大量复杂的设定。",
        story: "过去发生过的，或是将来要发生的，对这个角色非常关键的剧情。。",
        display: "preview",
        create: new Date().getTime(),
        tag: selectTag,
      },
    ];
  }
  function deleteRole(i) {
    $dustbin = [...$dustbin, $role.splice(i, 1)[0]];
    $role = $role;
  }
  function readData() {
    let _role = localStorage.getItem("role");
    let _prop = localStorage.getItem("prop");
    let _tag = localStorage.getItem("tag");
    let _setting = localStorage.getItem("setting");
    let _dustbin = localStorage.getItem("dustbin");
    $role = _role ? JSON.parse(_role) : $role;
    $prop = _prop ? JSON.parse(_prop) : $prop;
    $tag = _tag ? JSON.parse(_tag) : $tag;
    $setting = _setting ? JSON.parse(_setting) : $setting;
    $dustbin = _dustbin ? JSON.parse(_dustbin) : $dustbin;
  }
  function saveData() {
    localStorage.setItem("role", JSON.stringify($role));
    localStorage.setItem("prop", JSON.stringify($prop));
    localStorage.setItem("tag", JSON.stringify($tag));
    localStorage.setItem("setting", JSON.stringify($setting));
    localStorage.setItem("dustbin", JSON.stringify($dustbin));
  }
  function recoverRole(i) {
    $role = [...$role, $dustbin.splice(i, 1)[0]];
  }
  function clearDustbin() {
    $dustbin = [];
  }
  function importRole(info) {
    $role = [...$role, info];
  }
  function search() {
    let res = [];
    let _source = source.map((r) => JSON.stringify(r));
    _source.forEach((r, i) => {
      if (r.indexOf(searchKey) != -1) res.push(i);
    });
    banList.byKey = source.map((_, i) => i).filter((_, i) => !res.includes(i));
    console.log(banList.byKey);
    return res;
  }
  function filterTag(i) {
    if (!selectTag.includes(i)) selectTag = [...selectTag, i];
    else selectTag = selectTag.filter((t) => t != i);
  }
  function resetFilter() {
    selectTag = [];
    banList.byKey = [];
    searchKey = "";
  }
</script>

<div
  class="body"
  style="--bg:url(/img/scene/r{$setting.background == -1
    ? [...Array(9).keys()].rd()[0]
    : $setting.background}.jpg);{Setting['font_family']}"
  in:fade={{ duration: 200 }}
  out:fade={{ duration: 200 }}
>
  <div class="bg" bind:this={element_bg}></div>
  {#if display == "role" || display == "dustbin"}
    <div
      class="filter"
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}
    >
      {#each $tag as t, i (i)}
        <txt
          class={selectTag.includes(i) && "select"}
          on:click={(_) => filterTag(i)}>{t}</txt
        >
      {/each}
      <div class="search">
        <input bind:value={searchKey} />
        <svg
          on:click={search}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
          ></path>
        </svg>
      </div>
      <div class="reset" on:click={resetFilter}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"
          ></path>
        </svg>
      </div>
    </div>
    <div class="role container" style={Setting["role_amount_of_line"]}>
      {#each source as r, i (i)}
        {#if !banList.byKey.includes(i)}
          {#if selectTag.isIncludedBy(r.tag)}
            <Role bind:role={r} index={i} dustbin={display != "role"} />
          {/if}
        {/if}
      {/each}
      {#if display == "role" && banList.byKey.length == 0}
        <div
          class="create_role"
          in:scale={{ duration: 200 }}
          out:scale={{ duration: 200 }}
        >
          <div on:click={(_) => createRole()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"
              ></path>
            </svg>
          </div>
        </div>
      {/if}
    </div>
  {/if}
  {#if display == "word"}
    <Word />
  {/if}
</div>

<style>
  .body {
    align-items: center;
    background-color: white;
    background-image: var(--bg);
    --red: rgb(255, 202, 202);
    --green: rgb(199, 255, 199);
    --blue: rgb(223, 223, 255);
    --purple: rgb(255, 214, 255);
    --yellow: rgb(255, 255, 196);
    --orange: rgb(255, 228, 177);
    --pink: rgb(255 224 240);
    color: #555;
  }
  .bg {
    height: 100%;
    width: 100%;
    position: absolute;
  }
  .role {
    flex-direction: row;
    flex-wrap: wrap;
    height: 540px;
  }
  .create_role {
    width: 360px;
    height: 250px;
    position: relative;
    margin: 10px;
  }
  .create_role > div {
    filter: drop-shadow(0 0 6px #888);
    margin: auto;
    transition: 0.4s;
    cursor: pointer;
  }
  .create_role > div:hover {
    transform: scale(1.2);
  }
  .create_role svg {
    width: 90px;
    transform: rotate(45deg);
    fill: #fff;
  }
  .filter {
    flex-direction: row;
    z-index: 1;
    margin-bottom: 10px;
  }
  .filter > txt,
  .search,
  .reset {
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.2);
    margin: 5px;
    height: 42px;
    padding: 0 10px;
  }
  .filter > txt {
    line-height: 40px;
    font-size: 20px;
    transition: 0.2s;
    cursor: pointer;
  }
  .filter > txt.select {
    transform: translateY(10px);
  }
  .reset,
  .search {
    flex-direction: row;
    align-items: center;
  }
  .search input {
    width: 150px;
    font-size: 18px;
    font-family: normal;
  }
  .reset svg,
  .search svg {
    fill: #888;
    height: 24px;
    width: 24px;
    cursor: pointer;
    transition: 0.2s;
  }
  .reset svg:active,
  .search svg:active {
    transform: scale(0.8);
  }
</style>
