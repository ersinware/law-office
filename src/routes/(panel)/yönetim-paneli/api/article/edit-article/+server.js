import { capitalizeFirstLetterOnly, getDashedString, waitFor } from "$lib/js/common/util.common.js";
import { ARTICLE_IMAGE_MEDIA_DATA_FOR_INSERT } from "$lib/js/server/constants/constants.media.data.server.js";
import { editArticle, getArticleTitleAndImageNameAndImageUpdatedAt } from "$lib/js/server/repository/articles.nedb.repository.js";
import { changeImageName, removeImages, saveImage } from "$lib/js/server/util/util.image.server.js";
import { capitalizeWords } from "$lib/js/server/util/util.server.js";
import { json } from "@sveltejs/kit";

export async function PUT({ request }) {
    update(await request.formData())

    return json({}, { status: 200 })
}

async function update(formData) {
    await waitFor(2500)

    const { id, title, firstSentence, content } = JSON.parse(formData.get('article')),
        _title = title.trim(),
        image = formData.get('image'),
        { article, error } = await getArticleTitleAndImageNameAndImageUpdatedAt(id)

    if (error)
        return

    if (!image) {
        if (article.title !== _title) {
            const newImageName = getDashedString(_title) + article.imageName.substring(article.imageName.lastIndexOf('.'), article.imageName.length),
                error = await editArticle(
                    id,
                    {
                        title: capitalizeWords(_title),
                        firstSentence: capitalizeFirstLetterOnly(firstSentence.trim()),
                        content: capitalizeFirstLetterOnly(content.trim()),
                        imageName: newImageName,
                        imageUpdatedAt: article.imageUpdatedAt
                    }
                )

            if (error)
                return

            changeImageName(article.imageName, newImageName)

            return
        }

        await editArticle(
            id,
            {
                title: article.title,
                firstSentence: capitalizeFirstLetterOnly(firstSentence.trim()),
                content: capitalizeFirstLetterOnly(content.trim()),
                imageName: article.imageName,
                imageUpdatedAt: article.imageUpdatedAt
            }
        )

        return
    }

    const _error = await removeImages(article.imageName)
    if (_error)
        return


    const imageName = getDashedString(_title),
        { extension, error: __error } = await saveImage(imageName, ARTICLE_IMAGE_MEDIA_DATA_FOR_INSERT, image, undefined, true)

    if (__error)
        return

    await editArticle(
        id,
        {
            title: capitalizeWords(_title),
            firstSentence: capitalizeFirstLetterOnly(firstSentence.trim()),
            content: capitalizeFirstLetterOnly(content.trim()),
            imageName: imageName + extension,
            imageUpdatedAt: Date.now()
        }
    )
}