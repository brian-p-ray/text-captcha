# Text Captcha jQuery plugin

This came about because I was building a website and one of the goals was to have no images on the entire site. I didn't want to use something like recaptcha for human testing. It allows for both alphabetic and mathematic testing. There is also a method for simple **jQuery Validate** integration

## Text testing
For text testing, it gives a random string of letters and asks the user to sort them by alphabetic order, reverse alphabetic order or backwards from the way they are displayed

## Math testing
For math testing, it provides 2 random numbers between 0 and 9. You can either choose the type of math to perform (addition or multiplication) or you can choose random.

## Number testing
For number testing, it gives a random listing of numbers and asks the user to sort them by numeric or reverse numeric order.


## Usage
Using textCaptcha is as easy as typing 

	$('formElement').textCaptcha();

or as complicated as

	$('#testform').textCaptcha({
		type: 'text',
		method: 'backwards',
		length: 6
	});

## Options

### Types
**text** *Texutal functions*

**math** *Math functions*

**number** *Number functions*

**random** *Self explanitory*

### Methods
**alphabetic** *Asks user to sort alphabetically, only applies to **text** type*

**reverse_alphabetic** *Asks user to enter characters in reverse alphabetic order, only applies to **text** type*

**backwards** *Asks user to enter characters backwards, only applies to **text** type*

**add** *Asks user to add numbers, only applies to **math** type*

**multiply** *Asks user to multiply numbers, only applies to **math** type*

**numeric** *Asks user to put a list of numbers in numeric order, only applies to **number** type*

**reverse_numeric** *Asks user to put a list of numbers in reverse numeric order, only applies to **number** type*

**random** *Chooses random method for chosen type, not necessary if using random type*

### Length

**length** *is available for the **text** and **number** types. It specifies the number of characters to display for that method.*

---

# Text Captcha Check

I've created a method that returns true/false if the value is correct and have written a custom [jQuery Validate](http://bassistance.de/jquery-plugins/jquery-plugin-validation/) method to simplify form validation. However, if you prefer to write your own validation, this method returns true/false, so it will be easy to tie in to your own validation functionality.

## Usage

Using this with jQuery validate is quite simple. Just add the method below and check the value in your validate rules.

	$.validator.addMethod("captchaCheck",
		function() {
			return $('formElement').textCaptchaCheck();
		},
		"Captcha value does not match");

Then add it to your **jQuery Validate** rules like this:
				
	$("formElement").validate({
		rules: {
			captcha_user: {
				required: true,
				captchaCheck: true
			}
		}
	});

Please note that captcha_user is the input name for the user submitted captcha value. We added the captchaCheck rule for captcha_user to implement our custom Validator method.

---
## Notes
- This plugin currently supports one form per page.
- Put text-captcha call before validation to remove possibility of order of operation issues.


## Todo
- Refactor to allow more usage of textCaptcha more than once per page.
- Add more math methods (subtraction).
- Add more to readme