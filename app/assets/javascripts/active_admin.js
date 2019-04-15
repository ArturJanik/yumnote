//= require active_admin/base
//= require tinymce

$(document).ready(function() {
  tinyMCE.init({
    mode: 'textareas',
    editor_selector: 'tinymce',
    plugins: [
      'advlist lists link image anchor visualblocks code table media paste'
    ],
    toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat'
  });
});