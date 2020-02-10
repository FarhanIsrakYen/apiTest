var map;
var myLatLng;
$(document).ready(function(){
	geoLocationInit();
	function geoLocationInit(){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success,fail);
		} else {
			alert("Browser not supported");
		}
	}

	function success(position){
		
		var latval= position.coords.latitude;
		var lngval= position.coords.longitude;

		/*console.log(latval,lngval);*/

		myLatLng= new google.maps.LatLng(latval,lngval);
		createMap(myLatLng);

		/*nearBySearch(myLatLng,"school");*/
		searchPerson(latval,lngval);
	}

	function fail()
	{
		alert("It fails");
	}

	function createMap(myLatLng){
			 map = new google.maps.Map(document.getElementById('map'), {
		          center: myLatLng,          
		          zoom: 12
		      });

			 var marker = new google.maps.Marker({
			 		    position: myLatLng,
			 		    map: map
			 		  });
	}

	function createMarker(latlng,icn,name){
		var marker = new google.maps.Marker({
		    position: latlng,
		    map: map,
		    icon: icn,
		    title: name
		  });
	}

	/*function nearBySearch(myLatLng,type){
		var request = {
		    location: myLatLng,
		    radius: '2500',
		    type: [type]
		  };

		function callback(results, status) {
			
		  if (status == google.maps.places.PlacesServiceStatus.OK) {
		    for (var i = 0; i < results.length; i++) {
		      var place = results[i];
		      latlng= place.geometry.location;
		      icn= 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
		      name= place.name;
		      createMarker(latlng,icn,name);
		    }
		  }
		}

		service = new google.maps.places.PlacesService(map);
		service.nearbySearch(request, callback);
	}*/
	
	function searchPerson(lat,lng){
		$.post('http://localhost:8000/api/searchPerson',{lat:lat,lng:lng},function(match){
			// console.log(match);
			$.each(match,function(i,val){
				var platval=val.lat;
				var plngval=val.lng;
				var pname=val.name;

				var PLatLng= new google.maps.LatLng(platval,plngval);
				var picn= 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
				createMarker(PLatLng,picn,pname);
			});
		});
	}

	

	
});