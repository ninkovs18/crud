const apiRequest = async (url = "", options = null, errorMsg = null) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw Error("Please reload the app");
  } catch (error) {
    errorMsg = error.message;
  } finally {
    return errorMsg;
  }
};

export default apiRequest;
