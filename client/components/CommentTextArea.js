import React from 'react';
import {Form} from 'react-router-dom';

export default function CommentTextArea({data, projectId, updateAssetNote}) {
  return (
      <Form className='commentForm'
        method='post'
        id={"form_" +data._id}
        action='updateComment'
      >
        <textarea
          id = {data._id + "_textarea"}
          // value={data.notes}
          defaultValue={data.notes}
          onBlur={e => updateAssetNote(projectId, data._id, e.target.value)}
          // onChange = {e => { console.log("CHAAAAAANGE"); setNoteContent(e.target.value)}}
        />
      </Form>
  )

}