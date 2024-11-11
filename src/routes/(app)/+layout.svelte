<script>
    import DynamicLeftMenus from "$lib/components/app/layout/DynamicLeftMenus.svelte";
    import Footer from "$lib/components/app/layout/Footer.svelte";
    import Header from "$lib/components/app/layout/Header.svelte";
    import "$lib/css/app/project.global.app.css";
    import { init as initLeftMenu } from "$lib/js/client/app/util.left.menu.client.app";
    import { TRANSITION_PAGE } from "$lib/js/client/common/constants.transitions.client.common.js";
    import {
        createStore,
        getStore,
    } from "$lib/js/client/common/util.client.common";
    import { fly } from "svelte/transition";

    createStores();
    init();

    function createStores() {
        createStore("openLeftMenus", []);
        createStore("openDynamicLeftMenus", []);
    }

    function init() {
        initLeftMenu(
            getStore("openLeftMenus"),
            getStore("openDynamicLeftMenus"),
        );
    }
</script>

<div id="main-wrapper" class="b-box p-t-for-header-for-page page-p-b">
    <main class="b-box max-w p-h-d m-h-auto" in:fly={TRANSITION_PAGE}>
        <slot />
    </main>
</div>

<DynamicLeftMenus />
<Header />
<Footer />