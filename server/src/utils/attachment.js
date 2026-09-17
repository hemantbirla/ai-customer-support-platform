const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const SERVER_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

export const getAttachmentUrl = (url) => {
  if (!url) {
    return "";
  }

  // Already an absolute URL
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  // Backend returns something like:
  // /uploads/chat/example.png
  if (url.startsWith("/")) {
    return `${SERVER_BASE_URL}${url}`;
  }

  return `${SERVER_BASE_URL}/${url}`;
};
