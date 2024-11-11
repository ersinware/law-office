import { cubicInOut } from "svelte/easing"

export const DURATION_TRANSITION_PAGE = 500,
    DURATION_TRANSITION_MODAL = 500,
    DURATION_TRANSITION_PROGRESS_BAR_NAVIGATED = 1000,
    DURATION_TRANSITION_MODAL_PROGRESS_BAR_NAVIGATED = 500,
    DURATION_TRANSITION_AFTER_CONTENT_CHANGED = 625,
    DURATION_TRANSITION_LEFT_MENU = 500

export const DURATION_RIPPLE_TYPE_ZERO = 400,
    DURATION_RIPPLE_TYPE_ONE = 300,
    DURATION_WAIT_FOR_RIPPLE_TYPE_ONE = DURATION_RIPPLE_TYPE_ONE

export const TRANSITION_PAGE = { y: '.75rem', duration: DURATION_TRANSITION_PAGE, easing: cubicInOut },
    TRANSITION_LEFT_MENU_X = -16

export const TRANSITION_MODAL_Y = ".5rem"