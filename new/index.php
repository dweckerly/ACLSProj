<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Codemate</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
    <script src="scripts/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
    <script src="scripts/functions.js"></script>
</head>
<body class="bg-light">
    <div id="title-div">
        <h2 id="title">codemate</h2>
        <div id="main-timer" class="animate-flicker">
            <h2 class="timer"><span id="main-minutes">00</span>:<span id="main-seconds">00</span></h2>
        </div>
    </div>
    <div id="select-container" class="row justify-content-center" style="padding-top:10px; padding-bottom:10px;">
        <div class="col-lg-6 col-8">
            <button class="btn btn-lg" id="medications-btn">Medications</button>
            <button class="btn btn-lg" id="procedures-btn">Procedures</button>
        </div>
    </div>
    <div align="center">
        <div class="text-center card" id="toolbar">
            <div class="card-body" id="toolbar-btn-container">
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
                <button data="<?php echo $row['data'];?>" data-type="<?php echo $row['type'];?>" data-tag="<?php echo $tag;?>" class="btn btn-outline-secondary toolbar-btn"><?php echo $row['name'];?></button>
<?php
}
?>
                <button id="end-btn" class="btn btn-danger">END</button>
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
    <div id="start-container" class="row justify-content-center">
        <div id="start-btn-div" class="col-lg-4 col-6">
            <button id="start-btn" class="btn btn-danger btn-block">Start Code</button>
            <a href="/settings/" id="settings-btn" class="btn btn-secondary btn-block text-white">Settings</a>
        </div>
    </div>
    <script src="main.js"></script>
</body>
</html>