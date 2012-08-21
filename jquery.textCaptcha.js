/*!
* jQuery Text Captcha Plugin
* Copyright (c) 2012 Brian Ray
* Version: 0.1 (19-AUG-2012)
* Dual licensed under the MIT and GPL licenses.
* Requires: jQuery v1.4.2 or later
*/
(function($){

	var ver = '0.1';

	// provide log functionality for devs without relying on Firebug
	function log() {
		window.console && console.log && console.log('[captcha] ' + Array.prototype.join.call(arguments,' '));
	}

	$.fn.textCaptcha = function(options) {
    
		var defaults = {
			type: 'text', // Type of characters to display for captcha. Can be text, number or random.
			method: 'alphabetic', // Type of sort to require the user to perform. Can be alphabetic, reverse_alphabetic, backwards or random if  type=text. Can be add, multiply or random if type=number
			length: 4 // Number of characters to display. I would suggest 4 to 6. Only applies if type=text.
		};
  
		var options = $.extend(defaults, options);

		return this.each(function() {
			
			var characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
			var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
			var operators = {'add': '+', 'multiply': '*'};
			var types = ['text', 'number'];
			var text_methods = ['backwards', 'alphabetic', 'reverse_alphabetic'];
			var number_methods = ['add', 'multiply'];
			var captcha_operator = '';
			var captcha_string = '', num1, num2, operator; // set strings to hold the random values
			var captcha_method_text;
			
			// choose type if options.type == random
			if (options.type == 'random') {
				set_random_type();
			}
			
			// verify that the method matches the type
			var methods;
			if (options.type == 'text') {
				methods = text_methods;
			}
			else {
				methods = number_methods;
			}
			
			// choose method if options.method == random
			if (options.method == 'random') {
				set_random_method();
			}
			
			set_captcha();
			
			mismatch_error();

			
			//display text based on captcha_method chosen
			switch(options.method) {
				case 'backwards':
					captcha_method_text = 'Type this string backwards';
				break;

				case 'alphabetic':
					captcha_method_text = 'Type this string in alphabetical order';
				break;
				
				case 'reverse_alphabetic':
					captcha_method_text = 'Type this string in reverse alphabetical order'
				break;
				
				case 'add':
					captcha_method_text = 'Add these numbers'
				break;
				
				case 'multiply':
					captcha_method_text = 'Multiply these numbers'
				break;
			}
			
			output($(this));
			
			// set type if random
			function set_random_type() {
				options.type = types[Math.floor(Math.random()*types.length)];
				options.method = 'random';
			}
			
			// set method if random
			function set_random_method() {
				if (options.type == 'text') {
					options.method = text_methods[Math.floor(Math.random()*text_methods.length)];
				}
				else {
					options.method = number_methods[Math.floor(Math.random()*number_methods.length)];
				}
			}
			
			function set_captcha() {
				if (options.type == 'text') {
					for (i=0; i<options.length; i++) {
						captcha_string += characters[Math.floor(Math.random()*characters.length)];
					}
				}
				else {
					captcha_operator = operators[options.method];
					num1 = numbers[Math.floor(Math.random()*numbers.length)];
					num2 = numbers[Math.floor(Math.random()*numbers.length)];
					
					captcha_string = num1 + ' ' + captcha_operator + ' ' + num2;
				}
			}
			
			function output(el) {
				var output = '<p><span id="type_captcha_method">'+captcha_method_text+'</span>: <span id="captcha">'+captcha_string+'</span></p>';
				output += '<input type="text" id="captcha_user" name="captcha_user" />';
				output += '<input type="hidden" id="captcha_type" name="captcha_type" value="'+options.type+'" />';
				output += '<input type="hidden" id="captcha_method" name="captcha_method" value="'+options.method+'" />';
				output += '<input type="hidden" id="captcha_value" name="captcha_value" value="'+captcha_string+'" />';
	
				el.children(':submit').before(output);
			}
			
			function mismatch_error() {
				if ($.inArray(options.method, methods) < 0) {
					log('Type, method mismatch. \n type: '+options.type+' \n method: '+options.method);
					return false;
				}
			}
			
		});
	};
	
	$.fn.textCaptchaCheck = function() {
		var value,
			correct_value = '',
			captcha_type = $('#captcha_type').val(),
			captcha_method = $('#captcha_method').val(),
			captcha_user = $('#captcha_user').val();
		
		if (captcha_type == 'text') {
			value = $('#captcha_value').val().split(""); //grab the captcha value and turn it into an array
		}
		else {
			value = $('#captcha_value').val();
		}

		switch(captcha_method) {
			case 'alphabetic':
				value = value.sort(); //if alphabetic, sort the array
			break;
			
			case 'backwards': //if backwards, reverse the array
				value = value.reverse();
			break;
			
			case 'reverse_alphabetic': // if reverse alphabetic, sort the array and reverse
				value = value.sort();
				value = value.reverse();
			break;
			
			case 'add':
				value = eval(value);
			break;
			
			case 'multiply':
				value = eval(value);
			break;
		}
		
		if (captcha_type == 'text') {
			correct_value = value.join(''); //turn the array back into a string
		}
		else {
			correct_value = value;
		}
		log('value: '+value+' correct_value: '+correct_value);

		if (captcha_user != correct_value) { //if the user inputted value does not match the modified string
			return false;
		}
		else {
			return true;
		}
	};
	
})(jQuery);