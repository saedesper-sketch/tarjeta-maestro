
import React from 'react';

interface BarcodeProps {
  value: string;
}

const Barcode: React.FC<BarcodeProps> = ({ value }) => {
  const bars = value
    .split('')
    .map((char) => char.charCodeAt(0) % 8) // Generate a number 0-7 for bar width
    .map((num, i) => (
      <rect
        key={`${value}-${i}`}
        x={i * 6}
        y="0"
        width={num < 4 ? 2 : 4} // Two different widths for visual variety
        height="60"
        fill="black"
      />
    ));

  return (
    <div className="bg-white p-2 rounded-lg shadow-inner">
      <svg width="100%" height="60" aria-label={`Barcode for ID ${value}`}>
        {bars}
      </svg>
      <p className="text-center font-mono tracking-widest text-sm mt-1">{value}</p>
    </div>
  );
};

export default Barcode;
