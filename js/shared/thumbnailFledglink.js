import React from 'react';
import { Thumbnail } from 'native-base';

const flBird = require('../../images/color-bird.png');

const ThumbnailFledglink = () => (
    <Thumbnail
        square
        style={{
            width: 50,
            height: 50,
            marginTop: 10,
            marginHorizontal: 4,
        }}
        source={flBird}
        resizeMode="contain"
    />
);

export default ThumbnailFledglink;
