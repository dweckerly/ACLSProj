<div class="modal" id="procedure-modal">
    <div class="modal-content">
        <h4>Procedures</h4>
        <form>
            <div class="input-field">
                <input id="search" type="search" required>
                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
            </div>
        </form>

<?php
include_once("../../includes/db.php");
$sql = "SELECT * FROM procedures";
$query = mysqli_query($conn, $sql);
while($row = mysqli_fetch_assoc($query)) {
    $tag = $row['dataTag'];
    $sql = "SELECT * FROM timers WHERE mid = '$id' AND dataTag = '$tag'";
    $q = mysqli_query($conn, $sql);
    if(mysqli_num_rows($q) > 0) {
        $type = 'timer';
    } else {
        $type = 'alert';
    }
?>
                <button data-type="<?php echo $type; ?>" data-tag="<?php echo $row['dataTag'];?>" class="btn btn-outline-secondary proc-btn modal-close"><?php echo $row['name'];?></button>
<?php
}
?>
    </div>
</div>
<script>
$(document).ready(function(){
    $('.modal').modal();
});

$('#procedures-btn').click(function () {
    $('#procedure-modal').modal();
});

$('.proc-btn').click(function () {
    var type = $(this).attr('data-type');
    var tag = $(this).attr('data-tag');
    var name = $(this).html();
    if (tag in timers) {
        restartTimer(timers[tag], tag);
    } else {
        if(type == "timer") {
            $.post("components/timerCard.php", {tag: tag}, function (data) {
                $('#timer-container').append(data).fadeIn("fast");
            });
        }
        if(type == "alert") {
            actions.push({'name':name, 'tag': tag, 'action':'pressed', 'time':timeNow()});
            callToast('<?php echo $row['name']; ?>');
        }
    }
});
</script>