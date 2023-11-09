import React from 'react'
import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom";

import { updateProject, deleteAsset, clearCache } from '../api'

export async function editAction({ request, params }) {
  const formData = await request.formData();
  // Collects form elements into a Javascript object
  const updates = Object.fromEntries(formData);
  await updateProject(params.projectId, updates);
  // Redirects the <Outlet /> back to the project display
  return redirect(`/projects/${params.projectId}`);
}


export async function deleteAction({ request, params }) {
  console.log('DELETING: ');
  clearCache();
  const res = await deleteAsset(params.projectId, params.assetId);
  console.log('Response: ', res);
  // Redirects the <Outlet /> back to the project display
  return redirect(`/projects/${params.projectId}`);
}


export default function EditProject() {
  const { project } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={project.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={project.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={project.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={project.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={project.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={navigate.bind(this, -1) }
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}