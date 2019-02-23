//= require active_admin/base
//= require tinymce

$(document).ready(function() {
  tinyMCE.init({
    mode: 'textareas',
    editor_selector: 'tinymce'
  });
});