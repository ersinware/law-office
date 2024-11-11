<script>
    import { TRANSITION_PAGE } from "$lib/js/client/common/constants.transitions.client.common";
    import {
        onLinkClick,
        performRippleEffectForButtonAndWait,
    } from "$lib/js/client/common/util.client.common";
    import { getDashedString } from "$lib/js/common/util.common";
    import { fly } from "svelte/transition";

    export let data;

    const services = [
        { title: "İnşaat ve Gayrimenkul Hukuku" },
        { title: "Kira Hukuku" },
        { title: "Ceza Hukuku" },
        { title: "Ticaret ve Şirketler Hukuku" },
        { title: "Sözleşmeler ve Borçlar Hukuku" },
        { title: "İdare Hukuku" },
        { title: "İcra ve İflas Hukuku" },
        { title: "Aile Hukuku" },
        { title: "Bilişim Hukuku" },
        { title: "Kişiler Hukuku" },
        { title: "Miras Hukuku" },
        { title: "Tazminat Hukuku" },
        { title: "İş ve Sosyal Güvenlik Hukuku" },
        { title: "Vergi Hukuku" },
        { title: "Fikri ve Sınai Mülkiyet Hukuku" },
        { title: "Uluslararası Hukuk" },
        { title: "Sigorta Hukuku" },
        { title: "Tüketici Hukuku" },
        { title: "Spor Hukuku" },
        { title: "Tahkim" },
        { title: "Arabuluculuk" },
        { title: "Hukiki Danışmanlık Hizmeti" }
    ];

    async function onDetailsClick(event) {
        await performRippleEffectForButtonAndWait(event);

        window.scrollTo({
            top:
                document
                    .getElementById("our-services-base-wrapper")
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
        href="/our-services.svg"
        as="image"
        type="image/svg+xml"
        fetchpriority="high"
    />

    <meta
        name="description"
        content="Mirici & Partners Avukatlık Bürosu, Çanakkale'de geniş bir yelpazede profesyonel hukuki hizmetler sunmaktadır. Uzman kadromuzla haklarınızı koruyor, etkili çözümler üretiyoruz. Bu sayfamızda, hangi hizmetlerimizi verdiğimizi görüntüleyebilirsiniz."
    />

    <title>Hizmetlerimiz | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale</title>
</svelte:head>

<div class="grid page-gap max-w-page m-h-auto" in:fly={TRANSITION_PAGE}>
    <section
        class="flex a-i-c big-screen-f-s-b big-screen-g-h-d small-screen-f-column small-screen-g-v-d"
    >
        <div class="section-image w-100 b-r-d o-hidden">
            <img
                class="section-image w-100"
                src="/our-services.svg"
                alt="Hakkımızda | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale"
            />
        </div>

        <div class="section-texts-wrapper flex f-column g-v-d big-screen-w-100">
            <h1 class="smaller-section-title small-screen-t-a-c">
                Hizmetlerimiz
            </h1>

            <p class="section-text t-a-j">
                Mirici & Partners Avukatlık Bürosu geniş bir yelpazede profesyonel hukuki
                destek sağlayarak, haklarınızı en üst düzeyde gözetmeyi ilke
                edinmiştir. Çanakkale'de deneyimli ve yetkin avukat arayışınıza
                son vermek için bize ulaşmanız yeterli.
            </p>

            <button
                class="button small-button small-screen-m-h-auto"
                on:click={onDetailsClick}>DETAYLAR</button
            >
        </div>
    </section>

    <div
        id="our-services-base-wrapper"
        class="b-box last-section full-w page-p-v-d p-h-d secondary-background-color"
    >
        <article
            id="our-services-wrapper"
            class="grid w-100 max-w-small-page m-h-auto"
        >
            {#each services as service}
                {@const dashedTitle = getDashedString(service.title)}

                {#if data.articleTitles.includes(dashedTitle)}
                    <a
                        href="/makale/{dashedTitle}"
                        class="service-wrapper b-box flex j-c-c a-i-c h-100 article-p-d third-background-color b-r-d"
                        on:click={onLinkClick}
                    >
                        <h2
                            class="service-title service-link small-article-text f-w-500 t-a-c"
                        >
                            {service.title}
                        </h2>
                    </a>
                {:else}
                    <article
                        class="service-wrapper b-box flex j-c-c a-i-c h-100 article-p-d third-background-color b-r-d"
                    >
                        <h2
                            class="service-title small-article-text f-w-500 t-a-c"
                        >
                            {service.title}
                        </h2>
                    </article>
                {/if}
            {/each}
        </article>

        <div class="last-section-divider h-divider m-h-auto"></div>
    </div>
</div>

<style>
    .section-text,
    .small-article-text {
        max-width: 28.5rem;
    }

    #our-services-wrapper {
        --grid-item-min-width: 10rem;
        --grid-layout-gap: var(--main-v-padding);
        --grid-max-column-count: 3;
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

        margin-top: calc(var(--main-v-padding) / 1.5);
    }

    .service-title {
        color: var(--text-color);
    }

    .service-link {
        color: steelblue;
    }

    @media (hover: hover) {
        #our-services-wrapper a {
            transition: background-color 0.25s ease-in-out;
        }

        #our-services-wrapper a:hover {
            background-color: var(--fourth-background-color) !important;
        }
    }
</style>
