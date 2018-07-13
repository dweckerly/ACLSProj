<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Codemate</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="../css/materialize.min.css"  media="screen,projection"/>
    <script src="../scripts/jquery.js"></script>
</head>
<body>
    <div class="navbar-fixed">
        <nav>
            <div id="logo-wrapper" class="nav-wrapper">
                <a id="nav-content" class="brand-logo center" href="../">codemate</a>
            </div>
        </nav>
    </div>
    <h3 class="header red-text text-lighten-2">Medications</h3>
    <a id="med-create-btn" class="waves-effect waves-light btn right" href="new">Create New</a>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Dose</th>
                <th>Route</th>
                <th>Alert</th>
                <th>Edit</th>
            </tr>
        </thead>
        <tbody>
<?php
include_once("../includes/db.php");
$sql = "SELECT * FROM medications";
$q = mysqli_query($conn, $sql);
while($row = mysqli_fetch_assoc($q)) {
    $tag = $row['dataTag'];
    $sql = "SELECT * from timers WHERE dataTag = '$tag'";
    $query = mysqli_query($conn, $sql);
    if(mysqli_num_rows($query) > 0) {
        $val = mysqli_fetch_assoc($query);
        $alert = $val['alertMin'] . " min - " . $val['alertSec'] . " sec";
    } else {
        $alert = "none";
    }
?>
            <tr>
                <td><?php echo $row['name']; ?></td>
                <td><?php echo $row['doseAmount'] . " " . $row['doseUnit']; ?></td>
                <td><?php echo $row['route']; ?></td>
                <td><?php echo $alert; ?></td>
                <td><form method="POST" action="edit/index.php"><input style="display:none;" name="id" value="<?php echo $row['dataTag']; ?>"/><button class="btn-floating btn-small waves-effect waves-light red" type="submit"><i class="material-icons">edit</i></button></form></td>
            </tr>
<?php
}
?>
        </tbody>
    </table>
    <script type="text/javascript" src="../js/materialize.min.js"></script>
</body>
</html>