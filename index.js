/**
 * @enum
 * @type {{READY: string, EXECUTING: string, ERROR: string, SUCCESS: string}}
 */
var STATES = Object.freeze({
    READY: 'ready',
    EXECUTING: 'executing',
    ERROR: 'error',
    SUCCESS: 'success'
});

var isSet = require('is-it-set');

/**
 * @param {string} baseSuccessMessage
 * @param {string} baseErrorMessage
 * @constructor
 */
var newAjaxEvent = function AjaxEvent(baseSuccessMessage, baseErrorMessage) {
    this.state = STATES.READY;
    this.message = '';
    this.data = null;

    this.base_success_message = isSet(baseSuccessMessage) ? baseSuccessMessage : null;
    this.base_error_message = isSet(baseErrorMessage) ? baseErrorMessage : null;
};

function setInstanceProperties(instance, state, message, data) {
    setInstanceProperty(instance, 'state-and-message', {state: state, message: message});
    setInstanceProperty(instance, 'data', data);
}

/**
 * Set an AjaxEvent's `state`, `message` or `data` property to `value`. This will overwrite any existing value even if
 * `value` is not set.
 *
 * @param {AjaxEvent} instance
 * @param {String} property - <'state'|'message'|'data'|'base_success_message'|'base_error_message'|'state-and-message'>
 * @param {*|{state:STATES, message: String}} value - if `property` is `state-and-message`,...
 */
function setInstanceProperty(instance, property, value) {
    /**
     * We need a special case for using `{@link AjaxEvent.base_success_message}` and
     * `{@link AjaxEvent.base_error_message}` because to set the message using one of these base strings, we need to
     * know which state ({@link STATES}) the `instance` is going to be set to.
     */
    if (property === 'state-and-message') {
        if (value.state === STATES.SUCCESS) {
            /**
             * Only bother doing this if we have a base string to work with.
             */
            if (isSet(instance.base_success_message)) {
                instance.message = String(instance.base_success_message) +
                    (
                        isSet(value.message)
                            ? value.message
                            : ''
                    );
            } else {
                instance.message = value.message;
            }
        } else if (value.state === STATES.ERROR) {
            /**
             * Only bother doing this if we have a base string to work with.
             */
            if (isSet(instance.base_error_message)) {
                instance.message = String(instance.base_error_message) +
                    (
                        isSet(value.message)
                            ? value.message
                            : ''
                    );
            } else {
                instance.message = value.message;
            }
        } else {
            instance.message = value.message;
        }
        instance.state = value.state;
    } else { // everything else here is straightforward
        instance[property] = value;
    }

    /**
     * Enables chaining
     */
    return instance;
}

newAjaxEvent.prototype.resetToReady = function() {
    setInstanceProperties(this, 'ready', '', null);
    return this;
};

newAjaxEvent.prototype.resetToExecuting = function() {
    setInstanceProperties(this, 'executing', '', null);
    return this;
};

newAjaxEvent.prototype.reject = function(message, data) {
    setInstanceProperties(this, 'error', message, data);
    return this;
};

newAjaxEvent.prototype.resolve = function(message, data) {
    setInstanceProperties(
        this,
        STATES.SUCCESS,
        message,
        data
    );
    return this;
};

/**
 * @returns {boolean}
 */
newAjaxEvent.prototype.isSuccessful = function() {
    return this.state === STATES.SUCCESS;
};

/**
 * @returns {boolean}
 */
newAjaxEvent.prototype.isExecuting = function() {
    return this.state === STATES.EXECUTING;
};

/**
 * @returns {boolean}
 */
newAjaxEvent.prototype.isNotExecuting = function() {
    return !this.isExecuting();
};

/**
 * @returns {boolean}
 */
newAjaxEvent.prototype.isReady = function() {
    return this.state === STATES.READY;
};

/**
 * @returns {boolean}
 */
newAjaxEvent.prototype.hasError = function() {
    return this.state === STATES.ERROR;
};

/**
 * @returns {boolean}
 */
newAjaxEvent.prototype.hasData = function() {
    return isSet(this.data);
};

/**
 * @returns {boolean}
 */
newAjaxEvent.prototype.hasMessage = function() {
    if (
        (isSet(this.base_error_message) && this.hasError()) ||
        (isSet(this.base_success_message) && this.isSuccessful()) ||
        isSet(this.message)
    ) {
        return true;
    } else {
        return false;
    }
};

module.exports = newAjaxEvent;
