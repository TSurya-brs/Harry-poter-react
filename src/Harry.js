import React, { useState, useEffect } from "react";
import "./Harry.css";

const Harry = () => {
  const [output, setOutput] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const data_fetch = async () => {
      try {
        const data = await fetch("https://hp-api.onrender.com/api/characters");
        if (!data.ok) {
          console.log("Data not fetched successfully");
          return;
        }

        const result = await data.json();
        console.log(result);
        setOutput(result);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    data_fetch();
  }, []);

  const filteredCharacters = output.filter((character) =>
    character.name.toLowerCase().includes(name.toLowerCase())
  );

  const defaultImage = require("./images.jpeg");
  const defaultDateOfBirth = "01-01-1900";

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Search for a character"
      />
      <div>
        <ul>
          {filteredCharacters.length > 0 ? (
            filteredCharacters.map((character) => (
              <li key={character.id}>
                <div>
                  <img
                    src={character.image ? character.image : defaultImage}
                    alt={character.name}
                  />
                </div>
                <strong>{character.name}</strong>
                <div>{character.actor}</div>
                <div>{character.dateOfBirth || defaultDateOfBirth}</div>
              </li>
            ))
          ) : (
            <li>No data</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Harry;
