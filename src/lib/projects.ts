import { fetchWithAuth } from "./auth";

const baseUrl="https://lwsctewpcxlvwjixzdky.supabase.co"
const apiKey="sb_publishable_WueluaPFskLbogGJGAe6-Q_U_Jvc2Qj"
export async function getProjects(){

try {
  let response = await fetchWithAuth(`${baseUrl}/rest/v1/rpc/get_projects`, {
    method:"get",
    headers:{
      "Content-Type":"application/json",
      "apikey":apiKey
    }
  
  })

  const res=await response.json();
  if(!response.ok){
throw new Error(res.error||"get projects failed");

  }
return res;

}

catch (error) {
  console.log("get projects failed",error);
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