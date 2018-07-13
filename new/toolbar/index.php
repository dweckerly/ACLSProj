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
    <h3 class="header red-text text-lighten-2">Quickbar buttons</h3>
    <a id="proc-create-btn" class="waves-effect waves-light btn right" href="new">Create New</a>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Target</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
<?php
include_once("../includes/db.php");
$sql = "SELECT * FROM toolbarButtons";
$q = mysqli_query($conn, $sql);
while($row = mysqli_fetch_assoc($q)) {
    $tag = $row['data'];
    $sql = "SELECT * from medications WHERE dataTag = '$tag'";
    $q = mysqli_query($conn, $sql);
    if(mysqli_num_rows($q) > 0) {
        $type = 'Medication';
        $val = mysqli_fetch_assoc($q);
        $target = $val['name'];
    } else {
        $sql = "SELECT * from procedures WHERE dataTag = '$tag'";
        $q = mysqli_query($conn, $sql);
        if(mysqli_num_rows($q) > 0) {
            $type = 'Procedure';
            $val = mysqli_fetch_assoc($q);
            $target = $val['name'];
        }
    }
?>
            <tr>
                <td><?php echo $row['name']; ?></td>
                <td><?php echo $type;?></td>
                <td><?php echo $target; ?></td>
                <td><form method="POST" action="deleteToolbar.php"><input style="display:none;" name="id" value="<?php echo $tag; ?>"/><button class="btn-floating btn-small waves-effect waves-light red" type="submit"><i class="material-icons">delete</i></button></form></td>
            </tr>
<?php
}
?>
        </tbody>
    </table>
    <script type="text/javascript" src="../js/materialize.min.js"></script>
</body>
</html>