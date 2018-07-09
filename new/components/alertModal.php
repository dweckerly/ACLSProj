<?php
date_default_timezone_set('America/Chicago');
$id = $_POST['id'];
$tag = $_POST['tag'];
include_once("../includes/db.php");
$sql = "SELECT * FROM alerts WHERE dataTag = '$tag'";
$q = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($q);
?>

<div class="modal fade" id="<?php echo $row['id']; ?>Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <div class="alert alert-warning text-center" role="alert">
                    <?php echo $row['type'] . ": " . $row['name']; ?> recorded at <?php echo date("h:i"); ?>
                </div>
            </div>
        </div>
    </div>
    <script>
        $("#<?php echo $row['id']; ?>Modal").modal('show');
        setTimeout(() => {
            $("#<?php echo $row['id']; ?>Modal").modal('hide');
        }, 2000);
        setTimeout(() => {
            $('#<?php echo $row['id']; ?>Modal').remove();
        }, 2500);
    </script>
</div>
