<div class="modal" id="medication-modal">
    <div class="modal-content">
        <h4>Medications</h4>

<?php
include_once("../../includes/db.php");
$sql = "SELECT * FROM medications";
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
    if (tag in timers) {
        restartTimer(timers[tag]);
    } else {
        if(type == "timer") {
            $.post("components/timerCard.php", {tag: tag}, function (data) {
                $('#timer-container').append(data).fadeIn("fast");
            });
        }
        if(type == "alert") {
            callToast('<?php echo $row['name']; ?>');
        }
    }
});
</script>