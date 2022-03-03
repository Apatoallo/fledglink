import { decode } from 'he';

export const mapper = (item, key) => ({
    id: key, name: decode(item), value: decode(item), checked: false,
});

export const mapperSelect = (item, key) => {
    if (item === 'De-activated') return;
    return { value: decode(item), id: key, checked: false };
};

export const mapperAcquaintanceSelect = (item, key) => ({ value: `${decode(item)}`, id: key });

export const mapperNotAcquaintanceSelect = (item, key) => ({ value: `${decode(item.toLowerCase())}`, id: key });
