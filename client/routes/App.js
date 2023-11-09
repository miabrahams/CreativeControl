import React, { useEffect } from 'react';
import {
  Outlet,
  useLoaderData,
  useNavigation,
  redirect,
} from 'react-router-dom';
import ProjectSidebar from '../components/ProjectSidebar';

// import {useDropzone} from 'react-dropzone'


import {getProjects, createProject, clearCache} from '../api';

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
export async function createProjectAction() {
  const project = await createProject();
  clearCache();
  console.log('new project: ', project);
  return redirect(`/projects/${project._id}`);
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
      <div
        id='view'
        className={navigation.state === "loading" ? "loading" : ""}
        // {...rootProps}
      >
        {/* <input {...getInputProps()} /> */}
        <Outlet />

      </div>
    </div>
  )
}


/*

        <form class='image-upload'>
          <p>Upload file</p>
          <input type="file" id="imageElem" multiple accept="image/*" onChange={(e) => handleFiles(e.files)}/>
          <label class="button" for="imageElem">Select some files</label>
        </form>
*/