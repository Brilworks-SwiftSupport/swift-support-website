export function formatSrcUrl(url) {
  const urlParts = url.split("/");

  // Get the asset ID (second last segment)
  const assetId = urlParts[urlParts.length - 2];

  // Get the filename (last segment)
  const filename = urlParts[urlParts.length - 1];

  // Construct new S3 file name
  const newFileName =
    assetId !== "public" ? `${assetId}_${filename}` : `${filename}`;

  const fileURL = `https://d11qzsb0ksp6iz.cloudfront.net/assets/${newFileName}`;
  // const fileURL = `https://${s3Bucket}.s3.${s3Region}.amazonaws.com/assets/${newFileName}`;

  return fileURL;
}
