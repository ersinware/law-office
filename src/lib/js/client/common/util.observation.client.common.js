export function addIntersectionObserver(node, onIntersect, onNoIntersect, threshold) {
    const observer = new IntersectionObserver(
        entries => onVisibleOrInvisible(entries, onIntersect, onNoIntersect),
        { threshold: threshold ?? 0 }
    )
    observer.observe(node)

    return observer
}

export function removeIntersectionObserver(observer) {
    if (observer)
        observer.disconnect()
}

function onVisibleOrInvisible(entries, onIntersect, onNoIntersect) {
    for (const entry of entries)
        if (entry.isIntersecting) {
            onIntersect()

            return
        }

    if (onNoIntersect)
        onNoIntersect()
}