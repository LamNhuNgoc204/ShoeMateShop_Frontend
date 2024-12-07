export function formatDate(isoString) {
  const date = new Date(isoString);

  // Lấy ngày, tháng, năm, giờ và phút
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  // Trả về định dạng ngày/tháng/năm giờ:phút
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Tron mang
// export const shuffleArray = array => array.sort(() => Math.random() - 0.5);
export const shuffleArray = array => {
  const newArray = [...array]; // Tạo bản sao mảng
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
