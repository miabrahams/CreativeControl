
import React, { useState } from 'react';

import {updateProject, clearCache} from '../api.js';


const TitleBar = ({project, revalidator}) => {

  const [editing, setEditing] = useState(false);

  function startEdit() { setEditing(true); };
  function onKeyDown(e) {
    if (e.key === "Enter") {
      setEditing(false);
      const body = JSON.stringify({title: e.target.value});
      console.log('Body: ', body);
      updateProject(project._id, body)
        .then((response) => {
          console.log('patch: ', response)
          setEditing(false);
          project.title = e.target.value;
          clearCache();
          revalidator.revalidate();
        })
    }
  }


  const title = project.title ?
        ( <> <b>Project: </b>{project.title} </>) :
        ( <i>Untitled Project</i>);
  return (editing?
      (<input type="text" defaultValue={project.title} onKeyDown={onKeyDown} id="new-title" />) :
      (<h1 onDoubleClick={startEdit}> {title} </h1>)
  );
}


export default TitleBar