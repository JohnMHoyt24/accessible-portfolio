const BASE_URL = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");

const request = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // No JSON body (e.g. 204 responses) - that's fine.
  }

  if (!res.ok) {
    const message = data?.detail || "Request failed";
    throw new Error(message);
  }

  return data;
};

export const login = (username, password) =>
  request("/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

export const logout = (token) =>
  request("/admin/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

export const getHiddenTracks = () => request("/admin/hidden-tracks");

export const hideTrack = (token, id) =>
  request("/admin/hidden-tracks", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ id }),
  });

export const unhideTrack = (token, id) =>
  request(`/admin/hidden-tracks/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
