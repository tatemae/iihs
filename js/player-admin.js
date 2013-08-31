$(document).ready(function() {
  $('#new_video_form').submit(function(e) {
    e.preventDefault();
    $('.edit_video').off();

    add_to_page(this);

    $('#admin_form').modal('hide');

    $('.edit_video').on('click', function() {
      var video_element = $(this).closest('.video_element');
      var data = {};

      $(video_element).find('input[type=text]').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      $.each(data, function(key, value) {
        // var data_id = asdf.find('#data-id').attr("value");
        // $('#admin_form form').find('#data-id').attr("value", data_id).val(data_id);
        $('#admin_form form').find('#'+key).attr("value", value).val(value);
      });
    });
  });

  var add_to_page = function(elem) {
    var data = {};

    $(elem).find('input[type=text]').each(function() {
      data[$(this).attr('name')] = $(this).val();
    });

    var video_element = $('.video_element_template').clone();
    $.each(data, function(key, value) {
      video_element.find('#'+key).attr("value", value).val(value);
    });
    $('.video_elements').prepend(video_element.html());
  };

  //
  // Clear the modal form when it is hidden
  $('#admin_form').on('hidden', function() {
    $(this).find('form').find("input[type=text], textarea").val("");
  });
});