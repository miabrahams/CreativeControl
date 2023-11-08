import React, { useEffect } from 'react';
import {
  Outlet,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';
import ProjectSidebar from '../components/ProjectSidebar';


import {getProjects, createProject} from '../api';

export async function loader({ request }) {
  // Filter list of projects if there are search params.
  // NOTE: <Form> element in the search box sends a GET request.
  // This inhibits the Action and simply updates the URL.
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

  // Doing a search?
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

  // Update search box value with the value of q from the url
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <div id="createApp">
      <ProjectSidebar projects={projects} q={q} searching={searching}/>
      <div id='detail' className={navigation.state === "loading" ? "loading" : ""}>
        <Outlet />
      </div>
    </div>
  )
}
