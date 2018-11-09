# AjaxEvent

A utility to make tracking the status of your AJAX requests easier. Use it with MVC frameworks
to reduce the complexity of your View logic.

## Overview

### 10-Second Example

Have you ever wanted to simplify your view logic so it's more self-explanatory?
Imagine if your views looked like this (using Angular for example):

```html
<p *ngIf="fetchAccountEvent.isExecuting()">
    Your account is loading...
</p>

<p *ngIf="fetchAccountEvent.hasError()">
    {{ fetchAccountEvent.message }}
</p>

<div *ngIf="fetchAccountEvent.isSuccessful()">
    Your account details: {{ fetchAccountEvent.data }}
</div>
```

Here's the code that could make that happen:

```typescript
var fetchAccountEvent = new AjaxEvent();

// Set the internal state to 'executing' while the request is pending
fetchAccountEvent.resetToExecuting();

$.ajax({
    url: 'yourapi.com/account',
    method: 'GET',
    success(response) {
        // Everything went ok, 
        // store a success message and any associated data (ie: the payload)
        fetchAccount.resolve(response.account_object, 'The account was fetched successfully');
    },
    error(err) {
        // Something went wrong, 
        // store an error message and associated error data
        fetchAccountEvent.reject(err, 'There was an error! Error code: ' + err.error_code);
    }
});	
```

### API Summary

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

## Usage

### Installation

With [Yarn](https://www.yarnpkg.org/) do:

```bash
yarn add ajax-event
```

Then in your JS, make the package available:

```js
import AjaxEvent from 'ajax-event';
```

### Reacting To Network Requests

#### Level 1: Ultra-Basic

The simplest example just uses `resolve()` and `reject()` to set the `AjaxEvent`'s internal `status`:

```js
var someEvent = new AjaxEvent();

// Perform an AJAX request (example with Promises)
getSomeData
    .then(() => someEvent.resolve()) // Everything went ok
    .catch(() => someEvent.reject()) // Something went wrong
```

This will allow you to use `AjaxEvent` in your view to show how things are going:

```html
<p *ngIf="someEvent.hasError()">
    Oops, something went wrong! 
    <button>Try Again</button>
</p>

<div *ngIf="someEvent.isSuccessful()">
    Everything is all good!
</div>
```

#### Level 2: Standard Usage

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
        // Everything went ok, store any associated data (ie: the payload)
        // and a success message
        someEvent.resolve(response.data, 'Request successful!');
    }).catch(function(response) {
        // Something went wrong, store associated error data
        // and an error message
        someEvent.reject(response.error, 'Something went wrong!');
    });
}

// Do a network request every 5 seconds
setInterval(refreshLatestData, 5000);
```

You can react to when the requests are pending (ie: sent, but not finished):

```html
<p *ngIf="someEvent.isExecuting()">
    <img src="loading-spinner.gif">
    Loading...
</p>

<p *ngIf="someEvent.hasError()">
    Oops, something went wrong:
    {{ someEvent.message }}
</p>

<div *ngIf="someEvent.isSuccessful()">
    The latest data is:
    {{ someEvent.data }}
</div>
```

## Running Tests

Clone this project into your local computer and run the following in its root directory (where the package.json is):

```bash
yarn install
yarn test
```

## License

Released under the MIT license.

## What's New

### v3.0.1

Added optional generic type `new AjaxEvent<DataT>()` for TS IDE assistance
when working with the `data` field, it will now have its shape known if `DataT`
is provided during construction.

### v3.0.0

The `data` will no longer be lost when calling `resetToExecuting()`, it will persist
until some other command is called.