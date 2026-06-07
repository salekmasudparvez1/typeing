import type { AppSettings, PerformanceRating, TestResult } from "@/types";

export interface SharePerformanceInput {
  result: TestResult;
  settings: AppSettings;
  rating: PerformanceRating;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function formatMode(mode: string): string {
  return mode.charAt(0).toUpperCase() + mode.slice(1);
}

function formatDifficulty(difficulty: string): string {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function buildPerformanceShareSvg({ result, settings, rating }: SharePerformanceInput): string {
  const date = new Date(result.timestamp).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" fill="none">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1600" y2="900" gradientUnits="userSpaceOnUse">
          <stop stop-color="#050816" />
          <stop offset="0.5" stop-color="#0d1021" />
          <stop offset="1" stop-color="#111827" />
        </linearGradient>
        <radialGradient id="glowA" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(320 180) rotate(35) scale(520 380)">
          <stop stop-color="#22d3ee" stop-opacity="0.42" />
          <stop offset="1" stop-color="#22d3ee" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="glowB" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1260 160) rotate(-35) scale(500 360)">
          <stop stop-color="#a78bfa" stop-opacity="0.45" />
          <stop offset="1" stop-color="#a78bfa" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="headline" x1="160" y1="160" x2="1440" y2="760" gradientUnits="userSpaceOnUse">
          <stop stop-color="#ffffff" />
          <stop offset="0.45" stop-color="#cffafe" />
          <stop offset="1" stop-color="#c4b5fd" />
        </linearGradient>
        <linearGradient id="card" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
          <stop stop-color="#ffffff" stop-opacity="0.12" />
          <stop offset="1" stop-color="#ffffff" stop-opacity="0.05" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill="url(#bg)" />
      <rect width="1600" height="900" fill="url(#glowA)" />
      <rect width="1600" height="900" fill="url(#glowB)" />

      <rect x="120" y="96" width="1360" height="708" rx="36" fill="#08101f" fill-opacity="0.68" stroke="url(#card)" stroke-width="2" />

      <text x="160" y="175" fill="#22d3ee" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="5">TYPEFLOW</text>
      <text x="160" y="250" fill="url(#headline)" font-family="Inter, Arial, sans-serif" font-size="74" font-weight="800">${escapeXml(settings.userName || "You")}</text>
      <text x="160" y="312" fill="#cbd5e1" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="500">${escapeXml(rating)} typing performance</text>

      <rect x="160" y="372" width="1280" height="220" rx="28" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.08" />

      <g font-family="Inter, Arial, sans-serif">
        <text x="220" y="455" fill="#67e8f9" font-size="26" font-weight="600">WPM</text>
        <text x="220" y="520" fill="#ffffff" font-size="70" font-weight="800">${result.wpm}</text>

        <text x="520" y="455" fill="#c4b5fd" font-size="26" font-weight="600">Accuracy</text>
        <text x="520" y="520" fill="#ffffff" font-size="70" font-weight="800">${result.accuracy}%</text>

        <text x="860" y="455" fill="#fda4af" font-size="26" font-weight="600">Mistakes</text>
        <text x="860" y="520" fill="#ffffff" font-size="70" font-weight="800">${result.mistakes}</text>

        <text x="1160" y="455" fill="#86efac" font-size="26" font-weight="600">Time</text>
        <text x="1160" y="520" fill="#ffffff" font-size="70" font-weight="800">${formatTime(result.timeTaken)}</text>
      </g>

      <g font-family="Inter, Arial, sans-serif" fill="#e2e8f0" font-size="24" font-weight="600">
        <text x="160" y="655">${escapeXml(formatDifficulty(result.difficulty))}</text>
        <text x="330" y="655" fill="#94a3b8">•</text>
        <text x="360" y="655">${escapeXml(formatMode(result.mode))}</text>
        <text x="520" y="655" fill="#94a3b8">•</text>
        <text x="550" y="655">Best ${settings.bestWpm} WPM</text>
        <text x="770" y="655" fill="#94a3b8">•</text>
        <text x="800" y="655">${settings.streak > 0 ? `${settings.streak} day streak` : "Streak building"}</text>
      </g>

      <text x="160" y="760" fill="#94a3b8" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="500">Completed ${escapeXml(date)} · Made by Salek Masud Parvez · salekmasudparvez@gmail.com</text>
    </svg>
  `.trim();
}

async function svgToPngBlob(svg: string): Promise<Blob> {
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  try {
    const image = new Image();
    image.src = url;
    await image.decode();

    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 900;

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Canvas context unavailable");
    }

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
          return;
        }
        reject(new Error("Failed to create PNG blob"));
      }, "image/png");
    });

    return pngBlob;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function sharePerformanceAsImage(input: SharePerformanceInput): Promise<void> {
  const svg = buildPerformanceShareSvg(input);
  const pngBlob = await svgToPngBlob(svg);
  const fileName = `typeflow-${input.settings.userName || "performance".toLowerCase()}.png`;
  const file = new File([pngBlob], fileName, { type: "image/png" });

  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      title: "TypeFlow Performance",
      text: `${input.settings.userName || "I"} finished a typing test on TypeFlow.`,
      files: [file],
    });
    return;
  }

  const url = URL.createObjectURL(pngBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}