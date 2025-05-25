import { Heart } from "lucide-react";
import React from "react";

interface Props {
  health: number;
  maxHealth: number;
}

const HealthDisplay: React.FC<Props> = ({ health, maxHealth }) => {
  return (
    <div className="flex items-center gap-1 bg-white px-4 py-2 rounded-lg shadow">
      <span className="text-sm text-gray-600 mr-2">Health:</span>
      {Array.from({ length: maxHealth }, (_, index) => (
        <Heart
          key={index}
          className={`w-6 h-6 ${
            index < health
              ? "fill-red-500 text-red-500"
              : "fill-gray-300 text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default HealthDisplay;
