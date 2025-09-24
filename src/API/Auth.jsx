 export const login = async (data) => {

  try {

    const response = await fetch("http://localhost:5148/api/Auth/login", {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify(data),

    });
 
    // If backend returns error codes

    if (!response.ok) {

      throw new Error("Failed to login. Please check your credentials.");

    }
 
    // Always parse JSON response

    return await response.json();

  } catch (error) {

    // Normalize error shape

    throw new Error(error.message || "Something went wrong");

  }

};
 