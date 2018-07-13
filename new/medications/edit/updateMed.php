<?php
$name = $_POST['med-name'];
$doseAmount = $_POST['med-dose-amount'];
$doseUnit = $_POST['med-dose-unit'];
$tag = $_POST['tag'];
$route = $_POST['med-route'];
$min = $_POST['med-alert-min'];
$sec = $_POST['med-alert-sec'];

include_once("../../includes/db.php");
$sql = "UPDATE medications SET name='$name', doseAmount='$doseAmount', doseUnit='$doseUnit', route='$route' WHERE dataTag='$tag'";
mysqli_query($conn, $sql);

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

if($timer) {
    $sql = "UPDATE timers SET alertMin='$min', alertSec='$sec' WHERE dataTag='$tag'";
    mysqli_query($conn, $sql);
} else {
    $sql = "DELETE FROM timers WHERE dataTag='$tag'";
    mysqli_query($conn, $sql);
}

mysqli_close();
header('Location: ../');