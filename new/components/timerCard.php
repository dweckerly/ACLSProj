<?php
include_once("../../includes/db.php");
$tag = $_POST['tag'];
$sql = "SELECT * FROM timers WHERE dataTag = '$tag'";
$q = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($q);

?>
<div class="col s6">
    <div id="<?php echo $row['dataTag']; ?>-timer-card" class="card text-center timer-card">
        <span class="card-title"><a class="btn-floating btn-small waves-effect waves-light red info-btn modal-trigger" data-target="info-modal" data="<?php echo $row['dataTag']; ?>" data-type="<?php echo $row['type']; ?>"><i class="material-icons">info_outline</i></a></span>
        <div id="<?php echo $row['dataTag']; ?>-timer-div" data="<?php echo $row['dataTag']; ?>">
            <div class="card-content center">
                <h4 class="timer"><span id="<?php echo $row['dataTag']; ?>-minutes">00</span>:<span id="<?php echo $row['dataTag']; ?>-seconds">00</span></h4>
            </div>
            <div class="card-action center" id="<?php echo $row['dataTag']; ?>-timer">
                <span class="flow-text truncate timer-name"><?php echo $row['name'];?></span>
            </div>
        </div>
        <a data="<?php echo $row['dataTag']; ?>" id="<?php echo $row['dataTag']; ?>-timer-restart" class="btn-floating halfway-fab waves-effect waves light"><i class="material-icons">refresh</i></a>
<?php
if($row['type'] == 'medication') {
    $data = $row['dataTag'];
    $sql = "SELECT * FROM medications WHERE dataTag = '$data'";
    $q = mysqli_query($conn, $sql);
    $val = mysqli_fetch_assoc($q);
?>
        </div>
    </div>
</div>
<script>
    timers["<?php echo $row['dataTag']; ?>"] = {
        'id':'<?php echo $row['dataTag']; ?>',
        'name': '<?php echo $row['name'];?>',
        'type' : 'medication',
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
        'doseAmount' : <?php echo $val['doseAmount']; ?>,
        'doseUnit': '<?php echo $val['doseUnit']; ?>',
        'route':  '<?php echo $val['route']; ?>'
    }
<?php
} else {
    $data = $row['dataTag'];
    $sql = "SELECT * FROM procedures WHERE dataTag = '$data'";
    $q = mysqli_query($conn, $sql);
    $val = mysqli_fetch_assoc($q);
?>
        </div>
    </div>
</div>
<script>
    timers["<?php echo $row['dataTag']; ?>"] = {
        'id':'<?php echo $row['dataTag']; ?>',
        'name': '<?php echo $row['name'];?>',
        'type': 'procedure',
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
        'details': '<?php echo $val['details']; ?>'
    }
<?php
}
?>
    $('#<?php echo $row['dataTag']; ?>-timer-div').click(function () {
        var id = $(this).attr('data');
        clickTimer(timers[id]);
    });

    $('#<?php echo $row['dataTag']; ?>-timer-restart').click(function () {
        event.stopPropagation();
        var id = $(this).attr('data');
        restartTimer(timers[id]);
    });

    $('.info-btn').click(function() {
        var tag = $(this).attr('data');
        var type = $(this).attr('data-type');

        $('#info-name').html(timers[tag]['name']);
        if (type == 'medication') {
            $('#proc-info').hide();
            $('#med-info').show();
            $('#med-dose').html("Dose: " + timers[tag]['doseAmount'] + " " + timers[tag]['doseUnit']);
            $('#med-route').html("Route : " + timers[tag]['route']);
        } else if (type == 'procedure') {
            $('#med-info').hide();
            $('#proc-info').show();
            $('#proc-details').html(timers[tag]['details']);
        }
    });

    startTimer(timers["<?php echo $row['dataTag']; ?>"]);
</script>