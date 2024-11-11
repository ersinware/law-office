export const ARTICLE_IMAGE_ASPECT_RATIO = [1, 1]

export const ARTICLE_IMAGE_MEDIA_DATA = constructMediaDataLinear({
    maxPixelDensity: 4,
    breakpointCount: 1,
    photoMaxWidth: 320,
    photoMinWidth: 320,
    minWidth: 1040,
    maxWidth: 9999,
})
    .concat(
        constructMediaDataLinear({
            maxPixelDensity: 4,
            breakpointCount: 1,
            photoMaxWidth: 301,
            photoMinWidth: 301,
            minWidth: 812,
            maxWidth: 1040,
        })
    )
    .concat(
        constructMediaDataLinear({
            maxPixelDensity: 4,
            breakpointCount: 1,
            photoMaxWidth: 350,
            photoMinWidth: 350,
            minWidth: 462,
            maxWidth: 812,
        })
    )
    .concat(
        constructMediaDataLinear({
            maxPixelDensity: 4,
            breakpointCount: 7,
            photoMaxWidth: 350,
            photoMinWidth: 208,
            maxWidth: 462,
        })
    ),
    BIG_ARTICLE_IMAGE_MEDIA_DATA = constructMediaDataLinear({
        maxPixelDensity: 4,
        breakpointCount: 1,
        photoMaxWidth: 440,
        photoMinWidth: 440,
        minWidth: 1040,
        maxWidth: 9999,
    })
        .concat(
            constructMediaDataLinear({
                maxPixelDensity: 4,
                breakpointCount: 1,
                photoMaxWidth: 385,
                photoMinWidth: 385,
                minWidth: 812,
                maxWidth: 1040,
            })
        )
        .concat(
            constructMediaDataLinear({
                maxPixelDensity: 4,
                breakpointCount: 1,
                photoMaxWidth: 350,
                photoMinWidth: 350,
                minWidth: 462,
                maxWidth: 812,
            })
        )
        .concat(
            constructMediaDataLinear({
                maxPixelDensity: 4,
                breakpointCount: 7,
                photoMaxWidth: 350,
                photoMinWidth: 208,
                maxWidth: 462,
            })
        ),
    PAGE_ARTICLE_IMAGE_MEDIA_DATA = constructMediaDataLinear({
        maxPixelDensity: 4,
        breakpointCount: 1,
        photoMaxWidth: 720,
        photoMinWidth: 720,
        minWidth: 1256,
        maxWidth: 9999,
    })
        .concat(
            constructMediaDataLinear({
                maxPixelDensity: 4,
                breakpointCount: 10,
                photoMaxWidth: 720,
                photoMinWidth: 505.33,
                minWidth: 1041,
                maxWidth: 1256,
            })
        )
        .concat(
            constructMediaDataLinear({
                maxPixelDensity: 4,
                breakpointCount: 1,
                photoMaxWidth: 630,
                photoMinWidth: 630,
                minWidth: 672,
                maxWidth: 1041,
            })
        )
        .concat(
            constructMediaDataLinear({
                maxPixelDensity: 4,
                breakpointCount: 17,
                photoMaxWidth: 630,
                photoMinWidth: 278,
                maxWidth: 672,
            })
        ),
    HOMEPAGE_SLIDER_IMAGE_MEDIA_DATA = constructMediaDataLinear({
        maxPixelDensity: 4,
        breakpointCount: 1,
        photoMaxWidth: 1320,
        photoMinWidth: 1320,
        minWidth: 1384,
        maxWidth: 9999,
        aspectRatio: [16, 8]
    })
        .concat(
            constructMediaDataLinear({
                maxPixelDensity: 4,
                breakpointCount: 16,
                photoMaxWidth: 1320,
                photoMinWidth: 977.33,
                minWidth: 1040,
                maxWidth: 1384,
                aspectRatio: [16, 8]
            })
        )
        .concat(
            constructMediaDataLinear({
                maxPixelDensity: 4,
                breakpointCount: 8,
                photoMaxWidth: 998,
                photoMinWidth: 838,
                minWidth: 880,
                maxWidth: 1040,
                aspectRatio: [16, 14]
            })
        )
        .concat(
            constructMediaDataLinear({
                maxPixelDensity: 4,
                breakpointCount: 8,
                photoMaxWidth: 838,
                photoMinWidth: 678,
                minWidth: 720,
                maxWidth: 880,
                aspectRatio: [16, 16]
            })
        )
        .concat(
            constructMediaDataLinear({
                maxPixelDensity: 4,
                breakpointCount: 20,
                photoMaxWidth: 678,
                photoMinWidth: 278,
                maxWidth: 720,
                aspectRatio: [16, 18]
            })
        ),
    ABOUT_US_SLIDER_IMAGE_MEDIA_DATA = constructMediaDataLinear({
        maxPixelDensity: 4,
        breakpointCount: 1,
        photoMaxWidth: 880,
        photoMinWidth: 880,
        minWidth: 1040,
        maxWidth: 9999,
        aspectRatio: [16, 12]
    })
        .concat(
            constructMediaDataLinear({
                maxPixelDensity: 4,
                breakpointCount: 1,
                photoMaxWidth: 630,
                photoMinWidth: 630,
                minWidth: 672,
                maxWidth: 1040,
                aspectRatio: [16, 16]
            })
        )
        .concat(
            constructMediaDataLinear({
                maxPixelDensity: 4,
                breakpointCount: 18,
                photoMaxWidth: 630,
                photoMinWidth: 278,
                maxWidth: 672,
                aspectRatio: [16, 16]
            })
        ),
    LAWYER_IMAGE_OUR_TEAM_PAGE_MEDIA_DATA = constructMediaDataLinear({
        maxPixelDensity: 4,
        breakpointCount: 1,
        photoMaxWidth: 420,
        photoMinWidth: 420,
        minWidth: 1040,
        maxWidth: 9999,
    })
        .concat(
            constructMediaDataLinear({
                maxPixelDensity: 4,
                breakpointCount: 1,
                photoMaxWidth: 371,
                photoMinWidth: 371,
                minWidth: 812,
                maxWidth: 1040,
            })
        )
        .concat(
            constructMediaDataLinear({
                maxPixelDensity: 4,
                breakpointCount: 6,
                photoMaxWidth: 371,
                photoMinWidth: 245,
                minWidth: 560,
                maxWidth: 812,
            })
        )
        .concat(
            constructMediaDataLinear({
                maxPixelDensity: 4,
                breakpointCount: 12,
                photoMaxWidth: 517,
                photoMinWidth: 278,
                maxWidth: 560,
            })
        ),
    LAWYER_IMAGE_PERSON_PAGE_MEDIA_DATA = constructMediaDataLinear({
        maxPixelDensity: 4,
        breakpointCount: 1,
        photoMaxWidth: 720,
        photoMinWidth: 720,
        minWidth: 1040,
        maxWidth: 9999,
        aspectRatio: [16, 16]
    })
        .concat(
            constructMediaDataLinear({
                maxPixelDensity: 4,
                breakpointCount: 1,
                photoMaxWidth: 630,
                photoMinWidth: 630,
                minWidth: 672,
                maxWidth: 1040,
                aspectRatio: [16, 16]
            })
        )
        .concat(
            constructMediaDataLinear({
                maxPixelDensity: 4,
                breakpointCount: 15,
                photoMaxWidth: 630,
                photoMinWidth: 278,
                maxWidth: 672,
                aspectRatio: [16, 18]
            })
        )

function constructMediaDataLinear({
    maxPixelDensity,
    breakpointCount,
    photoMaxWidth,
    photoMinWidth,
    lastMaxWidth,
    maxWidth,
    minWidth = 320,
    aspectRatio
}) {

    const mediaData = [],
        queryGap = (maxWidth - minWidth) / breakpointCount,
        photoGap = (photoMaxWidth - photoMinWidth) / breakpointCount

    for (let density = 1; density < maxPixelDensity + 1; density++)
        for (let breakpoint = 0; breakpoint < breakpointCount; breakpoint++)
            mediaData.push({
                density,
                maxWidth: lastMaxWidth && breakpoint === 0 ? lastMaxWidth : maxWidth - queryGap * breakpoint,
                minWidth:
                    breakpoint === breakpointCount - 1 && minWidth === 320 ? 320 : maxWidth - queryGap * (breakpoint + 1) + 0.1,
                photoWidth: Math.round((photoMaxWidth - photoGap * breakpoint) * density),
                aspectRatio
            })

    return mediaData
}