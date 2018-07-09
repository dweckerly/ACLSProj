<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Codemate</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
</head>
<body>
    <ul class="nav nav-tabs" id="settings-tabs" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="meds-tab" data-toggle="tab" href="#medications" role="tab" aria-controls="medications" aria-selected="true">Medications</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="procs-tab" data-toggle="tab" href="#procedures" role="tab" aria-controls="procedures" aria-selected="false">Procedures</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="timers-tab" data-toggle="tab" href="#timers" role="tab" aria-controls="timers" aria-selected="false">Timers</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="tools-tab" data-toggle="tab" href="#tools" role="tab" aria-controls="tools" aria-selected="false">Toolbar</a>
        </li>
    </ul>
    <div class="tab-content" id="settings-tab-content">
        <div class="tab-pane fade show active" id="medications" role="tabpanel" aria-labelledby="meds-tab">
            <div class="container" style="padding-top:40px;">
                <a class="btn btn-outline-primary" id="new-med-btn" href="newMed">Create Medication</a>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Dose</th>
                            <th scope="col">Frequency</th>
                            <th scope="col">Route</th>
                            <th scope="col">Functions</th>
                        </tr>
                    </thead>
                    <tbody>
<?php
include_once("../includes/db.php");
$sql = "SELECT * FROM medications";
$q = mysqli_query($conn, $sql);
while($meds = mysqli_fetch_assoc($q)) {
?>
                        <tr>
                            <td><?php echo $meds['name']; ?></td>
                            <td><?php echo $meds['dose']; ?></td>
                            <td><?php echo $meds['frequency']; ?></td>
                            <td><?php echo $meds['route']; ?></td>
                            <td>
                                <button data="<?php echo $meds['id']; ?>" class="btn btn-outline-secondary edit-med-btn">Edit</button>
                                <button data="<?php echo $meds['id']; ?>" class="btn btn-outline-danger delete-med-btn">Delete</button>
                            </td>
                        </tr>

<?php
}
?>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="tab-pane fade" id="procedures" role="tabpanel" aria-labelledby="procs-tab">
            <div class="container" style="padding-top:40px;">
                <a class="btn btn-outline-primary" id="new-proc-btn" href="newProc">Create Procedure</a>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Details</th>
                            <th scope="col">Functions</th>
                        </tr>
                    </thead>
                    <tbody>
<?php
$sql = "SELECT * FROM procedures";
$q = mysqli_query($conn, $sql);
while($procs = mysqli_fetch_assoc($q)) {
?>
                        <tr>
                            <td><?php echo $procs['name']; ?></td>
                            <td><?php echo $procs['details']; ?></td>
                            <td>
                                <button data="<?php echo $procs['id']; ?>" class="btn btn-outline-secondary edit-proc-btn">Edit</button>
                                <button data="<?php echo $procs['id']; ?>" class="btn btn-outline-danger delete-proc-btn">Delete</button>
                            </td>
                        </tr>
<?php
}
?>              
                    </tbody>
                </table>
            </div>
        </div>
        <div class="tab-pane fade" id="timers" role="tabpanel" aria-labelledby="timers-tab">
            <div class="container" style="padding-top:40px;">
                <button class="btn btn-outline-primary" id="new-timer-btn">Create Timer</button>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Alert</th>
                            <th scope="col">Type</th>
                            <th scope="col">Functions</th>
                        </tr>
                    </thead>
                    <tbody>
<?php
$sql = "SELECT * FROM timers";
$q = mysqli_query($conn, $sql);
while($timers = mysqli_fetch_assoc($q)) {
?>
                        <tr>
                            <td><?php echo $timers['name']; ?></td>
                            <td><?php echo $timers['alertMin'] . " min " . $timers['alertSec'] . " sec"; ?></td>
                            <td><?php echo $timers['type'];?></td>
                            <td>
                                <button data="<?php echo $timers['id']; ?>" class="btn btn-outline-secondary edit-timer-btn">Edit</button>
                                <button data="<?php echo $timers['id']; ?>" class="btn btn-outline-danger delete-timer-btn">Delete</button>
                            </td>
                        </tr>
<?php
}
?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script src="../scripts/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
</body>
</html>