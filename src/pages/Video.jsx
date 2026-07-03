import { useRef, useState } from "react";

export default function VideoProcessor() {
  const liveVideoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [processedVideoUrl, setProcessedVideoUrl] = useState(null);
  const [processingType, setProcessingType] = useState("grayscale");

  // Camera
  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (liveVideoRef.current) {
        liveVideoRef.current.srcObject = stream;
      }
      setCameraReady(true);
    } catch (err) {
      console.error(err);
      setCameraError("Camera access denied or not available.");
      setCameraReady(false);
    }
  };

  // Recording
  const startRecording = () => {
    if (!streamRef.current || !cameraReady) return;
    const mediaRecorder = new MediaRecorder(streamRef.current, {
      mimeType: "video/webm;codecs=vp9",
    });
    mediaRecorderRef.current = mediaRecorder;
    const chunks = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      setVideoBlob(blob);
      setLocalPreviewUrl(URL.createObjectURL(blob));
      // Release camera
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setCameraReady(false);
    };
    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  // Upload & process
  const uploadAndProcess = async () => {
    if (!videoBlob) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("video", videoBlob, "recorded.webm");
    formData.append("processing_type", processingType);

    try {
      const response = await fetch("http://localhost:8000/api/process_video/", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Processing failed");
      const processedBlob = await response.blob();
      setProcessedVideoUrl(URL.createObjectURL(processedBlob));
    } catch (error) {
      alert("Failed to process video.");
    } finally {
      setUploading(false);
    }
  };

  const resetAll = () => {
    if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
    if (processedVideoUrl) URL.revokeObjectURL(processedVideoUrl);
    setVideoBlob(null);
    setLocalPreviewUrl(null);
    setProcessedVideoUrl(null);
    liveVideoRef.current.srcObject = null;
    streamRef.current = null;
    setCameraReady(false);
    setCameraError(null);
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2>Record → OpenCV Process → View</h2>

      {/* Camera preview */}
      <div>
        <h3>1. Camera Preview</h3>
        <button onClick={startCamera}>Start Camera</button>
        {cameraError && <p style={{ color: "red" }}>{cameraError}</p>}
        <br />
        <video
          ref={liveVideoRef}
          autoPlay
          muted
          width="320"
          style={{ background: "#000", marginTop: 8 }}
        />
      </div>

      {/* Recording */}
      <div style={{ marginTop: 20 }}>
        <h3>2. Record</h3>
        {!recording ? (
          <button onClick={startRecording} disabled={!cameraReady}>
            Start Recording
          </button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
      </div>

      {/* Upload & processing type */}
      {localPreviewUrl && (
        <div style={{ marginTop: 20 }}>
          <h3>3. Choose Filter & Upload</h3>
          <label>
            Processing type:{" "}
            <select
              value={processingType}
              onChange={(e) => setProcessingType(e.target.value)}
            >
              <option value="grayscale">Grayscale</option>
              <option value="canny">Canny Edge</option>
              <option value="threshold">Threshold (Binary)</option>
              <option value="blur">Gaussian Blur</option>
            </select>
          </label>
          <br />
          <video src={localPreviewUrl} controls width="320" />
          <br />
          <button onClick={uploadAndProcess} disabled={uploading}>
            {uploading ? "Processing..." : "Upload & Process"}
          </button>
        </div>
      )}

      {/* Result */}
      {processedVideoUrl && (
        <div style={{ marginTop: 20 }}>
          <h3>4. Processed Video</h3>
          <video
            src={processedVideoUrl}
            controls
            width="320"
            style={{ border: "2px solid green" }}
          />
          <br />
          <button onClick={resetAll}>Record Another</button>
        </div>
      )}
    </div>
  );
}