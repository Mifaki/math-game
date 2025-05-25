import { Heart } from "lucide-react";

interface IHealthDisplay {
  health: number;
  maxHealth: number;
}

const HealthDisplay = ({ health, maxHealth }: IHealthDisplay) => {
  return (
    <div className="flex items-center gap-1 w-fit">
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
