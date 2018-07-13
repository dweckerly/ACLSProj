<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Codemate</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="../../css/materialize.min.css" media="screen,projection" />
    <script src="../../scripts/jquery.js"></script>
</head>

<body>
    <div class="navbar-fixed">
        <nav>
            <div id="logo-wrapper" class="nav-wrapper">
                <a id="nav-content" class="brand-logo center" href="../../">codemate</a>
            </div>
        </nav>
    </div>
    <h3 class="header red-text text-lighten-2">Procedures</h3>
    <div class="row">
        <form class="col s12" method="POST" action="updateProc.php">
            <div class="row">
                <div class="input-field col s12">
<?php
$id = $_POST['id'];
$sql = "SELECT * FROM procedures WHERE dataTag = '$id'";
include_once("../../includes/db.php");
$q = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($q);
?>
                    <input value="<?php echo $row['name']; ?>" id="proc-name" type="text" class="validate" name="proc-name">
                    <label for="proc-name">Name</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input  value="<?php echo $row['details']; ?>" id="proc-details" type="text" class="validate" name="proc-details">
                    <label for="proc-details">Details</label>
                </div>
            </div>
            <div class="row">
                <div class="col s12">
                    Frequency:
                    <div class="input-field inline">
<?php
$tag = $row['dataTag'];
$sql = "SELECT * FROM timers WHERE dataTag = '$tag'";
$q = mysqli_query($conn, $sql);
if(mysqli_num_rows($q) > 0) {
    $val = mysqli_fetch_assoc($q);
?>
                        <div class="input-field col s6">
                            <input value="<?php echo $val['alertMin']; ?>" id="proc-alert-min" type="text" class="validate" name="proc-alert-min">
                            <label for="proc-alert-min">Minutes</label>
                            <span class="helper-text">Delete to remove timer.</span>
                        </div>
                        <div class="input-field col s6">
                            <input value="<?php echo $val['alertSec']; ?>" id="proc-alert-sec" type="text" class="validate" name="proc-alert-sec">
                            <label for="proc-alert-sec">Seconds</label>
                            <span class="helper-text">Delete to remove timer.</span>
                        </div>
<?php
} else {
?>
                        <div class="input-field col s6">
                            <input id="proc-alert-min" type="text" class="validate" name="proc-alert-min">
                            <label for="proc-alert-min">Minutes</label>
                            <span class="helper-text">Leave blank if no timer needed.</span>
                        </div>
                        <div class="input-field col s6">
                            <input id="proc-alert-sec" type="text" class="validate" name="proc-alert-sec">
                            <label for="proc-alert-sec">Seconds</label>
                            <span class="helper-text">Leave blank if no timer needed.</span>
                        </div>

<?php
}
?>
                    </div>
                </div>
            </div>
            <button class="waves-effect waves-light btn" type="submit">Submit</button>
        </form>
    </div>
    <script type="text/javascript" src="../../js/materialize.min.js"></script>
</body>

</html>