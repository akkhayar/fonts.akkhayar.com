<script lang="ts">
  import { generateImportURL } from "$lib";
  import NavBar from "$lib/NavBar.svelte";
  import fonts from "$lib/fonts";
  import FontCard from "./FontCard.svelte";
  import { createSearchStore, searchHandler } from "$lib/stores/search";
  import { onDestroy } from "svelte";
  import { writable } from "svelte/store";
  // import Slider from "$lib/components/ui/slider/slider.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  // import * as Select from "$lib/components/ui/select";
  // import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
  // import { AlignCenter, AlignLeft, AlignRight } from "lucide-svelte";

  type FontFamily = {
    family: string;
    weights: string[] | undefined;
  };

  const registeredFontFamilies = fonts
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

  const updateSearchStore = (font: string) => {
    searchStore.update((model) => {
      return {
        ...model,
        search: font,
      };
    });
  };
  let searchValue = writable("");
  searchValue.subscribe((value) => updateSearchStore(value));

  let selectedFontColor = writable("Black");

  const importAllFonts = generateImportURL(registeredFontFamilies);

  const styles = {"ပန်းစာ": "floral", "ရိုးရှင်း": "clean", "အပျော်အပျက်": "playful", "အပျံစား": "funk", "လက်ရေး": "handwriting", "တင့်တယ်": "elegant", "ခေတ်ပြိုင်": "contemporary"};

  onDestroy(() => {
    unsubscribe();
  });
</script>

<link href={importAllFonts} rel="stylesheet" />
<link href="/my-lang.css" rel="stylesheet" />
<div>
  <NavBar />
  <div id="modal" class="hidden"></div>
  <div class="w-full">
    <div
      class="ps-10 py-5 mb-2 border-b-2 border-gray-300 bg-white sticky top-0"
    >
      <Input
        class="max-w-xs x"
        placeholder="Search fonts..."
        bind:value={$searchValue}
      />
      <!-- <Slider about="Font Size" value={[33, 11]} max={280} step={1} /> -->
      <!-- <div class="w-fit">
        <ToggleGroup.Root type="single">
          <ToggleGroup.Item value="bold" aria-label="Toggle bold">
            <AlignLeft class="h-4 w-4" />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="italic" aria-label="Toggle italic">
            <AlignCenter class="h-4 w-4" />
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="strikethrough"
            aria-label="Toggle strikethrough"
          >
            <AlignRight class="h-4 w-4" />
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>
      <Select.Root multiple>
        <Select.Trigger class="text-xs">
          <Select.Value placeholder="Select Styles" />
        </Select.Trigger>
        <Select.Content>
          {#each Object.keys(styles) as style}
            <Select.Item value={style} aria-selected
              >{style}</Select.Item
            >
          {/each}
        </Select.Content>
      </Select.Root>
      <Select.Root>
        <Select.Trigger class="text-xs">
          <Select.Value placeholder="Font Color" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="Black" aria-selected
            ><div class="w-4 h-4 bg-black rounded-md" /></Select.Item
          >
          <Select.Item value="Blue"
            ><div class="w-4 h-4 bg-blue-300 rounded-md" /></Select.Item
          >
          <Select.Item value="Red"
            ><div class="w-4 h-4 bg-red-300 rounded-md" /></Select.Item
          >
          <Select.Item value="Green"
            ><div class="w-4 h-4 bg-green-300 rounded-md" /></Select.Item
          >
        </Select.Content>
      </Select.Root> -->
    </div>
    {#each $searchStore.filtered as font}
      <FontCard fontFamily={font} />
    {:else}
      <p class="ms-10">ရှာလို့မတွေ့ဘူး‌ဗျ :(</p>
    {/each}
  </div>
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
