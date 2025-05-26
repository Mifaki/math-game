const ScoreBanner = () => {
  return (
    <div className="mx-auto mb-6 sm:mb-8 px-2">
      <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
        <div className="hidden sm:flex gap-1 flex-shrink-0">
          <div className="w-3 sm:w-4 h-2 sm:h-3 bg-primary rounded-sm" />
          <div className="w-4 sm:w-6 h-2 sm:h-3 bg-secondary rounded-sm" />
          <div className="w-2 sm:w-3 h-2 sm:h-3 bg-primary rounded-sm" />
          <div className="w-4 sm:w-6 h-2 sm:h-3 bg-secondary rounded-sm" />
          <div className="w-3 sm:w-4 h-2 sm:h-3 bg-primary rounded-sm" />
          <div className="w-4 sm:w-6 h-2 sm:h-3 bg-secondary rounded-sm" />
          <div className="w-3 sm:w-4 h-2 sm:h-3 bg-primary rounded-sm" />
          <div className="w-4 sm:w-6 h-2 sm:h-3 bg-secondary rounded-sm" />
        </div>

        <div className="mx-2 sm:mx-4 px-3 sm:px-4 py-1 sm:py-2 border-2 border-secondary bg-background rounded flex-shrink-0">
          <span className="text-lg sm:text-xl font-semibold text-gray-800 whitespace-nowrap">
            Hasil Permainan
          </span>
        </div>

        <div className="hidden sm:flex gap-1 flex-shrink-0">
          <div className="w-4 sm:w-6 h-2 sm:h-3 bg-secondary rounded-sm" />
          <div className="w-2 sm:w-3 h-2 sm:h-3 bg-primary rounded-sm" />
          <div className="w-3 sm:w-4 h-2 sm:h-3 bg-secondary rounded-sm" />
          <div className="w-4 sm:w-5 h-2 sm:h-3 bg-primary rounded-sm" />
          <div className="w-2 sm:w-3 h-2 sm:h-3 bg-secondary rounded-sm" />
          <div className="w-3 sm:w-4 h-2 sm:h-3 bg-primary rounded-sm" />
          <div className="w-3 sm:w-4 h-2 sm:h-3 bg-primary rounded-sm" />
          <div className="w-4 sm:w-6 h-2 sm:h-3 bg-secondary rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export default ScoreBanner;
