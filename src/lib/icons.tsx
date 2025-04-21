export const Sun = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="3"
        fill="#F1DDFF"
        fillOpacity="0.98"
        stroke="#EEEEF0"
        strokeWidth="2"
      />
      <path
        d="M12 5V3"
        stroke="#F1DDFF"
        strokeOpacity="0.98"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 21V19"
        stroke="#F1DDFF"
        strokeOpacity="0.98"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.95 7.04996L18.3643 5.63574"
        stroke="#F1DDFF"
        strokeOpacity="0.98"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5.63608 18.3644L7.05029 16.9502"
        stroke="#F1DDFF"
        strokeOpacity="0.98"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19 12L21 12"
        stroke="#F1DDFF"
        strokeOpacity="0.98"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 12L5 12"
        stroke="#F1DDFF"
        strokeOpacity="0.98"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.95 16.95L18.3643 18.3643"
        stroke="#F1DDFF"
        strokeOpacity="0.98"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5.63608 5.63559L7.05029 7.0498"
        stroke="#F1DDFF"
        strokeOpacity="0.98"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Close = () => {
  return (
    <span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6L6 18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path
          d="M6 6L18 18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};

export const Moon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6247 5.00988C11.7489 5.00332 11.874 5 11.9998 5C15.8658 5 18.9998 8.13401 18.9998 12C18.9998 15.866 15.8658 19 11.9998 19C10.6729 19 9.43231 18.6308 8.375 17.9896C12.0666 17.7946 14.9998 14.7396 14.9998 10.9995C14.9998 8.46034 13.6479 6.23697 11.6247 5.00988Z"
        fill="var(--bg-theme-1)"
      />
      <path
        d="M5.4 10.2L5.4 10.2C5.50137 10.5041 5.55206 10.6562 5.60276 10.7225C5.80288 10.9843 6.19712 10.9843 6.39724 10.7225C6.44794 10.6562 6.49863 10.5041 6.6 10.2L6.6 10.2C6.68177 9.95468 6.72266 9.83201 6.77555 9.72099C6.97291 9.30672 7.30672 8.97291 7.72099 8.77555C7.83201 8.72266 7.95468 8.68177 8.2 8.6L8.2 8.6C8.50412 8.49863 8.65618 8.44794 8.7225 8.39724C8.98431 8.19712 8.98431 7.80288 8.7225 7.60276C8.65618 7.55206 8.50412 7.50137 8.2 7.4L8.2 7.4C7.95468 7.31822 7.83201 7.27734 7.72099 7.22445C7.30672 7.02709 6.97291 6.69329 6.77555 6.27901C6.72266 6.16799 6.68177 6.04532 6.6 5.8C6.49863 5.49588 6.44794 5.34382 6.39724 5.2775C6.19712 5.01569 5.80288 5.01569 5.60276 5.2775C5.55206 5.34382 5.50137 5.49588 5.4 5.8C5.31823 6.04532 5.27734 6.16799 5.22445 6.27901C5.02709 6.69329 4.69329 7.02709 4.27901 7.22445C4.16799 7.27734 4.04532 7.31823 3.8 7.4C3.49588 7.50137 3.34382 7.55206 3.2775 7.60276C3.01569 7.80288 3.01569 8.19712 3.2775 8.39724C3.34382 8.44794 3.49588 8.49863 3.8 8.6C4.04532 8.68177 4.16799 8.72266 4.27901 8.77555C4.69329 8.97291 5.02709 9.30672 5.22445 9.72099C5.27734 9.83201 5.31822 9.95468 5.4 10.2Z"
        fill="var(--bg-theme-1)"
      />
    </svg>
  );
};

export const SearchIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-[10px] right-4 cursor-pointer"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18ZM11 6C10.3434 6 9.69321 6.12933 9.08658 6.3806C8.47995 6.63188 7.92876 7.00017 7.46447 7.46447C7.00017 7.92876 6.63188 8.47996 6.3806 9.08658C6.12933 9.69321 6 10.3434 6 11C6 11.5523 6.44772 12 7 12C7.55228 12 8 11.5523 8 11C8 10.606 8.0776 10.2159 8.22836 9.85195C8.37913 9.48797 8.6001 9.15726 8.87868 8.87868C9.15726 8.6001 9.48797 8.37913 9.85195 8.22836C10.2159 8.0776 10.606 8 11 8C11.5523 8 12 7.55228 12 7C12 6.44772 11.5523 6 11 6Z"
        fill="#B5B2BC"
      />
      <path
        d="M20 20L18 18"
        stroke="#B5B2BC"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
