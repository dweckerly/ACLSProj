<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Codemate</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>
    <link type="text/css" rel="stylesheet" href="main.css"/>
    <script src="scripts/jquery.js"></script>
    <script src="scripts/functions.js"></script>
</head>
<body>
    <div class="navbar-fixed">
        <nav>
            <div class="nav-wrapper">
                <a id="nav-content" class="brand-logo center">codemate</a>
            </div>
        </nav>
    </div>
    <div id="options-container" class="center" style="display:none; margin:15px;">
        <a id="medications-btn" data-target="medication-modal" class="waves-effect waves-light btn modal-trigger">Medications</a>
        <a id="procedures-btn" data-target="procedure-modal" class="waves-effect waves-light btn modal-trigger">Procedures</a>
    </div>
    <div id="toolbar-container" class="center" style="display:none;">
<?php
include_once("includes/db.php");
$sql = "SELECT * FROM toolbarButtons";
$q = mysqli_query($conn, $sql);
while($row = mysqli_fetch_assoc($q)) {
    $data = $row['data'];
    if($row['type'] == "timer") {
        $sql = "SELECT dataTag from timers WHERE id = '$data'";
    } else if($row['type'] == "alert") {
        $sql = "SELECT dataTag from alerts WHERE id = '$data'";
    }
    $query = mysqli_query($conn, $sql);
    $t = mysqli_fetch_assoc($query);
    $tag = $t['dataTag'];
    
?>
        <button data="<?php echo $row['data'];?>" data-type="<?php echo $row['type'];?>" data-tag="<?php echo $tag;?>" class="btn grey toolbar-btn"><?php echo $row['name'];?></button>
<?php
}
?>
            </div>
            <script src="scripts/toolbar.js"></script>
        </div>
    </div>
    <div id="timer-container" class="row container"></div>
    <div id="modal-container">
<?php
include_once("components/medModal.php");
include_once("components/procModal.php");
?>       
    </div>
    <div id="start-container" class="center" style="margin-top:80px;">
        <button id="start-btn" class="waves-effect waves-light btn-large pulse red lighten-2 valign">Start Code</button>
    </div>

    <div id="timer-container" class="container"></div>

    <div id="edit-menu" class="fixed-action-btn">
        <a class="btn-floating btn-large"><i class="large material-icons">edit</i></a>
        <ul>
            <li><a class="btn-floating red tooltipped" data-position="top" data-tooltip="Medications"><i class="material-icons">local_pharmacy</i></a></li>
            <li><a class="btn-floating blue tooltipped" data-position="top" data-tooltip="Procedures"><i class="material-icons">healing</i></a></li>
            <li><a class="btn-floating green tooltipped" data-position="top" data-tooltip="Quickbar"><i class="material-icons">add_box</i></a></li>
        </ul>
    </div>
      
    <script type="text/javascript" src="js/materialize.min.js"></script>
    <script  type="text/javascript" src="main.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.fixed-action-btn');
            var instances = M.FloatingActionButton.init(elems, {
                direction: 'left',
                hoverEnabled: false
            });
        });
        $(document).ready(function(){
            $('.tooltipped').tooltip();
        });
    </script>
</body>
</html>