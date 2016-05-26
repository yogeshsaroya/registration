(function() {
	"use strict";
	var
	input,
			container,
			classSuccess = "success",
			classError = "error",
			formValidator = {
				restart: function() {
					this.cacheDom();
					this.bindEvents();
				},
				cacheDom: function() {

					this.submissionForm = document.getElementById("submissionForm");
					this.formHead = document.querySelector("#formHead h1");
					this.formBody = document.getElementById("formBody");
					this.inputContainer = document.getElementsByClassName("inputContainer");
					//inputs
					this.fields = {
						userName: document.getElementById("userName"),
						userEmail: document.getElementById("userEmail"),
						userPassword: document.getElementById("userPassword")
					};
					this.submitButton = document.getElementById("submitButton");
				},
				bindEvents: function() {
					var i;
					//runs setRules when submit button clicked
					this.submitButton.onclick = this.setRules.bind(this);
					//binds events
					for (i in this.fields) {
						if (this.fields.hasOwnProperty(i)) {
							//VARIABLES
							input = this.fields[i];
							container = input.parentElement;
							//Runs setRules when input has focus
							input.onfocus = this.setRules.bind(this);
							//Removes errors when container is clicked
							container.onclick = this.clearErrors.bind(this, input);
						}
					}
				},
				setRules: function(evnt) {
					var target = evnt.target,
							type = evnt.type;
					//If submit button is clicked
					if (target === this.submitButton) {
						//Prevent form submission
						this.preventDefault(evnt);
						//If input has focus
					} else if (type === "focus") {
						//Remove error/success messages
						this.resetClasses(target.parentElement);
						//Reset errors
						this.clearErrors(target);
						return false;
					}
					this.resetClasses();
					this.validateFields();
				},
				preventDefault: function(evnt) {
					evnt.preventDefault();
				},
				validateFields: function() {
					var i,
							validFields = 0,
							//E-mail format regular expression
							filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					// Check each input
					for (i in this.fields) {
						if (this.fields.hasOwnProperty(i)) {
							input = this.fields[i];
							//CHECK IF FIELD IS EMPTY
							if (input.value === "") {
								//Add error class
								this.addClass(input, classError);
								//Else if the e-mail input filter is not passed
							} else if (i === "userEmail" && !filter.test(input.value)) {
								//Add error class
								this.addClass(input, classError);
							} else {
								//Input is valid, continue looping
								this.addClass(input, classSuccess);
								validFields += 1;
							}
						}
					}
					//If all inputs are valid
					if (validFields === 3) {
						//Submit
						this.submitForm();
					}
				},
				addClass: function(input, clss) {
					container = input.parentElement;
					//If error class has been added
					if (clss === classError) {
						//Show error message
						this.errorMessage(input);
					}
					//Add class
					input.parentElement.classList.add(clss);
				},
				errorMessage: function(input) {
					var message;
					//IF USERNAME HAS ERROR
					if (input === this.fields.userName) {
						message = "You forgot your name!";
						//ELSE IF USEREMAIL HAS ERROR
					} else if (input === this.fields.userEmail) {
						message = "E-mail address invalid!";
						//ELSE IF userPassword HAS ERROR
					} else if (input === this.fields.userPassword) {
						message = "You forgot your feedback!";
					}
					this.addError(input, message);
				},
				addError: function(input, message) {
					var html;
					//GET INPUT CONTAINER
					container = input.parentElement;
					//RENDER HTML
					html = document.createElement("div");
					html.setAttribute("class", "message");
					html.innerHTML = message;
					//IF MESSAGE ELEMENT DOESN'T EXIST
					if (!container.getElementsByClassName("message")[0]) {
						//INSERT MESSAGE TO INPUT CONTAINER
						container.insertBefore(html, container.firstElementChild);
					}
				},
				resetClasses: function(input) {
					var i;
					//IF TARGETING SPECIFIC INPUT
					if (input) {
						//GET INPUT CONTAINER
						container = input.parentElement;
						//REMOVE CLASSES
						container.classList.remove(classError, classSuccess);
						//FOCUS ON INPUT FIELD
						input.focus();
					} else {
						for (i in this.fields) {
							if (this.fields.hasOwnProperty(i)) {
								//REMOVE CLASSES FROM ALL FIELDS
								this.fields[i].parentElement.classList.remove(classError, classSuccess);
							}
						}
					}
				},
				clearErrors: function(input) {
					//GET INPUT CONTAINER
					container = input.parentElement;
					//IF CONTAINER CONTAINS ERROR
					if (container.classList.contains(classError)) {
						//RESET CLASSES
						this.resetClasses(input);
					}
				},
				submitForm: function() {
					var waitForAnimation;
					//ADD SUCCESS CLASS
					this.submissionForm.classList.add(classSuccess);
					//WAIT FOR ANIMATION TO FINISH
					this.changeHead("Success!");
				},
				changeHead: function(text) {
					//CHANGE HEAD TEXT
					this.formHead.innerHTML = text;
				}
			};
	formValidator.restart();
}());
