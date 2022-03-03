const searchWithDelay = (fn) => {
    let searching = false;
    let typingTimeout;
    const reflectChange = (criteria) => {
        fn(criteria);
        searching = true;
        setTimeout(() => {
            searching = false;
        }, 500);
    };
    return (text) => {
        if (searching) return;
        clearTimeout(typingTimeout);
        if (text.length >= 0) {
            const criteria = text;
            typingTimeout = setTimeout(() => reflectChange(criteria), 500);
        }
    };
};

export default searchWithDelay;
