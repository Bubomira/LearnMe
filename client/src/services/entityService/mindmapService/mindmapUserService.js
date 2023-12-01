import { get } from "../../../utils/requester";

const endpointUrl = 'https://localhost:7065/api/mindmap/user';

export const likeMindmap = (mindmapId) =>get(`${endpointUrl}/like/mindmap/${mindmapId}`);

export const dislikeMindmap =(mindmapId) =>get(`${endpointUrl}/dislike/mindmap/${mindmapId}`);