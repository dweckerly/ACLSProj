<div class="modal" id="medication-modal">
    <div class="modal-content">
        <h4>Medications</h4>
        <form>
            <div class="input-field">
                <input id="search" type="search" required>
                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
            </div>
        </form>

<?php
include_once("../includes/db.php");
$sql = "SELECT * FROM medications ORDER BY name";
$query = mysqli_query($conn, $sql);
while($row = mysqli_fetch_assoc($query)) {
    $tag = $row['dataTag'];
    $sql = "SELECT * FROM timers WHERE dataTag = '$tag'";
    $q = mysqli_query($conn, $sql);
    $count = mysqli_num_rows($q);
    if($count > 0) {
        $type = 'timer';
    } else {
        $type = 'alert';
    }
?>
            <button data-type="<?php echo $type; ?>" data-tag="<?php echo $row['dataTag'];?>" class="btn btn-outline-secondary med-btn modal-close"><?php echo $row['name'];?></button>
<?php
}
?>
        </div>
    </div>
</div>
<script>
$(document).ready(function(){
    $('.modal').modal();
});
      
$('#medications-btn').click(function () {
    $('#medication-modal').modal();
});

$('.med-btn').click(function () {
    var type = $(this).attr('data-type');
    var tag = $(this).attr('data-tag');
    var name = $(this).html();
    if (tag in timers) {
        restartTimer(timers[tag]);
    } else {
        if(type == "timer") {
            $.post("components/timerCard.php", {tag: tag}, function (data) {
                $('#timer-container').append(data).fadeIn("fast");
            });
        }
        if(type == "alert") {
            actions.push({'name':name, 'tag': tag, 'action':'pressed', 'time':timeNow()});
            callToast(name);
        }
    }
});
</script>