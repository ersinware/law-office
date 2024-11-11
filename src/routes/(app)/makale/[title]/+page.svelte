<script>
    import { page } from "$app/stores";
    import LazyImage from "$lib/components/common/LazyImage.svelte";
    import SmallComponent from "$lib/components/common/SmallComponent.svelte";
    import { TRANSITION_PAGE } from "$lib/js/client/common/constants.transitions.client.common.js";
    import {
        isSvg,
        onLinkClick,
        onLinkClickOnNewTab,
        performRippleEffectAndWait,
    } from "$lib/js/client/common/util.client.common.js";
    import {
        getLinkForResponsiveImage,
        getMediaQueryForResponsiveImage,
    } from "$lib/js/client/common/util.responsive.client.common.js";
    import {
        ARTICLE_IMAGE_MEDIA_DATA,
        PAGE_ARTICLE_IMAGE_MEDIA_DATA,
    } from "$lib/js/common/constants.media.data.common.js";
    import {
        formatDateToISOWithOffset,
        getDashedString,
    } from "$lib/js/common/util.common.js";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    export let data;

    onMount(_onMount);

    for (const article of data.similarArticles)
        article.svg = isSvg(article.imageName);

    function _onMount() {
        for (const link of document.querySelectorAll("#article-content a"))
            link.addEventListener("click", onLinkClickOnNewTab);
    }

    async function onContinueToReadClick(event) {
        await performRippleEffectAndWait(event);

        window.scrollTo({
            top:
                document
                    .getElementById("article-content")
                    .getBoundingClientRect().top +
                window.scrollY -
                document.querySelector("#header").clientHeight,
            behavior: "smooth",
        });
    }
</script>

