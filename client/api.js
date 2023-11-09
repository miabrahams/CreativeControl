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
    console.log('Fetching...')
    const res = await fetch(key);
    const data = await res.json();
    reqCache[key] = data;
    return data;
  }
  catch(err) {
    console.log('Invalid project!');
    return null;
  }
}

async function fakeNetwork(query) {
  return new Promise((res) => {
    setTimeout(res, 100)
  });
}


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

export async function createProject() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let project = { id, createdAt: Date.now() };
  let projects = await getProjects();
  projects.unshift(project);
  await set(projects);
  return project;
}

export async function updateProject(id, updates) {
  await fakeNetwork();
  let projects = await localforage.getItem("projects");
  let project = projects.find(project => project.id === id);
  if (!project) throw new Error("No project found for", id);
  Object.assign(project, updates);
  await set(projects);
  return project;
}

export async function deleteProject(id) {
  let projects = await localforage.getItem("projects");
  let index = projects.findIndex(project => project.id === id);
  if (index > -1) {
    projects.splice(index, 1);
    await set(projects);
    return true;
  }
  return false;
}

function set(projects) {
  return localforage.setItem("projects", projects);
}
