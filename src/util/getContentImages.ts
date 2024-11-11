export default function extractImages(): string[] {
    const images = Array.from(document.querySelectorAll('img'))
        .map((img) => img.src)
        .filter((src) => (
            src.startsWith('http://')
            // || src.startsWith('https://') // https is invalid
            || src.startsWith('data:image/png')
            || src.startsWith('data:image/jpeg')
        ) && src.indexOf('//////') === -1
        ).slice(0, 6);
    console.log(images)
    return images;
}