<svelte:head>
    {#if isSvg(data.article.imageName)}
        <link
            rel="preload"
            href={`/api/image/${data.article.imageName}?updated-at=${data.article.imageUpdatedAt}`}
            as="image"
            type="image/svg+xml"
            fetchpriority="high"
        />
    {:else}
        {#each PAGE_ARTICLE_IMAGE_MEDIA_DATA as media}
            <link
                rel="preload"
                href={getLinkForResponsiveImage(
                    data.article.imageName,
                    media,
                    data.article.imageUpdatedAt,
                )}
                as="image"
                type={"image/webp"}
                media={getMediaQueryForResponsiveImage(media)}
                fetchpriority="high"
            />
        {/each}
    {/if}

    {@html `
        <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Makaleler",
                        "item": "https://mirici.av.tr/makaleler"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "${data.article.title}",
                        "item": "https://mirici.av.tr/makale/${getDashedString(data.article.title)}"
                    }
                ]
            }
        </script>
    `}

    {@html `
        <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "${data.article.title}",
                "image": [
                    "https://mirici.av.tr${(() => {
                        if (isSvg(data.article.imageName))
                            return `/api/image/${data.article.imageName}`;

                        return getLinkForResponsiveImage(
                            data.article.imageName,
                            PAGE_ARTICLE_IMAGE_MEDIA_DATA[
                                PAGE_ARTICLE_IMAGE_MEDIA_DATA.length - 1
                            ],
                            data.article.imageUpdatedAt,
                        );
                    })()}"
                ],
                "datePublished": "${formatDateToISOWithOffset(data.article.createdAt)}",
                "dateModified": "${formatDateToISOWithOffset(data.article.updatedAt)}",
                "author": [{
                    "@type": "Organization",
                    "name": "Mirici & Partners Avukatlık Bürosu",
                    "url": "https://mirici.av.tr"
                }]
            }
	    </script>
    `}

    <meta
        name="description"
        content="{data.article
            .firstSentence} | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale"
    />

    <title
        >'{data.article.title}' | Mirici & Partners Avukatlık Bürosu | Merkez,
        Çanakkale</title
    >
</svelte:head>

<div in:fly={TRANSITION_PAGE}>
    {#key $page.url.pathname}
        <section
            class="grid page-gap max-w-page m-h-auto"
            in:fly={TRANSITION_PAGE}
        >
            <section
                class="flex a-i-c big-screen-f-s-b big-screen-g-h-d small-screen-f-column-reverse small-screen-g-v-d"
            >
                <div
                    class="section-texts-wrapper flex f-column g-v-d big-screen-w-100"
                >
                    <div>
                        <p
                            class="smaller-t-hint t-hint-at-top unimportant-text-color"
                            style:margin-left=".1rem"
                        >
                            MİRİCİ & PARTNERS AVUKATLIK BÜROSU
                        </p>

                        <h1 class="smaller-section-title">
                            {data.article.title}
                        </h1>
                    </div>

                    <p class="section-text t-a-j">
                        {data.article.firstSentence}
                    </p>

                    <button
                        class="nude-button"
                        on:click={onContinueToReadClick}
                    >
                        OKUMAYA DEVAM ET
                    </button>
                </div>

                <div class="section-image w-100 b-r-d o-hidden">
                    {#if isSvg(data.article.imageName)}
                        <img
                            class="section-image w-100"
                            src="/api/image/{data.article
                                .imageName}?updated-at={data.article
                                .imageUpdatedAt}"
                            alt={`${data.article.title} | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale`}
                        />
                    {:else}
                        <picture class="d-contents">
                            {#each PAGE_ARTICLE_IMAGE_MEDIA_DATA as media}
                                <source
                                    class="d-contents"
                                    media={getMediaQueryForResponsiveImage(
                                        media,
                                    )}
                                    srcset={getLinkForResponsiveImage(
                                        getDashedString(data.article.imageName),
                                        media,
                                        data.article.imageUpdatedAt,
                                    )}
                                />
                            {/each}

                            <img
                                class="section-image w-100"
                                src="/blank.svg"
                                alt={`${data.article.title} | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale`}
                            />
                        </picture>
                    {/if}
                </div>
            </section>

            <div
                id="article-content"
                class="b-box full-w page-p-v-d p-h-d secondary-background-color"
            >
                <section class="tiptap-wrapper max-w-small-page m-h-auto">
                    {@html data.article.content}
                </section>
            </div>

            <section
                class="flex f-column a-i-c g-v-d w-100 max-w-small-page m-h-auto"
            >
                <LazyImage
                    id="contact"
                    alt="Bize Danışın | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale"
                    classes="section-image w-100"
                    imageName="contact-2.svg"
                    staticImage
                />

                <div class="flex f-column g-v-d">
                    <h2 class="smaller-section-title t-a-c">Bize Danışın</h2>

                    <p id="contact-text" class="section-text t-a-j">
                        Mirici & Partners Avukatlık Bürosu olarak, uzman avukat
                        kadromuzla hukuki sorularınıza en güvenilir çözümleri
                        sunmak ve destek olmak için buradayız. Detaylı bilgi
                        almak ya da sorularınızı iletmek için bizimle iletişime
                        geçin.
                    </p>

                    <div id="contacts-wrapper" class="grid j-c-c g-v-d">
                        <article class="flex g-1">
                            <svg
                                style:margin-top=".05rem"
                                class="contact-item-content-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                            >
                                <path
                                    d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                                />
                            </svg>

                            <address>
                                <p
                                    class="contact-item-text small-article-text secondary-text-color"
                                >
                                    İsmet Paşa Mahallesi
                                </p>
                                <p
                                    class="contact-item-text small-article-text secondary-text-color"
                                >
                                    Demircioğlu Caddesi
                                </p>
                                <p
                                    class="contact-item-text small-article-text secondary-text-color"
                                >
                                    No: 25
                                </p>
                                <p
                                    class="contact-item-text small-article-text secondary-text-color"
                                >
                                    Merkez, Çanakkale
                                </p>
                            </address>
                        </article>

                        <article class="flex a-i-c g-1">
                            <svg
                                style:margin-bottom=".75rem"
                                class="contact-item-content-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                                />
                            </svg>

                            <div class="flex f-column" style:gap=".125rem">
                                <a
                                    href="tel:+905332407477"
                                    rel="nofollow"
                                    class="clickable-contact-item-text contact-item-text small-article-text secondary-text-color italic"
                                    on:click={onLinkClickOnNewTab}
                                >
                                    +90 533 240 74 77
                                </a>

                                <a
                                    href="tel:+905523923199"
                                    rel="nofollow"
                                    class="clickable-contact-item-text contact-item-text small-article-text secondary-text-color italic"
                                    on:click={onLinkClickOnNewTab}
                                >
                                    +90 552 392 31 99
                                </a>
                            </div>
                        </article>

                        <div class="grid g-dot75">
                            <article class="flex a-i-c g-1">
                                <svg
                                    style:height="100%"
                                    class="contact-item-content-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    ><path
                                        d="M92.1 254.6c0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6L152 365.2l4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8c0-35.2-15.2-68.3-40.1-93.2c-25-25-58-38.7-93.2-38.7c-72.7 0-131.8 59.1-131.9 131.8zM274.8 330c-12.6 1.9-22.4 .9-47.5-9.9c-36.8-15.9-61.8-51.5-66.9-58.7c-.4-.6-.7-.9-.8-1.1c-2-2.6-16.2-21.5-16.2-41c0-18.4 9-27.9 13.2-32.3c.3-.3 .5-.5 .7-.8c3.6-4 7.9-5 10.6-5c2.6 0 5.3 0 7.6 .1c.3 0 .5 0 .8 0c2.3 0 5.2 0 8.1 6.8c1.2 2.9 3 7.3 4.9 11.8c3.3 8 6.7 16.3 7.3 17.6c1 2 1.7 4.3 .3 6.9c-3.4 6.8-6.9 10.4-9.3 13c-3.1 3.2-4.5 4.7-2.3 8.6c15.3 26.3 30.6 35.4 53.9 47.1c4 2 6.3 1.7 8.6-1c2.3-2.6 9.9-11.6 12.5-15.5c2.6-4 5.3-3.3 8.9-2s23.1 10.9 27.1 12.9c.8 .4 1.5 .7 2.1 1c2.8 1.4 4.7 2.3 5.5 3.6c.9 1.9 .9 9.9-2.4 19.1c-3.3 9.3-19.1 17.7-26.7 18.8zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM148.1 393.9L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5c29.9 30 47.9 69.8 47.9 112.2c0 87.4-72.7 158.5-160.1 158.5c-26.6 0-52.7-6.7-75.8-19.3z"
                                    /></svg
                                >

                                <a
                                    href="https://wa.me/+905523923199"
                                    rel="nofollow"
                                    class="contact-item-text small-article-text link-button italic"
                                    on:click={onLinkClickOnNewTab}
                                    >WhatsApp'tan Yazın</a
                                >
                            </article>

                            <article class="flex g-1">
                                <svg
                                    style:margin-top=".125rem"
                                    class="contact-item-content-icon"
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
                                        class="clickable-contact-item-text contact-item-text small-article-text secondary-text-color italic"
                                        on:click={onLinkClickOnNewTab}
                                        >erdemmirici2@gmail.com</a
                                    >

                                    <button
                                        class="contact-item-text small-article-text link-button italic"
                                    >
                                        İletişim Formu
                                    </button>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            {#if data.similarArticles?.length}
                <div
                    class="b-box last-section full-w page-p-v-d p-h-d secondary-background-color"
                >
                    <section class="grid g-v-d w-100 max-w-small-page m-h-auto">
                        <div
                            class="title-with-link-button-wrapper grid g-dot5 t-a-c"
                        >
                            <h3 class="small-section-title">
                                Benzer Makaleler
                            </h3>
                            <a
                                href="/makaleler"
                                class="link-button m-h-auto w-max-content f-w-600"
                                on:click={onLinkClick}>Hepsini Gör</a
                            >
                        </div>

                        <div class="grid components-wrapper">
                            {#each data.similarArticles as article}
                                <SmallComponent
                                    backgroundColor="var(--third-background-color)"
                                    title={article.title}
                                    content={article.firstSentence}
                                    buttonText="HEPSİNİ OKU"
                                    imageId={getDashedString(article.title)}
                                    imageAlt="{article.title} | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale"
                                    imageName={article.imageName}
                                    imageUpdatedAt={article.imageUpdatedAt}
                                    mediaData={article.svg
                                        ? undefined
                                        : ARTICLE_IMAGE_MEDIA_DATA}
                                    href="/makale/{getDashedString(
                                        article.title,
                                    )}"
                                    lazyImage
                                    limitedLines
                                />
                            {/each}
                        </div>
                    </section>

                    <div
                        class="h-divider last-section-divider w-100 m-h-auto"
                    ></div>
                </div>
            {/if}
        </section>
    {/key}
</div>

<style>
    #contacts-wrapper {
        margin-top: calc(var(--main-v-padding) / 1.5);
    }
</style>
