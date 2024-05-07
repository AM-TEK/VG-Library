import { useEffect, useState } from 'react';

//React functional component 1)utilizing useState hook to create a state variable and a setter function, and 2)useEffect hook to fetch data after the component mounts and updates state
const VideoGameList = () => {
  const [videoGames, setVideoGames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8082/videoGames')
      .then(response => response.json())
      .then(data => setVideoGames(data));
  }, []);

  const handleRankChange = (id, newRank) => {
    // Check if the new rank is a valid number between 1 and 20
    if (isNaN(newRank) || newRank < 1 || newRank > 20) {
      console.error('Invalid rank. Rank must be a number between 1 and 20.');
      return;
    }
  
    // Check if the new rank is already used by another video game
    // const isRankUsed = videoGames.some(videoGame => videoGame.id !== id && videoGame.rank == newRank);
    // if (isRankUsed) {
    //   console.error('Invalid rank. Rank must be unique among video games.');
    //   return;
    // }
  
    fetch(`http://localhost:8082/rank?id=${id}&rank=${newRank}`, {
      method: 'PATCH',
    })
      .then(async response => {
        if (response.ok) {
          const response_1 = await fetch('http://localhost:8082/videoGames');
          const data = await response_1.json();
          return setVideoGames(data);
        }
        throw new Error('Failed to update rank');
      })
      .catch(error => {
        console.error('Error updating rank:', error);
      });
  };
  

  return (
    <div className="bg-black p-8">
      <h1 className="text-2xl font-bold text-white">Video Games (1990-2009)</h1>
      <ul className="mt-4">
        {videoGames.map(videoGame => (
          <li key={videoGame.id} className="text-lg text-white">
            <input 
              type="number"
              value={videoGame.rank}
              onChange={e => handleRankChange(videoGame.id, e.target.value)}
              className="mr-2 text-black"
            />
            {videoGame.title} - {videoGame.developer} ({videoGame.year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoGameList;
