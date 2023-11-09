import React from 'react';
import {
  Form,
  useSubmit
} from 'react-router-dom';

import ProjectNav from '../components/ProjectNav';

const ProjectSidebar = ({projects, q, searching}) => {
  // Do this better...
  let filteredProjects = projects;
  if (q) {
    filteredProjects = projects.filter((p) => (p.title.includes(q)));
  }
  // On type/on save
  const submit = useSubmit();
  return (
  <div id="sidebar">
    <h1>Creative Control</h1>
    <div>
      <Form id="search-form" role="search" >
        <input
          id="q"
          className={searching ? "loading" : ""}
          aria-label="search-projects"
          placeholder="Search"
          type="search"
          name="q"
          defaultValue={q}
          onChange={event => {
            const isFirstSearch = q == null;
            // Only add to browser history if not first search
            submit(event.currentTarget.form, {replace: !isFirstSearch})
          }}
        />
        <div
          id="search-spinner"
          aria-hidden
          hidden={!searching}
        />
        <div
          className="sr-only"
          aria-live="polite"
        ></div>
      </Form>
      <Form method="post">
        <button type="submit">New</button>
      </Form>
    </div>
    <ProjectNav projects={filteredProjects} />
  </div>
  );
}

export default ProjectSidebar