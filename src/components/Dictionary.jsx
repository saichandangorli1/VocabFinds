import React, { useState, useEffect } from 'react';

function Dictionary({word}) {
  const [wordData, setWordData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        setWordData(data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dictionary App</h1>
      {wordData && (
        <div>
          <h2>{wordData.word}</h2>
          {wordData.phonetics.map(phonetic => (
            <div key={phonetic.text}>
              <p>{phonetic.text}</p>
              {phonetic.audio && <audio controls src={phonetic.audio}></audio>}
            </div>
          ))}
          {wordData.meanings.map(meaning => (
            <div key={meaning.partOfSpeech}>
              <h3>{meaning.partOfSpeech}</h3>
              {meaning.definitions.map(definition => (
                <div key={definition.definition}>
                  <p>{definition.definition}</p>
                  {definition.example && <p>Example: {definition.example}</p>}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dictionary;
