import { fetchWithAuth } from "./auth";

const baseUrl="https://lwsctewpcxlvwjixzdky.supabase.co"
const apiKey="sb_publishable_WueluaPFskLbogGJGAe6-Q_U_Jvc2Qj"
export async function getProjects(page: number, limit: number) {
  try {
    const offset = (page - 1) * limit;

    const response = await fetchWithAuth(
      `${baseUrl}/rest/v1/rpc/get_projects?limit=${limit}&offset=${offset}`,
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
      throw new Error(data.error || "get projects failed");
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
    console.log("get projects failed", error);
    throw error;
  }
}




export async function getSingleProject(project_id: string) {
  try {
    
    const response = await fetchWithAuth(
      `${baseUrl}/rest/v1/rpc/get_projects?id=eq.${project_id}`,
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
      throw new Error(data.error || "get single projects failed");
    }

    
    
    return data;
  } catch (error) {
    console.log("get projects failed", error);
    throw error;
  }
}



export async function updateProject(name:string ,description:string,project_id: string) {
  try {
    
    const response = await fetchWithAuth(
      `${baseUrl}/rest/v1/projects?id=eq.${project_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
        
        },
        body: JSON.stringify({ name, description }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "update projects failed");
    }

    
    
    return data;
  } catch (error) {
    console.log("update projects failed", error);
    throw error;
  }
}
export async function createProject(name:string ,description:string){



try {
  let response = await fetchWithAuth(`${baseUrl}/rest/v1/projects`, {
    method:"post",
    headers:{
      "Content-Type":"application/json",
      "apikey":apiKey,
      Prefer: "return=representation"
    },
    body: JSON.stringify({ name, description }),
  })

  const res=await response.json();
  if(!response.ok){
throw new Error(res.error||"add projects failed");

  }
return res;

}

catch (error) {
  console.log("add projects failed",error);
  throw error;
}

}


export async function getProjectMembers(project_id: string) {
  try {
    
    const response = await fetchWithAuth(
      `${baseUrl}/rest/v1/get_project_members?project_id=eq.${project_id}`,
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
      throw new Error(data.error || "get  project members failed");
    }

    
    
    return data;
  } catch (error) {
    console.log("get project members failed", error);
    throw error;
  }
}