'use strict';


function plainify(object) {
    let data = {};

    function iterator(object, primary_index) {
        let secondary_index = '';

        if (typeof primary_index !== 'undefined') {
            secondary_index = primary_index + '.';
        }

        for (let item in object) {
            if (typeof(object[item]) === 'object') {
                iterator(object[item], secondary_index + item);
            } else {
                data[secondary_index + item] = object[item];
            }
        }
    }

    iterator(object);
    return data
}