
import React, { useState, useRef, useEffect } from 'react';
import {
  Form,
  useLoaderData,
  useFetcher,
  redirect,
  useRevalidator,
} from "react-router-dom";
import { FileDrop } from "react-file-drop";


export default function AddAsset() {

  const inputRef = useRef();
  const filePicker = () => { inputRef.current.click(); };

  const fileHandler = (files) => {
    const extension = files[0].name.split(".")[1]?.toLowerCase();
    console.log("fileHandler");
    console.log(files);

    if (extension !== undefined) {
      const uploadForm = new FormData();
      uploadForm.append('img', files[0]);
      uploadForm.append('title', `Step ${project.assets.length+1}`);
      // Todo: put in api.js
      fetch(`/api/project/${project._id}/addAsset`,
      {
        method: "post",
        body: uploadForm
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
  )

}
