export default function formatMention(mention) {
    if (mention.split(' ').length === 1) return mention;
    return mention.toLowerCase().trim().split(' ').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join('');
}
