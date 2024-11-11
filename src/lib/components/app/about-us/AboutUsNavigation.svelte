<script>
    import { browser } from "$app/environment";
    import {
        EVENT_NAVIGATION_HIDE_ARROWS,
        EVENT_NAVIGATION_LOAD,
        EVENT_NAVIGATION_SHOW_ARROWS,
        EVENT_NAVIGATION_TO_LEFT,
        EVENT_NAVIGATION_TO_RIGHT,
        EVENT_SLIDE_TO_INDEX,
        EVENT_SLIDER_INDEX_CHANGED,
    } from "$lib/js/client/app/constants.slider.client.app";
    import { DURATION_TRANSITION_PROGRESS_BAR_NAVIGATED } from "$lib/js/client/common/constants.transitions.client.common";
    import {
        getStore,
        performRippleEffectAndWait,
    } from "$lib/js/client/common/util.client.common";
    import { waitFor } from "$lib/js/common/util.common";
    import { onDestroy, onMount } from "svelte";
    import { cubicInOut } from "svelte/easing";
    import { fly } from "svelte/transition";

    export let sliderId, infinite;

    const touchable = getStore("touchable"),
        eventPostfix = "-" + sliderId;

    let loaded,
        _showArrows,
        working,
        activeIndex = 0,
        pageCount,
        disableLeftArrow = !infinite,
        disableRightArrow;

    onMount(_onMount);

    if (browser) onDestroy(_onDestroy);

    async function _onMount() {
        window.addEventListener(EVENT_NAVIGATION_LOAD + eventPostfix, load);
        window.addEventListener(
            EVENT_NAVIGATION_SHOW_ARROWS + eventPostfix,
            showArrows,
        );
        window.addEventListener(
            EVENT_NAVIGATION_HIDE_ARROWS + eventPostfix,
            hideArrows,
        );
        window.addEventListener(
            EVENT_SLIDER_INDEX_CHANGED + eventPostfix,
            onIndexChange,
        );
    }

    function _onDestroy() {
        window.removeEventListener(EVENT_NAVIGATION_LOAD + eventPostfix, load);
        window.removeEventListener(
            EVENT_NAVIGATION_SHOW_ARROWS + eventPostfix,
            showArrows,
        );
        window.removeEventListener(
            EVENT_NAVIGATION_HIDE_ARROWS + eventPostfix,
            hideArrows,
        );
        window.removeEventListener(
            EVENT_SLIDER_INDEX_CHANGED + eventPostfix,
            onIndexChange,
        );
    }

    async function load(event) {
        pageCount = event.detail.pageCount;
        activeIndex = event.detail.activeIndex;

        if (!infinite && event.detail.forResize) {
            adjustDisables();

            return;
        }

        loaded = true;

        if ($touchable) return;

        await waitFor(DURATION_TRANSITION_PROGRESS_BAR_NAVIGATED / 2);
        _showArrows = "for short time";

        await waitFor(DURATION_TRANSITION_PROGRESS_BAR_NAVIGATED * 2);
        if (_showArrows === "for short time") _showArrows = false;
    }

    function showArrows() {
        _showArrows = true;
    }

    function hideArrows() {
        _showArrows = false;
    }

    function onIndexChange(event) {
        activeIndex = event.detail.index;

        working = false;

        if (infinite) return;

        adjustDisables();
    }

    async function toLeft(event) {
        if (working) return;

        working = true;

        await performRippleEffectAndWait(event);
        window.dispatchEvent(
            new CustomEvent(EVENT_NAVIGATION_TO_LEFT + eventPostfix),
        );
    }

    async function toRight(event) {
        if (working) return;

        working = true;

        await performRippleEffectAndWait(event);
        window.dispatchEvent(
            new CustomEvent(EVENT_NAVIGATION_TO_RIGHT + eventPostfix),
        );
    }

    async function toIndex(event, _index) {
        if (working || activeIndex === _index) return;

        working = true;

        await performRippleEffectAndWait(event);
        window.dispatchEvent(
            new CustomEvent(EVENT_SLIDE_TO_INDEX + eventPostfix, {
                detail: { index: _index },
            }),
        );
    }

    function adjustDisables() {
        if (activeIndex === pageCount - 1) {
            disableRightArrow = true;
            disableLeftArrow = false;

            return;
        }

        if (activeIndex === 0) {
            disableLeftArrow = true;
            disableRightArrow = false;

            return;
        }

        disableLeftArrow = false;
        disableRightArrow = false;
    }
</script>

{#if loaded}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="wrapper p-none p-a p-c-h flex g-1dot25">
        {#if _showArrows}
            <button
                disabled={disableLeftArrow}
                on:click={toRight}
                transition:fly={{ x: "-.5rem", easing: cubicInOut }}
            >
                <svg
                    class="navigation-arrow navigation-arrow-left"
                    class:disabled-navigation-arrow={disableLeftArrow}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                >
                    <path
                        d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                    />
                </svg>
            </button>
        {/if}

        <div
            class="indicators flex a-i-c g-dot5"
            in:fly={{ y: ".5rem", easing: cubicInOut }}
        >
            {#each new Array(pageCount) as _, index}
                <button
                    class="indicator-button"
                    on:click={(event) => toIndex(event, index)}
                >
                    <div
                        class="indicator"
                        class:active-indicator={index === activeIndex}
                    ></div>
                </button>
            {/each}
        </div>

        {#if _showArrows}
            <button
                disabled={disableRightArrow}
                on:click={toLeft}
                transition:fly={{ x: ".5rem", easing: cubicInOut }}
            >
                <svg
                    class="navigation-arrow navigation-arrow-right"
                    class:disabled-navigation-arrow={disableRightArrow}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                >
                    <path
                        d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                    />
                </svg>
            </button>
        {/if}
    </div>
{/if}

<style>
    .wrapper {
        bottom: var(--main-v-padding);

        width: max-content;
        height: 2.2rem;
    }

    .navigation-arrow {
        pointer-events: all;

        width: 1rem;
        height: 1rem;
        padding: 0.6rem;

        background-color: var(--accent-color);
        fill: white;

        border-radius: 50%;

        transition-property: background-color fill;
        transition-duration: 0.25s;
        transition-timing-function: ease-in-out;
    }

    .disabled-navigation-arrow {
        pointer-events: none;
        background-color: var(--unimportant-text-color);
        fill: rgb(239, 239, 239);
    }

    .indicator-button {
        pointer-events: all;
    }

    .indicator {
        width: 1rem;
        height: 0.25rem;

        background-color: var(--unimportant-text-color);

        border-radius: 0.5rem;

        transition: background-color 0.25s ease-in-out;
    }

    .active-indicator {
        background-color: var(--accent-color);
    }

    @media (hover: hover) {
        .navigation-arrow:not(.disabled-navigation-arrow):hover {
            background-color: var(--accent-color-darker);
        }
    }
</style>
