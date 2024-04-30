import { useEffect, useState } from 'react';

const VideoGameList = () => {
  const [videoGames, setVideoGames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/videoGames')
      .then(response => response.json())
      .then(data => setVideoGames(data));
  }, []);

  return (
    <div className="bg-gray-200 p-8">
      <h1 className="text-2xl font-bold">Video Games</h1>
      <ul className="mt-4">
        {videoGames.map(videoGame => (
          <li key={videoGame.id} className="text-lg text-gray-800">
            {videoGame.title} - {videoGame.developer} ({videoGame.year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoGameList;
