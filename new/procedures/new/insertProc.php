<?php
$name = $_POST['proc-name'];
$details = $_POST['proc-details'];
$min = $_POST['proc-alert-min'];
$sec = $_POST['proc-alert-sec'];

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
$sql = "INSERT INTO procedures (name, details, dataTag) VALUES ('$name', '$details', '$tag')";
mysqli_query($conn, $sql);

if($timer) {
    $sql = "INSERT INTO timers (name, alertMin, alertSec, dataTag, type) VALUES ('$name', '$min', '$sec', '$tag', 'procedure')";
    mysqli_query($conn, $sql);
}

mysqli_close();
header('Location: ../');
