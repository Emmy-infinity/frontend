import React, { useEffect, useRef, useState } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

const MediaPipeFrontend = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [landmarker, setLandmarker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Step 1: Initialize the MediaPipe Vision Task
  useEffect(() => {
    const initializeTask = async () => {
      try {
        // Fetch WebAssembly assets from the CDN
        const vision = await FilesetResolver.forVisionTasks(
          "https://jsdelivr.net"
        );

        // Configure and instantiate the landmarker
        const instance = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            // Path pointing to your task file in the public folder
            modelAssetPath: "/hand_landmarker.task", 
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numHands: 2,
        });

        setLandmarker(instance);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to initialize MediaPipe:", error);
      }
    };

    initializeTask();

    // Clean up the instance when the component unmounts
    return () => {
      if (landmarker) landmarker.close();
    };
  }, []);

  // Step 2: Request webcam permissions and start streaming
  useEffect(() => {
    if (isLoading || !videoRef.current) return;

    navigator.mediaDevices
      .getUserMedia({ video: { width: 640, height: 480 } })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadeddata", predictLoop);
      })
      .catch((err) => console.error("Webcam access denied:", err));
  }, [isLoading]);

  // Step 3: Run the detection loop on every frame
  let lastVideoTime = -1;
  const predictLoop = () => {
    if (!videoRef.current || !landmarker) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Process frame if the video timestamp changed
    if (video.currentTime !== lastVideoTime) {
      lastVideoTime = video.currentTime;
      
      const startTimeMs = performance.now();
      const results = landmarker.detectForVideo(video, startTimeMs);

      // Clear previous frames and render coordinates
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawLandmarks(ctx, results);
    }

    // Keep the frame processing loop active
    requestAnimationFrame(predictLoop);
  };

  // Step 4: Draw landmarks onto the overlaying canvas
  const drawLandmarks = (ctx, results) => {
    if (!results.landmarks) return;

    for (const landmarks of results.landmarks) {
      for (const point of landmarks) {
        // Convert normalized coordinates (0 to 1) to canvas pixels
        const x = point.x * canvasRef.current.width;
        const y = point.y * canvasRef.current.height;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "#00FF00"; // Neon Green point marker
        ctx.fill();
      }
    }
  };

  return (
    <div style={{ position: "relative", width: "640px", height: "480px" }}>
      {isLoading && <p>Loading ML Models...</p>}
      
      {/* Hidden or visible source video stream */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ position: "absolute", top: 0, left: 0, width: "640px", height: "480px", transform: "scaleX(-1)" }}
      />

      {/* Transparent canvas layer drawn right on top of the video */}
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{ position: "absolute", top: 0, left: 0, width: "640px", height: "480px", transform: "scaleX(-1)" }}
      />
    </div>
  );
};

export default MediaPipeFrontend;
