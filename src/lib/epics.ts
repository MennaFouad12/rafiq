import { fetchWithAuth } from "./auth";

const baseUrl="https://lwsctewpcxlvwjixzdky.supabase.co"
const apiKey="sb_publishable_WueluaPFskLbogGJGAe6-Q_U_Jvc2Qj"
export async function getProjectEpics(page: number, limit: number,project_id:string) {
  try {
    const offset = (page - 1) * limit;

    const response = await fetchWithAuth(
      `${baseUrl}/rest/v1/project_epics?project_id=eq.${project_id}&limit=${limit}&offset=${offset}`,
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
      throw new Error(data.error || "get epics failed");
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


export async function createProjectEpic(title:string ,description:string,project_id:string,assignee_id: string | null,
deadline: string | null){



try {
  console.log({
  title,
  description,
  project_id,
  assignee_id,
  deadline,
});
  let response = await fetchWithAuth(`${baseUrl}/rest/v1/epics`, {
    method:"post",
    headers:{
      "Content-Type":"application/json",
      "apikey":apiKey,
      Prefer: "return=representation"
    },
    body: JSON.stringify({ title,description, project_id, assignee_id, deadline }),
  })

  const res=await response.json();
  if(!response.ok){
throw new Error(res.error||"add epic failed");

  }
return res;

}

catch (error) {
  console.log("add epic failed",error);
  throw error;
}

}


export async function getSingleEpic(project_id: string,id:string) {
  try {
    
    const response = await fetchWithAuth(
      `${baseUrl}/rest/v1/project_epics?project_id=eq.${project_id}&id=eq.${id}`,
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
      throw new Error(data.error || "get single epic failed");
    }

    
    
    return data[0]||null;
  } catch (error) {
    console.log("get single epic failed", error);
    throw error;
  }
}