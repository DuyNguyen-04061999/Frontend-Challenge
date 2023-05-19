import { PROFILE_API } from "@/config";
import { http } from "@/utils";

export const profileService = {
  getProfileInfo: (username) => http.get(`${PROFILE_API}/${username}`),

  followUser: (username) => http.post(`${PROFILE_API}/${username}/follow`),

  unFollowUser: (username) => http.delete(`${PROFILE_API}/${username}/follow`),
};
