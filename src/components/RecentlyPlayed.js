import { useEffect, useState } from "react";
import Card from "./Card";
import Carousel from "./Carousel";
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

const RecentlyPlayed = () => {
  const [tracks, setTracks] = useState([]);
  const [status, setStatus] = useState("loading");

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
        setTracks(data);
        setStatus(data.length > 0 ? "ready" : "empty");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <section id="recently-played" className="recently-played-section">
      <div className="recently-played-container">
        <div className="recently-played-header">
          <h2>Recently Played</h2>
          <p className="recently-played-subtitle">
            Music I've been listening to lately, pulled live from my
            Last.fm history
          </p>
        </div>

        {status === "loading" && <p role="status">Loading recent tracks…</p>}
        {status === "error" && (
          <p role="status">Couldn't load recent tracks right now.</p>
        )}
        {status === "empty" && <p role="status">No recent tracks yet.</p>}

        {status === "ready" && (
          <div className="recently-played-showcase">
            <Carousel>
              {tracks.map((track) => (
                <Card
                  key={track.id}
                  title={track.title}
                  description={`${track.artist} • ${formatPlayedAt(track.played_at)}`}
                  url={track.track_url}
                  image={track.image_url}
                  linkLabel="Listen on Last.fm"
                />
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentlyPlayed;
