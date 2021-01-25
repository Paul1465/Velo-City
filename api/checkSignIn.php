<?php 
header ('Access-Control-Allow-Origin: *');
//require ('database-connect.php');

$user = [];


// Create database in phpMy admin with user table (id, username, password)
$db = new PDO ("mysql:host=localhost;dbname=velo-city", "root", "");
// Connect to database


$q = $db->prepare("INSERT INTO users (username, password) VALUES (:username,:password)");
$q->bindParam(":username", $_POST ["username"]);
$q->bindParam(":password", $_POST ["password"]);
$q->execute();



//md5()

$data = $q->fetch(PDO::FETCH_ASSOC);




if ($data) {
    echo json_encode($data);

}else{
    echo json_encode ( [] );
}
print_r($data);

