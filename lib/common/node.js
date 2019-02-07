const { isObject } = require('./index');

/**
 * @param {Object} node
 * @param {string} key
 * @returns {*|Object}
 */
const getNodeAttribute = (node, key) => isObject(node[key]) ? node[key] : node;

/**
 *
 * @type {{getNodeValue: Function(Object): *, getNodeAttribute: Function(Object, string): Object}}
 */
module.exports = {
    getNodeAttribute,
};
