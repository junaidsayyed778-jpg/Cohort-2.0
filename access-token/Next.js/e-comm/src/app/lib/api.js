import axios from "axios";

export let api = axios.create({
  baseUrl: "https://api.team-sync.space",
  withCredentials: true,
});
