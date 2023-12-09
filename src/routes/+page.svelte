<script lang="ts">
    import { generateImportURL } from "$lib";
    import NavBar from "$lib/NavBar.svelte";
    import fonts from "$lib/fonts";

    // ပန်းစာ
    // ရိုးရှင်း

    function revealCode() {
        // const modal = document.querySelector("#modal");
        // modal!.classList.toggle("hidden");
    }

    const families: any[] = fonts
        .map((font) => {
            let family: string;
            let weight = "";
            if (font.includes("-")) {
                family = font.split("-")[0];
                weight = font.split("-")[1];
            } else {
                family = font;
            }

            if (
                !["regular", "bold", "light", ""].includes(weight.toLowerCase())
            ) {
                return;
            }

            return {
                family: encodeURI(family),
                weights: weight ? [weight] : undefined,
            };
        })
        .filter((f) => f !== undefined);

    const fontsImportUrl = generateImportURL(families);
</script>

<link href={fontsImportUrl} rel="stylesheet" />
<link href="/my-lang.css" rel="stylesheet" />
<div class="mx-3 md:mx-9">
    <NavBar title="Fonts" />

    <section>
        <div
            class="p-2 cursor-pointer text-left flex justify-between items-center whitespace-nowrap rounded border-solid border"
            style="border-color: var(--border-color);"
        >
            <input
                class="ps-2 border-none w-full text-sm outline-none"
                type="text"
                placeholder="Search Fonts"
            />
            <span
                class="p-0.5 text-sm font-bold w-fit rounded border-solid border"
                style="border-color: var(--foreground-light-color); color: var(--foreground-light-color);"
                >Ctrl + F</span
            >
        </div>
    </section>

    <div id="modal" class="hidden"></div>

    <section class="mt-5 flex">
        <div class="border border-solid me-5 w-60 p-4 h-screen sticky top-5">
            <div class="flex items-center mb-4">
                <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                    for="default-checkbox"
                    class="ms-2 text-sm font-medium"
                    style="font-family: 'PaohDragonApp', serif;">ပန်းစာ</label
                >
            </div>
            <div class="flex items-center">
                <input
                    checked
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    class="w-3 h-3 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                    for="checked-checkbox"
                    class="ms-2 text-sm font-medium"
                    style="font-family: 'MyanmarCensus', serif;"
                    >ရိုးရှင်း</label
                >
            </div>
        </div>
        <div>
            {#each fonts as font}
                <div
                    class="p-7 md:p-10 grid grid-cols-1 md:grid-cols-4 border-solid border text-sm"
                >
                    <h2>{font}</h2>
                    <div
                        class="mt-5 my-lang md:mt-0 flex align-center col-span-2"
                    >
                        <!-- <p style="font-size: 20px;">
                            လူခပ်သိမ်း၏ မျိုးရိုးဂုဏ်သိက္ခာနှင့်တကွ...
                        </p> -->
                        <p
                            style="font-family: '{font}', sans-serif; font-size: 20px;"
                        >
                            လူခပ်သိမ်း၏ မျိုးရိုးဂုဏ်သိက္ခာနှင့်တကွ
                            လူတိုင်းအညီအမျှခံစားခွင့်ရှိသည့်
                            အခွင့်အရေးများကို...
                        </p>
                    </div>
                    <button on:click={revealCode} class="mt-4 md:mt-0 ms-auto">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            viewBox="0 0 256 256"
                            ><path
                                fill="currentColor"
                                d="M140 176a4 4 0 0 1-4 4a12 12 0 0 1-12-12v-40a4 4 0 0 0-4-4a4 4 0 0 1 0-8a12 12 0 0 1 12 12v40a4 4 0 0 0 4 4a4 4 0 0 1 4 4Zm-16-84a8 8 0 1 0-8-8a8 8 0 0 0 8 8Zm104 36A100 100 0 1 1 128 28a100.11 100.11 0 0 1 100 100Zm-8 0a92 92 0 1 0-92 92a92.1 92.1 0 0 0 92-92Z"
                            /></svg
                        >
                    </button>
                </div>
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
