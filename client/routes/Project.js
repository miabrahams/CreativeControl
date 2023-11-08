
import React from 'react';
import {
  Form,
  useLoaderData,
  useFetcher
} from "react-router-dom";

import { getProject, updateProject } from "../api";

// Will be hooked into useLoaderData in main.js
export async function projectLoader({ params }) {
  // We can Throw in a loader to render a 404 element instead of an entirely invalid page.
  const project = await getProject(params.projectId);
  if (!project) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { project };
}

// Hooked into favorite
export async function updateAction({ request, params }) {
  let formData = await request.formData();
  return updateProject(params.projectId, {
    favorite: formData.get("favorite") === "true",
  })
}

export default function Contact() {
  const { project } = useLoaderData();

  return (
    <div id="contact">
      <div>
        <img
          key={project.avatar}
          src={project.avatar || null}
        />
      </div>

      <div>
        <h1>
          {project.first || project.last ? (
            <>
              {project.first} {project.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={project} />
        </h1>

        {project.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${project.twitter}`}
            >
              {project.twitter}
            </a>
          </p>
        )}

        {project.notes && <p>{project.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

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