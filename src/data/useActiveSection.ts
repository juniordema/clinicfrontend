import { ref, onMounted, onUnmounted } from 'vue'

export function useActiveSection() {
    const activeSection = ref('home')

    let observer: IntersectionObserver | null = null

    onMounted(() => {
        const sections = document.querySelectorAll<HTMLElement>('section[id]')

        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        activeSection.value = entry.target.id
                    }
                })
            },
            {
                threshold: 0.4
            }
        )

        sections.forEach((section) => observer?.observe(section))
    })

    onUnmounted(() => {
        if (observer) {
            document
                .querySelectorAll<HTMLElement>('section[id]')
                .forEach((section) => observer?.unobserve(section))

            observer.disconnect()
        }
    })

    return {
        activeSection
    }
}