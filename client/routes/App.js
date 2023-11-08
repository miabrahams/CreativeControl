import React, { useEffect } from 'react';
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import UserHeader from '../components/UserHeader';
import ProjectContainer from '../components/ProjectContainer';
import TitleBar from '../components/TitleBar'

let gameStore = [];


/*

    <div id="application">
      <TitleBar/>
      <UserHeader/>
      <ProjectContainer/>
    </div>

*/

import {getProjects, createProject} from '../api';

export async function loader({ request }) {
  // Filter list of projects if there are search params.
  // NOTE: <Form> element in the search box sends a GET request.
  // This inhibits the Action
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const projects = await getProjects(q);
  return { projects, q };
}

// POST Form on this page is a "New" button.
export async function action() {
  const project = await createProject();
  return { project };
}


export default function App(props) {
  const { projects, q } = useLoaderData();
  const navigation = useNavigation(); // Navigation state: "idle" | "submitting" | "loading"
  const submit = useSubmit();


  // Doing a search?
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

  // Update search box value with the value of q from the url
  useEffect(() => { document.getElementById("q").value = q; }, [q]);
  return (
    <div id="createApp">
      <div id="sidebar">
        <h1>Projects</h1>
        <div>
          <Form
            id="search-form"
            role="search"
          >
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
        <nav>
          {projects.length ? (
            <ul>
              {projects.map((project) => (
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
              ))}
            </ul>
          ) : (
            <p>
              <i>No projects</i>
            </p>
          )}
        </nav>
      </div>
      <div id='detail'
        className={navigation.state === "loading" ? "loading" : ""}><Outlet /></div>
    </div>
  )
}
