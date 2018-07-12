<?php
include_once("../../includes/db.php");
$tag = $_POST['tag'];
$sql = "SELECT * FROM timers WHERE dataTag = '$tag'";
$q = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($q);

?>
<div class="col s6">
    <div id="<?php echo $row['dataTag']; ?>-timer-card" class="card text-center timer-card">
        <span class="card-title activator reveal-icon"><a class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">info_outline</i></a></span>
        <div id="<?php echo $row['dataTag']; ?>-timer-div" data="<?php echo $row['dataTag']; ?>">
            <div class="card-content center">
                <h4 class="timer"><span id="<?php echo $row['dataTag']; ?>-minutes">00</span>:<span id="<?php echo $row['dataTag']; ?>-seconds">00</span></h4>
            </div>
            <div class="card-action center" id="<?php echo $row['dataTag']; ?>-timer">
                <span class="flow-text truncate timer-name"><?php echo $row['name'];?></span>
            </div>
        </div>
        <a data="<?php echo $row['dataTag']; ?>" id="<?php echo $row['dataTag']; ?>-timer-restart" class="btn-floating halfway-fab waves-effect waves light"><i class="material-icons">refresh</i></a>
        <div class="card-reveal">
            <span class="grey-text card-title text-darken-4"><i class="material-icons right">close</i></span>
<?php
    if($row['type'] == 'medication') {
        $data = $row['dataTag'];
        $sql = "SELECT * FROM medications WHERE dataTag = '$data'";
        $q = mysqli_query($conn, $sql);
        $val = mysqli_fetch_assoc($q);
?>
            <p><?php echo $val['name']; ?></p>
            <p><?php echo $val['doseAmount'] . " " . $val['doseUnit']; ?>, <?php echo $val['route']; ?></p>
            <p id="<?php echo $row['dataTag']; ?>-count">1</p>
<?php
    } else {
        $data = $row['dataTag'];
        $sql = "SELECT * FROM procedures WHERE dataTag = '$data'";
        $q = mysqli_query($conn, $sql);
        $val = mysqli_fetch_assoc($q);
?>
            <p><?php echo $val['name']; ?></p>
            <p>Details: <?php echo $val['details'];?></p>
<?php
    }
?>
        </div>
    </div>
</div>
<script>
    timers["<?php echo $row['dataTag']; ?>"] = {
        'id':'<?php echo $row['dataTag']; ?>',
        'name': '<?php echo $row['name'];?>',
        'min' : 0,
        'sec' : 0,
        'startTime' : timeNow(),
        'interval' : null,
        'running' : true,
        'count' : 1,
        'alert' : {
            'min' : <?php echo $row['alertMin']; ?>,
            'sec' : <?php echo $row['alertSec']; ?>
        }
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
    
    callToast('<?php echo $row['name']; ?>');
    startTimer(timers["<?php echo $row['dataTag']; ?>"]);
</script>