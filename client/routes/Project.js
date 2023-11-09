
import React, { useState, useRef } from 'react';
import {
  Form,
  useLoaderData,
  useFetcher,
  redirect,
  useRevalidator
} from "react-router-dom";
import { FileDrop } from "react-file-drop";

import { getProject, clearCache, updateAsset } from "../api";

// Will be hooked into useLoaderData in main.js
export async function projectLoader({ params }) {
  const project = await getProject(params.projectId);
  // We can Throw in a loader to render a 404 element instead of an entirely invalid page.
  if (!project) { throw new Response("", { status: 404, statusText: "Not Found" }); }
  return project;
}


// Hooked into favorite
export async function updateAction({ request, params }) {
  console.log('Not implemented.')
  /*
  let formData = await request.formData();
  console.log('formData: ', formData);
  return updateProject(params.projectId, {
    favorite: formData.get("favorite") === "true",
  })
  */
}

async function updateAssetNote(projectId, actionId, notes ) {
  // TODO: Throttle
  console.log('updateAssetNote: ', notes);
  await updateAsset(projectId, actionId, {notes})
  clearCache();
  return redirect(`/projects/${projectId}`);
}




// Main project container
export default function Project() {
  const project = useLoaderData();
  const inputRef = useRef();
  // console.log('Rendering project: ', project);
  const revalidator = useRevalidator();

  const filePicker = () => { inputRef.current.click(); };
  console.log('Displaying project: ', project);

  const fileHandler = (files) => {
    const extension = files[0].name.split(".")[1]?.toLowerCase();
    console.log("fileHandler");
    console.log(files);

    if (extension !== undefined) {
      const uploadForm = new FormData();
      uploadForm.append('img', files[0]);
      fetch(`/api/project/${project._id}/addAsset`,
      {
        body: uploadForm,
        method: "post"
      }).then(res => {
        console.log('Got response: ', res)
        clearCache();
        // Is there a better way to do this?
        revalidator.revalidate();
      })
    } else {
      alert("file type not supported");
    }
  };




  return (
    <div id="project">

        <h1>
          {project.title ?
            ( <> <b>Project: </b>{project.title} </>) :
            ( <i>Untitled Project</i>)
          }{" "}
        </h1>
        { project.assets.map( data => <Asset data={data} id={data._id} />) }

      <FileDrop onTargetClick={filePicker} onDrop={(f) => fileHandler(f)}>
        <p className="placeholder">
          Add New Asset <br /> OR <span>BROWSE</span>
        </p>
        <input
          accept=".png, .jpg, .jpeg"
          value=""
          style={{ visibility: "hidden", opacity: 0 }}
          ref={inputRef}
          multiple="multiple"
          type="file"
          onChange={(e) => fileHandler(e.target.files)}
        />
      </FileDrop>

    </div>
  );
}


// Each Asset
function Asset({ data, projectId }) {

  const fetcher = useFetcher();

  /*
  React.useEffect(() => {
    console.log('Fetcher');
  }, [fetcher]);
  */



  return (
    <article className='asset'>

      <div className='assetHead'>
        <div className="evenSpacer"></div>
        <div className="evenSpacer">
          <h1>
            {data.title ?
              ( <i> {data.title} </i>) :
              ( <i>Untitled</i>)
            }{" "}
            {/* <Favorite contact={data} /> */}
          </h1>
        </div>

        <div className='editAssets evenSpacer'>
          <Form action={`editAsset/${data._id}`}>
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action={`destroyAsset/${data._id}`}
            onSubmit={(event) => {
              if ( !confirm( "Please confirm you want to delete this asset.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>


      <div>
        <img src={'/' + data.imageUrls[0] || null} />
      </div>

      <fetcher.Form className='commentForm'
        method='post'
        // action='updateComment'
      >
        <textarea
          defaultValue={data.notes}
          // onChange={e => console.log('Textarea changed')}
          onBlur={e => updateAssetNote(projectId, data._id, e.target.value)}
        />
      </fetcher.Form>

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