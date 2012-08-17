# Text Captcha
---

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

### Types
**text** *Alphabetic functions*

**number** *Mathmatical functions*

**random** *Self explanitory*

### Methods
**alphabetic** *Asks user to sort alphabetically, only applies to **text** type*

**reverse alphabetic** *Asks user to enter characters in reverse alphabetic order, only applies to **text** type*

**backwards** *Asks user to enter characters backwards, only applies to **text** type*

**add** *Asks user to add numbers, only applies to **number** type*

**multiply** *Asks user to multiply numbers, only applies to **number** type*

**random** *Chooses random method for chosen type, not necessary if using random type*
