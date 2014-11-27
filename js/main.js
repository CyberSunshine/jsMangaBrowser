'use strict'; // Remonte d'avantage les erreurs de code

/*TODO

- Sort latest list
- Remove Duplicate in top list

*/
//------------------------------------------------------------------------ Chargement initial
//----------------------------------------------------------------------------------------------------------------------------Active
$(document).ready(function(){
//-------------------------------------------On Start
	generateTopList();
	generateLatestMangaList();
//------------------------------------------------------------------------Boutton Random
	$("#btn_random").click(function(){
		
		emptyM1();
		generateRandomMangaList();
		$("#main_div_p1_2").show("slow");
		fakeLoading();
	});
//------------------------------------------------------------------------Boutton Latest clone
	/*$("#btn_latest").click(function(){
		
		emptyM1();
		generateLatestMangaList();
		$("#main_div_p1_2").show("slow");
		fakeLoading();
	});*/
//------------------------------------------------------------------------Boutton Latest
	$("#btn_latest").click(function(){
		
		
		generateLatestMangaList();
		fakeLoading();
	});
//------------------------------------------------------------------------Boutton A-Z

	$("#btn_latest").click(function(){
		
	$container.isotope({ sortBy: 'name' })
	});
//------------------------------------------------------------------------Boutton Collapse

	$("#btn_collapse").click(function(){
		
		var height = parseInt($("#main_div_p1_2").height());
		//alert(height);
		if(height>10){
			$("#main_div_p1_2").hide("slow", emptyM1);
		}else{
			generateLatestMangaList();
			fakeLoading();
		}
	//	generateLatestMangaList();
		
		
	});
//------------------------------------------------------------------------Header Search Box Focus & Clear

	var msgDefault = 'Rechercher';
	$( "#headerSearch" ).focus(function() {
		$( "#headerSearch" ).val('');
		//$( "#headerSearch" ).css('border', '1px solid rgba(80, 200, 240, 1)');
		
	 // alert( "Handler for .focus() called." );
	});

	$( "#headerSearch" ).blur(function() {
	  if($( "#headerSearch" ).val()==""){
	//		$( "#headerSearch" ).css('border', '1px solid rgba(80, 200, 240, 1)');
			
		//box-shadow: 0 0 5px rgba(81, 203, 238, 1);
	  }
	});
	/*
	$( "#headerSearch" ).blur(function() {
		$( "#headerSearch" ).val() === '' ? $( "#headerSearch" ).val(msgDefault) : '';
	});*/
	
	/*$( "#headerSearch" ).blur(function() {
	  if($( "#headerSearch" ).val()==""){
		$( "#headerSearch" ).val(msgDefault);
	  }
	});*/
});
//----------------------------------------------------------------------------------------------------------------------------------End Active

