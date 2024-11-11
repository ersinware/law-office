<script>
    import { browser } from "$app/environment";
    import LazyImage from "$lib/components/common/LazyImage.svelte";
    import Navigation from "$lib/components/common/slider/Navigation.svelte";
    import Slider from "$lib/components/common/slider/Slider.svelte";
    import {
        EVENT_SLIDER_INDEX_CHANGED,
        EVENT_SLIDER_INSERT_ELEMENTS_FOR_INFINITE,
    } from "$lib/js/client/app/constants.slider.client.app";
    import {
        EVENT_LOAD_LAZY_IMAGE,
        LAZY_IMAGE_MODE_LOAD_MANUALLY,
    } from "$lib/js/client/common/constants.client.common";
    import { DURATION_TRANSITION_AFTER_CONTENT_CHANGED } from "$lib/js/client/common/constants.transitions.client.common";
    import {
        getLinkForResponsiveImage,
        getMediaQueryForResponsiveImage,
    } from "$lib/js/client/common/util.responsive.client.common";
    import { HOMEPAGE_SLIDER_IMAGE_MEDIA_DATA } from "$lib/js/common/constants.media.data.common";
    import { onDestroy, onMount } from "svelte";

    const sliderId = "homepage-slider",
        scrollDuration = DURATION_TRANSITION_AFTER_CONTENT_CHANGED,
        infinite = true,
        autoSlide = true,
        eventPostfix = "-" + sliderId,
        visiteds = new Set(),
        records = [
            {
                title: "Mirici & Partners Avukatlık Bürosu",
                content:
                    "Çanakkale'de hukuki sorunlarınıza çözüm odaklı yaklaşan, deneyimli ekibimizle yanınızda yer alıyoruz.",
                imageName: "mirici-&-partners-avukatlık-bürosu.webp",
                alt: "Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale",
            },
            {
                title: "Güvenilir Hukuki Çözümler",
                content:
                    "Uzman kadromuz ile müvekkillerimize en hızlı ve güvenilir hukuki çözümleri sunmayı ilke edindik.",
                imageName: "güvenilir-hukuki-çözümler.webp",
                alt: "Güvenilir Hukuki Çözümler | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale",
            },
            {
                title: "Profesyonel ve Şeffaf Hizmet",
                content:
                    "Her aşamada şeffaflık ve profesyonellik temelinde hareket ediyor, müvekkillerimize en üst düzeyde hizmet sunuyoruz.",
                imageName: "profesyonel-ve-şeffaf-hizmet.webp",
                alt: "Profesyonel ve Şeffaf Hizmet | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale",
            },
        ];

    let _insertElements;

    onMount(_onMount);

    if (browser) onDestroy(_onDestroy);

    function _onMount() {
        window.addEventListener(
            EVENT_SLIDER_INDEX_CHANGED + eventPostfix,
            onSliderIndexChange,
        );

        window.addEventListener(
            EVENT_SLIDER_INSERT_ELEMENTS_FOR_INFINITE + eventPostfix,
            insertElements,
        );
    }

    function _onDestroy() {
        window.removeEventListener(
            EVENT_SLIDER_INDEX_CHANGED + eventPostfix,
            onSliderIndexChange,
        );

        window.removeEventListener(
            EVENT_SLIDER_INSERT_ELEMENTS_FOR_INFINITE + eventPostfix,
            insertElements,
        );
    }

    function onSliderIndexChange(event) {
        if (visiteds.size === records.length) {
            window.removeEventListener(
                EVENT_SLIDER_INDEX_CHANGED + eventPostfix,
                onSliderIndexChange,
            );

            return;
        }

        const index = event.detail.index,
            nextIndex = (index + 1) % records.length,
            previousIndex = (index - 1 + records.length) % records.length,
            nextImageName = records[nextIndex].imageName,
            previousImageName = records[previousIndex].imageName;

        if (nextIndex !== 0 && !visiteds.has(nextImageName)) {
            window.dispatchEvent(
                new CustomEvent(EVENT_LOAD_LAZY_IMAGE + "-" + nextImageName),
            );

            visiteds.add(nextImageName);
        }

        if (
            previousIndex !== 0 &&
            (infinite || previousIndex < nextIndex) &&
            !visiteds.has(previousImageName)
        ) {
            window.dispatchEvent(
                new CustomEvent(
                    EVENT_LOAD_LAZY_IMAGE + "-" + previousImageName,
                ),
            );

            visiteds.add(previousImageName);
        }
    }

    function insertElements() {
        _insertElements = true;
        window.removeEventListener(
            EVENT_SLIDER_INSERT_ELEMENTS_FOR_INFINITE + eventPostfix,
            insertElements,
        );
    }
</script>

