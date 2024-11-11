<script>
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import { performRippleEffect } from "$lib/js/client/common/util.client.common";
    import {
        onMountBigScreen,
        onMountBigScreenReverse,
        removeOnMountBigScreen,
        removeOnMountBigScreenReverse,
    } from "$lib/js/client/common/util.responsive.client.common.js";
    import { onDestroy, onMount } from "svelte";

    const id = "NavigationApp";

    onMount(_onMount);

    if (browser) onDestroy(_onDestroy);

    function _onMount() {
        onMountBigScreen({
            id,
            onMount: () => {
                for (const link of document.querySelectorAll(
                    "#navigation-page > a",
                ))
                    link.addEventListener("click", onItemClick);
            },
        });

        onMountBigScreenReverse({
            id,
            reverse: () => {
                removeEventListeners();
            },
        });
    }

    function _onDestroy() {
        removeEventListeners();
        removeOnMountBigScreen(id);
        removeOnMountBigScreenReverse(id);
    }

    function onItemClick(event) {
        performRippleEffect(event);
    }

    function removeEventListeners() {
        for (const link of document.querySelectorAll("#navigation-page > a"))
            link.removeEventListener("click", onItemClick);
    }
</script>

<section
    id="navigation-page"
    class="big-screen-flex big-screen-a-i-c big-screen-j-c-c big-screen-g-h-d big-screen-h-100 for-big-screen"
>
    <a
        href="/"
        class="navigation-page-item"
        class:active-navigation-page-item={$page.url.pathname === "/"}
    >
        Anasayfa
    </a>

    <a
        href="/hizmetlerimiz"
        class="navigation-page-item"
        class:active-navigation-page-item={$page.url.pathname ===
            "/hizmetlerimiz" || $page.url.pathname === "/hizmetlerimiz/"}
    >
        Hizmetlerimiz
    </a>

    <a
        href="/ekibimiz"
        class="navigation-page-item"
        class:active-navigation-page-item={decodeURI($page.url.pathname) ===
            "/ekibimiz" || decodeURI($page.url.pathname) === "/ekibimiz/"}
    >
        Ekibimiz
    </a>

    <a
        href="/makaleler"
        class="navigation-page-item"
        class:active-navigation-page-item={$page.url.pathname ===
            "/makaleler" || $page.url.pathname === "/makaleler/"}
    >
        Makaleler
    </a>

    <a
        href="/hakkımızda"
        class="navigation-page-item"
        class:active-navigation-page-item={decodeURI($page.url.pathname) ===
            "/hakkımızda" || decodeURI($page.url.pathname) === "/hakkımızda/"}
    >
        Hakkımızda
    </a>

    <a
        href="/iletişim"
        class="navigation-page-item"
        class:active-navigation-page-item={decodeURI($page.url.pathname) ===
            "/iletişim" || decodeURI($page.url.pathname) === "/iletişim/"}
    >
        İletişim
    </a>
</section>

<style>
    @media (min-width: 65.001em) {
        .navigation-page-item {
            padding: 0.25rem;
            font-size: 0.8rem;

            color: var(--navigation-page-item-color);

            transition: color 0.25s ease-in-out;
        }

        .active-navigation-page-item {
            color: var(--active-navigation-page-item-color);
        }

        @media (hover: hover) {
            .navigation-page-item:hover {
                color: var(--active-navigation-page-item-color);
            }

            .active-navigation-page-item:hover {
                color: var(--active-navigation-page-item-color-darker);
            }
        }
    }
</style>
