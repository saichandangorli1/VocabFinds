import React, { useState } from "react";

const App = () => {
  const [word, setWord] = useState("");
  const [collectedData, setCollectedData] = useState(null);
  const [count, setCount] = useState(1);

  const handleWord = (e) => {
    setWord(e.target.value);
  };

  const handleShow = async () => {
    try {
      let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
      let data = await fetch(apiUrl);
      let res = await data.json();

      if (res.title === "No Definitions Found") {
        // Display error message or render an error page
        console.log("No definitions found for the word:", word);
        // You can set an error state here to conditionally render an error message in your UI
      } else {
        setCollectedData(res[0]);
        setWord("");
      }

      // setCollectedData(res[0]);
      // setWord("");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    finally{
      setCount(1)
    }
  };

  // const playAudio = () => {
  //   const audioElement = document.getElementById("audioElement");
  //   audioElement.play();
  // };
  const playAudio = () => {
    const audioElement = document.getElementById("audioElement");
    console.log(count);
    setCount(count + 1);

    if (count % 2 !== 0) {
      audioElement.playbackRate = 1; // Reduces the playback speed to half the normal speed
    }
    if (count % 2 == 0) {
      audioElement.playbackRate = 0.5; // Reduces the playback speed to half the normal speed
    }

    // ++i;
    console.log(count);

    if (count % 2 == 0) {
      console.log("even");
    } else {
      console.log("odd");
    }

    // audioElement.playbackRate = 1; // Reduces the playback speed to half the normal speed
    audioElement.play();
  };

  console.log(collectedData);
  return (
    <div className="h-screen flex justify-center mx-4">
      <div className=" mt-10 mb-10">
        <div className="  md:w-[60vw] relative flex items-center ">
          <input
            type="text"
            autoFocus
            placeholder="Search"
            onChange={handleWord}
            value={word}
            className="text-white bg-[#373737] w-full px-6 py-3 rounded-full outline-none border-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleShow();
              }
            }}
          />
          <button
            className={`text-white absolute right-3 ${
              word.length < 1 ? "hidden" : ""
            } `}
            onClick={() => {
              setWord("");
            }}
          >
            {" "}
            &#10060;
          </button>
        </div>
        <div className="mt-4 h-[2px] bg-gray-700"></div>
        {/* <button className="bg-indigo-800 px-5" onClick={handleShow}>
        search
      </button> */}
        {/* {word} */}

        {/* {!collectedData && <div>error</div>} */}

        {collectedData && (
          <div>
            <h1 className="text-3xl m-3">{collectedData.word} : </h1>
            <div className="mt-4 h-[2px] bg-gray-700"></div>
            {/* {collectedData.phonetics.map((phonetic) => (
            <div key={phonetic.text}>
              <p>{phonetic.text}</p>
            </div>
          ))} */}
            {/* {collectedData.meanings.map((meaning) => (
            <div key={meaning.partOfSpeech}>
              {meaning.definitions.map((definition) => (
                <div key={definition.definition}>
                  <p className="text-[6px]">{definition.definition}</p>
                </div>
              ))}
            </div>
          ))} */}
            <h2 className="text-2xl m-3">Dictionary</h2>
            <p className="text-xs m-3">
              Definition from{" "}
              <span className="italic underline">VocabFinds</span>
            </p>
            <div className="flex items-center mt-7 ">
              {/* <button className="size-12 object-cover rounded-full overflow-hidden">
            <img src="/search.gif" alt="" />
          </button> */}
              {collectedData.phonetics.length >= 1 && (
                <div>
                  {
                   
                  }

                  {/* <p>{wordData.phonetics[1].text}</p> */}
                  <audio
                    id="audioElement"
                    controls
                    playb
                    src={
                      collectedData.phonetics[0].audio ||
                      collectedData.phonetics[1].audio ||
                      collectedData.phonetics[2].audio ||
                      collectedData.phonetics[3].audio ||
                      collectedData.phonetics[4].audio
                    }
                    className="hidden"
                    onkeydown={((e)=>{
                      if (e.ctrlKey === 'Space') {
                        playAudio();
                      }
                    })}

                  ></audio>

                  <div className="flex gap-5 mx-2 relative ">
                    {/* <div class="relative w-56 h-56 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"> */}
                    <span className={`bg-blue-200 text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-full px-5 dark:bg-blue-900 dark:text-blue-200 absolute -translate-y-full translate-x-1/2 right-1/2 invisible ${count === 1 ?"sm:invisible" : " sm:visible"}`}>
                      ctrl+space
                    </span>
                    {/* </div> */}
                    <button
                      className="size-12 object-cover rounded-full overflow-hidden"
                      onClick={playAudio}

                    >
                      <img src="/voice-record.gif" alt="" />
                    </button>
                  </div>
                </div>
              )}
              <h1 className="text-3xl mx-2 my-5">{collectedData.word}</h1>
            </div>
            {collectedData.phonetics.length > 1 && (
              <div className="sn:mx-7 sm:-mt-4 mx-12 -mt-5" >
                <p>{collectedData.phonetics[1].text}</p>
                {/* {wordData.phonetics[1].audio && <audio controls src={wordData.phonetics[1].audio}></audio>} */}
              </div>
            )}

            {collectedData.meanings.map((meaning) => (
              // <div key={meaning.definitions[0].definition} className="m-3">
              //   <p>{meaning.definitions[0].definition}</p>
              // </div>
              <div key={meaning.partOfSpeech} className="mt-5">
                <h3 className="text-gray-300 italic mx-3">
                  {meaning.partOfSpeech}
                </h3>
                <div key={meaning.definitions[0].definition} className="mx-8">
                  <p>{meaning.definitions[0].definition}</p>
                  {meaning.definitions[0].example && (
                    <p>Example: {meaning.definitions[0].example}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="fixed bottom-0 w-full bg-[#444] text-white font-bold text-center py-2">
        <div className=" flex items-center gap-4 justify-center pr-1">
          <img src="/search.gif" className="size-10" alt="" id="logo" />
          <div>
            <p className="">VocabFinds | Created by Saichandan Gorli </p>
            <p className="">
              {" "}
              &#169; {` ${new Date().getFullYear()} All Rights Reserved`}
            </p>
          </div>
        </div>
      </footer>

       {/* onKeyDown={((e)=>{
                        if (e.ctrlKey === 'Space') {
                          playAudio();s
                        }
                      })}  */}
    </div>
  );
};

export default App;
