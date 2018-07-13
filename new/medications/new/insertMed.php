<?php
$name = $_POST['med-name'];
$doseAmount = $_POST['med-dose-amount'];
$doseUnit = $_POST['med-dose-unit'];
$route = $_POST['med-route'];
$min = $_POST['med-alert-min'];
$sec = $_POST['med-alert-sec'];

$tag = substr(strtolower($name), 3) . time();
$timer = true;
if($min == "") {
    if($sec == "") {
        $timer = false;
    } else {
        $min = 0;
    }
} else {
    if($sec == "") {
        $sec = 0;
    }
}

include_once("../../includes/db.php");
$sql = "INSERT INTO medications (name, dataTag, doseAmount, doseUnit, route) VALUES ('$name', '$tag', '$doseAmount', '$doseUnit', '$route')";
mysqli_query($conn, $sql);

if($timer) {
    $sql = "INSERT INTO timers (name, alertMin, alertSec, dataTag, type) VALUES ('$name', '$min', '$sec', '$tag', 'medication')";
    mysqli_query($conn, $sql);
}

mysqli_close();
header('Location: ../');
