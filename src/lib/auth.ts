
import Cookies from "js-cookie";

const baseUrl="https://lwsctewpcxlvwjixzdky.supabase.co"
const apiKey="sb_publishable_WueluaPFskLbogGJGAe6-Q_U_Jvc2Qj"
export async function signup(email: string, password: string,data:{name:string;department:string}) {
try {
  let response = await fetch(`${baseUrl}/auth/v1/signup`, {
    method:"post",
    headers:{
      "Content-Type":"application/json",
      "apikey":apiKey
    },
    body:JSON.stringify({
      email:email,
      password:password,
      data,
  })
  })
  const res=await response.json();
  if(!response.ok){
throw new Error(res.error||"signup failed");

  }
return res;

}

catch (error) {
  console.log("signup error",error);
  throw error;
}



}








export async function Signin(email: string, password: string) {
  try {
    const response = await fetch(
      `${baseUrl}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.error || "Invalid credentials");
    }

    const { access_token, refresh_token, user } = res;

    // ✅ تخزين في cookies
    const secureCookie = window.location.protocol === "https:";

    Cookies.set("access_token", access_token, {
      expires: 1, // يوم
      secure: secureCookie,
      sameSite: "Lax",
    });

    Cookies.set("refresh_token", refresh_token, {
      expires: 7,
      secure: secureCookie,
      sameSite: "Lax",
    });

    return user;

  } catch (error) {
    console.log("login error", error);
    throw error;
  }
}



async function refreshToken() {
  const refresh_token = Cookies.get("refresh_token");

  if (!refresh_token) {
    throw new Error("No refresh token found");
  }

  const response = await fetch(
    `${baseUrl}/auth/v1/token?grant_type=refresh_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        refresh_token, 
      }),
    }
  );

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Refresh failed");
  }

  // ✅ تحديث التوكن
const secureCookie = window.location.protocol === "https:";

  Cookies.set("access_token", res.access_token, {
      expires: 1,
      secure: secureCookie,
      sameSite: "Lax", // ✅ بدل Strict
  });

  return res.access_token;
}

export async function fetchWithAuth(url: string, options: any = {}) {
  let token = Cookies.get("access_token");
  console.log("🔐 BEFORE REQUEST ACCESS TOKEN:", token);
  console.log("🔐 REFRESH TOKEN:", Cookies.get("refresh_token"));

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      apikey:apiKey
    },
  });

  //  لو التوكن انتهى
  if (response.status === 401) {
    try {
      token = await refreshToken();

      //  إعادة الطلب
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      });

    } catch (error) {
      //  لو refresh فشل → logout
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
if (typeof window !== "undefined") {
  window.location.href = "/login";
}
      
    }
  }

  return response;
}
export function getAccessToken() {
  return Cookies.get("access_token");
}



export async function logout() {
  const token = Cookies.get("access_token");

  try {
    await fetch(`${baseUrl}/auth/v1/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("logout error", error);
  }

  //  امسحي التوكن
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");


}
export async function forgetPass(email: string) {
try {
  let response = await fetch(`${baseUrl}/auth/v1/recover`, {
    method:"post",
    headers:{
      "Content-Type":"application/json",
      "apikey":apiKey
    },
    body:JSON.stringify({
      email:email,

    
  })
  })
  const res=await response.json();
  if(!response.ok){
throw new Error(res.error||"forget failed");

  }


  
return res;

}

catch (error) {
  console.log("forget error",error);
  throw error;
}



}







export async function resetPass(password: string, accessToken: string) {
try {
  let response = await fetch(`${baseUrl}/auth/v1/user`, {
    method:"put",
    headers:{
      Authorization: `Bearer ${accessToken}`,
      "Content-Type":"application/json",
      "apikey":apiKey
    },
    body:JSON.stringify({
      password:password,

    
  })
  })
  const res=await response.json();
  console.log("reset response", res);
  if(!response.ok){
throw new Error(
  res.error ||
  res.message ||
  res.msg ||
  "reset failed"
);

  }


  
return res;

}

catch (error) {
  console.log("reset error",error);
  throw error;
}



}

