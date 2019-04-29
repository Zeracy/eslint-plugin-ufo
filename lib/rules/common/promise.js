/**
 * @type {Array}
 */
const promiseStaticMethods = [ 'all', 'race', 'reject', 'resolve' ];

/**
 * @param {Object} expression
 * @returns {boolean}
 */
const expressionIsCallType = (expression) => expression.type === 'CallExpression';

/**
 * @param {Object} expression
 * @returns {boolean}
 */
const expressionCalleeIsMemberType = (expression) => expression.callee.type === 'MemberExpression';

/**
 * @param {Object} expression
 * @returns {boolean}
 */
const expressionIsThen = (expression) => (
    expressionIsCallType(expression) &&
    expressionCalleeIsMemberType(expression) &&
    expression.callee.property.name === 'then'
);

/**
 * @param {Object} expression
 * @returns {boolean}
 */
const expressionIsCatch = (expression) => (
    expressionIsCallType(expression) &&
    expressionCalleeIsMemberType(expression) &&
    expression.callee.property.name === 'catch'
);

/**
 * @param {Object} expression
 * @returns {boolean}
 */
const expressionIsFinally = (expression) => (
    expressionIsCallType(expression) &&
    expressionCalleeIsMemberType(expression) &&
    expression.callee.property.name === 'finally'
);

/**
 * @param {Object} expression
 * @returns {boolean}
 */
const expressionContainsPromise = (expression) => (
    expressionIsCallType(expression) &&
    expressionCalleeIsMemberType(expression) &&
    promise(expression.callee.object)
);

/**
 * @param {Object} expression
 * @returns {boolean}
 */
const expressionIsPromiseStaticMethod = (expression) => (
    expressionIsCallType(expression) &&
    expressionCalleeIsMemberType(expression) &&
    expression.callee.object.type === 'Identifier' &&
    expression.callee.object.name === 'Promise' &&
    promiseStaticMethods.includes(expression.callee.property.name)
);

/**
 * @param {Object} expression
 * @returns {boolean}
 */
const promise = (expression) => (
    expressionIsThen(expression) ||
    expressionIsCatch(expression) ||
    expressionIsFinally(expression) ||
    expressionContainsPromise(expression) ||
    expressionIsPromiseStaticMethod(expression)
);

/**
 * @type {{isPromise: (function(Object): boolean)}}
 */
module.exports = {
    isPromise: promise,
};
