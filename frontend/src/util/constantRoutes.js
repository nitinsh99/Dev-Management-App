/////////////////////////////////////////////////////////////////////////////////////////Auth
export const signinRoute = 'api/v1/users/signin';
export const signupRoute = 'api/v1/users/signup';
export const updateUserRoute = '/api/v1/users/update-user-info';
export const updateUserPasswordRoute = '/api/v1/users/update-password';
export const deleteUser = '/api/v1/users/delete-user';
export const getUser = '/api/v1/users/get-user';
export const searchUsers = '/api/v1/users/search-users';
export const deleteUserFromProject =
  '/api/v1/users/delete-user-from-my-project/:currentUserId';
///////////////////////////////////////////////////////////////////////////////////////Project
export const createProject = '/api/v1/projects/create-project';
export const getProject = '/api/v1/projects/get-project/:projectId';
export const updateProject = '/api/v1/projects/update-project/:projectId';
export const deleteProject = '/api/v1/projects/delete-project/:projectId';
export const searchProject = '/api/v1/projects/search-projects';
///////////////////////////////////////////////////////////////////////////////////////Section
export const deleteSection =
  '/api/v1/sections/delete-section/:projectId/:sectionId';
export const createSection = '/api/v1/sections/create-section/:projectId';
export const updateSection =
  ' /api/v1/sections/update-section/:projectId/:sectionId';
export const getSection = '/api/v1/sections/get-section/:projectId/:sectionId';
export const getAllSections = '/api/v1/sections/get-sections/:projectId';
///////////////////////////////////////////////////////////////////////////////////////Task
export const deleteTask =
  '/api/v1/tasks/delete-task/:projectId/:sectionId/:taskId';
export const createTask = '/api/v1/tasks/create-task/:projectId/:sectionId';
export const updateTask =
  '/api/v1/tasks/update-task/:projectId/:sectionId/:taskId';

export const getTasksFromCurrentProject = '/api/v1/tasks/get-tasks/:projectId';
///////////////////////////////////////////////////////////////////////////////////////TeamReq
export const updateTeamReq = '/api/v1/teamReq/update/:notificationId';
export const getTeamReq = '/api/v1/teamReq/get';
export const createTeamReq = '/api/v1/teamReq/create/:projectId';
