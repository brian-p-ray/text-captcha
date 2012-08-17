# Text Captcha

This came about because I was building a website and one of the goals was to have no images on the entire site. I didn't want to use something like recaptcha for human testing. It allows for both alphabetic and mathmatic testing.

## Alphabetic testing
For alphabetic testing, it gives a random string of letters and asks them to be sorted by alphabetic order, reverse alphabetic order or backwards from the way they are displayed

## Mathmatic testing
For mathmatic testing, it provides 2 random numbers between 0 and 9. You can either choose the type of math to perform (addition or subtraction) or you can choose random.

## Usage
Using textCaptcha is as easy as typing 

	$('element').textCaptcha();

or as complicated as

	$('#testform').textCaptcha({
		type: 'text',
		method: 'backwards',
		length: 6
	});

## Options

	
	type: text
		methods:
			alphabetic // informs users to type characters in alphabetic order
			reverse_alphabetic // informs users to type characters in reverse alphabetic order
			backwards // informs users to 
			random
		number
			add
			multiply
			random
		random
