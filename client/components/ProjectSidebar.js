import React from 'react';


const ProjectSidebar = (props) => {
  // On type/on save
  return (
    <div className='project-sidebar'>
      <h4>Notes</h4>
      <input type="text" id='notes'/>
    </div>
  );
}

export default ProjectSidebar