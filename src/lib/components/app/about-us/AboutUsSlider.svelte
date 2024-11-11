<script>
    import { browser } from "$app/environment";
    import LazyImage from "$lib/components/common/LazyImage.svelte";
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
        addIntersectionObserver,
        removeIntersectionObserver,
    } from "$lib/js/client/common/util.observation.client.common";
    import { ABOUT_US_SLIDER_IMAGE_MEDIA_DATA } from "$lib/js/common/constants.media.data.common";
    import { onDestroy, onMount } from "svelte";
    import AboutUsNavigation from "./AboutUsNavigation.svelte";

    const baseWrapperId = "about-us-slider-base-wrapper",
        sliderId = "about-us-slider",
        scrollDuration = DURATION_TRANSITION_AFTER_CONTENT_CHANGED,
        infinite = true,
        autoSlide = true,
        eventPostfix = "-" + sliderId,
        visiteds = new Set(),
        records = [
            {
                imageName: "hakkımızda-1.webp",
                alt: "Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale",
            },
            {
                imageName: "hakkımızda-2.webp",
                alt: "Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale",
            },
            {
                imageName: "hakkımızda-3.webp",
                alt: "Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale",
            },
        ];

    let seen, observer, _insertElements;

    onMount(_onMount);

    if (browser) onDestroy(_onDestroy);

    async function _onMount() {
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
        if (observer) removeIntersectionObserver(observer);

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
        if (!seen) return;

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

        observer = addIntersectionObserver(
            document.getElementById(baseWrapperId),
            onIntersect,
        );
    }

    function onIntersect() {
        removeIntersectionObserver(observer);
        observer = undefined;

        seen = true;

        window.dispatchEvent(
            new CustomEvent(EVENT_LOAD_LAZY_IMAGE + "-" + records[0].imageName),
        );
        onSliderIndexChange({ detail: { index: 0 } });
    }
</script>

<div id="about-us-slider-base-wrapper" class="p-r">
    <Slider {sliderId} {scrollDuration} {infinite} {autoSlide}>
        <AboutUsNavigation {sliderId} {infinite} />

        <article id={sliderId} class="flex full-w o-hidden">
            {#if _insertElements && records.length > 1}
                <div class="slider-item b-box p-h-d">
                    <article
                        class="about-us-slider-item-content slider-item-content hoverable-image-wrapper m-h-auto b-r-d o-hidden"
                    >
                        <LazyImage
                            mode={LAZY_IMAGE_MODE_LOAD_MANUALLY}
                            id={records[records.length - 1].imageName}
                            classes="about-us-slider-image hoverable-image w-100"
                            alt={records[records.length - 1].alt}
                            mediaData={ABOUT_US_SLIDER_IMAGE_MEDIA_DATA}
                            imageName={records[records.length - 1].imageName}
                            onceRatio={false}
                        />
                    </article>
                </div>
            {/if}

            {#each records as record}
                <div class="slider-item b-box p-h-d">
                    <article
                        class="about-us-slider-item-content slider-item-content hoverable-image-wrapper m-h-auto b-r-d o-hidden"
                    >
                        <LazyImage
                            mode={LAZY_IMAGE_MODE_LOAD_MANUALLY}
                            id={record.imageName}
                            classes="about-us-slider-image hoverable-image w-100"
                            alt={record.alt}
                            mediaData={ABOUT_US_SLIDER_IMAGE_MEDIA_DATA}
                            imageName={record.imageName}
                            onceRatio={false}
                        />
                    </article>
                </div>
            {/each}

            {#if _insertElements && records.length > 1}
                <div class="slider-item b-box p-h-d">
                    <article
                        class="about-us-slider-item-content slider-item-content hoverable-image-wrapper m-h-auto b-r-d o-hidden"
                    >
                        <LazyImage
                            mode={LAZY_IMAGE_MODE_LOAD_MANUALLY}
                            id={records[0].imageName}
                            classes="about-us-slider-image hoverable-image w-100"
                            alt={records[0].alt}
                            mediaData={ABOUT_US_SLIDER_IMAGE_MEDIA_DATA}
                            imageName={records[0].imageName}
                            onceRatio={false}
                        />
                    </article>
                </div>
            {/if}
        </article>
    </Slider>
</div>

<style>
    #about-us-slider {
        --grid-item-min-width: 1rem;
        --grid-max-column-count: 1;
        --gap-count: calc(var(--grid-max-column-count) - 1);
        --grid-layout-gap: var(--main-h-padding);
        --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
        --grid-item-max-width: calc(
            (100% - var(--total-gap-width)) / var(--grid-max-column-count)
        );

        gap: var(--grid-layout-gap);
    }

    .slider-item {
        flex: 0 0 max(var(--grid-item-max-width), var(--grid-item-min-width));
    }
</style>
