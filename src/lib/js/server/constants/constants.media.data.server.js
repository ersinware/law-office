import {
    ARTICLE_IMAGE_ASPECT_RATIO,
    ARTICLE_IMAGE_MEDIA_DATA,
    BIG_ARTICLE_IMAGE_MEDIA_DATA,
    PAGE_ARTICLE_IMAGE_MEDIA_DATA
} from '../../common/constants.media.data.common.js'

export const ARTICLE_IMAGE_MEDIA_DATA_FOR_INSERT =
    buildMediaData(
        [
            ...ARTICLE_IMAGE_MEDIA_DATA,
            ...BIG_ARTICLE_IMAGE_MEDIA_DATA,
            ...PAGE_ARTICLE_IMAGE_MEDIA_DATA
        ],
        ARTICLE_IMAGE_ASPECT_RATIO
    )

function buildMediaData(current, aspectRatio) {
    const target = []

    for (const media of current) {
        target.push({
            density: media.density,
            photoWidth: media.photoWidth,
            aspectRatio: aspectRatio ?? media.aspectRatio,
        })
    }

    return target
}