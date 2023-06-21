// DELETE & UPDATE a task url
export const URL = (url) =>
  ` https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${url}?company_id=${
    import.meta.env.VITE_COMPANY_ID
  }`;

//GET ALL TASK  & CREATE A TASK
export const TaskURL = () =>
  `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${
    import.meta.env.VITE_COMPANY_ID
  }`;
