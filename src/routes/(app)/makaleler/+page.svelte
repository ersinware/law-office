<script>
    import BigComponent from "$lib/components/common/BigComponent.svelte";
    import SmallComponent from "$lib/components/common/SmallComponent.svelte";
    import { TRANSITION_PAGE } from "$lib/js/client/common/constants.transitions.client.common.js";
    import { isSvg } from "$lib/js/client/common/util.client.common.js";
    import {
        getLinkForResponsiveImage,
        getMediaQueryForResponsiveImage,
    } from "$lib/js/client/common/util.responsive.client.common.js";
    import {
        ARTICLE_IMAGE_MEDIA_DATA,
        BIG_ARTICLE_IMAGE_MEDIA_DATA,
    } from "$lib/js/common/constants.media.data.common.js";
    import { getDashedString } from "$lib/js/common/util.common.js";
    import { fly } from "svelte/transition";

    export let data;

    for (const article of data.articles) article.svg = isSvg(article.imageName);
</script>

<svelte:head>
    {#each new Array(3) as _, index}
        {#if index < data.articles.length}
            {@const article = data.articles[index]}
            {@const svg = isSvg(article.imageName)}

            {#if svg}
                <link
                    rel="preload"
                    href={`/api/image/${article.imageName}?updated-at=${article.imageUpdatedAt}`}
                    as="image"
                    type="image/svg+xml"
                    fetchpriority={index === 0 ? "high" : "low"}
                />
            {:else if index === 0}
                {#each BIG_ARTICLE_IMAGE_MEDIA_DATA as media}
                    <link
                        rel="preload"
                        href={getLinkForResponsiveImage(
                            article.imageName,
                            media,
                            article.imageUpdatedAt,
                        )}
                        as="image"
                        type={"image/webp"}
                        media={getMediaQueryForResponsiveImage(media)}
                        fetchpriority="high"
                    />
                {/each}
            {:else}
                {#each ARTICLE_IMAGE_MEDIA_DATA as media}
                    <link
                        rel="preload"
                        href={getLinkForResponsiveImage(
                            article.imageName,
                            media,
                            article.imageUpdatedAt,
                        )}
                        as="image"
                        type={"image/webp"}
                        media={getMediaQueryForResponsiveImage(media)}
                        fetchpriority="low"
                    />
                {/each}
            {/if}
        {/if}
    {/each}

    <meta
        name="description"
        content="Mirici & Partners Avukatlık Bürosu'nun güncel hukuki makaleler koleksiyonu. İnşaat ve gayrimenkul hukuku, ceza hukuku, ticaret ve şirketler vb. alanlarda uzman avukatlarımızın hazırladığı bilgilendirici içerikler, yasal gelişmeler ve pratik hukuki öneriler için blog sayfamızı ziyaret edin."
    />

    <title>Makaleler | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale</title>
</svelte:head>

<section
    class="flex f-column a-i-c g-v-d max-w-small-page m-h-auto"
    in:fly={TRANSITION_PAGE}
>
    <h1 class="smaller-section-title t-a-c">Makaleler</h1>

    <p class="section-text t-a-j">
        Hukuki konularda bilgi edinirken, ihtiyaç duyduğunuz alanlarda size
        rehberlik edecek uzman içeriklere ulaşabilir, merak ettiğiniz konular
        hakkında daha fazla bilgi almak için bizimle iletişime geçebilirsiniz.
    </p>

    {#if data.articles?.length}
        <article id="articles-wrapper" class="grid g-v-d w-100">
            <BigComponent
                backgroundColor="var(--secondary-background-color)"
                title={data.articles[0].title}
                content={data.articles[0].firstSentence}
                buttonText="HEPSİNİ OKU"
                imageId={getDashedString(data.articles[0].title)}
                imageAlt={`${data.articles[0].title} | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale`}
                imageName={data.articles[0].imageName}
                imageUpdatedAt={data.articles[0].imageUpdatedAt}
                mediaData={data.articles[0].svg
                    ? undefined
                    : BIG_ARTICLE_IMAGE_MEDIA_DATA}
                href="/makale/{getDashedString(data.articles[0].title)}"
                limitedLines
            />

            {#if data.articles.length > 1}
                <div class="grid components-wrapper">
                    {#each data.articles as article, index}
                        {#if index > 0}
                            <SmallComponent
                                backgroundColor="var(--secondary-background-color)"
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
                                href="/makale/{getDashedString(article.title)}"
                                lazyImage={index > 2}
                                limitedLines
                            />
                        {/if}
                    {/each}
                </div>
            {/if}
        </article>
    {/if}
</section>

<style>
    .section-text {
        max-width: 28.5rem;
    }

    #articles-wrapper {
        margin-top: calc(var(--main-v-padding) / 1.5);
    }
</style>
