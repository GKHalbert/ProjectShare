import set from "lodash-es/set";
import { action } from "statezero";

// Initialize all state paths used by your app as empty.
// These are the states that you can filter using filterState()
// as needed by specific components. All component classes that read
// from these state paths must extend BaseReactComponent class.
//
// - currentUser state path is used by the root App component
// - studentForm and message state paths are used by the StudentForm component
// - studentList state path is used by the StudentList component
export const setEmptyState = () => {
    const emptyUser = {username: "",
                        password:"",
                        firstName:"",
                        lastName:"",
                        school:"",
                        bio:"",
                        email:"",
                        phone:"",
                        projects:[],
                        type:"user",
                        profileImage: null}
    const emptyProject = {title: "",
                            start_date:"",
                            status:"",
                            likes: 0,
                            description:"",
                            image1:"",
                            image2:"",
                            image3:"",
                            creator:emptyUser}
    setState("userList", null);
    setState("userIsAdmin", null);
	setState("errorMessage", null)
	setState("logInPath", false)
    setState("currentUser", null);
    setState("loginForm", { username: "", password: "" });
    setState("projectList", []);
    setState("userdata", emptyUser)
    setState("projectView", emptyProject);
};

// Helper method to set a state path.
// Usage: setState(STATE_PATH_NAME, STATE_PATH_VALUE);
export const setState = action(({ commit, state }, path, value) => {
    set(state, path, value);
    commit(state);
});
