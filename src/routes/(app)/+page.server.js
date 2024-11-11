import { SEARCH_PARAM_FOR_UNKNOWN_ERROR } from "$lib/js/common/constants.common";
import { getAllArticleTitles, getMaxThreeArticles } from "$lib/js/server/repository/articles.nedb.repository.js";
import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
    const maxThreeArticlesPromise = getMaxThreeArticles(),
        articleTitlesPromise = getAllArticleTitles()

    const { articles, error } = await maxThreeArticlesPromise
    if (error && locals.search !== SEARCH_PARAM_FOR_UNKNOWN_ERROR)
        throw redirect(307, "/?" + SEARCH_PARAM_FOR_UNKNOWN_ERROR)

    const { articleTitles, error: _error } = await articleTitlesPromise
    if (_error && locals.search !== SEARCH_PARAM_FOR_UNKNOWN_ERROR)
        throw redirect(307, "/?" + SEARCH_PARAM_FOR_UNKNOWN_ERROR)

    return { articles, articleTitles }
}