import { Heart } from "lucide-react";

interface IHealthDisplay {
  health: number;
  maxHealth: number;
}

const HealthDisplay = ({ health, maxHealth }: IHealthDisplay) => {
  return (
    <div className="flex items-center gap-1 w-fit">
      {Array.from({ length: maxHealth }, (_, index) => (
        <Heart
          key={index}
          className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
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
