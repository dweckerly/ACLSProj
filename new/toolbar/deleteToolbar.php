<?php
$id = $_POST['id'];
include_once("../../includes/db.php");
$sql = "DELETE FROM toolbarButtons WHERE data='$id";
mysqli_query($conn, $sql);

mysqli_close();
header('Location: /');