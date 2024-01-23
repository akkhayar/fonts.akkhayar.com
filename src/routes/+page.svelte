<script lang="ts">
  import { generateImportURL } from "$lib";
  import NavBar from "$lib/NavBar.svelte";
  import fonts from "$lib/fonts";
  import FontCard from "./FontCard.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import { createSearchStore, searchHandler } from "$lib/stores/search";
  import { onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import SideBar from "./SideBar.svelte";
  // ပန်းစာ
  // ရိုးရှင်း

  type FontFamily = {
    family: string;
    weights: string[] | undefined;
  };

  const families = fonts
    .map((font) => {
      let family: string;
      let weight = "";
      if (font.includes("-")) {
        family = font.split("-")[0];
        weight = font.split("-")[1];
      } else {
        family = font;
      }

      if (!["regular", "bold", "light", ""].includes(weight.toLowerCase())) {
        return;
      }

      return {
        family: encodeURI(family),
        weights: weight ? [weight] : undefined,
      };
    })
    .filter((f) => f !== undefined) as FontFamily[];

  const searchStore = createSearchStore(fonts);
  const unsubscribe = searchStore.subscribe((model) => {
    searchHandler(model);
  });

  let searchValue = writable("");
  searchValue.subscribe((value) => updateSearchStore(value));

  function updateSearchStore(font: string) {
    searchStore.update((model) => {
      return {
        ...model,
        search: font,
      };
    });
  }

  const fontsImportUrl = generateImportURL(families);

  const styles = [
    {
      fontFamily: "PaohDragonApp",
      name: "ပန်းစာ",
    },
    {
      fontFamily: "MyanmarCensus",
      name: "ရိုးရှင်း",
    },
  ];
  let checked = true;

  onDestroy(() => {
    unsubscribe();
  });
</script>

<link href={fontsImportUrl} rel="stylesheet" />
<link href="/my-lang.css" rel="stylesheet" />
<div>
  <NavBar />

  <div id="modal" class="hidden"></div>

  <section class="flex">
    <!-- <SideBar {styles} /> -->
    <div class="mx-10 w-full">
      <div class="py-5 mb-2 border-b-2 border-gray-300 bg-white sticky top-0 ">
      <Input
        class="max-w-xs x"
        placeholder="Search fonts..."
        bind:value={$searchValue}
      />
    </div>

      {#each $searchStore.filtered as font}
        <FontCard fontFamily={font} />
      {/each}
    </div>
  </section>
</div>

<style>
  #modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
</style>
