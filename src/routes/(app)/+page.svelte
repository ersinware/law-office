<script>
    import HomepageSlider from "$lib/components/app/homepage/HomepageSlider.svelte";
    import AppointmentModal from "$lib/components/app/modals/AppointmentModal.svelte";
    import ContactModal from "$lib/components/app/modals/contact/ContactModal.svelte";
    import BigComponent from "$lib/components/common/BigComponent.svelte";
    import LazyImage from "$lib/components/common/LazyImage.svelte";
    import SmallComponent from "$lib/components/common/SmallComponent.svelte";
    import { TRANSITION_PAGE } from "$lib/js/client/common/constants.transitions.client.common.js";
    import {
        isSvg,
        onLinkClick,
        performRippleEffectForButtonAndWait,
    } from "$lib/js/client/common/util.client.common.js";
    import { openModal } from "$lib/js/client/common/util.modals.client.common.js";
    import {
        ARTICLE_IMAGE_MEDIA_DATA,
        BIG_ARTICLE_IMAGE_MEDIA_DATA,
    } from "$lib/js/common/constants.media.data.common.js";
    import { getDashedString } from "$lib/js/common/util.common.js";
    import { fly } from "svelte/transition";

    export let data;

    const services = [
        {
            title: "İnşaat ve Gayrimenkul Hukuku",
            content:
                "İnşaat projeleri, arsa alım-satımı, kira sözleşmeleri ve imar işlemleri gibi gayrimenkul işlemlerinizde hukuki destek sunarak, süreçlerinizi güvence altına alıp ve haklarınızı koruruz.",
            imageId: "construction",
            imageAlt:
                "İnşaat ve Gayrimenkul Hukuku | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale",
            imageName: "construction.svg",
        },
        {
            title: "Ceza Hukuku",
            content:
                "Suçlamalar karşısında sizin yanınızda durur, adli süreçlerde rehberlik eder ve güçlü savunma stratejileri geliştirerek haklarınızı koruruz.",
            imageId: "punishment",
            imageAlt:
                "Ceza Hukuku | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale",
            imageName: "punishment.svg",
        },
        {
            title: "Ticaret ve Şirketler Hukuku",
            content:
                "Şirketinizin karşılaştığı her türlü hukuki konuda yanınızda olur, çıkarlarınızı gözetir ve işlerinizin hukuka uygun şekilde ilerlemesini sağlarız.",
            imageId: "trade",
            imageAlt:
                "Ticaret ve Şirketler Hukuku | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale",
            imageName: "trade.svg",
        },
        {
            title: "Sözleşmeler ve Borçlar Hukuku",
            content:
                "Anlaşmazlıklarınızı çözer, sözleşme süreçlerinizi yönetir ve borçlarınızla ilgili en etkin ve güvenilir çözümleri sunarız.",
            imageId: "deal",
            imageAlt:
                "Sözleşmeler ve Borçlar Hukuku | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale",
            imageName: "deal.svg",
        },
        {
            title: "İdare Hukuku",
            content:
                "Devlet kurumlarıyla yaşadığınız uyuşmazlıklarda, karmaşık bürokratik süreçleri sizin için basitleştirir ve haklarınızı sonuna kadar savunuruz.",
            imageId: "management",
            imageAlt:
                "İdare Hukuku | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale",
            imageName: "management.svg",
        },
        {
            title: "İcra ve İflas Hukuku",
            content:
                "Alacaklarınızı etkili bir şekilde tahsil etmenize yardımcı olurken, borçlarınızı yönetme ve çözme süreçlerinde de kapsamlı destek sağlarız.",
            imageId: "bankruptcy",
            imageAlt:
                "İcra ve İflas Hukuku | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale",
            imageName: "bankruptcy.svg",
        },
    ];

    for (const article of data.articles) article.svg = isSvg(article.imageName);

    for (const service of services) {
        const title = getDashedString(service.title);
        if (data.articleTitles.includes(title)) {
            service.href = `/makale/${title}`;
            service.buttonText = "DETAYLAR";
        } else service.buttonText = "RANDEVU AL";
    }

    async function onOurServicesClick(event) {
        await performRippleEffectForButtonAndWait(event);

        window.scrollTo({
            top:
                document
                    .getElementById("our-services-wrapper")
                    .getBoundingClientRect().top +
                window.scrollY -
                document.querySelector("#header").clientHeight -
                getComputedStyle(
                    document.getElementById("homepage-wrapper"),
                ).gap.replace("px", ""),
            behavior: "smooth",
        });
    }

    function onAppointmentClick() {
        openModal({ component: AppointmentModal, addToBackstack: true });
    }

    async function onWriteUsClick(event) {
        await performRippleEffectForButtonAndWait(event);

        openModal({ component: ContactModal, addToBackstack: true });
    }
