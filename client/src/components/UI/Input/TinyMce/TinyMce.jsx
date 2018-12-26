import React, { Component } from 'react';
import 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import { Editor } from '@tinymce/tinymce-react';

class TinyMce extends Component {
  render() {
    return (
      <Editor
        initialValue={this.props.value}
        init={{
          plugins: 'link image code',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
          skin_url: `${process.env.PUBLIC_URL}/TinyMce/skins/lightgray`,
          setup: (editor) => {
            editor.on('change', () => {
              editor.save()
            })
          },
          init_instance_callback: (editor) => {
            editor.save()
          }
        }}
        textareaName={this.props.fieldName}
        onEditorChange={this.props.onChange}
      />
    );
  }
}

export default TinyMce;