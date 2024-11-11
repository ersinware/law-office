<script>
    import { TRANSITION_PAGE } from "$lib/js/client/common/constants.transitions.client.common";
    import {
        getLinkForResponsiveImage,
        getMediaQueryForResponsiveImage,
    } from "$lib/js/client/common/util.responsive.client.common";
    import { LAWYER_IMAGE_PERSON_PAGE_MEDIA_DATA } from "$lib/js/common/constants.media.data.common";
    import { fly } from "svelte/transition";
</script>

<svelte:head>
    {@html `
        <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Ekibimiz",
                        "item": "https://mirici.av.tr/ekibimiz"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Erdem Mirici",
                        "item": "https://mirici.av.tr/ekibimiz/erdem-mirici"
                    }
                ]
            }
        </script>
    `}

    {#each LAWYER_IMAGE_PERSON_PAGE_MEDIA_DATA as media}
        <link
            rel="preload"
            href={getLinkForResponsiveImage(
                "erdem-mirici-(büyük).webp",
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

    <title
        >Erdem Mirici'nin Özgeçmişi | Mirici & Partners Avukatlık Bürosu |
        Merkez, Çanakkale</title
    >

    <meta
        name="description"
        content="Mirici & Partners Avukatlık Bürosu ekip üyesi Erdem Mirici'nin özgeçmişi."
    />
</svelte:head>

<section
    class="flex f-column a-i-c g-4 w-100 max-w-small-page m-h-auto"
    in:fly={TRANSITION_PAGE}
>
    <div
        class="lawyer-image-person-page hoverable-image-wrapper w-100 b-r-d o-hidden"
    >
        <picture class="d-contents">
            {#each LAWYER_IMAGE_PERSON_PAGE_MEDIA_DATA as media}
                <source
                    class="d-contents"
                    media={getMediaQueryForResponsiveImage(media)}
                    srcset={getLinkForResponsiveImage(
                        "erdem-mirici-(büyük).webp",
                        media,
                        undefined,
                        false,
                    )}
                />
            {/each}

            <img
                class="lawyer-image-person-page hoverable-image w-100"
                src="/blank.svg"
                alt="Erdem Mirici | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale"
            />
        </picture>
    </div>

    <div class="flex f-column a-i-c g-v-d">
        <h1 class="smaller-section-title">Erdem Mirici</h1>

        <p class="about-us-page-text section-text t-a-j">
            Uzman Klinik Psikolog Zeynep Başar, psikoloji lisans eğitimini İzmir
            Ekonomi Üniversitesi’nde tamamlamış, ardından Boğaziçi Üniversitesi
            Klinik Psikoloji yüksek lisans programından mezun olmuştur. Klinik
            stajını süpervizyon eşliğinde Boğaziçi Üniversitesi Psikolojik
            Araştırma ve Uygulama Merkezi’nde (BÜPAM) üniversite öğrencileri ve
            çocuklarla gerçekleştirmiştir. Yüksek lisans tezi kapsamında
            İstanbul95 projesinde gönüllü çalışmış ve aynı projenin Aile Temelli
            Ev Ziyareti Programı ayağında anne ve bebek etkileşimlerini
            gözlemlemiş ve ev ziyareti programının anne ve bebek üzerindeki
            etkilerini araştırmıştır.

            <br />
            <br />

            Yetişkinlere psikodinamik temelli bireysel terapi hizmeti
            vermektedir. Ek olarak, Kısa Süreli Çözüm Odaklı, Sanat ve Bilişsel
            Davranışçı terapi eğitimleri almıştır. Çocuklarla ise Deneyimsel
            Oyun terapisi yapmaktadır. Şu anda yetişkin, ergen ve çocuklarla
            İzmir’deki ofisinde yüz yüze ve online olarak çalışmalarına devam
            etmektedir.

            <br />
            <br />

            <span class="about-us-page-small-title inline-block f-w-600"
                >Uzmanlık Alanları</span
            >

            <br />

            <span class="about-us-page-italic-text">
                Depresyon, Kaygı Bozuklukları, Fobiler, Obsesif Kompulsif
                Bozukluk, Kayıp ve yas danışmanlığı, İlişki problemleri,
                İletişim Sorunları, Ailevi Sorunlar, Değersizlik-Yetersizlik
                Hisleri, Suçluluk ve Utanç Duyguları, Travma Yaşantıları, Öfke
                Sorunu, Psikolojik Kökenli Bedensel Rahatsızlıklar, Geçmişe Dair
                Halledilemeyen Meseleler.
            </span>

            <br />
            <br />

            <span class="about-us-page-small-title inline-block f-w-600"
                >Eğitim,Sertifika ve Sunumlar</span
            >
            <br />
            <span class="about-us-page-italic-text"
                >Kısa Süreli Çözüm Odaklı Terapi Eğitimi - Yrd. Doç. Dr. Nevin
                Dölek</span
            >
            <br />
            <span class="about-us-page-italic-text"
                >Sanat Terapisi Eğitimi - Arkabahçe Psikolojik Gelişim ve
                Danışmanlık Merkezi</span
            >
            <br />
            <span class="about-us-page-italic-text"
                >Bilişsel Davranışçı Terapi Eğitimi - Doç. Dr. Vahdet Görmez</span
            >
            <br />
            <span class="about-us-page-italic-text"
                >Çocuklarla Deneyimsel Oyun Terapisi Eğitimi - Uzm. Psk. Nilüfer
                Devecigil</span
            >
            <br />
            <span class="about-us-page-italic-text"
                >Psikanalitik Bakışlar 11: “Gitmek mi Kalmak mı? Psikanaliz ve
                Göç” – 2017</span
            >
            <br />
            <span class="about-us-page-italic-text"
                >Psikanalitik Bakışlar 12: “İç Dünya – Dış Gerçeklik” – 2018</span
            >
            <br />
            <span class="about-us-page-italic-text"
                >Psikanalitik Bakışlar 13: “Yıkıcılık ve Ölüm Dürtüsü” – 2019</span
            >
            <br />
            <span class="about-us-page-italic-text"
                >4. Psikoterapi Zirvesi – 2021</span
            >
            <br />
            <span class="about-us-page-italic-text"
                >Psikoterapide Metafor Kullanımı, Mita Psikoloji – 2021</span
            >
            <br />
            <span class="about-us-page-italic-text"
                >İzmir Psikanaliz Toplantıları, İstanbul Psikanaliz Derneği –
                2022-2023</span
            >
            <br />
            <span class="about-us-page-italic-text"
                >İzmir Psikanaliz Toplantısı, Tekinsizlik Üzerine Vaka Sunumu,
                İstanbul Psikanaliz Derneği – 2023</span
            >
            <br />
            <span class="about-us-page-italic-text"
                >Psikanalitik Terapi Kuramsal Eğitimi, İzmir Odağ Psikanaliz ve
                Psikoterapi Derneği – 2023-2024</span
            >
        </p>
    </div>
</section>
