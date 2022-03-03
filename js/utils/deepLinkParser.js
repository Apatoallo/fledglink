import parseYouTubeId from './youtubeParser';

const linksTypes = {
    resources(id) {
        return navigation => navigation.navigate({ key: Math.random() * 10000, routeName: 'ResourceView', params: { id } });
    },
    company(id) {
        return navigation => navigation.navigate({ key: Math.random() * 10000, routeName: 'CompanyProfile', params: { corpId: id } });
    },
    opportunity(id) {
        return navigation => navigation.navigate({ key: Math.random() * 10000, routeName: 'OpportunityPage', params: { id } });
    },
    posts() {

    },
};

export function checkIfDeepLink(link) {
    const array = link.split('/');
    return array[0] === 'fledglink:' || (array[0] === 'https:' && array[2] === 'fledglink.com');
}

export function checkIfYouTubeLink(link) {
    return typeof parseYouTubeId(link) === 'string';
}

export function getDeepLinkClickHandler(link) {
    const array = decodeURIComponent(link).split('/');
    const linkType = array[array.length - 2];
    const id = array[array.length - 1];
    return linksTypes[linkType](id);
}
