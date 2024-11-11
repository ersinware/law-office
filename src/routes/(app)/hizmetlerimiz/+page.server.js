import { SEARCH_PARAM_FOR_UNKNOWN_ERROR } from "$lib/js/common/constants.common";
import { getDashedString } from "$lib/js/common/util.common";
import { getAllArticleTitles } from "$lib/js/server/repository/articles.nedb.repository.js";
import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
    const { articleTitles, error } = await getAllArticleTitles()
    if (error && locals.search !== SEARCH_PARAM_FOR_UNKNOWN_ERROR)
        throw redirect(307, "/?" + SEARCH_PARAM_FOR_UNKNOWN_ERROR)

    return { articleTitles }
}