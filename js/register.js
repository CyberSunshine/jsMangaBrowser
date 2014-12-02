'use strict'; // Remonte d'avantage les erreurs de code

$(document).ready(function(){

//--------------------------------------------------------------OnStart--------------------------------------register.html
		
		//Form submit verification
		$("form[name='register_form']").submit(register);
		
		//Password validation $( "#register-form input[name=password1]" ).keyup(validatePassword);
		//$( "#id_password1" ).keyup(validatePassword);
		$("form[name='register_form'] input[name='password1']").keyup(validatePassword);
		//Password 2 validation
		$( "form[name='register_form'] input[name=password2]" ).keyup(comparePassword);

		$( "#datepicker" ).datepicker({
			changeMonth: true,
			changeYear: true
		});
		
});	//--On start End

function register(){
	
	var username = $('#id_username').val();
	
	if (!validateEmail()){
		$('#id_email ~ span').html('Invalid email');

		return false;
	}else if(!validateUsername(username)){
		var name = $('#id_email').val();
		if (!validateUsername(name)){
			$('#id_username ~ span').html('Invalid (3-16 characters)');
		}
		return false;
	}else if(!validatePassword()){
		return false;
	}else if(!comparePassword()){
		return false;
	}else{
		return true;
	}
}
function comparePassword(){
	var pwd1 = $('#id_password1').val();
	var pwd2 = $('#id_password2').val();
	
	if(pwd1!=pwd2){
		$('#id_password2 ~ span').css('color','red');
		$('#id_password2 ~ span').html('Passwords not matching');
		return false;
	}else{
		$('#id_password2 ~ span').css('color','green');
		$('#id_password2 ~ span').html('Ok');	
		return true;
	}
}
function validateEmail(email) { 
	var email = $('#id_email').val();
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	if (!re.test(email)){
		$('#id_email ~ span').html('Invalid email');
		return false;
	}else{
		$('#id_email ~ span').html('');
		return true;
	}
} 

//3-16 letters validation
function validateUsername(user){
	var re = /^[a-z0-9_-]{3,16}$/
	return re.test(user);
}

//6-18 letters validation
function validatePassword(){	
	//alert();
	var password = $('#id_password1').val();
	var re = /^[a-z0-9_-]{6,18}$/;
	
	if (!re.test(password)){
		$('#id_password1 ~ span').css('color','red');
		$('#id_password1 ~ span').html('Invalid (6-18 characters)');
		return false;
	}else{
		$('#id_password1 ~ span').css('color','green');
		$('#id_password1 ~ span').html('Ok');
		return true;
	}
}