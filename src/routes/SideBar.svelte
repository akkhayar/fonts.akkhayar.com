<script lang="ts">
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
  import Label from "$lib/components/ui/label/label.svelte";

  export let styles: { fontFamily: string; name: string }[];
</script>

<div class="w-60 pt-5 pe-4 ps-10 h-screen sticky top-5 border-r border-black">
  <h1 class="font-bold text-lg mb-3">စတိုင်အုပ်စုများ</h1>
  {#each styles as style}
    <div class="flex items-center my-2">
      <Checkbox class="me-1" id="terms" aria-labelledby="terms-label" />
      <Label
        id="terms-label"
        for="terms"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        style="font-family: {style.fontFamily}, 'serif';"
      >
        {style.name}
      </Label>
    </div>
  {/each}
</div>
