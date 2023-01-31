function formatString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatPrice(price) {
  return Intl.NumberFormat('id-ID').format(price);
}

export { formatString, formatPrice };
