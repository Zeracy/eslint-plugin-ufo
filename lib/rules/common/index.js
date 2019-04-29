/**
 * @param {*} param
 * @returns {boolean}
 */
const isObject = (param) => typeof param === 'object' && param !== null;

/**
 * @type {{isObject: Function(*): boolean}}
 */
module.exports = {
    isObject,
};
