<script>
    import { fly } from "svelte/transition";

    import LazyImage from "$lib/components/common/LazyImage.svelte";
    import { TRANSITION_PAGE } from "$lib/js/client/common/constants.transitions.client.common";
    import {
        onLinkClick,
        performRippleEffectForButtonAndWait,
    } from "$lib/js/client/common/util.client.common";
    import { LAWYER_IMAGE_OUR_TEAM_PAGE_MEDIA_DATA } from "$lib/js/common/constants.media.data.common";
    import { getDashedString } from "$lib/js/common/util.common";

    const team = [
        {
            imageName: "erdem-mirici.webp",
            name: "Erdem Mirici",
            role: "EMEKLİ YARGITAY ÜYESİ, AVUKAT",
            alt: "Erdem Mirici | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale",
        },
        {
            imageName: "cankız-orhan.webp",
            name: "Cankız Orhan",
            role: "AVUKAT",
            alt: "Cankız Orhan | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale",
        },
        {
            imageName: "ismail-kaptan.webp",
            name: "İsmail Kaptan",
            role: "STAJYER AVUKAT",
            alt: "İsmail Kaptan | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale",
        },
    ];

    async function onDetailsClick(event) {
        await performRippleEffectForButtonAndWait(event);

        window.scrollTo({
            top:
                document
                    .getElementById("our-team-base-wrapper")
                    .getBoundingClientRect().top +
                window.scrollY -
                document.querySelector("#header").clientHeight,
            behavior: "smooth",
        });
    }
</script>

<svelte:head>
    <link
        rel="preload"
        href="/our-team.svg"
        as="image"
        type="image/svg+xml"
        fetchpriority="high"
    />

    <meta name="description" content="" />

    <title
        >Ekibimiz | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale</title
    >

    <meta
        name="description"
        content="Mirici & Partners Avukatlık Bürosu'nun deneyimli avukat ekibi, Çanakkale'de profesyonel hukuki danışmanlık ve çözüm odaklı hizmetler sunmaktadır. Uzman kadromuzla müvekkillerimize güvenilir ve etkili destek sağlıyoruz."
    />
</svelte:head>

<div class="grid page-gap max-w-page m-h-auto" in:fly={TRANSITION_PAGE}>
    <section
        class="flex a-i-c big-screen-f-s-b big-screen-g-h-d small-screen-f-column-reverse small-screen-g-v-d"
    >
        <div class="section-texts-wrapper flex f-column g-v-d big-screen-w-100">
            <h1 class="smaller-section-title small-screen-t-a-c">Ekibimiz</h1>

            <p class="section-text t-a-j">
                Mirici & Partners Avukatlık Bürosu'nun uzman ve deneyimli avukat
                ekibi, Çanakkale'de geniş bir yelpazede hukuki hizmetler
                sunarak, müvekkillerin ihtiyaçlarına özel çözümler üretmektedir.
                Güvenilir ekibimizle, haklarınızı korumak için yanınızdayız.
            </p>

            <button
                class="button small-button small-screen-m-h-auto"
                on:click={onDetailsClick}>DETAYLAR</button
            >
        </div>

        <div class="section-image w-100 b-r-d o-hidden">
            <img
                id="our-team-image"
                class="section-image w-100"
                src="/our-team.svg"
                alt="Hakkımızda | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale"
            />
        </div>
    </section>

    <div
        id="our-team-base-wrapper"
        class="b-box last-section full-w page-p-v-d p-h-d secondary-background-color"
    >
        <article
            id="our-team-wrapper"
            class="grid w-100 max-w-small-page m-h-auto"
        >
            {#each team as lawyer}
                <a
                    class="lawyer-wrapper hoverable-image-wrapper"
                    href="/ekibimiz/{getDashedString(lawyer.name)}"
                    on:click={onLinkClick}
                >
                    <article class="lawyer-image-our-team-page b-r-d o-hidden">
                        <LazyImage
                            id={getDashedString(lawyer.imageName)}
                            alt={lawyer.alt}
                            classes="lawyer-image-our-team-page hoverable-image w-h-100"
                            mediaData={LAWYER_IMAGE_OUR_TEAM_PAGE_MEDIA_DATA}
                            imageName={lawyer.imageName}
                        />
                    </article>

                    <div class="texts-wrapper">
                        <p class="smaller-t-hint unimportant-text-color">
                            {lawyer.role}
                        </p>
                        <p class="name article-text f-w-500">{lawyer.name}</p>
                    </div>
                </a>
            {/each}
        </article>

        <div class="last-section-divider h-divider m-h-auto"></div>
    </div>
</div>

<style>
    #our-team-image {
        margin-top: calc(var(--main-v-padding) * -0.5);
    }

    #our-team-wrapper {
        --grid-item-min-width: 17.5rem;
        --grid-layout-gap: var(--main-v-padding);
        --grid-max-column-count: 2;
        --gap-count: calc(var(--grid-max-column-count) - 1);
        --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
        --grid-item-max-width: calc(
            (100% - var(--total-gap-width)) / var(--grid-max-column-count)
        );

        grid-template-columns: repeat(
            auto-fill,
            minmax(
                max(var(--grid-item-min-width), var(--grid-item-max-width)),
                1fr
            )
        );

        gap: var(--grid-layout-gap);
        row-gap: calc(var(--grid-layout-gap) + 0.5rem);
    }

    .texts-wrapper {
        margin-top: 1.25rem;
        margin-left: 0.25rem;
        margin-right: 0.25rem;
    }

    .name {
        margin-top: 0.375rem;
        color: steelblue;
    }

    @media (hover: hover) {
        .name {
            transition: color 0.25s ease-in-out;
        }

        .lawyer-wrapper:hover .name {
            color: rgb(40, 100, 150);
        }
    }
</style>
