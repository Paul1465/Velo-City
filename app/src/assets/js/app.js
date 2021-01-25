
    mapboxgl.accessToken = 'pk.eyJ1IjoicGF1bDE0IiwiYSI6ImNqc2FhbWh4MDFqYXozenM4dGIyeWtqMnEifQ.RmJ-AsYHLvzQYC1ZJFjb_Q';
    
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [ 4.835659, 45.764043],
      zoom: 11.15,
    });
    
    map.addControl(new mapboxgl.FullscreenControl());
//$matiere_req = "SELECT * FROM matieres_profs LEFT JOIN matieres ON matieres.id"
//if($resultat = mysqli-> query($matiere_req)){
  //while($res)
//
    var urlAPI = "http://localhost/velo-city6/api"
    var user;
   // div#sidebar-wrapper.bg-DeviceLightEvent.border-right
   // nav.navbar-expand-lg.navbar-DeviceLightEvent.bg-DeviceLightEvent.border-bottom
    $.ajax({
      type:"get",
      //dataType: "JSON",
      /* url: "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=4973fe89374e80a37465d2d1ae8a190883fa3497",*/
      url : "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=fba45fc97b9a4210a5be3abef5d3839aa074cb95",
      success: function(data){
       // console.log(data);
        data.forEach(function(marker) {
          // create a DOM element for the marker
          var el = document.createElement('div');
         
          el.id = 'marker';
         
          var popup = new mapboxgl.Popup({ anchor: "right",   })
         
          .setHTML(`${marker.address} <p> ${marker.bike_stands}  vélo(s) disponibles </p>  <p> Etat :${marker.status} </p> 
          <p>${marker.number}</p>
          <form id="#formreservation" onSubmit="formSubmitPopup(event, ${marker.number},${marker.bike_stands},${marker.available_bike_stands})"method="POST">
          <input id="btn-valid" type="submit" value="RESERVER"> </input>
         </form>  `) 

     /*    if(marker.bike_stands === 0  && marker.status === CLOSE){
           console.alert(btn-valid + "Station indisponible");
         }*/
          
          
        
          // el.addEventListener('click', function() {
            // window.alert(marker.properties.message);
            // });
            // make a marker for each feature and add to the map
           
            
                    // add marker to map
                    new mapboxgl.Marker(el)
                        .setLngLat(marker.position)
                        
                        .setPopup(popup)
                        .addTo(map);
                  
                  
                  
                  
                      });
                    if(data.error){
                        console.log("Erreur de connexion");
                    }else{
                        // Afficher la map
                        $("#map").show();
                    }
                },
                error: function(data){
                    console.error();
                }
            })
        
    
 //

function formSubmitPopup(event, id_station, bike_stands, available_bike_stands){
  event.preventDefault();
 

  console.log(id_station)
  console.log (user.id)
  console.log (available_bike_stands)

// Ajax request
var user_id = user.id;
var data = {
  id_station ,
  user_id,
  bike_stands,
  available_bike_stands};
 
  
  console.log(data);
$.ajax({
  type: "POST",
  //url: "../api/index.php",
   url: `${urlAPI}/index.php `,
   data,
   success : function (response){
   // data.forEach(function()
   
   if(response == 'ko'){
    alert('plus de velos');
    $('#markers').html('station vide!');
    $('.mapboxgl-popup-content').css('background-color', 'red');
}else{
    data.available_bike_stands = parseInt(response);
    console.log(data);
    $('#markers').html(data.available_bike_stands+'/'+data.bike_stands);
    $('#formreservation').attr('onsubmit', 'formSubmitPopup(event, '+ data.id_station +', '+ data.bike_stands +', '+ data.available_bike_stands +');');
    console.log('test'+data.available_bike_stands);
}


},
})
}



$(document).ready(function() {

    new WOW().init();
    var scrollLink = $(".scroll");
    scrollLink.click(function(e) {
      e.preventDefault();
      $("body,html").animate(
        {
          scrollTop: $(this.hash).offset().top
        },
        50
      );
    });
    $('#loading').delay(2000).animate({opacity:0}, 1000, function(){
        $(this).hide();
    });
     });
   





