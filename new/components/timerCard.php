<?php
include_once("../includes/db.php");
$id = $_POST['id'];
$sql = "SELECT * FROM timers WHERE id = '$id'";
$q = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($q);

?>
<div class="col-lg-3 col-md-4 col-6" >
    <div id="<?php echo $row['dataTag']; ?>-timer-div" class="card text-center timer-card" data="<?php echo $row['dataTag']; ?>">
        <div id="<?php echo $row['dataTag']; ?>-timer-btn">
            <div class="card-title">
                <?php echo $row['name'];?>
            </div>
            <div class="card-text" id="<?php echo $row['dataTag']; ?>-timer">
                <h2 class="timer"><span id="<?php echo $row['dataTag']; ?>-minutes">00</span>:<span id="<?php echo $row['dataTag']; ?>-seconds">00</span></h2>
            </div>
            <div class="card-body">
                <a data="<?php echo $row['dataTag']; ?>" data-alert="<?php echo $row['aid']; ?>" id="<?php echo $row['dataTag']; ?>-timer-restart" class="btn btn-primary btn-lg text-white restart-timer"><i class="fas fa-sync"></i></a>
            </div>
        </div>
    </button>
</div>
<script>
    timers["<?php echo $row['dataTag']; ?>"] = {
        'id':'<?php echo $row['dataTag']; ?>',
        'min' : 0,
        'sec' : 0,
        'startTime' : timeNow(),
        'interval' : null,
        'running' : true,
        'count' : 1,
        'alert' : {
            'min' : <?php echo $row['alertMin']; ?>,
            'sec' : <?php echo $row['alertSec']; ?>
        },
        'aid' : <?php echo $row['aid']; ?>
    }
    
    $('#<?php echo $row['dataTag']; ?>-timer-div').click(function () {
        var id = $(this).attr('data');
        clickTimer(timers[id]);
    });

    $('#<?php echo $row['dataTag']; ?>-timer-restart').click(function () {
        event.stopPropagation();
        var id = $(this).attr('data');
        restartTimer(timers[id]);
    });

    startTimer(timers["<?php echo $row['dataTag']; ?>"]);
</script>