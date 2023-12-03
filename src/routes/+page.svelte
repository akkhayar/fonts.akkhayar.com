<script lang="ts">
    import { generateImportURL } from "$lib";
    import NavBar from "$lib/NavBar.svelte";
    import fonts from "$lib/fonts";
</script>

<div class="mx-12">
    <NavBar title="Fonts" />

    <section>
        <div class="search-bar">
            <input class="ps-2" type="text" placeholder="Search Fonts" />
            <span class="hotkey">Ctrl + F</span>
        </div>
    </section>

    {#each fonts as font}
        <a href="/preview/{font}">
            <div class="font-card mt-5 grid grid-cols-2">
                <h2>{font}</h2>
                <span>See more</span>
            </div>
        </a>
    {/each}
</div>

<style>
    .search-bar {
        padding: 0.4em !important;
        cursor: pointer;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        white-space: nowrap;
        background: var(--background-color);
        color: var(--foreground-color);
        border-radius: 6px;
        border: 1px solid var(--border-color);
        font-size: 14px;
    }

    .search-bar .hotkey {
        padding: 4px;
        font-size: 11px;
        font-weight: bold;
        background: var(--background-color);
        color: var(--foreground-light-color);
        border-radius: 6px;
        border: 1px solid var(--border-color);
        font-family: Consolas;
    }

    .search-bar input {
        border: none;
        outline: none;
        background: transparent;
        color: var(--foreground-color);
        font-size: 14px;
        width: 100%;
    }

    .font-card {
        padding: 3em !important;
        cursor: pointer;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        white-space: nowrap;
        background: var(--background-color);
        color: var(--foreground-color);
        border: 1px solid var(--foreground-light-color);
        font-size: 14px;
    }
</style>
