"use client";

import React from "react";

export default function AutoPlayVideo() {
  return (
    <div
      className="video-wrapper"
      style={{
        position: "relative",
        width: "100%",
        height: "60vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <video
        src="/videos/jet.mp4"
        width="100%"
        height="100%"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      ></video>

      {/* Optional overlay text */}
      <div
        style={{
          position: "absolute",
          color: "white",
          textAlign: "center",
          zIndex: 10,
          background: "rgba(0, 0, 0, 0.4)",
          padding: "20px 40px",
          borderRadius: "12px",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>
          Private Jet Experience
        </h1>
        <p style={{ fontSize: "1.2rem" }}>Luxury Beyond Limits </p>
      </div>
    </div>
  );
}
