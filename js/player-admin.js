$(document).ready(function() {
  $('#new_video_form').submit(function(e) {
    e.preventDefault();
    var data_id = $(this).find('[name=data-id]').val();
    $('#admin_form').modal('hide');
    $(this).closest('form').find("input[type=text], textarea").val("");
  });
  // $('#add_video').click(function(e){
  //   var data_id = $('#data-id').val();
  // });
});