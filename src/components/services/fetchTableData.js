export const fetchTableData = async (formData) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    airline: formData.airline || "",
    bookfrom: formData.bookingFrom || "",
    bookto: formData.bookingTo || "",
    bookdate: formData.bookingDate || "",
    transactionid: formData.transactionId || "",
    airpnr: "",
    paymentGid: formData.paymentGateway || ""
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch("http://10.34.40.114:8000/book_recon/100", requestOptions);
    const result = await response.json(); // Adjust based on your API response format
    console.log("API response:", result);
    return result;
  } catch (error) {
    console.error("Error fetching table data:", error);
    throw error;
  }
};
