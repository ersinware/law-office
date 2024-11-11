import { getArticle } from "$lib/js/server/repository/articles.nedb.repository.js";
import { getUndashedString } from "$lib/js/server/util/util.server.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const { article, error: _error } = await getArticle(getUndashedString(params.title))
    if (_error)
        throw error(404, { message: _error });


    return { article }
}