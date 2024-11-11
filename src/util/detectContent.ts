export enum ContentType {
    Image = 'Image',
    Video = 'Video',
    Text = 'Text',
}

export default function detectMainContentType(): ContentType {
    const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('img');
    // const videos: NodeListOf<HTMLVideoElement | HTMLIFrameElement> = document.querySelectorAll('video, iframe');
    const textBlocks: NodeListOf<HTMLElement> = document.querySelectorAll('p, span, div:not(#side-bar-extension-root p):not(#side-bar-extension-root span):not(#side-bar-extension-root div)');
    ;

    const imageCount: number = images.length;
    // const videoCount: number = Array.from(videos).filter(
    //     (v) => (v instanceof HTMLVideoElement && v.src) || (v instanceof HTMLIFrameElement && v.src)
    // ).length;
    let textContentLength: number = 0;

    textBlocks.forEach((block) => {
        if (block.innerText) {
            textContentLength += block.innerText.length;
        }
    });

    console.log(imageCount)
    console.log(textContentLength)

    let mainContentType: ContentType;
    if (imageCount > textContentLength / 1000) {
        mainContentType = ContentType.Image;
    // } else if (videoCount > imageCount && videoCount > textContentLength / 100) {
    //     mainContentType = ContentType.Video;
    } else {
        mainContentType = ContentType.Text;
    }
    console.log(mainContentType)
    return mainContentType;
}
