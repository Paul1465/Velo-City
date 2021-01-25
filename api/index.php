<?php 
//require ('database-connect.php');

$velos = [];


// Create database in phpMy admin with user table (id, username, password)
$db = new PDO ("mysql:host=localhost;dbname=velo-city", "root", "");
// Connect to database
// fetch user in database with SQL request

$velos = $_POST["available_bike_stands"] - 1;
if ($velos > 0  ){
$q = $db->prepare("INSERT INTO bookings (id_user, id_stations , nb_bikes, bike_stands) VALUES (:id_user :id_stations, :nb_bikes, :bike_stands) ") ;
$q->bindParam(":id_stations", $_POST ["id_stations"]);
$q->bindParam(":nb_bikes", $velos);  //fait bug pourtant reconnue dans l'app
$q->bindParam(":bike_stands", $_POST ["bike_stands"]);
$q->bindParam(":id_user", $_POST ["id_user"]);
$q->execute();


// fetch user in database with SQL request
//$q = $db->prepare("SELECT * FROM users WHERE username = :username AND password = :password");
//$q->bindParam(":username", $_POST ["username"]);
//$q->bindParam(":password", $_POST ["password"]);
//$q->execute();

//md5()

if( $i->execute() ){
    echo $velos;
}else{
    echo "Erreur";
}
}else{
echo 'ko';
}
