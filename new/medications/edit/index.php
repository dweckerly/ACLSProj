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
    <h3 class="header red-text text-lighten-2">Medications</h3>
    <div class="row">
        <form class="col s12" method="POST" action="updateMed.php">
            <div class="row">
                <div class="input-field col s12">
<?php
$id = $_POST['id'];
$sql = "SELECT * FROM medications WHERE dataTag = '$id'";
include_once("../../includes/db.php");
$q = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($q);
?>
                    <input value="<?php echo $row['name']; ?>" name="med-name" id="med-name" type="text" class="validate">
                    <label for="med-name">Name</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input value="<?php echo $row['doseAmount']; ?>" name="med-dose-amount" id="med-dose-amount" type="text" class="validate">
                    <label for="med-dose-amount">Dose Amount</label>
                </div>
                <div class="input-field col s6">
                    <input value="<?php echo $row['doseUnit']; ?>" name="med-dose-unit" id="med-dose-unit" type="text" class="validate">
                    <label for="med-dose-unit">Dose Unit</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input value="<?php echo $row['route']; ?>" name="med-route" id="med-route" type="text" class="validate">
                    <label for="med-route">Route</label>
                </div>
            </div>

            <div class="row">
                <div class="col s12">
                    Frequency:
                    <div class="input-field inline">
                        <div class="input-field col s6">
<?php
$tag = $row['dataTag'];
$sql = "SELECT * FROM timers WHERE dataTag = '$tag'";
$q = mysqli_query($conn, $sql);
if(mysqli_num_rows($q) > 0) {
    $val = mysqli_fetch_assoc($q);
?>
                            <input value="<?php echo $val['alertMin']; ?>" name="med-alert-min" id="med-alert-min" type="text" class="validate">
                            <label for="med-alert-min">Minutes</label>
                            <span class="helper-text">Delete to remove timer.</span>
                        </div>
                        <div class="input-field col s6">
                            <input value="<?php echo $val['alertSec']; ?>" name="med-alert-sec" id="med-alert-sec" type="text" class="validate">
                            <label for="med-alert-sec">Seconds</label>
                            <span class="helper-text">Delete to remove timer.</span>
<?php
} else {
?>
                            <input id="med-alert-min" type="text" class="validate">
                            <label for="med-alert-min">Minutes</label>
                            <span class="helper-text">Add value if timer needed.</span>
                        </div>
                        <div class="input-field col s6">
                            <input id="med-alert-sec" type="text" class="validate">
                            <label for="med-alert-sec">Seconds</label>
                            <span class="helper-text">Add value if timer needed.</span>
<?php
}
?>
                        </div>
                    </div>
                </div>
            </div>
            <input name="tag" value="<?php echo $tag; ?>" style="display:none;" />
            <button class="waves-effect waves-light btn" type="submit">Update</button>
        </form>


        <script type="text/javascript" src="../../js/materialize.min.js"></script>
        <script type="text/javascript" src="../med.js"></script>
</body>

</html>