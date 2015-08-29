
//Cooper Hewitt API token 
var token = "2907bb23a319de02d7174829a85eef94";
var objectsTotal = 100;
var startYear = "1960";

var allObjectsDataset = [];



/* ------ QUERY COLLECTION FOR OBJECTS THAT HAVE IMAGES AND WERE CREATED AFTER SPECIFIED YEAR ------ */

/* ------ AJAX REQUEST - returns JSON ------ */

var urlObjects ='https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.objects&access_token=' + token + '&has_images=HAS_IMAGES&year_acquired=gte' + startYear + '&year_end=gte' + startYear + '&year_start=gte' + startYear + '&page=1&per_page=' + objectsTotal + '&extras=exhibitions';



$.ajax({
	url: urlObjects,
	success: function (response) {

		console.log("AJAX requrest successful");

		var objResponse = response; // variable to hold the response
		var allObjects = objResponse.objects;

		for (i = 0; i < allObjects.length; i++) {
			allObjectsDataset.push(allObjects[i]);
			console.log(allObjects[i]);
			done();
		}	
	}
}); // end main AJAX request




//run after function with callback function and length of object array
var done = after(makeGraph, 100);


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









/*for (i = 0; i < objectsIDList.length; i++) {

	(function (i) {
		
		// ------ DEFINE COLLECTION OBJECT ------ 
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
			objDescription: "null"
		};
 



		

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
			//&& obj.exhibitions.length != 0
			if (objData.yearStart != null  && obj.images != 0) {
				allObjectsDataset.push(objData); // add object to full dataset
			}

			console.log(objData);
			
			done(); // invoke done function to check if all objs processed
		}); //End AJAX request
	})(i);
}*/

//done();





