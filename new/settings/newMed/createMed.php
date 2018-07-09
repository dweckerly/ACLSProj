<?php
$name = $_POST['name'];
$dose = $_POST['dose'];
$min = $_POST['min'];
$sec = $_POST['sec'];
$route = $_POST['route'];

$tag = substr(strtolower($name), 3) . time();
$timer = true;
if($min == "") {
    if($sec == "") {
        $freq = "";
        $timer = false;
    } else {
        $min = 0;
        $freq = $sec . "-sec";
    }
} else {
    if($sec == "") {
        $sec = 0;
        $freq = $min . "-min";
    } else {
        $freq = $min . "-min-" . $sec . "-sec";
    }
}

include_once("../../includes/db.php");
$sql = "INSERT INTO medications (name, dataTag, dose, frequency, route) VALUES ('$name', '$tag', '$dose', '$freq', '$route')";
mysqli_query($conn, $sql);

$sql = "SELECT id FROM medications WHERE dataTag = '$tag'";
$q = mysqli_query($conn, $sql);
$val = mysqli_fetch_assoc($q);
$id = $val['id'];
$sql = "INSERT INTO alerts (name, type, mid, dataTag) VALUES ('$name', 'medication', '$id', '$tag')";
mysqli_query($conn, $sql);


if($timer) {
    $sql = "SELECT id from alerts WHERE name = '$name' AND mid = '$id' AND type = 'medication'";
    $q = mysqli_query($conn, $sql);
    $val = mysqli_fetch_assoc($q);
    $aid = $val['id'];
    $sql = "INSERT INTO timers (name, alertMin, alertSec, dataTag, type, mid, aid) VALUES ('$name', '$min', '$sec', '$tag', 'medication', '$id', '$aid')";
    mysqli_query($conn, $sql);
}

mysqli_close();
header('Location: /settings');