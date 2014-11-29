'use strict'; // Remonte d'avantage les erreurs de code

 //Nombre de page dans chaque chapitre.
var chapterNb = [[0,'0'],[32,'jpg'],[33,'jpg'],[31,'png'],[34,'png']];
//------------------------------------------------------------------------ Chargement initial
//----------------------------------------------------------------------------------------------------------------------------Active
$(document).ready(function(){
//-------------------------------------------On Start
	
//------------------------------------------------------------Active------------Header Search Box Focus & Clear

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
//--------------------------------------------------------------Active-------------------------------------index.html
	if (window.location.pathname.indexOf('/index.html') >= 0){
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

		$("#btn_az").click(function(){
			$container.isotope({ sortBy: 'name' })
			//alert();
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
		
	//------------------------------------------------------------------------Isotope
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
	}
//----------------------------------------------Fin Isotope
//--------------------------------------------------------------Active-------------------------------------manga/somemanga.html

	if (window.location.pathname.indexOf('/somemanga.html') >= 0){
		
		// Add click listener to images
		$(".manga_img").click(function(){
			loadNextMangaPage();
		});
		
		// Generates the navigation li
		liUpdate();
	}
	
});
//----------------------------------------------------------------------------------------------------------------------------------End Active
//----------------------------------------------index.html
//------------------------------------------------------------------------Creation d'une liste random
function generateRandomMangaList(){
	var div = '';
	var randomId = '';
	var id = '';
	for(var i = 0; i < 12; i++){
		randomId = getRandomMangaId();
		div = '<div id="m' + i + '" class="m1">' + 
		'<div class="m1_img">' +
		'<a href="manga/somemanga.html"><img class="thumb" src="' + getRandomThumbnail() + '"/></a></div>' +
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
		'<div class="m1_img">' +
		'<a href="manga/somemanga.html"><img class="thumb" src="' + getRandomThumbnail() + '"/></a></div>' +
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
		'<a href="manga/somemanga.html" class="m2_link"><p class="m2_t ">' + getTrimMangaTitle(getMangaTitleById(i),30) + '</p></a>' +
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

/*
	var z = 0;
	//alert( $('.manga_img')[0].src );
	var a = $('.manga_img')[0].src;
	var b = a.indexOf('/1/');
	alert(b);
	var c = parseInt(a.substr(b+3,3));
	alert(c);
	
	
*/
//-----------------------------------------------------------------------manga/somemanga.html
function loadNextMangaPage(){
	
	var c = getChapterCurNb();
	var d = getPageCurNb();
	
	//Change chapter when the end is reach
	if((d == chapterNb[c][0]) && (c != chapterNb.length)){ 
		c++;
		d=0;
	}
	//var type = chapterNb[c-1][1]; //get jpg or png
	var ext = getMangaExtension(c);
	// Add padding to the page number -1 > 001
	d++;
	var page = getPadding(d);
	$('.manga_img').attr('src', '../m/shinozaki/'+ c +'/' + page + '.' + ext);
	
	liUpdate();
}
function loadThisMangaPage(z){

	var c = getChapterCurNb();
	var page = getPadding(z.innerHTML);
	var ext = getMangaExtension(c);

	if(page != '...'){
		$('.manga_img').attr('src', '../m/shinozaki/'+ c +'/' + page + '.' + ext);
	}

	liUpdate();
}
function getMangaExtension(chapter){
	var ext = chapterNb[chapter][1];
	
	return ext;
}
function getPadding(a){
	var page = "" + a;
	var pad = "000";
	page = pad.substring(0, pad.length - page.length) + page;

	return page;
}

function getPageCurNb(){
	var a = $('.manga_img')[0].src;
	var b = a.indexOf('/',a.indexOf('/m/')+3); //First '/' after /m/
	var page = parseInt(a.substr(b+3,3)); // get current page number
	
	return page;
}

function getChapterCurNb(){
	var a = $('.manga_img')[0].src;
	var b = a.indexOf('/',a.indexOf('/m/')+3); //First '/' after /m/
	var chapter = parseInt(a.substr(b+1,1));// get current chapter number
	
	return chapter;
}

function liUpdate(){
	
	/*var ali = '</li><!--';
	var lia= '--><li>'*/
	var liGroup = '<!--';
	var curPage = getPageCurNb();
	var chapter = getChapterCurNb();
	
	$( ".btn_mid" ).empty();// Step 1: remove all li
	
	if( curPage < 5){ //Display 1-5 & last 2
		for(var i = 1;i<=5;i++) liGroup += '--><li>' + i + '</li><!--';
		liGroup +=  '--><li>' + '...' + '</li><!--';
		liGroup +=  '--><li>' + (chapterNb[chapter][0]-1) + '</li><!--';
		liGroup +=  '--><li>' + chapterNb[chapter][0] + '</li><!--';
	}else if(curPage > chapterNb[chapter][0]-5){ // display first 2 and last 5
		liGroup +=  '--><li>' + 1 + '</li><!--';
		liGroup +=  '--><li>' + 2 + '</li><!--';
		liGroup +=  '--><li>' + '...' + '</li><!--';
		for(var i = (chapterNb[chapter][0]-5);i<=(chapterNb[chapter][0]);i++) liGroup += '--><li>' + i + '</li><!--';
	}else{ // Display first 2 & last 2 & 5 pages centered on current page
		liGroup +=  '--><li>' + 1 + '</li><!--';
		liGroup +=  '--><li>' + 2 + '</li><!--';
		liGroup +=  '--><li>' + '...' + '</li><!--';
		console.log(chapterNb[chapter][0]-2);
		console.log(chapterNb[chapter][0]+2);
		for(var i = (curPage-2);i<=(curPage+2);i++) liGroup += '--><li>' + i + '</li><!--';
		liGroup +=  '--><li>' + '...' + '</li><!--';
		liGroup +=  '--><li>' + (chapterNb[chapter][0]-1) + '</li><!--';
		liGroup +=  '--><li>' + chapterNb[chapter][0] + '</li><!--';	
	}

	$( ".btn_mid" ).append( liGroup );
	
	//Attach click to the li
	$( ".btn_mid li" ).click(function() {
	  //console.log(this);
	  loadThisMangaPage(this);
	  
	});

	//current page highlighted on the li bar
	var liNb = $('#btn_mid').children().length; //number of li
	
	//Comparing the text in the li with the current page. Test need to be done on an individual ul. #btn_mid
	for(i = 1; i <= liNb; i++){
		var curLi = '#btn_mid li:nth-child(' + i + ')';
		if($(curLi).text() == curPage){
			var allLi = '.btn_mid li:nth-child(' + i + ')'; //This one is the class
			$( allLi ).addClass( 'ch_selected' );
		}
	}
	
	/*var idNavBar = '.btn_mid li:nth-child('+ curPage + ')';
	$( idNavBar ).toggleClass( 'ch_selected' );*/
	
}


























