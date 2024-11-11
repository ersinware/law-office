<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { closeLastLeftMenu } from "$lib/js/client/app/util.left.menu.client.app";
    import { DURATION_TRANSITION_LEFT_MENU } from "$lib/js/client/common/constants.transitions.client.common";
    import { performRippleEffectAndWait } from "$lib/js/client/common/util.client.common";
    import { waitFor } from "$lib/js/common/util.common";
    import { onMount } from "svelte";

    onMount(_onMount);

    function _onMount() {
        for (const link of document.body.querySelectorAll("#left-menu a"))
            link.addEventListener("click", async (event) => {
                event.preventDefault();

                const href = event.currentTarget.href;
                await performRippleEffectAndWait(event);

                closeLastLeftMenu();
                await waitFor(DURATION_TRANSITION_LEFT_MENU);

                goto(href);
            });
    }
</script>

<article id="left-menu" class="p-r flex f-column f-s-b g-v-d for-small-screen">
    <section class="menu-items flex f-column g-v-d">
        <div class="small-t-hint unimportant-text-color">SAYFALAR</div>

        <a
            href="/"
            class="menu-item flex a-i-c g-1"
            class:active-menu-item={$page.url.pathname === "/"}
        >
            <svg
                class="menu-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                ><path
                    d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                /></svg
            >

            <div class="menu-text small-article-text">Anasayfa</div>
        </a>

        <a
            href="/hizmetlerimiz"
            class="menu-item flex a-i-c g-1"
            class:active-menu-item={$page.url.pathname === "/hizmetlerimiz" ||
                $page.url.pathname === "/hizmetlerimiz/"}
        >
            <svg
                class="menu-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                ><path
                    d="M384 32l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L398.4 96c-5.2 25.8-22.9 47.1-46.4 57.3L352 448l160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0-192 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0 0-294.7c-23.5-10.3-41.2-31.6-46.4-57.3L128 96c-17.7 0-32-14.3-32-32s14.3-32 32-32l128 0c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zm55.6 288l144.9 0L512 195.8 439.6 320zM512 416c-62.9 0-115.2-34-126-78.9c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C627.2 382 574.9 416 512 416zM126.8 195.8L54.4 320l144.9 0L126.8 195.8zM.9 337.1c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C242 382 189.7 416 126.8 416S11.7 382 .9 337.1z"
                /></svg
            >

            <div class="menu-text small-article-text">Hizmetlerimiz</div>
        </a>

        <a
            href="/ekibimiz"
            class="menu-item flex a-i-c g-1"
            class:active-menu-item={$page.url.pathname === "/ekibimiz" ||
                $page.url.pathname === "/ekibimiz/"}
        >
            <svg
                class="menu-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                ><path
                    d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3l0-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5l0 21.5c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112l32 0c24 0 46.2 7.5 64.4 20.3zM448 416l0-21.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176l32 0c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2l0 26.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3l0-84.7c-10 11.3-16 26.1-16 42.3zm144-42.3l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2l0 42.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-42.8c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112l32 0c61.9 0 112 50.1 112 112z"
                /></svg
            >

            <div class="menu-text small-article-text">Ekibimiz</div>
        </a>

        <a
            href="/makaleler"
            class="menu-item flex a-i-c g-1 pointer"
            class:active-menu-item={$page.url.pathname === "/makaleler" ||
                $page.url.pathname === "/makaleler/"}
        >
            <svg
                class="menu-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                ><path
                    d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32zm0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32zM96 144c0-26.5-21.5-48-48-48S0 117.5 0 144V368c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144H128v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48V144z"
                /></svg
            >

            <div class="menu-text small-article-text">Makaleler</div>
        </a>

        <a
            href="/hakkımızda"
            class="menu-item flex a-i-c g-1 pointer"
            class:active-menu-item={decodeURI($page.url.pathname) ===
                "/hakkımızda" ||
                decodeURI($page.url.pathname) === "/hakkımızda/"}
        >
            <svg
                class="menu-icon"
                style:margin-left="-.1rem"
                style:padding-right="-.1rem"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                ><path
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                /></svg
            >

            <div class="menu-text small-article-text">Hakkımızda</div>
        </a>

        <a
            href="/iletişim"
            class="menu-item flex a-i-c g-1 pointer"
            class:active-menu-item={decodeURI($page.url.pathname) ===
                "/iletişim" || decodeURI($page.url.pathname) === "/iletişim/"}
        >
            <svg
                class=" menu-icon"
                style:margin-top="-.1rem"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                ><path
                    d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                /></svg
            >

            <div class="menu-text small-article-text">İletişim</div>
        </a>
    </section>

    <img id="flowers" src="/flowers.svg" alt="" />
</article>

<style>
    /* #left-menu-logo {
        max-width: 15rem;
        margin-top: -1.5rem;
        margin-bottom: -1.25rem;

        aspect-ratio: 210/114;
    } */

    #left-menu {
        min-height: 100%;
    }

    .menu-icon {
        width: 1.75rem;
        height: 1.75rem;

        fill: var(--accent-color);
    }

    .active-menu-item .menu-text {
        color: var(--accent-color);
    }

    .small-t-hint {
        margin-top: var(--main-v-padding);
    }

    #flowers {
        margin-top: var(--main-v-padding);
    }

    @media (hover: hover) {
        .menu-text {
            transition: color 0.25s ease-in-out;
        }

        .menu-item:hover .menu-text {
            color: var(--accent-color);
        }

        .active-menu-item:hover .menu-text {
            color: var(--accent-color-darker);
        }
    }
</style>
