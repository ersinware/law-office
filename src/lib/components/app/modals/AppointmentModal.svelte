<script>
    import ContactModal from "$lib/components/app/modals/contact/ContactModal.svelte";
    import {
        onLinkClickOnNewTab,
        performRippleEffectAndWait,
    } from "$lib/js/client/common/util.client.common";
    import {
        closeLastModal,
        openModal,
    } from "$lib/js/client/common/util.modals.client.common";

    async function onClose(event) {
        await performRippleEffectAndWait(event);

        closeLastModal();
    }

    async function onContactFormClick(event) {
        await performRippleEffectAndWait(event);

        openModal({ component: ContactModal, addToBackstack: true });
    }
</script>

<form
    class="modal-content-wrapper flex f-column a-i-c modal-g-v-d t-a-c big-screen-small-modal-content-wrapper-w"
>
    <h2 class="modal-title">Randevu Alın</h2>

    <article
        id="contact-wrapper"
        class="grid g-1dot25 j-c-c secondary-background-color b-r-d"
    >
        <article class="flex a-i-c g-1">
            <svg
                style:margin-bottom=".75rem"
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path
                    d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                />
            </svg>

            <div class="flex f-column" style:gap=".125rem">
                <a
                    href="tel:+905304479020"
                    rel="nofollow"
                    class="clickable-contact-item-text small-article-text italic"
                    on:click={onLinkClickOnNewTab}
                >
                    +90 530 447 90 20
                </a>

                <a
                    href="tel:+905523923199"
                    rel="nofollow"
                    class="clickable-contact-item-text small-article-text italic"
                    on:click={onLinkClickOnNewTab}
                >
                    +90 552 392 31 99
                </a>
            </div>
        </article>

        <article class="flex a-i-c g-1">
            <svg
                style:height="100%"
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                ><path
                    d="M92.1 254.6c0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6L152 365.2l4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8c0-35.2-15.2-68.3-40.1-93.2c-25-25-58-38.7-93.2-38.7c-72.7 0-131.8 59.1-131.9 131.8zM274.8 330c-12.6 1.9-22.4 .9-47.5-9.9c-36.8-15.9-61.8-51.5-66.9-58.7c-.4-.6-.7-.9-.8-1.1c-2-2.6-16.2-21.5-16.2-41c0-18.4 9-27.9 13.2-32.3c.3-.3 .5-.5 .7-.8c3.6-4 7.9-5 10.6-5c2.6 0 5.3 0 7.6 .1c.3 0 .5 0 .8 0c2.3 0 5.2 0 8.1 6.8c1.2 2.9 3 7.3 4.9 11.8c3.3 8 6.7 16.3 7.3 17.6c1 2 1.7 4.3 .3 6.9c-3.4 6.8-6.9 10.4-9.3 13c-3.1 3.2-4.5 4.7-2.3 8.6c15.3 26.3 30.6 35.4 53.9 47.1c4 2 6.3 1.7 8.6-1c2.3-2.6 9.9-11.6 12.5-15.5c2.6-4 5.3-3.3 8.9-2s23.1 10.9 27.1 12.9c.8 .4 1.5 .7 2.1 1c2.8 1.4 4.7 2.3 5.5 3.6c.9 1.9 .9 9.9-2.4 19.1c-3.3 9.3-19.1 17.7-26.7 18.8zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM148.1 393.9L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5c29.9 30 47.9 69.8 47.9 112.2c0 87.4-72.7 158.5-160.1 158.5c-26.6 0-52.7-6.7-75.8-19.3z"
                /></svg
            >

            <a
                href="https://wa.me/+905523923199"
                rel="nofollow"
                class="small-article-text link-button italic"
                on:click={onLinkClickOnNewTab}>WhatsApp'tan Yazın</a
            >
        </article>

        <article class="flex a-i-c g-1">
            <svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path
                    d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                />
            </svg>

            <a
                href="mailto:erdemmirici2@gmail.com"
                rel="nofollow"
                class="clicable-contact-item-text small-article-text italic"
                on:click={onLinkClickOnNewTab}>erdemmirici2@gmail.com</a
            >
        </article>
    </article>

    <p class="modal-text small-modal-text-max-w">
        Randevu almak için iletişime <br /> geçmekten çekinmeyin!
    </p>

    <p class="modal-text small-modal-text-max-w">
        İletişim formu üzerinden de <br /> bize yazabilirsiniz!
    </p>

    <div class="flex j-c-c modal-buttons-g">
        <button
            type="button"
            class="nude-button modal-button nude-button-negative-unimportant"
            on:click={onClose}
        >
            VAZGEÇ
        </button>

        <button
            type="button"
            class="nude-button modal-button"
            on:click={onContactFormClick}
        >
            BİZE YAZIN
        </button>
    </div>
</form>

<style>
    #contact-wrapper {
        padding: 2rem;
    }

    .icon {
        width: 1.4rem;
        min-width: 1.4rem;
        height: 1.4rem;

        fill: var(--accent-color);
    }
</style>
