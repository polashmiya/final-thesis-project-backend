const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dqzesj63z",
  api_key: "518616264464557",
  api_secret: "PUKlRWwyIv5ad_INEiqLENekmUo",
});

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.url,
          id: result.public_id,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};
