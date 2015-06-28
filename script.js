
//Cooper Hewitt API token 
var token = "2907bb23a319de02d7174829a85eef94";

var allObjectsDataset = [];

//Random Selection of Objects
var objectsIDList = [
18669933,18189629,18562505,18345093,18670531,18503555,18670541,18804487,
18475233,18384975,18710753,18343489,18431555,18189989,18386953,18189975,
18630157,18622391,18384901,18464763,18464327,18638635,18801131,18488149,
18630151,18631419,18631613,18710395,18407005,18643095,18480039,18706745,
18648931,18479937,18397501,18704669,18636979,18612303,18624533,18678409,
18451439,18397505,18447273,18646479,18635729,18644885,18684087,18649073,
18490433,18398361,18407425,18637731,18638099,18637605,18388547,18643059,
18653089,18617493,18451445,18444283,18400935,18410569,18636321,18420439,
18636407,18430869,18478757,18648915,18621871,18617539,18710419,18732757,
18615581,18618197,18637287,18498241,18498103,18632197,18637367,18643637,
18732295,68243989,18805581,18621779,18733539,18705525,18705523,18639709,
18733541,18638839,18647243,18712511,18756025,18655795,18690599,18713685,
18710261,18714235,68267959,18707305,18700467,18707303,18701169,18714667,
18710577,18705947,18710253,18710251,18729965,18732835,18731347,68515679,
18716171,18731063,18757383,18788349,68268333,51497205,18556803];




/* ------ CREATE OBJECT FOR EACH ITEM IN COLLECTION ------ */


for (i = 0; i < objectsIDList.length; i++) {

	(function (i) {
		
		/* ------ DEFINE COLLECTION OBJECT ------ */
		var objData = { 
			key: i,
			objTitle: "tempobjTitle",
			yearStart:"tempDate", 
			yearEnd: "tempDate", 
			lifespan: "tempLife",
			yearAcquired: "tempDate",
			hasBeenExhibited: false,
			exhibitEnd: "null",
			exhibitStart: "null",
			exhibitTitle: "null",
			imageURL: "null",
			imageSQ: "null",
			designer: "Jane Smith",
			objDescription: "null",
			objColor: "#ffffff"
		};
 
		



		/* ------ AJAX REQUEST - returns JSON ------ */

		var url ='https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getInfo&access_token=' + token + '&object_id=' + objectsIDList[i] +"&extras=exhibitions,colors";


		var request = $.get(url, function( response ) {
			var objResponse = response; // variable to hold the response
			var obj = objResponse.object;

			objData.objTitle = obj.title;
			objData.objDescription = obj.description;

			

			// assign image url value
			if (obj.images != 0) {
				objData.imageURL = obj.images[0].z.url;
				objData.imageSQ = obj.images[0].sq.url;
			} else {
				console.log(obj.id + " has no images.");
			}

			// assign designer value
			if (obj.participants != 0) {
				var designerIndex = obj.participants.length - 1;
				objData.designer = obj.participants[designerIndex].person_name;
			} else {
				console.log (obj.id + " has no associated people.");
			}

			// assign color value
			if (obj.colors != 0) {
				objData.objColor = obj.colors[0].color;
			}
			else {
				console.log(obj.id + " has no color.");
			}


			// assign year values
			objData.yearEnd = obj.year_end;	//year object was finished
			objData.yearStart = obj.year_start;	//year object was started
			objData.yearAcquired = obj.year_acquired;	//year object acquired


			// NOTE TO SELF: DEAL WITH MULTIPLE EXHIBITS!!!
			if (obj.exhibitions.length != 0) { // object has been exhibited
				hasBeenExhibited = true;
				objData.exhibitTitle = obj.exhibitions[0].title;
				objData.lifespan = objData.exhibitEnd - objData.yearStart;
				objData.exhibitStart = obj.exhibitions[0].date_start.substring(0,4);
				if (obj.exhibitions[0].is_active == 1) {
					objData.exhibitEnd = 2015;
				} else {
					objData.exhibitEnd = obj.exhibitions[0].date_end.substring(0,4);
				}
			} else if (obj.exhibitions.length == 0){ // object has never been exhibited
				objData.lifespan = objData.yearAcquired - objData.yearStart;
			}

			// only add objects that have date values	
			if (objData.yearStart != null && obj.exhibitions.length != 0 && obj.images != 0) {
				allObjectsDataset.push(objData); // add object to full dataset
			}

			
			done(); // invoke done function to check if all objs processed
		}); //End AJAX request
	})(i);
}


/* ------ FUNCTION FOR PROCESSING THE API DATA ------ */

//run after function with callback function and length of object array
var done = after(makeGraph, objectsIDList.length);


// AFTER LOOPING THROUGH ID LIST AND COMPLETING AJAX REQUESTS...
// checks if counter is equal to the length of objects being looped through
function after(callback, count){
	var counter = 0;
	return function(){
		if(++counter === count) {
			counter = 0;

			removeLoader();
			callback();
		}
	};
}




/* ------ FUNCTIONS / EVENTS FOR LOADING SCREEN ------ */

function removeLoader() {
	$("button#loaded").fadeIn("slow");
	$(".ball-clip-rotate").fadeOut("slow");
	$(".ball-clip-rotate").remove();
	$("button#loaded").click(function() {
		$("#loader").fadeOut("slow");
	});
}

// event listener to bring back "about" page
$("#projectTitle").click(function() {
	$("#loader").fadeIn("slow");
});





