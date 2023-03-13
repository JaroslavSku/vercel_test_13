function $c(currency) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "CZK",
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  })
    .format(currency)
    .replace("CZK", "Kč");
}

export default $c;
