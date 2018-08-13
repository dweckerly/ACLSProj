<?php
include_once("../includes/db.php");
$tag = $_POST['tag'];
$sql = "SELECT * FROM timers WHERE dataTag = '$tag'";
$q = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($q);

?>
<div class="col s6 m4 l3 xl2">
    <div id="<?php echo $row['dataTag']; ?>-timer-card" class="card text-center timer-card">
        <span class="card-title"></span>
        <div id="<?php echo $row['dataTag']; ?>-timer-div" data="<?php echo $row['dataTag']; ?>">
            <div class="card-content center">
                <h4 class="timer"><span id="<?php echo $row['dataTag']; ?>-minutes">00</span>:<span id="<?php echo $row['dataTag']; ?>-seconds">00</span></h4>
            </div>
            <div class="card-action center" id="<?php echo $row['dataTag']; ?>-timer">
                <span class="flow-text truncate timer-name"><?php echo $row['name'];?></span>
            </div>
        </div>
        <a class="btn-floating btn-small halfway-fab waves-effect waves-light red info-btn modal-trigger" data-target="info-modal" data="<?php echo $row['dataTag']; ?>" data-type="<?php echo $row['type']; ?>"><i class="material-icons">info_outline</i></a>
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
            $('#med-route').html("Route: " + timers[tag]['route']);
        } else if (type == 'procedure') {
            $('#med-info').hide();
            $('#proc-info').show();
            $('#proc-details').html(timers[tag]['details']);
        }
        $('#count').html("Total: " + timers[tag]['count']);
        $('#info-table-body').empty();
        for(i = 0; i < actions.length; i++) {
            if(actions[i]['tag'] == tag) {
                $('#info-table-body').append("<tr><td>" + actions[i]['action'] + "</td><td>" + actions[i]['time'] + "</td></tr>");
            }
        }
    });

    startTimer(timers["<?php echo $row['dataTag']; ?>"]);
</script>