import React from "react";
import { useLoaderData } from "react-router-dom";

function GitHub() {
  const data = useLoaderData();   // get data from loader

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>GitHub Page</h2>
      <p>Welcome to the GitHub page!</p>

      {/* Example of showing GitHub info */}
      <img src={data.avatar_url} alt="GitHub Avatar" width={150} style={{ borderRadius: "50%" }} />
      <h3>{data.name}</h3>
      <p>{data.bio}</p>
      <p>
        <a href={data.html_url} target="_blank" rel="noreferrer">
          Visit GitHub Profile
        </a>
      </p>
    </div>
  );
}

export default GitHub;

// ✅ loader function
export const githubInfoLoader = async () => {
  const response = await fetch("https://api.github.com/users/TheGeekyCoder06");
  if (!response.ok) {
    throw new Error("Failed to fetch GitHub data");
  }
  return response.json();
};
