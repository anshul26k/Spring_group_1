import axios from 'axios';

export interface BadgeInfo {
  status: string;
  score: number;
  updated_at: string;
}

export const getBadgeMetadata = async (username: string, project: string): Promise<BadgeInfo> => {
  const response = await axios.get(`https://api.devpilot.io/v1/metadata/${username}/${project}`);
  return response.data;
};