/**
 * Google 360 Maps v2
 * Based on the original Map implementation from [Revolution Viewing](http://www.revolutionviewing.co.uk/)
 * who produce the 360 panoramic map views, updated for Google Maps API version 3.
 * Any divs on the page which have a class of 'sys_gmap360_canvas' will be loaded with a Google Map displaying
 * a marker for each university location loaded from our JSON list. The centre of the map and the zoom level
 * are determined by the div's 'data-campus' attribute
 * (see the indexes of CampusLocations in the JSON for valid values).
 *
 * @author Gareth Brown
 */


/**
 * Callback function on load of the Google Maps API
 */
function initializeMaps()
{	
	//JSON data of where all the university locations are
	var locationJSON = "https://www.brighton.ac.uk/uob-api/data/universityplaces.json?v=4";
	//window.alert(timeStamp);

	//Define marker images, both normal and hover
	//accommImage = little house
	//campusImage = uob star
	var imgFolder = "https://www.brighton.ac.uk/_design/img/360/";
	var imgSize = new google.maps.Size(30,30);
	
	var accommImage 	= {url:imgFolder + 'house.png', 		size:imgSize};
	var accommImageH	= {url:imgFolder + 'house-hover.png',	size:imgSize};
	var campusImage 	= {url:imgFolder + 'campus.png',		size:imgSize};
	var campusImageH 	= {url:imgFolder + 'campus-hover.png',	size:imgSize};
	var groupImage		= {url:imgFolder + 'group.png',			size:imgSize};


	/**
	 * Create a new marker
	 * @param map - the map the marker is for (each marker can only apply to one map at a time)
	 * @param place - the place object (loaded from the JSON)
	 */
	function createMarker(place)
	{	
		var mImage = (place.mType == "halls") ? accommImage : campusImage;
		var marker = new MarkerWithLabel({
			position: new google.maps.LatLng(place.lat, place.lng),
			draggable: false,
			icon: mImage,
			labelContent: place.mName,
			labelAnchor: new google.maps.Point(13, 0),
			labelClass: "gmapMarkerLabel" // the CSS class for the label
			//labelStyle: {opacity: 0.9}
		});

		marker.minZoom = 0;
		marker.maxZoom = 18;

		//Set the hover images for the marker
		var imageMOut, imageHover;
		switch(place.mType){
			case "halls":
				imageMOut = accommImage;
				imageHover = accommImageH;
				break;
			default:
			case "bldng":
				imageMOut = campusImage;
				imageHover = campusImageH;
				break;
		}
		google.maps.event.addListener(marker, "mouseover", function() {
			this.setIcon(imageHover);
		});
		google.maps.event.addListener(marker, "mouseout", function() {
			this.setIcon(imageMOut);
		});

		return marker;
	}

	function createGroupMarker(map, place, campus)
	{
		//var mImage = (place.mType == "halls") ? accommImage : campusImage;
		var marker = new MarkerWithLabel({
			position: new google.maps.LatLng(place.lat, place.lng),
			draggable: false,
			icon: groupImage,
			labelContent: place.mName,
			labelAnchor: new google.maps.Point(13, 0),
			labelClass: "gmapMarkerLabel" // the CSS class for the label
			//labelStyle: {opacity: 0.9}
		});

		//Add an onclick zoom to desired place and level
		google.maps.event.addListener(marker, 'click', function() {
			map.setZoom(campus.zoom);
			map.setCenter(new google.maps.LatLng(campus.lat, campus.lng));
		});

		return marker;
	}

	/**
	 * Create and then add an Infoview for a marker to a map
	 *
	 * @param map - the map the marker is on
	 * @param marker - the marker the Infoview is for
	 * @param place - the place object (loaded from the JSON)
	 */
	function addInfoView(map, marker, place)
	{
		//Using the attributes of place create the HTML for an Infoview
		var divClass = (place.has360) ? '' : 'singleFunction';
		var tourImage = '';
		if(place.has360){
			tourImage = "<div class=\"sys_touricon\" onclick=\"jQuery.fancybox.open({width:960, height:640, href:\'" + place.tour360location + "\', type:\'iframe\'});\"></div>";
		}
		var pDesc = (typeof place.description == 'undefined') ? '' : "<p>" + place.description + "</p>";
		var moreInfoLink = (typeof place.moreInfoLink === 'undefined' || place.moreInfoLink === "") ? '' : "<a target=\"_blank\" style=\"margin-right: 1em;\" href=\"" + place.moreInfoLink + "\">More Information</a>";
		var getDirLink = "<a target=\"_blank\" href=\"https://maps.google.com?daddr=" + place.lat + "," + place.lng + "\">Get directions</a>";

		
		var html = "<div class=\"map360Infoview " + divClass + "\">" +
					"<h4 class=\"placeName\">" + place.mName + "</h4>" +
					pDesc + 
					"<p>" + tourImage + "<img src=\"" + imgFolder + "thumbs/" + place.thumbnail + "\" style=\"height: 85px; width: 85px;\" />" +
					"<p>" + moreInfoLink + getDirLink + "</p>" + 
					"</div>";

		//Create the Infoview using the generated HTML
		var infowindow = new google.maps.InfoWindow({
			content: html,
			maxWidth: 250
		});

		//Add an onclick to close all other Infoviews on this map and open the one for the clicked marker
		google.maps.event.addListener(marker, 'click', function() {
			var i = 0;
			var len = map.Infoviews.length;
			for(; i < len; i++){ map.Infoviews[i].close(); }
			infowindow.open(map, marker);
		});

		return infowindow;
	}

	/**
	 * Initialise a map
	 * @param Element - the div the map will be placed into
	 * @param data - the raw data loaded from the JSON file
	 */
	function initialize(Element, data)
	{

		//Use the data-campus attribute to find which campus we are on
		var campus = jQuery(Element).attr('data-campus');
		//Copy the presets into an object for easy reference
		var campusObj = data.CampusLocations[campus];
        var mapCenter = new google.maps.LatLng(campusObj.lat, campusObj.lng);
		//Styles and options
		var stylesArray = [
		  {
			featureType: "poi",
			elementType: "labels",
			stylers: [
			  { visibility: "off" }
			]
		  },
		  {
			featureType: "landscape.man_made",
			elementType: "labels",
			stylers: [
			  { visibility: "off" }
			]
		  }		  
		];

		var myOptions = {
		  zoom: campusObj.zoom,
		  center: mapCenter,
		  mapTypeId: google.maps.MapTypeId.ROADMAP,
		  sensor: 'true',
		  styles: stylesArray
		};

		//Create the Google map
		var map = new google.maps.Map(Element, myOptions);

		jQuery(window).on('resize', function(){
            google.maps.event.trigger(map, 'resize' );
            //map.setZoom( map.getZoom() );
            map.setCenter( mapCenter );
	        
		});	

		//Loop through all the places, create a marker for each, then add an Infoview for the
		//marker and store in the map's Infoviews[]
		//Add markers to the map via the MarkerManager
		map.mgr = new MarkerManager(map);
		google.maps.event.addListener(map.mgr, 'loaded', function(){
			//Normal place markers (with infoviews)
			var i = 0;
			var len = data.Places.length;
			map.markers = [];
			map.Infoviews = [];
			for(; i < len; i++){
				marker = createMarker(data.Places[i]);
				map.markers.push(marker);
				map.Infoviews.push(addInfoView(map, marker, data.Places[i]));
				map.mgr.addMarker(marker, data.Places[i].minZoom );
			}
			//Group Markers with min and max zoom levels
			i = 0;
			len = data.PlaceGroups.length;
			for(; i < len; i++){
				//console.log(data.PlaceGroups[i].zLink);
				campusObj = data.CampusLocations[data.PlaceGroups[i].zLink];
				marker = createGroupMarker(map, data.PlaceGroups[i], campusObj);
				map.markers.push(marker);
				map.mgr.addMarker(marker, data.PlaceGroups[i].minZoom, data.PlaceGroups[i].maxZoom );
			}

    		map.mgr.refresh(); //makes mgr calculate if marker are currently visible
  		});

	} //end function initialize()

	//Pushes an element to Googlemaps once it is visbible (to counter tabs not being visible onReady() )
	function pushWhenVisible(Maps, Element, data){
		if(jQuery(Element).is(":visible")){
			Maps.push(initialize(Element, data));
		} else {
			setTimeout(pushWhenVisible(Maps, Element, data), 1000);
		}
	}

	//Load the JSON data and then do the main processing inside an anonymous function
	jQuery.getJSON(locationJSON, function(data) {
		//Now we have the data work out which maps we need (may only be one but could be multiple)
		//Each map will have a class of 'sys_gmap360_canvas'
		var Maps = [];
		jQuery(".sys_gmap360_canvas").each(function(index, Element) { Maps.push(initialize(Element, data)); });
	}); //end jQuery.getJSON();

} //end function initializeMaps(){