</script>

<svelte:head>
    {@html `
       <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Mirici & Partners Avukatlık Bürosu",
                "image": "https://mirici.av.tr/mirici-&-partners-avukatlık-bürosu.svg",
                "telephone": "+905332407477",
                "email": "erdemmirici2@gmail.com",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "İsmet Paşa Mahallesi, Demircioğlu Caddesi, No: 25",
                    "addressLocality": "Merkez",
                    "addressRegion": "Çanakkale",
                    "addressCountry": "TR"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 40.1475136128562,
                    "longitude":26.406789728835385
                },
                "url": "https://mirici.av.tr",
                "openingHours": [
                    "Mo-Fr 09.00-17:30",
                ],
                "description": "Mirici & Partners Avukatlık Bürosu, Çanakkale'de geniş bir yelpazede hukuki hizmetler sunan deneyimli bir ekibe sahiptir. İnşaat ve gayrimenkul hukuku, ceza hukuku, ticaret ve şirketler hukuku vb. alanlarda uzmanlaşmış avukatlarımızla, müvekkillerimizin haklarını korumak ve hukuki sorunlarına etkili çözümler üretmek için çalışıyoruz.",
            }
        </script>
    `}

    <link
        rel="preload"
        href="law-firm.svg"
        as="image"
        type="image/svg+xml"
        fetchpriority="high"
    />

    <link
        rel="preload"
        href="trustable.svg"
        as="image"
        type="image/svg+xml"
        fetchpriority="high"
    />

    <link
        rel="preload"
        href="enterprise-solutions.svg"
        as="image"
        type="image/svg+xml"
        fetchpriority="high"
    />

    <meta
        name="description"
        content="Mirici & Partners Avukatlık Bürosu, Çanakkale'de geniş bir yelpazede hukuki hizmetler sunan deneyimli bir ekibe sahiptir. İnşaat ve gayrimenkul hukuku, ceza hukuku, ticaret ve şirketler hukuku vb. alanlarda uzmanlaşmış avukatlarımızla, müvekkillerimizin haklarını korumak ve hukuki sorunlarına etkili çözümler üretmek için çalışıyoruz."
    />

    <title
        >Çanakkale Avukat | Mirici & Partners Avukatlık Bürosu | Merkez,
        Çanakkale</title
    >
</svelte:head>

<div
    id="homepage-wrapper"
    class="wrapper grid page-gap m-h-auto"
    in:fly={TRANSITION_PAGE}
