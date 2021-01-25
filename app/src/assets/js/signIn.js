$("#formSignIn").on("submit", function (event){
    event.preventDefault(); //empecher que le page se recharge 
    const serializeFormSignIn = $(this).serialize();
    console.log(serializeFormSignIn);
   
    

    $.ajax({
        type: "POST",
        //url: "../api/index.php",
         url: `${urlAPI}/checkSignIn.php `,
         data : serializeFormSignIn,
         success : function (data){
           console.log(data);
           data = JSON.parse(data);
           console.log(data);
           if(data.username){
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