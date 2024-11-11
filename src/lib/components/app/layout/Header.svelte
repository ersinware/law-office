<script>
    import { openLeftMenu } from "$lib/js/client/app/util.left.menu.client.app";
    import { TRANSITION_PAGE } from "$lib/js/client/common/constants.transitions.client.common.js";
    import {
        onLinkClickOnNewTab,
        performRippleEffectAndWait,
    } from "$lib/js/client/common/util.client.common";
    import { fly } from "svelte/transition";
    import LeftMenuApp from "./LeftMenuApp.svelte";
    import NavigationApp from "./NavigationApp.svelte";

    async function onMenuClick(event) {
        await performRippleEffectAndWait(event);

        openLeftMenu({ id: "left-menu", component: LeftMenuApp });
    }
</script>

<div id="header-wrapper" class="b-box p-f p-c-h t-0 w-100 p-h-d">
    <header
        id="header"
        class="header b-box max-w m-h-auto"
        in:fly={TRANSITION_PAGE}
    >
        <div class="header-content p-r h-100">
            <NavigationApp />

            <div
                class="small-screen-flex small-screen-a-i-c small-screen-h-100"
            >
                <button on:click={onMenuClick} class="for-small-screen">
                    <svg
                        id="menu-icon"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4 6H20M4 12H14M4 18H9"
                            stroke="var(--menu-icon-color)"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>

            <a
                id="wp-wrapper"
                href="https://wa.me/+905523923199"
                class="p-a p-c-v r-0 flex a-i-c g-dot5"
                on:click={onLinkClickOnNewTab}
            >
                <p id="wp-text" class="smaller-t-hint">AVUKATA <br /> DANIŞ</p>

                <svg
                    id="wp-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    ><path
                        d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                    /></svg
                >
            </a>
        </div>
    </header>
</div>

<style>
    #header-wrapper {
        z-index: 100;

        backdrop-filter: blur(1rem);
    }

    #header-wrapper,
    .header {
        height: var(--header-height);
    }

    .header-content {
        background-color: var(--header-background-color);
        border-bottom: 1px solid var(--divider-color);
    }

    #wp-text {
        height: auto;
        line-height: 0.8125rem;
        margin-top: 0.1rem;

        color: var(--positive-color);

        text-align: right;
    }

    #wp-icon {
        border-radius: calc(var(--border-radius) - 0.25rem);

        background-color: var(--positive-color);
        fill: white;
    }

    @media (min-width: 65.001em) {
        #wp-icon {
            width: 1.75rem;
            height: 1.75rem;
            padding: 0.375rem;
        }
    }

    @media (max-width: 65em) {
        #menu-icon {
            --menu-icon-color: var(--accent-color);

            height: 2.5rem;
        }

        #wp-icon {
            width: 1.675rem;
            height: 1.675rem;
            padding: 0.375rem;
        }

        @media (hover: hover) {
            #menu-icon:hover {
                --menu-icon-color: var(--accent-color-darker);
            }
        }
    }

    @media (hover: hover) {
        #wp-text {
            transition: color 0.25s ease-in-out;
        }

        #wp-icon {
            transition: background-color 0.25s ease-in-out;
        }

        #wp-wrapper:hover #wp-text {
            color: var(--positive-color-darker);
        }

        #wp-wrapper:hover #wp-icon {
            background-color: var(--positive-color-darker);
        }
    }
</style>
