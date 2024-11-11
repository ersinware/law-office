<script>
    import { goto } from "$app/navigation";
    import { TRANSITION_PAGE } from "$lib/js/client/common/constants.transitions.client.common";
    import { performRippleEffectForButtonAndWait } from "$lib/js/client/common/util.client.common";
    import { fly } from "svelte/transition";

    async function goHome(event) {
        event.preventDefault();

        const href = event.currentTarget.href;

        await performRippleEffectForButtonAndWait(event);
        goto(href, { replaceState: true });
    }
</script>

<svelte:head>
    <title
        >Sayfa Bulunamadı | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale</title
    >
</svelte:head>

<div class="flex f-column a-i-c j-c-c g-v-d page-p-v-d p-h-d" in:fly={TRANSITION_PAGE}>
    <img src="/error.svg" alt="Sayfa Bulunamadı" />

    <h1 class="small-section-title t-a-c">
        Aradığınız Sayfa <br /> Bulunamadı...
    </h1>

    <a href="/" class="button small-button" on:click={goHome}>ANASAYFA</a>
</div>

<style>
    img {
        max-width: 50rem;
    }
</style>
