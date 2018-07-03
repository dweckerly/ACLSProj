<?php
include_once("../includes/db.php");
$id = $_POST['id'];
$sql = "SELECT * FROM medications WHERE id = '$id'";
$q = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($q);

?>
<div class="col-lg-3 col-md-4 col-6" >
    <div id="<?php echo $row['dataTag']; ?>-timer-div" class="card text-center timer-card" >
        <div class="timer-card" id="<?php echo $row['dataTag']; ?>-timer-btn" data="<?php echo $row['dataTag']; ?>">
            <div class="card-title">
                <?php echo $row['name'];?>
            </div>
            <div class="card-text" id="<?php echo $row['dataTag']; ?>-timer">
                <h2 class="timer"><span id="<?php echo $row['dataTag']; ?>-timer-minutes">00</span>:<span id="<?php echo $row['dataTag']; ?>-timer-seconds">00</span></h2>
            </div>
            <div class="card-body">
                <a data="<?php echo $row['dataTag']; ?>" id="<?php echo $row['dataTag']; ?>-timer-restart" class="btn btn-primary btn-lg text-white restart-timer"><i class="fas fa-sync"></i></a>
            </div>
        </div>
    </button>
</div>
<script>
    timers.<?php echo $row['dataTag']; ?> = {
        'id':'<?php echo $row['dataTag']; ?>-timer',
        'min' : 0,
        'sec' : 0,
        'startTime' : timeNow(),
        'interval' : null,
        'running' : true,
        'count' : 1
    }

    $('#<?php echo $row['dataTag']; ?>-timer-restart').click(function () {
        event.stopPropagation();
        restartTimer(timers.<?php echo $row['dataTag']; ?>);
        $('#<?php echo $row['dataTag']; ?>-timer-div').removeClass('pulse');
    });
</script>