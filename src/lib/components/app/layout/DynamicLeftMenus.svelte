<script>
    import {
        DURATION_TRANSITION_LEFT_MENU,
        TRANSITION_LEFT_MENU_X,
    } from "$lib/js/client/common/constants.transitions.client.common";
    import { getStore } from "$lib/js/client/common/util.client.common";
    import { cubicInOut } from "svelte/easing";
    import { fly } from "svelte/transition";

    const openDynamicLeftMenus = getStore("openDynamicLeftMenus");
</script>

{#each $openDynamicLeftMenus as menu}
    <article
        class="left-menu-wrapper dynamic-left-menu-wrapper b-box p-f t-0 w-h-100 p-d background-color o-y-scroll"
        transition:fly={{
            x: TRANSITION_LEFT_MENU_X,
            opacity: 0,
            duration: DURATION_TRANSITION_LEFT_MENU,
            easing: cubicInOut,
        }}
    >
        <svelte:component this={menu.component} {...menu.props} />
    </article>
{/each}

<style>
    .left-menu-wrapper {
        z-index: 9999;

        max-width: min(calc(87.5% - var(--main-h-padding) * 2), 25rem);

        /* border-top-right-radius: calc(var(--border-radius) - 0.25rem);
        border-bottom-right-radius: calc(var(--border-radius) - 0.25rem); */
    }

    .dynamic-left-menu-wrapper {
        left: 0;
    }
</style>
