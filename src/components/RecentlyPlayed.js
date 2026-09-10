import { useEffect, useMemo, useRef, useState } from "react";
import Card from "./Card";
import * as adminApi from "../utils/adminApi";
import "./RecentlyPlayed.css";

const formatPlayedAt = (isoString) => {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMinutes = Math.round(diffMs / 60000);
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hr ago`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
};

// Identifies a song regardless of when it was played - used to collapse duplicate
// entries (e.g. a "now playing" record plus its scrobble a few seconds later),
// and for hiding and album art lookups.
const songKey = (track) => `${track.artist}::${track.title}`.trim().toLowerCase();

// Keeps only the most recent play of each song; the API returns newest-first.
const dedupeTracks = (tracks) => {
  const seen = new Set();
  const result = [];
  for (const track of tracks) {
    const key = songKey(track);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(track);
  }
  return result;
};

const fetchItunesArtwork = async (artist, title) => {
  const term = encodeURIComponent(`${artist} ${title}`);
  const res = await fetch(
    `https://itunes.apple.com/search?term=${term}&media=music&entity=song&limit=1`
  );
  if (!res.ok) return null;
  const data = await res.json();
  const artworkUrl = data.results?.[0]?.artworkUrl100;
  return artworkUrl ? artworkUrl.replace("100x100", "300x300") : null;
};

const RecentlyPlayed = ({ isOpen, onClose, adminSession }) => {
  const [tracks, setTracks] = useState([]);
  const [status, setStatus] = useState("loading");
  const [hiddenIds, setHiddenIds] = useState([]);
  const [albumArt, setAlbumArt] = useState({});
  const [pendingKey, setPendingKey] = useState(null);

  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const artworkCache = useRef(new Map());

  const { isAuthenticated, token } = adminSession;

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    if (!apiUrl) {
      setStatus("error");
      return;
    }

    fetch(`${apiUrl}/tracks/recent`)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        const deduped = dedupeTracks(data);
        setTracks(deduped);
        setStatus(deduped.length > 0 ? "ready" : "empty");
      })
      .catch(() => setStatus("error"));

    adminApi
      .getHiddenTracks()
      .then((data) => setHiddenIds(data.hidden_ids || []))
      .catch(() => setHiddenIds([]));
  }, []);

  // Fill in missing album art via the iTunes Search API (no API key required).
  useEffect(() => {
    tracks.forEach((track) => {
      if (track.image_url) return;
      const key = songKey(track);
      if (artworkCache.current.has(key)) return;
      artworkCache.current.set(key, true);

      fetchItunesArtwork(track.artist, track.title)
        .then((url) => {
          if (url) setAlbumArt((prev) => ({ ...prev, [key]: url }));
        })
        .catch(() => {});
    });
  }, [tracks]);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const visibleTracks = useMemo(() => {
    if (isAuthenticated) return tracks;
    const hiddenSet = new Set(hiddenIds);
    return tracks.filter((track) => !hiddenSet.has(songKey(track)));
  }, [tracks, hiddenIds, isAuthenticated]);

  const toggleHidden = async (track) => {
    const key = songKey(track);
    setPendingKey(key);
    try {
      const isHidden = hiddenIds.includes(key);
      const data = isHidden
        ? await adminApi.unhideTrack(token, key)
        : await adminApi.hideTrack(token, key);
      setHiddenIds(data.hidden_ids || []);
    } catch {
      // Leave state unchanged; the button will simply not reflect the change.
    } finally {
      setPendingKey(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="recently-played-backdrop" onClick={onClose}>
      <div
        className="recently-played-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="recently-played-heading"
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="recently-played-header">
          <div>
            <h2 id="recently-played-heading">Recently Played</h2>
            <p className="recently-played-subtitle">
              Music I've been listening to lately, pulled live from my Last.fm history
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="recently-played-close"
            onClick={onClose}
            aria-label="Close recently played"
          >
            ✕
          </button>
        </div>

        {isAuthenticated && (
          <p className="recently-played-admin-status">
            Admin mode — hidden tracks are shown below and can be managed.
          </p>
        )}

        {status === "loading" && <p role="status">Loading recent tracks…</p>}
        {status === "error" && <p role="status">Couldn't load recent tracks right now.</p>}
        {status === "empty" && <p role="status">No recent tracks yet.</p>}

        {status === "ready" && (
          <div className="recently-played-grid">
            {visibleTracks.map((track) => {
              const key = songKey(track);
              const isHidden = hiddenIds.includes(key);
              return (
                <div key={key} className="recently-played-card-wrapper">
                  <Card
                    title={track.title}
                    description={`${track.artist} • ${formatPlayedAt(track.played_at)}`}
                    url={track.track_url}
                    image={track.image_url || albumArt[key]}
                    linkLabel="Listen on Last.fm"
                  />
                  {isAuthenticated && (
                    <button
                      type="button"
                      className="recently-played-hide-button"
                      onClick={() => toggleHidden(track)}
                      disabled={pendingKey === key}
                    >
                      {isHidden ? "Unhide" : "Hide"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
