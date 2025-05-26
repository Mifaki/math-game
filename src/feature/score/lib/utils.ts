export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const getScoreGrade = (score: number) => {
  if (score >= 90) return { grade: "A+", color: "text-green-600", emoji: "🌟" };
  if (score >= 80) return { grade: "A", color: "text-green-500", emoji: "⭐" };
  if (score >= 70) return { grade: "B", color: "text-blue-500", emoji: "👍" };
  if (score >= 60) return { grade: "C", color: "text-yellow-500", emoji: "👌" };
  return { grade: "D", color: "text-red-500", emoji: "📚" };
};
