import axios from "axios";

function useApi(token = null) {
  return axios.create({
    baseURL: "http://localhost:8000/api",
    images: "http://localhost:8000/images",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export default useApi;