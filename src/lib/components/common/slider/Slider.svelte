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
        EVENT_SLIDER_INSERT_ELEMENTS_FOR_INFINITE,
    } from "$lib/js/client/app/constants.slider.client.app";
    import { DURATION_TRANSITION_PROGRESS_BAR_NAVIGATED } from "$lib/js/client/common/constants.transitions.client.common";
    import { yieldToMain } from "$lib/js/client/common/util.client.common";
    import {
        addIntersectionObserver,
        removeIntersectionObserver,
    } from "$lib/js/client/common/util.observation.client.common";
    import {
        onMountHoverable,
        onMountHoverableReverse,
        onMountTouchable,
        onMountTouchableReverse,
        removeAllPointerRelated,
    } from "$lib/js/client/common/util.responsive.client.common.js";
    import { waitFor } from "$lib/js/common/util.common";
    import { onDestroy, onMount } from "svelte";
    import { cubicInOut } from "svelte/easing";
    import { tweened } from "svelte/motion";

    export let sliderId,
        scrollDuration,
        infinite,
        possibleSliderItemClassNames = ["slider-item"],
        autoSlide;

    const eventPostfix = "-" + sliderId,
        autoSlideIntervalDuration = 5000;

    let activeIndex,
        slider,
        sliderItemWidth,
        sliderItemClassName,
        pageCount,
        gap = 0,
        currentScroll = tweened(0, {
            duration: scrollDuration,
            easing: cubicInOut,
        }),
        observer,
        intersecting,
        destroyed,
        autoSlideInterval,
        autoSlideStopped = true,
        startTime,
        startX,
        startY,
        startScroll;

    onMount(_onMount);

    if (browser) onDestroy(_onDestroy);

    async function _onMount() {
        await yieldToMain();

        window.addEventListener("resize", onResize);
        window.addEventListener("focus", onWindowFocus);
        window.addEventListener("blur", onWindowBlur);
        window.addEventListener(
            EVENT_NAVIGATION_TO_LEFT + eventPostfix,
            toLeft,
        );
        window.addEventListener(
            EVENT_NAVIGATION_TO_RIGHT + eventPostfix,
            toRight,
        );
        window.addEventListener(EVENT_SLIDE_TO_INDEX + eventPostfix, toIndex);

        calculate();

        currentScroll.subscribe(onScroll);

        const wrapper = document.getElementById(sliderId + "-wrapper");

        onMountHoverable({
            id: sliderId,
            onMount: () => {
                wrapper.addEventListener("mouseenter", onMouseEnter);
                wrapper.addEventListener("mouseleave", onMouseLeave);
                wrapper.addEventListener("mousemove", onMouseMove);
            },
        });

        onMountHoverableReverse({
            id: sliderId,
            reverse: () => {
                wrapper.removeEventListener("mouseenter", onMouseEnter);
                wrapper.removeEventListener("mouseleave", onMouseLeave);
                wrapper.removeEventListener("mousemove", onMouseMove);
            },
        });

        onMountTouchable({
            id: sliderId,
            onMount: () => {
                wrapper.addEventListener("touchstart", onTouchStart);
                wrapper.addEventListener("touchmove", onTouchMove);
                wrapper.addEventListener("touchcancel", onTouchCancel);
                wrapper.addEventListener("touchend", onTouchEnd);
            },
        });

        onMountTouchableReverse({
            id: sliderId,
            reverse: () => {
                wrapper.removeEventListener("touchstart", onTouchStart);
                wrapper.removeEventListener("touchmove", onTouchMove);
                wrapper.removeEventListener("touchcancel", onTouchCancel);
                wrapper.removeEventListener("touchend", onTouchEnd);
            },
        });

        observer = addIntersectionObserver(
            document.getElementById(sliderId),
            onIntersect,
            onNoIntersect,
        );
        startAutoSlideIfDesired();
    }

    function _onDestroy() {
        if (observer) removeIntersectionObserver(observer);

        destroyed = true;
        stopAutoSlideIfDesired();
        removeAllPointerRelated(sliderId);

        window.removeEventListener("resize", onResize);
        window.removeEventListener("focus", onWindowFocus);
        window.removeEventListener("blur", onWindowBlur);
        window.removeEventListener(
            EVENT_NAVIGATION_TO_LEFT + eventPostfix,
            toLeft,
        );
        window.removeEventListener(
            EVENT_NAVIGATION_TO_RIGHT + eventPostfix,
            toRight,
        );
        window.removeEventListener(
            EVENT_SLIDE_TO_INDEX + eventPostfix,
            toIndex,
        );
    }

    function onResize() {
        calculate(true);

        scrollImmediately();
        stopAutoSlideIfDesired();
        startAutoSlideIfDesired();
    }

    function onWindowFocus() {
        if (!intersecting) return;
        startAutoSlideIfDesired();
    }

    function onWindowBlur() {
        if (!intersecting) return;
        stopAutoSlideIfDesired();
    }

    function onIntersect() {
        intersecting = true;
        startAutoSlideIfDesired();
    }

    function onNoIntersect() {
        intersecting = false;
        stopAutoSlideIfDesired();
    }

    async function calculate(forResize) {
        if (pageCount === 1) return;

        slider = document.getElementById(sliderId);

        for (const sliderItem of slider.querySelectorAll(".slider-item")) {
            const display = window.getComputedStyle(sliderItem).display;

            if (display === "none" || display === "contents") continue;

            sliderItemWidth = sliderItem.clientWidth;

            if (!infinite) break;

            for (const _sliderItemClassName of possibleSliderItemClassNames)
                if (sliderItem.classList.contains(_sliderItemClassName)) {
                    sliderItemClassName = _sliderItemClassName;

                    break;
                }

            break;
        }

        gap = parseFloat(window.getComputedStyle(slider).gap);
        pageCount =
            Math.round(slider.scrollWidth / sliderItemWidth) -
            (forResize && infinite ? 2 : 0);

        if (!forResize) activeIndex = infinite ? 1 : 0;

        if (pageCount === 1) return;

        if (infinite)
            window.dispatchEvent(
                new CustomEvent(
                    EVENT_SLIDER_INSERT_ELEMENTS_FOR_INFINITE + eventPostfix,
                ),
            );

        scrollImmediately();

        await yieldToMain();
        broadcastIndexChange();

        await waitFor(DURATION_TRANSITION_PROGRESS_BAR_NAVIGATED);
        window.dispatchEvent(
            new CustomEvent(EVENT_NAVIGATION_LOAD + eventPostfix, {
                detail: {
                    forResize,
                    pageCount,
                    activeIndex: getActiveIndexByInfinity(),
                },
            }),
        );
    }

    function scroll() {
        $currentScroll = getTargetLeft();
    }

    function scrollImmediately(target) {
        currentScroll.set(target ?? getTargetLeft(), { duration: 0 });
    }

    function onScroll() {
        slider.scrollLeft = $currentScroll;
    }

    function onMouseEnter() {
        window.dispatchEvent(
            new CustomEvent(EVENT_NAVIGATION_SHOW_ARROWS + eventPostfix),
        );
        stopAutoSlideIfDesired();
    }

    function onMouseMove() {
        window.dispatchEvent(
            new CustomEvent(EVENT_NAVIGATION_SHOW_ARROWS + eventPostfix),
        );
        stopAutoSlideIfDesired();
    }

    function onMouseLeave() {
        window.dispatchEvent(
            new CustomEvent(EVENT_NAVIGATION_HIDE_ARROWS + eventPostfix),
        );
        startAutoSlideIfDesired();
    }

    function onTouchStart(event) {
        stopAutoSlideIfDesired();

        if (
            !event.target.classList.contains("slider-item") &&
            !event.target.classList.contains("slider-item-content")
        )
            return;

        startTime = Date.now();

        const touch = event.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;

        startScroll = $currentScroll;
    }

    async function onTouchMove(event) {
        if (
            !event.target.classList.contains("slider-item") &&
            !event.target.classList.contains("slider-item-content")
        )
            return;

        if (startY === "block") return;

        const currentY = event.touches[0].clientY;
        if (Math.abs(startY - currentY) > 30) {
            startY = "block";
            await toIndex({ detail: { index: getActiveIndexByInfinity() } });

            return;
        }

        scrollImmediately(startScroll + startX - event.touches[0].clientX);
    }

    function onTouchCancel(event) {
        onTouchEnd(event);
    }

    async function onTouchEnd(event) {
        if (
            !event.target.classList.contains("slider-item") &&
            !event.target.classList.contains("slider-item-content")
        ) {
            startAutoSlideIfDesired();

            return;
        }

        if (Date.now() - startTime < 333) {
            if ($currentScroll > startScroll) {
                await toLeft();

                startAutoSlideIfDesired();

                return;
            }

            if ($currentScroll < startScroll) {
                await toRight();

                startAutoSlideIfDesired();

                return;
            }
        }

        if ($currentScroll > startScroll) {
            if (infinite && atLast()) {
                if ($currentScroll >= getNextEdge(activeIndex)) {
                    await toLeft();

                    startAutoSlideIfDesired();

                    return;
                }
            }

            let targetIndex = activeIndex;
            while (!atLast(targetIndex)) {
                if ($currentScroll >= getNextEdge(targetIndex)) targetIndex++;
                else break;
            }

            await toIndex({
                detail: { index: infinite ? targetIndex - 1 : targetIndex },
            });

            startAutoSlideIfDesired();

            return;
        }

        if ($currentScroll < startScroll) {
            if (infinite && atFirst()) {
                if ($currentScroll <= getPreviousEdge(activeIndex)) {
                    await toRight();

                    startAutoSlideIfDesired();

                    return;
                }
            }

            let targetIndex = activeIndex;
            while (!atFirst(targetIndex)) {
                if ($currentScroll <= getPreviousEdge(targetIndex))
                    targetIndex--;
                else break;
            }

            await toIndex({
                detail: { index: infinite ? targetIndex - 1 : targetIndex },
            });

            startAutoSlideIfDesired();

            return;
        }

        await toIndex({ detail: { index: getActiveIndexByInfinity() } });

        startAutoSlideIfDesired();
    }

    async function toLeft() {
        if (atLast()) {
            if (!infinite) return;

            increment();
            scroll();

            await waitFor(scrollDuration);

            activeIndex = 1;
            scrollImmediately();
            broadcastIndexChange();

            return;
        }

        increment();
        scroll();

        await waitFor(scrollDuration);
        broadcastIndexChange();
    }

    async function toRight() {
        if (atFirst()) {
            if (!infinite) return;

            decrement();
            scroll();

            await waitFor(scrollDuration);

            activeIndex = pageCount;
            scrollImmediately();
            broadcastIndexChange();

            return;
        }

        decrement();
        scroll();

        await waitFor(scrollDuration);
        broadcastIndexChange();
    }

    async function toIndex(event) {
        activeIndex = infinite ? event.detail.index + 1 : event.detail.index;
        scroll();

        await waitFor(scrollDuration);
        broadcastIndexChange();
    }

    function increment() {
        activeIndex++;
    }

    function decrement() {
        activeIndex--;
    }

    function broadcastIndexChange() {
        window.dispatchEvent(
            new CustomEvent(EVENT_SLIDER_INDEX_CHANGED + eventPostfix, {
                detail: { index: getActiveIndexByInfinity() },
            }),
        );
    }

    function getActiveIndexByInfinity() {
        return infinite ? activeIndex - 1 : activeIndex;
    }

    function atLast(index) {
        return infinite
            ? (index ?? activeIndex) === pageCount
            : (index ?? activeIndex) === pageCount - 1;
    }

    function atFirst(index) {
        return infinite
            ? (index ?? activeIndex) === 1
            : (index ?? activeIndex) === 0;
    }

    function getTargetLeft(index) {
        return (index ?? activeIndex) * (sliderItemWidth + gap);
    }

    function getNextEdge(index) {
        return getTargetLeft(index) + (sliderItemWidth + gap) / 2;
    }

    function getPreviousEdge(index) {
        return getTargetLeft(index) - (sliderItemWidth + gap) / 2;
    }

    function startAutoSlideIfDesired() {
        if (!autoSlide) return;

        startAutoSlide();
    }

    function stopAutoSlideIfDesired() {
        if (!autoSlide) return;

        stopAutoSlide();
    }

    function startAutoSlide() {
        if (!autoSlideStopped) return;

        autoSlideStopped = false;
        autoSlideInterval = setInterval(async () => {
            if (autoSlideStopped) return;

            if (!infinite && atLast()) {
                autoSlide = false;

                return;
            }

            await toLeft();

            if (destroyed) return;

            broadcastIndexChange();
        }, autoSlideIntervalDuration);
    }

    function stopAutoSlide() {
        autoSlideStopped = true;
        clearInterval(autoSlideInterval);
    }
</script>

<div id={sliderId + "-wrapper"} class="d-contents">
    <slot />
</div>
