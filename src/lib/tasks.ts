import { fetchWithAuth } from "./auth";

const baseUrl="https://lwsctewpcxlvwjixzdky.supabase.co"
const apiKey="sb_publishable_WueluaPFskLbogGJGAe6-Q_U_Jvc2Qj"

export async function createProjectTask(title:string ,status:string,description:string|null,due_date: string|null,epic_id:string|null,assignee_id: string | null,
  project_id: string
){



try {
  console.log({
  title,
  status,
  description,
  due_date,
  epic_id,
  assignee_id,
  project_id

});
  let response = await fetchWithAuth(`${baseUrl}/rest/v1/tasks`, {
    method:"post",
    headers:{
      "Content-Type":"application/json",
      "apikey":apiKey,
      Prefer: "return=representation"
    },
    body: JSON.stringify({ title,description, status, due_date, epic_id, assignee_id, project_id }),
  })

  const res=await response.json();
  if(!response.ok){
throw new Error(res.error||"add task failed");

  }
return res;

}

catch (error) {
  console.log("add epic failed",error);
  throw error;
}

}



export async function getProjectTasks(page: number, limit: number,project_id:string) {
  try {
    const offset = (page - 1) * limit;

    const response = await fetchWithAuth(
      `${baseUrl}/rest/v1/project_tasks?project_id=eq.${project_id}&limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
          Prefer: "count=exact",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "get tasks failed");
    }

    
    const contentRange = response.headers.get("content-range");

    let totalCount = 0;
    if (contentRange) {
      totalCount = parseInt(contentRange.split("/")[1]);
    }

    return {
      data,
      totalCount,
    };
  } catch (error) {
    console.log("get epics failed", error);
    throw error;
  }
}





export async function getEpicTasks(epic_id:string) {
  try {


    const response = await fetchWithAuth(
      `${baseUrl}/rest/v1/project_tasks?epic_id=eq.${epic_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
          
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "get epic tasks failed");
    }

    
    return data;
  } catch (error) {
    console.log("get epic tasks failed", error);
    throw error;
  }
}


