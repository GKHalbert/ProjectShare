import { setState } from "./helpers";
const log = console.log

export const updateProjectList = () => {
    const url = "/allProjects";
    log("updating all projects...")
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            log("ALL the projects")
            log(json.projects)
            setState("projectList", json.projects);
        })
        .catch(error => {
            console.log(error);
        });
};

export const addProject = (projectStruct) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/addProject", {
        method: "post",
        body: JSON.stringify(projectStruct),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    log("add project requesting")
    log(JSON.stringify(projectStruct))
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                log(res.json);
                updateProjectList()
            }
        })
        .catch(error => {
            log("error")
            log(error);
        });
};