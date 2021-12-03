import axios from "axios";

export const fetchCurrentUser = () => {
  return axios.get("/api/users/current");
};

export const updateCurrentUser = (userData) => {
  return axios.patch(`/api/users/${userData.userId}`, userData);
};

export const getFilteredUsers = (name) => {
  return axios.get(`/api/users/getFilteredUsers/${name}`)
}

export const getDemoUser = () => {
  return axios.post("/api/users/demoUser");
};
