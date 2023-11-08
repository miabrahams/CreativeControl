import React from 'react';

import {
  NavLink,
} from 'react-router-dom';

export default function ProjectNav({projects, }) {

  return (
    <nav>
      {
      projects.length ? (
        <ul>
          {
          projects.map((project) => (
            <li key={project.id}>
              <NavLink
                to={`projects/${project.id}`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : (isPending ? "pending" : "")
                }
              >
                {project.first || project.last ? (
                    `${project.first} ${project.last}`
                ) : ( <i>No Name</i>)
                }
                {" "}
                {project.favorite && <span>★</span>}
              </NavLink>
            </li>
          ))
          }
        </ul>
      ) : (
        <p>
          <i>No projects</i>
        </p>
      )}
    </nav>
  )
}