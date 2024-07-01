import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Editor = ({ data, onChange }) => {
  return (
    <CKEditor
    editor={ClassicEditor}
    data={data}
    onChange={(event, editor) => {
      const data = editor.getData();
      onChange(data);
    }}
  />
  )
}

export default Editor