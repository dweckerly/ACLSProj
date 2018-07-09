<div class="modal fade" id="medication-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">

<?php
include_once("../includes/db.php");
$sql = "SELECT * FROM medications";
$query = mysqli_query($conn, $sql);
while($row = mysqli_fetch_assoc($query)) {
    $id = $row['id'];
    $tag = $row['dataTag'];
    $sql = "SELECT * FROM timers WHERE mid = '$id' AND dataTag = '$dataTag'";
    $q = mysqli_query($conn, $sql);
    if(mysqli_num_rows($q) > 0) {
        $type = 'timer';
    } else {
        $type = 'alert';
    }
?>
                <button data="<?php echo $row['id'];?>" data-type="<?php echo $type; ?>" data-tag="<?php echo $row['dataTag'];?>" class="btn btn-outline-secondary med-btn"><?php echo $row['name'];?></button>
<?php
}
?>
            </div>
        </div>
    </div>
</div>
<script>
$('#medications-btn').click(function () {
    console.log('clicked');
    $('#medication-modal').modal('show');
});
$('.med-btn').click(function () {
    var type = $(this).attr('data-type');
    var id = $(this).attr('data');
    var tag = $(this).attr('data-tag');
    $('#medication-modal').modal('hide');
    if (tag in timers) {
        restartTimer(timers[tag]);
    } else {
        if(type == "timer") {
            $.post("components/timerCard.php", {id: id}, function (data) {
                $('#timer-container').append(data).fadeIn("fast");
            });
        }
        if(type == "alert") {
            $.post("components/alertModal.php", {id: id}, function (data) {
                $('#timer-container').append(data).fadeIn("fast");
            });
        }
    }
});
</script>