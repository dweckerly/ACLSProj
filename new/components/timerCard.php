<?php
include_once("../../includes/db.php");
$tag = $_POST['tag'];
$sql = "SELECT * FROM timers WHERE dataTag = '$tag'";
$q = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($q);

?>
<div class="col s6" >
    <div id="<?php echo $row['dataTag']; ?>-timer-div" class="card horizontal small text-center timer-card" data="<?php echo $row['dataTag']; ?>">
        <div class="card-stacked" id="<?php echo $row['dataTag']; ?>-timer-btn">
            <div class="card-content">
                <span class="card-title"><?php echo $row['name'];?></span>
                <a data="<?php echo $row['dataTag']; ?>" data-alert="<?php echo $row['aid']; ?>" id="<?php echo $row['dataTag']; ?>-timer-restart" class="btn-floating halfway-fab waves-effect waves light"><i class="fas fa-sync"></i></a>
            </div>
            <div class="card-action" id="<?php echo $row['dataTag']; ?>-timer">
                <h4 class="timer"><span id="<?php echo $row['dataTag']; ?>-minutes">00</span>:<span id="<?php echo $row['dataTag']; ?>-seconds">00</span></h4>
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
        restartTimer(timers[id], id);
    });

    startTimer(timers["<?php echo $row['dataTag']; ?>"]);
</script>