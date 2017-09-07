'use strict';

const plainify = (object) => {
    let data = {};

    const iterator = (object, primaryIndex = null) => {
        let secondaryIndex = '';

        if (primaryIndex)
            secondaryIndex = primaryIndex + '.';


        for (let item in object) {
            if (typeof(object[item]) === 'object') {
                iterator(object[item], secondaryIndex + item);
            } else {
                data[secondaryIndex + item] = object[item];
            }
        }
    };

    iterator(object);
    return data
};