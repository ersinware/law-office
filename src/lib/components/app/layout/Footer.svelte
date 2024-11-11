<script>
    import { page } from "$app/stores";
    import AppointmentModal from "$lib/components/app/modals/AppointmentModal.svelte";
    import ContactModal from "$lib/components/app/modals/contact/ContactModal.svelte";
    import { TRANSITION_PAGE } from "$lib/js/client/common/constants.transitions.client.common";
    import {
        onLinkClick,
        onLinkClickOnNewTab,
        performRippleEffectAndWait,
        performRippleEffectForButtonAndWait,
    } from "$lib/js/client/common/util.client.common";
    import { openModal } from "$lib/js/client/common/util.modals.client.common.js";
    import { fly } from "svelte/transition";

    async function onAppointmentClick(event) {
        await performRippleEffectForButtonAndWait(event);

        openModal({ component: AppointmentModal, addToBackstack: true });
    }

    async function onContactFormClick(event) {
        await performRippleEffectAndWait(event);

        openModal({ component: ContactModal, addToBackstack: true });
    }
</script>

{#key $page.url.pathname}
    <footer
        class="page-p-t p-h-d secondary-background-color o-hidden page-p-b"
        in:fly={TRANSITION_PAGE}
    >
        <div
            id="footer-content"
            class="grid m-h-auto big-screen-page-gap small-screen-j-i-c"
        >
            <article class="p-r flex f-column f-s-b g-2">
                <div class="grid g-1dot5 small-screen-t-a-c">
                    <p id="hello-text" class="article-text f-w-600">
                        Mirici & Partners Avukatlık Bürosu
                    </p>

                    <div class="grid g-1">
                        <p
                            id="description"
                            class="small-article-text secondary-text-color t-a-j"
                        >
                            Çanakkale'de müvekkillerimize güvenilir ve
                            profesyonel hukuki hizmetler sunuyoruz. Geniş bir
                            yelpazede hizmet veren büromuz, müvekkillerinin
                            haklarını en iyi şekilde korumayı hedefler.
                            Tecrübeli avukat ekibimizle en etkili hukuki desteği
                            sunuyoruz.
                        </p>

                        <p
                            id="description"
                            class="small-article-text secondary-text-color t-a-j"
                        >
                            Deneyimli avukatlarımızla görüşmek ve hukuki
                            süreçlerinizde güvenilir bir çözüm ortağı bulmak
                            için bizimle iletişime geçin.
                        </p>
                    </div>
                </div>

                <button
                    class="button small-button small-screen-m-h-auto"
                    on:click={onAppointmentClick}>RANDEVU AL</button
                >
            </article>

            <div class="v-divider for-big-screen" />

            <article class="flex f-column g-2">
                <article class="flex g-1">
                    <svg
                        style:margin-top=".05rem"
                        class="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                    >
                        <path
                            d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                        />
                    </svg>

                    <address>
                        <p class="small-article-text secondary-text-color">
                            İsmet Paşa Mahallesi
                        </p>

                        <p class="small-article-text secondary-text-color">
                            Demircioğlu Caddesi
                        </p>

                        <p class="small-article-text secondary-text-color">
                            No: 25
                        </p>

                        <p class="small-article-text secondary-text-color">
                            Merkez, Çanakkale
                        </p>
                    </address>
                </article>

                <article class="flex a-i-c g-1">
                    <svg
                        style:margin-bottom=".75rem"
                        class="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path
                            d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                        />
                    </svg>

                    <div class="flex f-column" style:gap=".125rem">
                        <a
                            href="tel:+905304479020"
                            rel="nofollow"
                            class="clickable-contact-item-text small-article-text secondary-text-color italic"
                            on:click={onLinkClickOnNewTab}
                        >
                            +90 530 447 90 20
                        </a>

                        <a
                            href="tel:+905523923199"
                            rel="nofollow"
                            class="clickable-contact-item-text small-article-text secondary-text-color italic"
                            on:click={onLinkClickOnNewTab}
                        >
                            +90 552 392 31 99
                        </a>
                    </div>
                </article>

                <div class="grid g-dot75">
                    <article class="flex a-i-c g-1">
                        <svg
                            style:height="95%"
                            class="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            ><path
                                d="M92.1 254.6c0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6L152 365.2l4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8c0-35.2-15.2-68.3-40.1-93.2c-25-25-58-38.7-93.2-38.7c-72.7 0-131.8 59.1-131.9 131.8zM274.8 330c-12.6 1.9-22.4 .9-47.5-9.9c-36.8-15.9-61.8-51.5-66.9-58.7c-.4-.6-.7-.9-.8-1.1c-2-2.6-16.2-21.5-16.2-41c0-18.4 9-27.9 13.2-32.3c.3-.3 .5-.5 .7-.8c3.6-4 7.9-5 10.6-5c2.6 0 5.3 0 7.6 .1c.3 0 .5 0 .8 0c2.3 0 5.2 0 8.1 6.8c1.2 2.9 3 7.3 4.9 11.8c3.3 8 6.7 16.3 7.3 17.6c1 2 1.7 4.3 .3 6.9c-3.4 6.8-6.9 10.4-9.3 13c-3.1 3.2-4.5 4.7-2.3 8.6c15.3 26.3 30.6 35.4 53.9 47.1c4 2 6.3 1.7 8.6-1c2.3-2.6 9.9-11.6 12.5-15.5c2.6-4 5.3-3.3 8.9-2s23.1 10.9 27.1 12.9c.8 .4 1.5 .7 2.1 1c2.8 1.4 4.7 2.3 5.5 3.6c.9 1.9 .9 9.9-2.4 19.1c-3.3 9.3-19.1 17.7-26.7 18.8zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM148.1 393.9L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5c29.9 30 47.9 69.8 47.9 112.2c0 87.4-72.7 158.5-160.1 158.5c-26.6 0-52.7-6.7-75.8-19.3z"
                            /></svg
                        >

                        <a
                            href="https://wa.me/+905523923199"
                            rel="nofollow"
                            class="link-button small-article-text italic"
                            on:click={onLinkClickOnNewTab}>WhatsApp'tan Yazın</a
                        >
                    </article>

                    <article class="flex g-1">
                        <svg
                            style:margin-top=".125rem"
                            class="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                            />
                        </svg>

                        <div>
                            <a
                                href="mailto:erdemmirici2@gmail.com"
                                rel="nofollow"
                                class="clickable-contact-item-text small-article-text secondary-text-color italic"
                                on:click={onLinkClickOnNewTab}
                                >erdemmirici2@gmail.com</a
                            >

                            <button
                                class="link-button small-article-text italic"
                                on:click={onContactFormClick}
                            >
                                İletişim Formu
                            </button>
                        </div>
                    </article>
                </div>
            </article>

            <article
                id="footer-pages"
                class="flex f-column g-dot5 small-screen-t-a-c"
            >
                <p class="smaller-t-hint unimportant-text-color">
                    SİTE HARİTASI
                </p>
                <a href="/" class="link-button" on:click={onLinkClick}
                    >Anasayfa</a
                >
                <a
                    href="/hizmetlerimiz"
                    class="link-button"
                    on:click={onLinkClick}>Hizmetlerimiz</a
                >
                <a href="/ekibimiz" class="link-button" on:click={onLinkClick}
                    >Ekibimiz</a
                >
                <a href="/makaleler" class="link-button" on:click={onLinkClick}
                    >Makaleler</a
                >
                <a href="/hakkımızda" class="link-button" on:click={onLinkClick}
                    >Hakkımızda</a
                >
                <a href="/iletişim" class="link-button" on:click={onLinkClick}
                    >İletişim</a
                >
            </article>
        </div>
    </footer>
{/key}

<style>
    #hello-text {
        letter-spacing: 0.015rem;
    }

    #description {
        line-height: 1.3rem;
    }

    .icon {
        width: 1.5rem;
        min-width: 1.5rem;
        height: 1.4rem;

        fill: var(--accent-color);
    }

    .small-article-text,
    .link-button {
        line-height: 1.25rem;
    }

    @media (min-width: 65.001em) {
        #footer-content {
            grid-template-columns: 6fr auto 2fr 1fr;
            max-width: var(--footer-max-width);
        }

        #footer-pages {
            width: 6.5rem;
            text-align: right;
        }

        .smaller-t-hint {
            margin-top: 0.1rem;
            margin-left: -1.6rem;
            margin-bottom: 1.25rem;
        }
    }

    @media (max-width: 65em) {
        #footer-content {
            max-width: calc(var(--max-w-phone) - var(--main-h-padding) * 2);
            gap: calc(var(--main-v-padding) * 2.5);
        }

        .smaller-t-hint {
            margin-top: 0.25rem;
            margin-bottom: 0.5rem;
        }
    }
</style>
