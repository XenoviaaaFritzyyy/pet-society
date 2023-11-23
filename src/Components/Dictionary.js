import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Dictionary() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState(null);

  useEffect(() => {
    // Fetch data from your API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/dictionary/getAllEntry");
        const data = await response.json();

        if (response.ok) {
          setEntries(data);
        } else {
          console.error("Failed to fetch entries:", data);
        }
      } catch (error) {
        console.error("Error during fetching entries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterEntriesByLetter = (letter) => {
    setSelectedLetter(letter === selectedLetter ? null : letter);
  };

  const filteredEntries = selectedLetter
    ? entries.filter((entry) => entry.entry.startsWith(selectedLetter))
    : entries;

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "10px", marginLeft: "100px", marginRight: "100px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              margin: "5px",
              padding: "5px",
              cursor: "pointer",
              border: "1px solid #ddd",
              borderRadius: "5px",
              background: selectedLetter === null ? "#526D82" : "white",
              color: selectedLetter === null ? "white" : "#526D82",
            }}
            onClick={() => filterEntriesByLetter(null)}
          >
            All
          </div>
          {Array.from({ length: 26 }, (_, index) => {
            const letter = String.fromCharCode(65 + index);
            return (
              <div
                key={letter}
                style={{
                  margin: "5px",
                  padding: "5px",
                  cursor: "pointer",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  background: selectedLetter === letter ? "#526D82" : "white",
                  color: selectedLetter === letter ? "white" : "#526D82",
                }}
                onClick={() => filterEntriesByLetter(letter)}
              >
                {letter}
              </div>
            );
          })}
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "10px" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", background: '#27374D', borderRadius: '5px', color: 'white' }}>NAME</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", background: '#27374D', borderRadius: '5px', color: 'white' }}>DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr key={entry.dicID}>
                  <td style={{ border: "1px solid #ddd", padding: "20px 100px", textAlign: "center", background: 'white', borderRadius: '5px', fontSize: '20px', fontWeight: 'bold', color: '#27374D' }}>{entry.entry}</td>
                  <td style={{ border: "1px solid #ddd", padding: "20px", background: 'white', borderRadius: '5px', color: '#526D82' }}>{entry.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Dictionary;
