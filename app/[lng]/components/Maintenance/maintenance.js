"use client";

export default function Maintenance({ isActive = false, message, description, children }) {
  if (!isActive) return <>{children}</>;

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
<svg
  className="w-24 h-24 text-accent mb-6"
  viewBox="0 0 50 50"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#e78b22" stopOpacity="0" />
      <stop offset="50%" stopColor="#e78b22" stopOpacity="1" />
      <stop offset="100%" stopColor="#e78b22" stopOpacity="0" />
    </linearGradient>
  </defs>

  {/* Cercle de fond */}
  <circle
    cx="25"
    cy="25"
    r="20"
    className="opacity-25"
    stroke="currentColor"
    strokeWidth="5"
    fill="none"
  />

  {/* Cercle animé avec dégradé */}
  <circle
    cx="25"
    cy="25"
    r="20"
    stroke="url(#gradient)"
    strokeWidth="5"
    fill="none"
    strokeDasharray="150 150"
    strokeLinecap="round"
  >
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 25 25"
      to="360 25 25"
      dur="2s"
      repeatCount="indefinite"
    />
  </circle>
</svg>

      <h1 className="text-2xl font-semibold text-light">{message}</h1>
      <p className="text-2xl font-semibold text-light my-4">{description}</p>
    </div>
  );
}
