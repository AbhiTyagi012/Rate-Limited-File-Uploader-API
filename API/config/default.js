function getCurrentDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    return year + "-" + month + "-" + day;
  }
  
  function getCurrentDateTime() {
    let date = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    let currentDate = new Date(date);
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, "0");
    let day = String(currentDate.getDate()).padStart(2, "0");
    let hours = String(currentDate.getHours()).padStart(2, "0");
    let minutes = String(currentDate.getMinutes()).padStart(2, "0");
    let seconds = String(currentDate.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  
  module.exports = {
    getCurrentDate,
    getCurrentDateTime,
  };
  