import axiox from "axios";
const url = process.env.REACT_APP_API_URL;

// handle Signup
const signupUser = async (obj) => {
  try {
    const fetchData = await axiox.post(`${url}/signup`, obj);
    if (fetchData.data.status === 201) {
      return fetchData.data;
    }
  } catch (error) {
    return error.response.data;
  }
};

//Handle Login
const loginUser = async (obj) => {
  try {
    const result = await axiox.post(`${url}/login`, obj);
    console.warn(result);
    if (result.data.status === 201) {
      return result.data;
    }
  } catch (error) {
    return error.response.data;
  }
};

//handle upload
const uploadImg = async (file, userId) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);
  try {
    const result = await axiox.post(`${url}/upload`, formData);
    console.warn(result);
    if (result.data.status === 201) {
      return result.data;
    }
  } catch (error) {
    return error.response.data;
  }
};

//handle upload
const savedImg = async (file, userId) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);
  try {
    const result = await axiox.post(`${url}/saved`, formData);
    console.warn(result);
    if (result.data.status === 201) {
      return result.data;
    }
  } catch (error) {
    return error.response.data;
  }
};

//handle upload image fetch
const uploadFetchImg = async (userId) => {
  try {
    const result = await axiox.get(`${url}/upload/${userId}`);
    // console.warn(result);
    if (result.data.status === 201) {
      return result.data;
    }
  } catch (error) {
    return error.response.data;
  }
};
//handle upload image fetch
const savedFetchImg = async (userId) => {
  try {
    const result = await axiox.get(`${url}/saved/${userId}`);
    // console.warn("saved", result);
    if (result.data.status === 201) {
      return result.data;
    }
  } catch (error) {
    return error.response.data;
  }
};
export {
  savedFetchImg,
  savedImg,
  uploadFetchImg,
  uploadImg,
  signupUser,
  loginUser,
};
