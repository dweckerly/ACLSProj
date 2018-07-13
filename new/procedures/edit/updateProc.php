<?php
$name = $_POST['proc-name'];
$details = $_POST['proc-details'];
$tag = $_POST['tag'];
$min = $_POST['proc-alert-min'];
$sec = $_POST['proc-alert-sec'];

include_once("../../includes/db.php");
$sql = "UPDATE procedures SET name='$name', details='$details' WHERE dataTag='$tag'";
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