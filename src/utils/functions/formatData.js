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