//Loads Marker with Label and Marker Manager (for changing markers and labels based on zoom level) and then calls initializeMaps
//These need to be loaded after Google Maps API, and before rest of code is executed
var gotgmaps = function(){	jQuery.getScript("https://www.brighton.ac.uk/_design/js/360/extras.js", initializeMaps); };

//On ready load the Fancybox, the CSS and then the Google map API with callback function initializeMaps()
jQuery(function(){

	//Make sure we have fancybox for the 360 Tours iframes
	if(typeof jQuery.fancybox != 'function'){
		jQuery.getScript("https://www.brighton.ac.uk/_design/js/jquery.fancybox.js");
	}
	//Load Fancybox stylesheet if not already on page
	if(jQuery('link[rel="stylesheet"][href*="fancybox.css"]').length === 0){
		jQuery("head").append('<link rel="stylesheet" type="text/css" href="https://www.brighton.ac.uk/_design/css/plugins/jquery.fancybox.css"/>');
	}
	//Prevent local testing from using API usage quota
	var apiKey = (document.domain !== "www.brighton.ac.uk") ? "sensor=false" : "key=AIzaSyDm9h7cx5i32xKyxsiC8K5pXATiqmDVLM8";
	
	//Get the Google maps javascript and call gotGoogleMaps() when done
	jQuery.getScript("https://maps.googleapis.com/maps/api/js?" + apiKey + "&callback=gotgmaps" );

	//For strange cases where Gmaps do not call the callback function gotgmaps() and therefore maps are not initialised.
	//Wait 4 seconds then loop through all canvases which should have a child element with class 'gm-style' appended by Google, if found
	//then it has been called, otherwise we need to call manually
	setTimeout(function(){
		jQuery('.sys_gmap360_canvas').each(function(index, element){
			if(jQuery(element).find('.gm-style').length) return false;
			//else
			gotgmaps();
			return false;
		});
	}, 4000);

});