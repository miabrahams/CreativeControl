
import React from 'react';
import {
  Form,
  useLoaderData,
  useFetcher
} from "react-router-dom";

import { getProject, updateProject } from "../api";

// Will be hooked into useLoaderData in main.js
export async function projectLoader({ params }) {
  // return new Promise((res) => {return res(testProject)});

  // We can Throw in a loader to render a 404 element instead of an entirely invalid page.
  const project = await getProject(params.projectId);
  if (!project) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return project;
}





// Hooked into favorite
export async function updateAction({ request, params }) {
  let formData = await request.formData();
  return updateProject(params.projectId, {
    favorite: formData.get("favorite") === "true",
  })
}

export default function Project() {
  const project = useLoaderData();

  return (
    <div id="project">
      <h1>
        {project.title ?
          ( <> {project.title} </>) :
          ( <i>Untitled Project</i>)
        }{" "}
      </h1>
      { project.assets.map( data => <Asset id={data._id} data={data}/>) }
    </div>
  );
}


function Asset({ data }) {
  return (
    <article id='asset'>
      <div>
        <img src={'/' + data.imageUrl || null} />
      </div>

      <div>

        <h1>
          {data.title ?
            ( <> {data.title} </>) :
            ( <i>Untitled Project</i>)
          }{" "}
          <Favorite contact={data} />
        </h1>
        {data.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${data.twitter}`}
            >
              {data.twitter}
            </a>
          </p>
        )}

        {data.notes && <p>{data.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if ( !confirm( "Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </article>
  )
};


function Favorite({ contact }) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  // Fetch new route instead of navigating
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}