export default function getPageContent() {
    const bodyText = document.body.innerText;

    const pluginElement = document.getElementById('side-bar-extension-root');
    if (pluginElement) {
        const pluginText = pluginElement.innerText;
        return bodyText.replace(pluginText, '').trim();
    }

    return bodyText.trim();
}

