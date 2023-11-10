
import React, { useState, useRef, useEffect } from 'react';
import {
  Form,
  useLoaderData,
  useFetcher,
  redirect,
  useRevalidator,
} from "react-router-dom";
import Popup from 'reactjs-popup';
import TitleBar from '../components/TitleBar';
import CommentTextArea from '../components/CommentTextArea';
import AddAsset from '../components/AddAsset';


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
}

async function updateAssetNote(projectId, actionId, notes ) {
  // TODO: Throttle
  console.log('updateAssetNote: ', notes);
  await updateAsset(projectId, actionId, {notes})
  clearCache();
  return redirect(`/projects/${projectId}`);
}


let idNum = 0;


// Main project container
export default function Project() {
  const project = useLoaderData();
  const revalidator = useRevalidator();

  // console.log('Displaying project: ', project);
  useEffect(() => {
    console.log('Project useEffect')
  }, [project])



  const assets = []
  for (let i = 0; i < project.assets.length; i++) {
    console.log(i);
    assets.push((<Asset project={project} index={i} id={project.assets[i]._id} />));
  }

  return (
    <div id="project">
      <TitleBar project={project} revalidator={revalidator}/>
      {assets}
      <AddAsset project={project} reavlidator={revalidator} />
    </div>
  );
}


// Each Asset
function Asset({project, index}) {

  const data = project.assets[index];
  // const [noteContent, setNoteContent] = useState(data.notes);


  // useEffect(() => {
  //   console.log('Setting note Content: ', data.notes);
  //   setNoteContent(project.assets[index].notes);
  // }, project);

  // function changeMyText(e)
  //   {
  //     console.log("CHANGE");
  //     e.target.value = data.notes;
  //   }

  // console.log('Rendering ', noteContent);
  // console.log('ASSET NOTE CONTENT: ', noteContent);
  // console.log('ASSET DATA NOTES  : ', data.notes);

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


      <Popup modal trigger=
        {
          <div>
            <img src={'/' + data.imageUrls[0] || null} />
          </div>
        }>
          <img src={'/' + data.imageUrls[0]} className='popup-image' />
      </Popup>

      {/* <CommentTextArea data={data} projectId={projectId} updateAssetNote={updateAssetNote} /> */}

      <Form className='commentForm'
        method='post'
        id={"form_" +data._id}
        action='updateComment'
      >
        <textarea
          id = {data._id + "_textarea"}
          // value={noteContent}
          value={data.notes}
          // defaultValue={data.notes}
          onBlur={e => updateAssetNote(project._id, data._id, e.target.value)}
          // onChange = {e => { setNoteContent(e.target.value)} }
          onChange = {e => { data.notes = (e.target.value)} }
        />
      </Form>


      {data.notes}

      {data.twitter && (
        <p>
          <a target="_blank" href={`https://twitter.com/${data.twitter}`} >
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