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
        $('#admin_form form').find('#'+key).attr("value", value).val(value);
      });
    });
    $('.delete_video').on('click', function() {
      $(this).closest('.video_element').remove();
      update_page_html();
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
    update_page_html();
  };

  var update_page_html = function() {
    var content = video_html();
    var template_a = $('.page_html_template_a').html();
    var template_b = $('.page_html_template_b').html();
    var page_html = template_a + content + template_b;
    $('.page_html').html(page_html);
  };

  var video_html = function() {
    $('#temp_container').html('');
    $('.video_elements .video_element').each(function(index, video_element) {
      var video_div = document.createElement('div');
      var data = {};

      $(video_element).find('input[type=text]').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      $.each(data, function(key, value) {
        $(video_div).attr(key, value);
      });
      $('#temp_container').append(video_div);
      $('#temp_container').append("\n      ");
    });
    return htmlEscape($('#temp_container').html());
  };

  var htmlEscape = function(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  var htmlUnescape = function(value){
    return String(value)
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
  };

  //
  // Clear the modal form when it is hidden
  $('#admin_form').on('hidden', function() {
    $(this).find('form').find("input[type=text], textarea").val("");
  });

  update_page_html();
});