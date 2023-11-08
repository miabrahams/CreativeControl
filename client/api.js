import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";


const testProject = {
  _id: 'projectID',
  title: 'Snake',
  assets: [
    {
    imageUrl: 'static/demo/00042-3158810176.jpeg',
    comment: 'Many papercuts later...'
    },
    {
    imageUrl: 'static/demo/S43254_0.jpg',
    comment: 'Excited to start!'
    }
  ]
}


export async function getProjects(query) {
  await fakeNetwork(`getProjects:${query}`);
  let projects = await localforage.getItem("projects");
  if (!projects) projects = [];
  if (query) {
    projects = matchSorter(projects, query, { keys: ["first", "last"] });
  }
  return projects.sort(sortBy("last", "createdAt"));
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

export async function getProject(id) {
  await fakeNetwork(`project:${id}`);
  let projects = await localforage.getItem("projects");
  let project = projects.find(project => project.id === id);
  return project ?? null;
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

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 100);
  });
}
