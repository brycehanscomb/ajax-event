## AjaxEvent

A utility to make tracking the status of your ajax requests easier. Use it with your MVC frameworks
to reduce the complexity of your View logic.

### Overview

#### 10-Second Example

##### your-controller.js

Have your `AjaxEvent` react to your network requests:

```js
var fetchAccountEvent = new AjaxEvent();

function doRequest() {

    // Set the internal state to 'executing' while the request is pending
    fetchAccountEvent.resetToExecuting();

    $.ajax({
        url: 'yourapi.com/account',
        method: 'GET',
        success: function(response) {
            // Everything went ok, store a success message and any associated data (ie: the payload)
            fetchAccount.resolve('The account was fetched successfully', response.account_object);
        },
        error: function(response) {
            // Something went wrong, store an error message and associated error data
            fetchAccountEvent.reject('There was an error fetching your account. Error code: ' + response.error_code, response);
        }
    });
}

doRequest();	
```

##### your-view.html

Then in your view, all the magic happens:

```html
<p ng-if="fetchAccountEvent.isExecuting()">
    Your account is loading...
</p>

<p ng-if="fetchAccountEvent.hasError()">
    {{ fetchAccountEvent.message }}
</p>

<div ng-if="fetchAccountEvent.isSuccessful()">
    Your account details: {{ fetchAccountEvent.data }}
</div>
```

#### API Summary

An `AjaxEvent` is a chainable object that has the following basic properties:

* **`status`**: The current state of your request
* **`message`**: A string to describe the current state of the request (often used for errors)
* **`data`**: A simple container that can be used to store the result of the request

These properties can be set as appropriate to make use of the following quick functions:

* **`isSuccessful()`**: Check if the request has completed successfully
* **`isExecuting()`**: Check if the request is in the middle of being executed
* **`isNotExecuting()`**: Check if the request is not in the middle of being executed
* **`isReady()`**: Check if the request has not been executed yet
* **`hasError()`**: Check if the request has encountered an error
* **`hasData()`**: Check if the request has completed and has stored data in the `AjaxEvent`
* **`hasMessage()`**: Check if the request has set a message in the `AjaxEvent`

### Usage

#### Installation

With [npm](https://www.npmjs.com/) do:

```js
npm install ajax-event
```

Then in your JS, make the package available:

```js
var AjaxEvent = require('ajax-event');
```

#### Reacting To Network Requests

##### Level 1: Ultra-Basic

The simplest example just uses `resolve()` and `reject()` to set the `AjaxEvent`'s internal `status`:

```js
var someEvent = new AjaxEvent();

// Perform an AJAX request (example with Promises)
getSomeData.then(function(response) {
    someEvent.resolve(); // Everything went ok
}).catch(function(response) {
    someEvent.reject(); // Something went wrong
});
```

This will allow you to use `AjaxEvent` in your view to show how things are going:

```html
<p ng-if="someEvent.hasError()">
    Oops, something went wrong! 
    <button>Try Again</button>
</p>

<div ng-if="someEvent.isSuccessful()">
    Everything is all good!
</div>
```

##### Level 2: Standard Usage

The `AjaxEvent` is also the perfect place to store your response messages and payload data. You can 
also re-use the instances multiple times.

```js
// Create a re-usable AjaxEvent instance
var someEvent = new AjaxEvent();

function refreshLatestData() {
    // Clear any existing data and messages, and set the internal state to 'executing'
    someEvent.resetToExecuting();
    
    // Perform an AJAX request (example with Promises)
    getSomeData.then(function(response) {
        // Everything went ok, store a success message and any associated data (ie: the payload)
        someEvent.resolve('Request successful!', response.data);
    }).catch(function(response) {
        // Something went wrong, store an error message and associated error data
        someEvent.reject('Something went wrong!', response.error);
    });
}

// Do a network request every 5 seconds
setInterval(refreshLatestData, 5000);
```

You can react to when the requests are pending (ie: sent, but not finished):

```html
<p ng-if="someEvent.isExecuting()">
    <img src="loading-spinner.gif">
    Loading...
</p>

<p ng-if="someEvent.hasError()">
    Oops, something went wrong:
    {{ someEvent.message }}
</p>

<div ng-if="someEvent.isSuccessful()">
    The latest data is:
    {{ someEvent.data }}
</div>
```