<script>
    import AboutUsSlider from "$lib/components/app/about-us/AboutUsSlider.svelte";
    import { TRANSITION_PAGE } from "$lib/js/client/common/constants.transitions.client.common.js";
    import { performRippleEffectForButtonAndWait } from "$lib/js/client/common/util.client.common.js";
    import { fly } from "svelte/transition";

    async function onDetailsClick(event) {
        await performRippleEffectForButtonAndWait(event);

        window.scrollTo({
            top:
                document
                    .getElementById("resume-wrapper")
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
        href="/about-us.svg"
        as="image"
        type="image/svg+xml"
        fetchpriority="high"
    />

    <meta
        name="description"
        content="Mirici & Partners Avukatlık Bürosu, 20 yılı aşkın deneyimiyle Çanakkale'de kaliteli hukuki hizmet sunmaktadır. Uzman avukat kadromuzla inşaat ve gayrimenkul hukuku, ceza hukuku, ticaret ve şirketler vb. alanlarda müvekkillerimizin haklarını koruyoruz. Güvenilir, yenilikçi ve müşteri odaklı yaklaşımımızı keşfedin."
    />

    <title>Hakkımızda | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale</title>
</svelte:head>

<div class="grid page-gap max-w-page m-h-auto" in:fly={TRANSITION_PAGE}>
    <section
        class="flex a-i-c big-screen-f-s-b big-screen-g-h-d small-screen-f-column small-screen-g-v-d"
    >
        <div class="section-image w-100 b-r-d o-hidden">
            <img
                id="about-us-image"
                class="section-image w-100"
                src="/about-us.svg"
                alt="Hakkımızda | Mirici & Partners Avukatlık Bürosu | Merkez, Çanakkale"
            />
        </div>

        <div class="section-texts-wrapper flex f-column g-v-d big-screen-w-100">
            <h1 class="smaller-section-title small-screen-t-a-c">Hakkımızda</h1>

            <p class="section-text t-a-j">
                Çanakkale’de hizmet veren uzman ve deneyimli bir hukuk ekibiyiz.
                Müvekkillerimize her koşulda şeffaf, güvenilir ve çözüm odaklı
                hukuki destek sunarak, haklarını en iyi şekilde savunmayı ilke
                edinmiş bulunuyoruz.
            </p>

            <button
                class="button small-button small-screen-m-h-auto"
                on:click={onDetailsClick}>DETAYLAR</button
            >
        </div>
    </section>

    <div
        id="resume-wrapper"
        class="b-box last-section full-w page-p-v-d p-h-d secondary-background-color"
    >
        <section
            class="flex f-column a-i-c g-4 w-100 max-w-small-page m-h-auto"
        >
            <AboutUsSlider />

            <div class="flex f-column a-i-c g-v-d">
                <p class="about-us-page-text section-text t-a-j">
                    Uzman Klinik Psikolog Zeynep Başar, psikoloji lisans
                    eğitimini İzmir Ekonomi Üniversitesi’nde tamamlamış,
                    ardından Boğaziçi Üniversitesi Klinik Psikoloji yüksek
                    lisans programından mezun olmuştur. Klinik stajını
                    süpervizyon eşliğinde Boğaziçi Üniversitesi Psikolojik
                    Araştırma ve Uygulama Merkezi’nde (BÜPAM) üniversite
                    öğrencileri ve çocuklarla gerçekleştirmiştir. Yüksek lisans
                    tezi kapsamında İstanbul95 projesinde gönüllü çalışmış ve
                    aynı projenin Aile Temelli Ev Ziyareti Programı ayağında
                    anne ve bebek etkileşimlerini gözlemlemiş ve ev ziyareti
                    programının anne ve bebek üzerindeki etkilerini
                    araştırmıştır.

                    <br />
                    <br />

                    Yetişkinlere psikodinamik temelli bireysel terapi hizmeti
                    vermektedir. Ek olarak, Kısa Süreli Çözüm Odaklı, Sanat ve
                    Bilişsel Davranışçı terapi eğitimleri almıştır. Çocuklarla
                    ise Deneyimsel Oyun terapisi yapmaktadır. Şu anda yetişkin,
                    ergen ve çocuklarla İzmir’deki ofisinde yüz yüze ve online
                    olarak çalışmalarına devam etmektedir.

                    <br />
                    <br />

                    <span class="about-us-page-small-title inline-block f-w-600"
                        >Uzmanlık Alanları</span
                    >

                    <br />

                    <span class="about-us-page-italic-text">
                        Depresyon, Kaygı Bozuklukları, Fobiler, Obsesif
                        Kompulsif Bozukluk, Kayıp ve yas danışmanlığı, İlişki
                        problemleri, İletişim Sorunları, Ailevi Sorunlar,
                        Değersizlik-Yetersizlik Hisleri, Suçluluk ve Utanç
                        Duyguları, Travma Yaşantıları, Öfke Sorunu, Psikolojik
                        Kökenli Bedensel Rahatsızlıklar, Geçmişe Dair
                        Halledilemeyen Meseleler.
                    </span>

                    <br />
                    <br />

                    <span class="about-us-page-small-title inline-block f-w-600"
                        >Eğitim,Sertifika ve Sunumlar</span
                    >
                    <br />
                    <span class="about-us-page-italic-text"
                        >Kısa Süreli Çözüm Odaklı Terapi Eğitimi - Yrd. Doç. Dr.
                        Nevin Dölek</span
                    >
                    <br />
                    <span class="about-us-page-italic-text"
                        >Sanat Terapisi Eğitimi - Arkabahçe Psikolojik Gelişim
                        ve Danışmanlık Merkezi</span
                    >
                    <br />
                    <span class="about-us-page-italic-text"
                        >Bilişsel Davranışçı Terapi Eğitimi - Doç. Dr. Vahdet
                        Görmez</span
                    >
                    <br />
                    <span class="about-us-page-italic-text"
                        >Çocuklarla Deneyimsel Oyun Terapisi Eğitimi - Uzm. Psk.
                        Nilüfer Devecigil</span
                    >
                    <br />
                    <span class="about-us-page-italic-text"
                        >Psikanalitik Bakışlar 11: “Gitmek mi Kalmak mı?
                        Psikanaliz ve Göç” – 2017</span
                    >
                    <br />
                    <span class="about-us-page-italic-text"
                        >Psikanalitik Bakışlar 12: “İç Dünya – Dış Gerçeklik” –
                        2018</span
                    >
                    <br />
                    <span class="about-us-page-italic-text"
                        >Psikanalitik Bakışlar 13: “Yıkıcılık ve Ölüm Dürtüsü” –
                        2019</span
                    >
                    <br />
                    <span class="about-us-page-italic-text">4. Psikoterapi Zirvesi – 2021</span>
                    <br />
                    <span class="about-us-page-italic-text"
                        >Psikoterapide Metafor Kullanımı, Mita Psikoloji – 2021</span
                    >
                    <br />
                    <span class="about-us-page-italic-text"
                        >İzmir Psikanaliz Toplantıları, İstanbul Psikanaliz
                        Derneği – 2022-2023</span
                    >
                    <br />
                    <span class="about-us-page-italic-text"
                        >İzmir Psikanaliz Toplantısı, Tekinsizlik Üzerine Vaka
                        Sunumu, İstanbul Psikanaliz Derneği – 2023</span
                    >
                    <br />
                    <span class="about-us-page-italic-text"
                        >Psikanalitik Terapi Kuramsal Eğitimi, İzmir Odağ
                        Psikanaliz ve Psikoterapi Derneği – 2023-2024</span
                    >
                </p>
            </div>
        </section>

        <div class="last-section-divider h-divider m-h-auto"></div>
    </div>
</div>

<style>
    #about-us-image {
        margin-top: calc(var(--main-v-padding) * -0.5);
    }
</style>
