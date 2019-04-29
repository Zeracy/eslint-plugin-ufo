const { isObject } = require('./index');

/**
 * @param {Object} node
 * @param {string} key
 * @returns {*|Object}
 */
const getNodeAttribute = (node, key) => isObject(node[key]) ? node[key] : node;

/**
 * @param {Object} node
 * @param {string} key
 * @returns {*|Object}
 */
const getNodeSubAttribute = (node, key) => isObject(node[key]) ? node[key][key] : node[key];

/**
 *
 * @type {{getNodeValue: Function(Object): *, getNodeAttribute: Function(Object, string): Object}}
 */
module.exports = {
    getNodeAttribute,
    getNodeSubAttribute,
};
