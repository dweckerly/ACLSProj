<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Codemate</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="../../css/materialize.min.css"  media="screen,projection"/>
    <script src="../../scripts/jquery.js"></script>
</head>
<body>
    <div class="navbar-fixed">
        <nav>
            <div id="logo-wrapper" class="nav-wrapper">
                <a id="nav-content" class="brand-logo center" href="../">codemate</a>
            </div>
        </nav>
    </div>
    <h3 class="header red-text text-lighten-2">Quickbar buttons</h3>
    <div class="section">
        <h5>Medications</h5>
            <table>
                <tbody>

                
<?php
include_once("../../includes/db.php");
$sql = "SELECT * FROM medications";
$q = mysqli_query($conn, $sql);
$found = false;
while($row = mysqli_fetch_assoc($q)) {
    $tag = $row['dataTag'];
    $sql = "SELECT * FROM toolbarButtons WHERE data = '$tag'";
    $q = mysqli_query($conn, $sql);
    if(mysqli_num_rows($q) > 0) {
        $found = true;
    } else {
?>
            <tr>
                <td><?php echo $row['name'];?></td>
                <td><?php echo $row['doseAmount'] . " " . $row['doseUnit'] . " - " . $row['route']; ?></td>
                <td><a class="btn-floating btn-small waves-effect waves-light"><i class="material-icons">control_point</i></a></td>
            </tr>
<?php
    }
    if(!$found) {
?>
            <tr>
                <td>All medications have Quickbar Buttons</td>
            </tr>
<?php
    }
}
?>  
            </tbody>
        </table>
    </div>
    <div class="section">
        <h5>Procedures</h5>
        <table>
            <tbody>

                
<?php
include_once("../../includes/db.php");
$sql = "SELECT * FROM procedures";
$q = mysqli_query($conn, $sql);
$found = false;
while($row = mysqli_fetch_assoc($q)) {
    $tag = $row['dataTag'];
    $sql = "SELECT * FROM toolbarButtons WHERE data = '$tag'";
    $q = mysqli_query($conn, $sql);
    if(mysqli_num_rows($q) > 0) {
        $found = true;
    } else {
?>
            <tr>
                <td><?php echo $row['name'];?></td>
                <td><?php echo $row['details']; ?></td>
                <td><a class="btn-floating btn-small waves-effect waves-light"><i class="material-icons">control_point</i></a></td>
            </tr>
<?php
    }
    if(!$found) {
?>
            <tr>
                <td>All procedures have Quickbar Buttons</td>
            </tr>
<?php
    }
}
?>  
            </tbody>
        </table>
    </div>
    <script type="text/javascript" src="../../js/materialize.min.js"></script>
</body>
</html>