<svelte:head>
    {#each HOMEPAGE_SLIDER_IMAGE_MEDIA_DATA as media}
        <link
            rel="preload"
            href={getLinkForResponsiveImage(
                records[0].imageName,
                media,
                undefined,
                false,
            )}
            as="image"
            type={"image/webp"}
            media={getMediaQueryForResponsiveImage(media)}
            fetchpriority="high"
        />
    {/each}
</svelte:head>

<div class="p-r">
    <Slider {sliderId} {scrollDuration} {infinite} {autoSlide}>
        <div class="p-a p-none b-box full-w h-100 p-h-d">
            <div class="p-r max-w h-100 m-h-auto">
                <Navigation {sliderId} {infinite} />
            </div>
        </div>

        <section class="full-w">
            <article id={sliderId} class="flex o-hidden">
                {#if _insertElements && records.length > 1}
                    <div class="slider-item b-box p-h-d">
                        <article
                            class="slider-item-content hoverable-image-wrapper p-r max-w m-h-auto b-r-d o-hidden"
                        >
                            <LazyImage
                                mode={LAZY_IMAGE_MODE_LOAD_MANUALLY}
                                id={records[records.length - 1].imageName}
                                classes="homepage-slider-image w-100"
                                alt={records[records.length - 1].alt}
                                mediaData={HOMEPAGE_SLIDER_IMAGE_MEDIA_DATA}
                                imageName={records[records.length - 1]
                                    .imageName}
                                onceRatio={false}
                            />

                            <article
                                class="slider-texts-wrapper p-none p-a p-d grid g-1dot25 b-r-d"
                            >
                                <h1 class="slider-title f-w-600">
                                    {records[records.length - 1].title}
                                </h1>

                                <div class="small-article-text">
                                    {records[records.length - 1].content}
                                </div>
                            </article>
                        </article>
                    </div>
                {/if}

                {#each records as record, index}
                    <div class="slider-item b-box p-h-d">
                        <article
                            class="slider-item-content hoverable-image-wrapper p-r max-w m-h-auto b-r-d o-hidden"
                        >
                            {#if index === 0}
                                <picture class="d-contents">
                                    {#each HOMEPAGE_SLIDER_IMAGE_MEDIA_DATA as media}
                                        <source
                                            class="d-contents"
                                            media={getMediaQueryForResponsiveImage(
                                                media,
                                            )}
                                            srcset={getLinkForResponsiveImage(
                                                record.imageName,
                                                media,
                                                undefined,
                                                false,
                                            )}
                                        />
                                    {/each}

                                    <img
                                        class="homepage-slider-image hoverable-image w-100"
                                        src="/not-found.svg"
                                        alt={record.alt}
                                    />
                                </picture>
                            {:else}
                                <LazyImage
                                    mode={LAZY_IMAGE_MODE_LOAD_MANUALLY}
                                    id={record.imageName}
                                    classes="homepage-slider-image hoverable-image w-100"
                                    alt={record.alt}
                                    mediaData={HOMEPAGE_SLIDER_IMAGE_MEDIA_DATA}
                                    imageName={record.imageName}
                                    onceRatio={false}
                                />
                            {/if}

                            <article
                                class="slider-texts-wrapper p-none p-a p-d grid g-1dot25 b-r-d"
                            >
                                <h1 class="slider-title f-w-600">
                                    {record.title}
                                </h1>

                                <div class="small-article-text">
                                    {record.content}
                                </div>
                            </article>
                        </article>
                    </div>
                {/each}

                {#if _insertElements && records.length > 1}
                    <div class="slider-item b-box p-h-d">
                        <article
                            class="slider-item-content hoverable-image-wrapper p-r max-w m-h-auto b-r-d o-hidden"
                        >
                            <picture class="d-contents">
                                {#each HOMEPAGE_SLIDER_IMAGE_MEDIA_DATA as media}
                                    <source
                                        class="d-contents"
                                        media={getMediaQueryForResponsiveImage(
                                            media,
                                        )}
                                        srcset={getLinkForResponsiveImage(
                                            records[0].imageName,
                                            media,
                                            undefined,
                                            false,
                                        )}
                                    />
                                {/each}

                                <img
                                    class="homepage-slider-image hoverable-image w-100"
                                    src="/not-found.svg"
                                    alt={records[0].alt}
                                />
                            </picture>

                            <article
                                class="slider-texts-wrapper p-none p-a p-d grid g-1dot25 b-r-d"
                            >
                                <h1 class="slider-title f-w-600">
                                    {records[0].title}
                                </h1>

                                <div class="small-article-text">
                                    {records[0].content}
                                </div>
                            </article>
                        </article>
                    </div>
                {/if}
            </article>
        </section>
    </Slider>
</div>

<style>
    #homepage-slider {
        --grid-item-min-width: 1rem;
        --grid-max-column-count: 1;
        --gap-count: calc(var(--grid-max-column-count) - 1);
        --grid-layout-gap: 0rem;
        --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
        --grid-item-max-width: calc(
            (100% - var(--total-gap-width)) / var(--grid-max-column-count)
        );

        gap: var(--grid-layout-gap);
    }

    .slider-item {
        flex: 0 0 max(var(--grid-item-max-width), var(--grid-item-min-width));
    }

    .slider-title {
        letter-spacing: 0.015rem;
        font-size: 1.125rem;
        line-height: 1.5rem;
    }

    .slider-texts-wrapper {
        bottom: calc(var(--main-v-padding) * 1.25 * 2);
        background-color: var(--slider-texts-wrapper-background-color);
    }

    @media (min-width: 65.001em) {
        .slider-texts-wrapper {
            left: calc(var(--main-h-padding) * 2);
            max-width: min(32.5rem, calc(50% - var(--main-h-padding) * 2));
        }
    }

    @media (max-width: 65em) {
        .slider-texts-wrapper {
            left: var(--main-h-padding);
            max-width: calc(50% - var(--main-h-padding) * 2);
        }
    }

    @media (max-width: 34.1875em) {
        .slider-texts-wrapper {
            max-width: min(
                calc(20rem - var(--main-h-padding) * 2),
                calc(100% - var(--main-h-padding) * 4)
            );
        }
    }
</style>
