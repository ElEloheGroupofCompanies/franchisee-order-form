import axios from "axios";

function useApi(token = null) {
  return axios.create({
    baseURL: "https://franchisee-backend.onrender.com/api",
    images: "https://franchisee-backend.onrender.com/images",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export default useApi;