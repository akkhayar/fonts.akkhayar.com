<script lang="ts">
  import * as Select from "$lib/components/ui/select";
  import * as Accordion from "$lib/components/ui/accordion";
  import { generateImportURL } from "$lib";
  import { cleanName } from "$lib/utils";
  import { Code } from "lucide-svelte";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import Button from "$lib/components/ui/button/button.svelte";

  export let fontFamily: string;

  const importUrl = generateImportURL([{ family: fontFamily }]);
  const linkCode = `<link href=${importUrl} rel="stylesheet" />`;
  const importCode = `@import url("${importUrl}");`;
</script>

<div class="py-10 border-b-2">
  <div class="mx-10">
    <div class="mb-2 grid grid-cols-2">
      <div>
        <span class="me-3 text-lg">{cleanName(fontFamily)}</span>
        <Badge variant="outline">ပန်းစာ</Badge>
      </div>
      <Select.Root>
        <Select.Trigger class="text-xs">
          <Select.Value placeholder="Weight" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="light">Light</Select.Item>
          <Select.Item value="regular">Regular</Select.Item>
          <Select.Item value="bold">Bold</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
    <div>
      <div class="my-lang mb-3 flex">
        <textarea
          class="w-full outline-none text-6xl my-lang"
          style="font-family: {fontFamily}, 'serif';"
          value="လူဦးရေ ၃၈သန်းကျော်ခန့်သည် မြန်မာဘာသာစကားကို မိခင်ဘာသာစကား အနေဖြင့် အသုံးပြု့သည်။"
        />
      </div>
    </div>

    <Accordion.Root class="w-full pb-1 pe-10">
      <Accordion.Item value="item-1" class="border-none">
        <Accordion.Trigger class="text-sm font-normal"
          >Inspect Code</Accordion.Trigger
        >
        <Accordion.Content class="rounded-md border-black pb-2">
          You can import the font into your project through the HTML link tag or
          CSS import.
          <div class="mt-2 grid grid-cols-2">
            <div>
              <span class="font-bold">HTML Link Tag</span>
              <div
                class="flex items-center justify-between text-gray-800 border border-gray-800 bg-white max-w-sm font-mono text-sm py-3 px-4 w-full rounded-md"
              >
                <span>{linkCode}</span>
              </div>
            </div>
            <div>
              <span class="font-bold">CSS Import</span>
              <div
                class="flex items-center justify-between text-gray-800 border border-gray-800 bg-white max-w-sm font-mono text-sm py-3 px-4 w-fit rounded-md"
              >
                <span>{importCode}</span>
              </div>
            </div>
          </div>

          <Button class="my-2">
            <Code class="mr-2 h-4 w-4" />
            See More & Compare
          </Button>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  </div>
</div>