//------------------------------------------------------------------------Creation d'une liste random
function generateRandomMangaList(){
	var div = '';
	var randomId = '';
	var id = '';
	for(var i = 0; i < 12; i++){
		randomId = getRandomMangaId();
		div = '<div id="m' + i + '" class="m1">' + 
		'<div class="m1_img"><img class="thumb" src="' + getRandomThumbnail() + '"/></div>' +
		'<p class="m1_t">' + getTrimMangaTitle(getMangaTitleById(randomId),11) + '</p>' +
		'<p class="m1_d">' + getMangaYearById(randomId) + '</p>' +
		'<p class="m1_c">Vol: ' + getMangaChapterById(randomId) +'</p>' +
		'</div>';
		
		$( "#main_div_p1_2" ).append( div );
		id = '#m' + i;
		$( id ).css( "background", getRandomColor() );
	}
	//document.getElementById('main_div_p1_2').innerHTML = div1;
}
//------------------------------------------------------------------------Creation de latest list
function generateLatestMangaList(){
	var div = '';
	var randomId = '';
	var id = '';
	
	emptyM1();
	
	for(var i = 0; i < 12; i++){
		randomId = getRandomMangaId();
		div = '<div id="m' + i + '" class="m1">' +
		'<div class="m1_img"><img class="thumb" src="' + getRandomThumbnail() + '"/></div>' +
		'<p class="m1_t">' + getTrimMangaTitle(getMangaTitleById(randomId),11) + '</p>' +
		'<p class="m1_d">' + getRandomReleaseTime() + '</p>' +
		'<p class="m1_c">Vol: ' + getMangaChapterById(randomId) +'</p>' +
		'</div>';
		
		$( "#main_div_p1_2" ).append( div );
		id = '#m' + i;
		$( id ).css( "background", getRandomColor() );
	}
	
	$("#main_div_p1_2").show("slow");
	
	//document.getElementById('main_div_p1_2').innerHTML = div1;
}
//------------------------------------------------------------------------Creation d'une liste top
function generateTopList(){
	var div = '';
	var randomId = '';
	var id = '';
	for(var i = 0; i <= 50; i++){
		div = '<div id="m2_' + i + '" class="m2">' + 
		'<div class="m2_1">' +
		'<div class="m2_img"></div>' +
		' <p class="m2_t ">' + getTrimMangaTitle(getMangaTitleById(i),30) + '</p>' +
		'<p class="m2_c">Vol: ' + 	getMangaChapterById(i) + '</p>' +
		'</div>' +
		'<div class="m2_2">' +
		'<p class="m2_d">' + getMangaYearById(i) + '</p>' +
		'</div>' +
		'</div>';
		
		$( "#main_div_p2_2" ).append( div );
	//id = '#m' + i;
	//$( id ).css( "background", getRandomColor() );
	
	//$( id ).css( "background", 'white' );
	}
	//document.getElementById('main_div_p1_2').innerHTML = div1;
}
//------------------------------------------------------------------------getRandomMangaId
function getRandomMangaId(){
	var id = 0;
	id = Math.floor(Math.random() * mangaList.length);
	return id;
}
//------------------------------------------------------------------------getMangaTitleById
function getMangaTitleById(id){
	var title = mangaList[id][0];
	return title;
}
//------------------------------------------------------------------------getTrimMangaTitle
function getTrimMangaTitle(mTitle, t){
	var trimTitle = mTitle.length > t ? mTitle.substring(0,t) + '...' : mTitle;
	return trimTitle;
}
//------------------------------------------------------------------------getMangaChapterById
function getMangaChapterById(id){
	var mChapter = mangaList[id][3];
	return mChapter;
}
//------------------------------------------------------------------------getMangaYearById
function getMangaYearById(id){
	var mYear = mangaList[id][4];
	return mYear;
}
//------------------------------------------------------------------------getRandomReleaseTime
function getRandomReleaseTime(){
	var mTime = '';
	var rnd = Math.floor(Math.random()*5 + 1);
	
	if (rnd ==1){
		mTime = 1 + ' hour ago';
	}else{
		mTime = rnd + ' hours ago';
	}
	return mTime;
}
//------------------------------------------------------------------------getRandomReleaseTime
function getRandomThumbnail(){
	var rnd = Math.floor(Math.random()*70 + 1);
	return 'images/small/' + rnd + '.jpg'
}
//------------------------------------------------------------------------Vider la div p1_2
function emptyM1(){
	$("#main_div_p1_2").empty();
}
//------------------------------------------------------------------------Fake Loading
function fakeLoading(){

	$( "#main_div_p1_2" ).append( '<div id="progress_bar"></div>' );

	$("#progress_bar").animate({
      width:'+=50%',
    }, 300, function() {
   $( "#progress_bar" ).remove();
  });

}
//------------------------------------------------------------------------Creer une couleur hexadecimal au hazard
function getRandomColor() {
    var lettres = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += lettres[Math.round(Math.random() * 15)];
    }
    return color;
}
//------------------------------------------------------------------------Isotope
$( function() {
  // init Isotope
  var $container = $('#main_div_p2_2').isotope({
    itemSelector: '.m2',
    layoutMode: 'fitRows',
    getSortData: {
		name: '.m2_t'
    }
  });

  // bind sort button click
  $('#sorts').on( 'click', 'button', function() {
    var sortValue = $(this).attr('data-sort-value');
    $container.isotope({ sortBy: sortValue });
  });

  // change is-checked class on buttons
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });
  
});
