export const ROUTES = {
  project: {
    list: "/projects",
    add: "/projects/addProject",
    edit: (id: string | null | undefined) => `/projects/${id}/edit`,
    epics: (id: string | null | undefined) => `/projects/${id}/epics`,
  },
  epics: {
    add: (id: string | null | undefined) => `/projects/${id}/epics/new`,

    edit: (id: string | null | undefined) => `/projects/${id}/epics/edit`,
  },
  tasks: {
    list: (id: string | null | undefined) => `
/projects/${id}/tasks?view=board
`,
    add: (id: string | null | undefined) => `/projects/${id}/tasks/new`,
  },
};