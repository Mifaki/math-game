interface IChatBubble {
  type: "correct" | "wrong" | "neutral";
  show: boolean;
}

const ChatBubble = ({ type, show }: IChatBubble) => {
  if (!show) return null;

  return (
    <div className="absolute -top-24 left-1/2 transform -translate-x-1/3 z-10 min-w-120">
      <div
        className={`relative px-4 py-3 rounded-lg max-w-xs text-center text-white font-medium shadow-lg ${
          type === "correct" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {type === "correct" ? (
          <>
            <div className="text-lg mb-1">✅ WOWWW ✅</div>
            <div className="text-sm">
              Kamu Menemukan angka yang lebih besar dari sebelumnya, lanjutkan
              !!!
            </div>
          </>
        ) : (
          <>
            <div className="text-lg mb-1">❌ Ooops ❌</div>
            <div className="text-sm">
              Angka tidak besar dari sebelumnya, coba lagi ya !!!
            </div>
          </>
        )}
        <div
          className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-transparent ${
            type === "correct"
              ? "border-t-8 border-t-green-500"
              : "border-t-8 border-t-red-500"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default ChatBubble;
