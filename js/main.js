'use strict'; // Remonte d'avantage les erreurs de code

//------------------------------------------------------------------------ Chargement initial
//----------------------------------------------------------------------------------------------------------------------------Active
$(document).ready(function(){
//-------------------------------------------On Start
	
//------------------------------------------------------------OnStart------------Header Search Box Focus & Clear

	var msgDefault = 'Rechercher';
	
	//Clear search text on focus
	$( "#headerSearch" ).focus(function() {
		$( "#headerSearch" ).val('');
	});
	
	//Toggle show/hide login box with
	$('#btn_login_register').click(function(){
		$('#login_form').css('display')=='none' ? $('#login_form').css('display','inline-block') : $('#login_form').css('display','none');
	})
	
	//Form login verification
	$('#login_form').submit(login);

});	//--On start End

//------------------------------------------------------Header
//Login button
function login(){
	if($('#login_form input[name="user"]').val()!=''){
		$('#btn_login_register').css('display','none');
		$('#div_login_register').append('<div id="div_login_temp"><p>Welcome, ' + $('#login_form input[name="user"]').val() + '</p></div>');
		$('#div_login_temp').append('<input type="button" value="Logout" />');
		$('#login_form').css('display','none');
		
		//Logout button listener
		$("#div_login_temp input").click(function(){
			$('#div_login_temp').remove();
			$('#btn_login_register').css('display','inline-block');
		});
			
		return false; //False to avoid page from reloading
	}else{
		//empty username
		return false;
	}
}




























