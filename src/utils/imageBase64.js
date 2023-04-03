export const getBase64 = async (file) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      res(reader.result);
    };
    reader.onerror = function (error) {
      rej(null);
    };
  });
};
