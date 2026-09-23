// Custom hexagon logo with initials — original artwork, not affiliated with any brand.
function Logo({ size = 42 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="AB monogram logo"
      className="brand-logo"
    >
      <polygon
        points="50,3 93,26 93,74 50,97 7,74 7,26"
        fill="url(#logoGradient)"
        stroke="#1f1a3c"
        strokeWidth="3"
      />
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f2a154" />
          <stop offset="100%" stopColor="#5a4fcf" />
        </linearGradient>
      </defs>
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fontFamily="'Fraunces', 'Georgia', serif"
        fontWeight="700"
        fontSize="38"
        fill="#fffaf3"
      >
        AB
      </text>
    </svg>
  );
}

export default Logo;