>
    <HomepageSlider />

    <div class="texts-with-images-wrapper flex j-c-c g-v-d max-w-page">
        <article
            class="text-with-image-wrapper b-box w-100 article-p-d secondary-background-color b-r-d"
        >
            <img
                alt="Uzman ve Deneyimli Ekip | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale"
                class="image-with-text w-100"
                src="law-firm.svg"
            />

            <div class="flex f-column g-1">
                <h2 class="text-with-image-title article-text f-w-600">
                    Uzman ve Deneyimli Ekip
                </h2>

                <p
                    class="text-with-image-text small-article-text m-h-auto t-a-j"
                >
                    Alanında uzman avukatlarımız, her türlü hukuki süreçte size
                    rehberlik eder ve en iyi sonuçları elde etmek için çalışır.
                </p>
            </div>
        </article>

        <article
            class="text-with-image-wrapper b-box w-100 article-p-d secondary-background-color b-r-d"
        >
            <img
                alt="Güvenilir Hukuki Çözümler | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale"
                class="image-with-text w-100"
                src="trustable.svg"
            />

            <div class="flex f-column g-1">
                <h2 class="text-with-image-title article-text f-w-600">
                    Güvenilir Hukuki Çözümler
                </h2>

                <p
                    class="text-with-image-text small-article-text m-h-auto t-a-j"
                >
                    Müvekkillerimize güvenilir ve etkili hukuki çözümler
                    sunarak, haklarını en güçlü şekilde koruyor ve savunuyoruz.
                </p>
            </div>
        </article>

        <article
            class="text-with-image-wrapper b-box w-100 article-p-d secondary-background-color b-r-d"
        >
            <img
                alt="Bireysel ve Kurumsal Destek | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale"
                class="image-with-text w-100"
                src="enterprise-solutions.svg"
            />

            <div class="flex f-column g-1">
                <h2 class="text-with-image-title article-text f-w-600">
                    Bireysel ve Kurumsal Destek
                </h2>

                <p
                    class="text-with-image-text small-article-text m-h-auto t-a-j"
                >
                    Bireysel ihtiyaçlardan kurumsal taleplere kadar geniş bir
                    yelpazede hukuki danışmanlık ve destek sunuyoruz.
                </p>
            </div>
        </article>
    </div>

    <div class="b-box full-w page-p-v-d p-h-d secondary-background-color">
        <section
            class="flex a-i-c max-w-page m-h-auto big-screen-f-s-b big-screen-g-h-d small-screen-f-column-reverse small-screen-g-v-d"
        >
            <div
                class="section-texts-wrapper flex f-column g-v-d big-screen-w-100"
            >
                <h1 class="smaller-section-title small-screen-t-a-c">
                    Mirici & Partners <br /> Avukatlık Bürosu
                </h1>

                <p class="section-text t-a-j">
                    Mirici & Partners Avukatlık Bürosu, Çanakkale’de
                    müvekkillerine güvenilir, profesyonel ve çözüm odaklı hukuki
                    hizmetler sunmaktadır. Şeffaflık ilkemizle, her türlü hukuki
                    süreçte yanınızda olarak, haklarınızı en iyi şekilde
                    korumayı hedefliyoruz.
                </p>

                <button
                    class="button small-button small-screen-m-h-auto"
                    on:click={onOurServicesClick}>HİZMETLERİMİZ</button
                >
            </div>

            <div class="section-image w-100 b-r-d o-hidden">
                <LazyImage
                    id="lawyer"
                    alt="Avukat | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale"
                    classes="section-image w-100"
                    imageName="lawyer.svg"
                    staticImage
                />
            </div>
        </section>
    </div>

    <section
        id="our-services-wrapper"
        class="grid g-v-d w-100 max-w-small-page m-h-auto"
    >
        <div class="title-with-link-button-wrapper grid g-dot5 t-a-c">
            <h2 class="smaller-section-title">Hizmetlerimiz</h2>

            <a
                href="/hizmetlerimiz"
                class="link-button m-h-auto w-max-content f-w-600"
                on:click={onLinkClick}>Hepsini Gör</a
            >
        </div>

        <BigComponent
            backgroundColor="var(--secondary-background-color)"
            title={services[0].title}
            content={services[0].content}
            buttonText={services[0].buttonText}
            imageId={services[0].imageId}
            imageAlt={services[0].imageAlt}
            imageName={services[0].imageName}
            href={services[0].href}
            on:click={onAppointmentClick}
            framedButton
            lazyImage
            staticImage
        />

        <div class="grid components-wrapper">
            {#each services as service, index}
                {#if index > 0}
                    <SmallComponent
                        backgroundColor="var(--secondary-background-color)"
                        title={service.title}
                        content={service.content}
                        buttonText={service.buttonText}
                        imageId={service.imageId}
                        imageAlt={service.imageAlt}
                        imageName={service.imageName}
                        href={service.href}
                        on:click={onAppointmentClick}
                        lazyImage
                        staticImage
                    />
                {/if}
            {/each}

            <SmallComponent
                backgroundColor="var(--secondary-background-color)"
                title="Diğer Alanlar"
                content="Geniş bir yelpazeye yayılan hukuk dallarında kapsamlı ve profesyonel hizmetler sunarak, hukuki ihtiyaçlarınıza yönelik çözümler üretmekteyiz."
                buttonText="TÜM HİZMETLERİMİZ"
                imageId="other-issues"
                imageAlt="Diğer Alanlar | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale"
                imageName="other-issues.svg"
                href="/hizmetlerimiz"
                lazyImage
                staticImage
            />
        </div>
    </section>

    {#if data.articles?.length}
        <div class="b-box full-w page-p-v-d p-h-d secondary-background-color">
            <section class="grid g-v-d w-100 max-w-small-page m-h-auto">
                <div class="title-with-link-button-wrapper grid g-dot5 t-a-c">
                    <h2 class="smaller-section-title">Makaleler</h2>

                    <a
                        href="/makaleler"
                        class="link-button w-max-content m-h-auto f-w-600"
                        on:click={onLinkClick}>Hepsini Gör</a
                    >
                </div>

                <BigComponent
                    backgroundColor="var(--third-background-color)"
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
                    framedButton
                    lazyImage
                    limitedLines
                />

                {#if data.articles.length > 1}
                    <div class="grid components-wrapper">
                        {#each data.articles as article, index}
                            {#if index > 0}
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
                            {/if}
                        {/each}
                    </div>
                {/if}
            </section>
        </div>
    {/if}

    <div
        class={!data.articles?.length
            ? "last-section b-box full-w page-p-v-d p-h-d secondary-background-color"
            : "dump"}
    >
        <section class="flex f-column a-i-c w-100 max-w-small-page m-h-auto">
            <div id="contact-us-image-wrapper" class="section-image w-100">
                <LazyImage
                    id="contact"
                    alt="Bize Danışın | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale"
                    classes="section-image w-100"
                    imageName="contact.svg"
                    staticImage
                />
            </div>

            <div class="flex f-column g-v-d">
                <h2 class="smaller-section-title t-a-c">Bize Danışın</h2>

                <p id="contact-text" class="section-text t-a-j">
                    Sorularınız veya destek talepleriniz için bizimle iletişime
                    geçmekten çekinmeyin. Size en iyi şekilde yardımcı olabilmek
                    için buradayız ve bundan mutluluk duyarız. Size nasıl
                    yardımcı olabileceğimizi öğrenmek için mesajınızı
                    bekliyoruz.
                </p>

                <button
                    class="button small-button m-h-auto"
                    on:click={onWriteUsClick}
                    >BİZE YAZIN
                </button>
            </div>
        </section>

        {#if !data.articles?.length}
            <div class="h-divider last-section-divider w-100 m-h-auto"></div>
        {/if}
    </div>
</div>

<style>
    .texts-with-images-wrapper {
        flex-wrap: wrap;
        margin-block: calc(var(--main-v-padding) / 2);
    }

    .text-with-image-title {
        color: var(--title-color);
        letter-spacing: 0.015rem;
    }

    @media (min-width: 59.001em) {
        .text-with-image-wrapper {
            max-width: 30%;
        }
    }

    @media (max-width: 50.75em) {
        .text-with-image-title {
            text-align: center;
        }
    }

    @media (max-width: 59em) {
        .text-with-image-wrapper {
            max-width: 20rem;
        }
    }

    @media (max-width: 39.375em) {
        .texts-with-images-wrapper {
            margin-block: 0;
        }

        .text-with-image-wrapper {
            max-width: 100%;
        }
    }

    @media (min-width: 37.501em) {
        #contact-us-image-wrapper {
            margin-bottom: -3rem;
        }
    }

    @media (min-width: 30.001em) and (max-width: 37.5em) {
        #contact-us-image-wrapper {
            margin-bottom: -2rem;
        }
    }

    @media (min-width: 23.75em) and (max-width: 30em) {
        #contact-us-image-wrapper {
            margin-bottom: -1rem;
        }
    }
</style>
