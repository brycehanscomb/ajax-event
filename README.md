## AjaxEvent

A utility to make tracking the status of your ajax requests easier. Use it with your MVC frameworks
to reduce the complexity of your View logic.

### Overview

An `AjaxEvent` is a chainable object that has the following basic properties:

* `status`: The current state of your request
* `message`: A string to describe the current state of the request (often used for errors)
* `data`: A simple container that can be used to store the result of the request

These properties can be set as appropriate to make use of the following quick functions:

* `isSuccessful()`: Check if the request has completed successfully
* `isExecuting()`: Check if the request is in the middle of being executed
* `isNotExecuting()`: Check if the request is not in the middle of being executed
* `isReady()`: Check if the request has not been executed yet
* `hasError()`: Check if the request has encountered an error
* `hasData()`: Check if the request has completed and has stored data in the `AjaxEvent`
* `hasMessage()`: Check if the request has set a message in the `AjaxEvent`

### Usage

Use `AjaxEvent` next to your request initialisers and handlers.

***In your controller***

```js

var fetchAccountEvent = new AjaxEvent();

function doRequest() {

	fetchAccountEvent.resetToExecuting();

	$.ajax({
		url: 'yourapi.com/account',
		method: 'GET',
		success: function(response) {
			fetchAccount.resolve(
				'The account was fetched successfully',
				response.account_object
			);
		}
		error: function(response) {
			fetchAccountEvent.reject(
				'There was an error fetching your account. Error code: ' + response.error_code,
				response.
			);
		}
	});
}

doRequest();
	
```