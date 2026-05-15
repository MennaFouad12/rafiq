import { fetchWithAuth } from "./auth";

const baseUrl="https://lwsctewpcxlvwjixzdky.supabase.co"
const apiKey="sb_publishable_WueluaPFskLbogGJGAe6-Q_U_Jvc2Qj"
export async function getProjectEpics(page: number, limit: number,project_id:string,  search?: string) {
  try {
  const offset = (page - 1) * limit;

let url = `${baseUrl}/rest/v1/project_epics?project_id=eq.${project_id}&limit=${limit}&offset=${offset}`;

if (search) {
  url += `&title=ilike.%25${search}%25`;
}

    const response = await fetchWithAuth(
      url,
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

    // Get total count from a separate query
    let countUrl = `${baseUrl}/rest/v1/project_epics?project_id=eq.${project_id}`;
    if (search) {
      countUrl += `&title=ilike.%25${search}%25`;
    }

    const countResponse = await fetchWithAuth(
      countUrl,
      {
        method: "HEAD", // Use HEAD to get only headers
        headers: {
          apikey: apiKey,
          Prefer: "count=exact",
        },
      }
    );

    const contentRange = countResponse.headers.get("content-range");
    let totalCount = 0;
    if (contentRange) {
      totalCount = parseInt(contentRange.split("/")[1]);
    }

    console.log("EPICS API RESPONSE:", {
      dataLength: data.length,
      contentRange,
      totalCount,
      page,
      limit,
      search,
    });

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






export async function updateProjectEpic(
  epic_id: string,
  data: {
    title?: string;
    description?: string;
    assignee_id?: string | null;
    deadline?: string | null;
  }
) {
  try {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    let response = await fetchWithAuth(
      `${baseUrl}/rest/v1/epics?id=eq.${epic_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
          Prefer: "return=representation",
        },
        body: JSON.stringify(filteredData),
      }
    );

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.error || "update epic failed");
    }

    return res;
  } catch (error) {
    console.log("update epic failed", error);
    throw error;
  }
}