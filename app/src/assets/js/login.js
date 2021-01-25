mapboxgl.accessToken = 'pk.eyJ1IjoicGF1bDE0IiwiYSI6ImNqc2FhbWh4MDFqYXozenM4dGIyeWtqMnEifQ.RmJ-AsYHLvzQYC1ZJFjb_Q';
    
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [4.835659, 45.764043],
      zoom: 11.15,
    });
    
    var urlAPI = "http://localhost/velo-city2/api"
    
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
         
          var popup = new mapboxgl.Popup({ offset: 25 })
         
          .setHTML(`${marker.address} <p> ${marker.bike_stands}  vélo(s) disponibles </p>  <p> Etat :${marker.status} </p>
          <form onSubmit="formSubmitPopup(event)"method="POST">
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



$("#formLogin").on("submit", function (event){
    event.preventDefault(); //empecher que le page se recharge 
    const serializeFormLogin = $(this).serialize();
    console.log(serializeFormLogin);
   
    

    $.ajax({
        type: "POST",
        //url: "../api/index.php",
         url: `${urlAPI}/checkUser.php`,
         data : serializeFormLogin,
         success : function (data){
         data = JSON.parse(data);
          
          user = data;



           if(user){
               $("#formLogin").hide();
               $("#formSignIn").hide();
               $("body").css("margin-top", "-5%");
               
               $("#map").css("visibility", "visible");
               $("#wrapper").css("visibility", "visible");
              var mapDiv = $("#map");
              

              mapDiv.css("width" , "80%");
             
              map.resize();
           }
         }
      })
      
      

})