# Text Captcha

This came about because I was building a website and one of the goals was to have no images on the entire site. I didn't want to use something like recaptcha for human testing. It allows for both alphabetic and mathmatic testing. One of the main drawbacks to this as of right now is that it only supports one form per page as of right now.

## Alphabetic testing
For alphabetic testing, it gives a random string of letters and asks them to be sorted by alphabetic order, reverse alphabetic order or backwards from the way they are displayed

## Mathmatic testing
For mathmatic testing, it provides 2 random numbers between 0 and 9. You can either choose the type of math to perform (addition or multiplication) or you can choose random.

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
**text** *Alphabetic functions*

**number** *Mathmatical functions*

**random** *Self explanitory*

### Methods
**alphabetic** *Asks user to sort alphabetically, only applies to **text** type*

**reverse_alphabetic** *Asks user to enter characters in reverse alphabetic order, only applies to **text** type*

**backwards** *Asks user to enter characters backwards, only applies to **text** type*

**add** *Asks user to add numbers, only applies to **number** type*

**multiply** *Asks user to multiply numbers, only applies to **number** type*

**random** *Chooses random method for chosen type, not necessary if using random type*

### Length

**length** *is only available for the **txt** type. It specifies the number of alpha characters to display*

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