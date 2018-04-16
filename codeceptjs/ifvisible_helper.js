'use strict';
let Helper = codecept_helper;

// use any assertion library you like
let assert = require('assert');

class IfVisibleHelper extends Helper {
    async ifVisible(sel, fn) {
        const wdHelper = this.helpers['WebDriverIO']
        const browser = wdHelper.browser

        try {
            console.log(`Waiting for ${sel}`)
            await browser.waitForVisible(sel)
            /**
             * Note the difference: I am passing in the webdriverio helper
             * not this.
             * Because this is instrumented with recorder/promise chaining methods
             * but the helper is not.
             * Both provide basically the same interface, i. e. you can use
             * all of codeceptjs methods on the helper
             */
            return fn(wdHelper)
        } catch (_) { }
    }
}

module.exports = IfVisibleHelper