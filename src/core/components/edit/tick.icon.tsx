function PiTickIcon({ onClick }: any) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => onClick(true)}
    >
      <rect width="20" height="20" rx="4" fill="white" />
      <path
        d="M5 10.2222L8.33333 13.3333L15 6.66666"
        stroke="#1976D2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export default PiTickIcon;
