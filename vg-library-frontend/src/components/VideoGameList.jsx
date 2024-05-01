import { useEffect, useState } from 'react';

//React functional component 1)utilizing useState hook to create a state variable and a setter function, and 2)useEffect hook to fetch data after the component mounts and updates state
const VideoGameList = () => {
  const [videoGames, setVideoGames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/videoGames')
      .then(response => response.json())
      .then(data => setVideoGames(data));
  }, []);

  return (
    <div className="bg-black p-8">
      <h1 className="text-2xl font-bold text-white">Video Games (1990-2009)</h1>
      <ul className="mt-4">
        {videoGames.map(videoGame => (
          <li key={videoGame.id} className="text-lg text-white">
            {videoGame.rank}: {videoGame.title} - {videoGame.developer} ({videoGame.year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoGameList;
