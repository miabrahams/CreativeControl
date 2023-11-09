import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";


// cache so we don't slow down stuff we've already seen
let reqCache = {};

async function cachedFetch(key) {

  console.log(`cachedFetch ${key}`)
  if (reqCache[key]) {
    return reqCache[key];
  }

  try {
    const res = await fetch(key);
    const data = await res.json();
    reqCache[key] = data;
    return data;
  }
  catch(err) {
    console.log('Invalid project!', err);
    return null;
  }
}

export function clearCache() { reqCache = {}; }


export async function getProject(id) {
  console.log('Getting project')
  const data = await cachedFetch(`/api/project/${id}`);
  return data;
}


export async function getProjects(query) {

  const data = await cachedFetch('/api/project/list');
  console.log('Project list: ', data);
  return data;
}


export async function deleteAsset(projectId, assetId) {
  const deleteUrl = `/api/project/${projectId}/deleteAsset/${assetId}`;
  console.log('Deletin: ', deleteUrl);
  const res = await fetch(deleteUrl, {method: 'DELETE'});
  return res;
}



export async function updateAsset(projectId, assetId, updates) {
  console.log('Got updates: ', updates);
  const patchUrl = `/api/project/${projectId}/editAsset/${assetId}`;
  const res = await fetch(patchUrl,
    {
      headers: { "Content-Type": "application/json", },
      method: 'PATCH',
      body: JSON.stringify(updates)
  });
  console.log('Result: ', res);
  return res;
}

export async function createProject() {
  const res = await fetch('/api/project/create',
    {
      headers: { "Content-Type": "application/json", },
      method: 'POST',
      body: JSON.stringify({title: ''})
  });
  console.log('Create Result: ', res);
  return res;
}




function set(projects) {
  return localforage.setItem("projects", projects);
}
