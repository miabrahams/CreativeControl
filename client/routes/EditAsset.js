import React from 'react'
import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
  useParams,
} from "react-router-dom";

import { updateAsset, deleteAsset, clearCache } from '../api'


export async function editAction({ request, params }) {
  clearCache();
  const formData = await request.formData();
  // Collects form elements into a Javascript object
  const updates = Object.fromEntries(formData);
  await updateAsset(params.projectId, params.assetId, updates);
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


export default function EditAsset() {
  const project = useLoaderData();
  const {projectId, assetId} = useParams();
  const navigate = useNavigate();
  let asset = project.assets.filter(asset => asset._id === assetId)[0];
  console.log('Editing asset: ', asset);

  return (
    <Form method="post" id="edit-form">
      <div className="imageDisplay">
        <img src={'/' + asset.imageUrls[0] || null} />
      </div>
      <label>
        <span>Title</span>
        <input
          placeholder="Title"
          aria-label="Title"
          type="text"
          name="title"
          defaultValue={asset.title}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={asset.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={navigate.bind(this, -1) }>
          Cancel
        </button>
      </p>
    </Form>
  );
}