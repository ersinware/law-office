import { capitalizeFirstLetterOnly, getDashedString, waitFor } from "$lib/js/common/util.common.js";
import { ARTICLE_IMAGE_MEDIA_DATA_FOR_INSERT } from "$lib/js/server/constants/constants.media.data.server.js";
import { createArticle } from "$lib/js/server/repository/articles.nedb.repository.js";
import { removeImages, saveImage } from "$lib/js/server/util/util.image.server.js";
import { capitalizeWords } from "$lib/js/server/util/util.server.js";
import { json } from "@sveltejs/kit";

export async function PUT({ request }) {
    save(await request.formData())

    return json({}, { status: 200 })
}

async function save(formData) {
    await waitFor(2500)

    const { title, firstSentence, content } = JSON.parse(formData.get('article')),
        _title = title.trim(),
        imageName = getDashedString(_title),
        now = Date.now()

    const {
        extension,
        error
    } = await saveImage(imageName, ARTICLE_IMAGE_MEDIA_DATA_FOR_INSERT, formData.get('image'), now, true)

    if (error) {
        removeImages(imageName + extension)

        return
    }

    const _error = await createArticle({
        title: capitalizeWords(_title),
        firstSentence: capitalizeFirstLetterOnly(firstSentence.trim()),
        content: capitalizeFirstLetterOnly(content.trim()),
        imageName: imageName + extension,
        imageUpdatedAt: now
    })

    if (_error)
        removeImages(imageName + extension)
}