<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
try {
    $database = new PDO('mysql:host=localhost;dbname=social_media_dashboard', 'root', '');
}
catch(Exception $e) {
    die('Erreur : ' . $e->getMessage());
}

$result = $database->query("SELECT * FROM followercountgeneral");
$phparray = $result->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($phparray, JSON_PRETTY_PRINT);
echo $json;
?>