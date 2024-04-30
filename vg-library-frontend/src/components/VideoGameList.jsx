import { useEffect, useState } from 'react';

const VideoGameList = () => {
  const [videoGames, setVideoGames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/videoGames')
      .then(response => response.json())
      .then(data => setVideoGames(data));
  }, []);

  return (
    <div>
      <h1>Video Games</h1>
      <ul>
        {videoGames.map(videoGame => (
          <li key={videoGame.id}>
            {videoGame.title} - {videoGame.developer} ({videoGame.year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoGameList;
