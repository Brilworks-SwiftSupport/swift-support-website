export function formatSrcUrl(url) {
  const urlParts = url.split("/");

  // Get the asset ID (second last segment)
  const assetId = urlParts[urlParts.length - 2];

  // Get the filename (last segment)
  const filename = urlParts[urlParts.length - 1];

  // Avoid prefixing with "assets_" or other generic folder names
  const shouldPrefix = assetId !== "public" && assetId !== "assets";

  // Construct new S3 file name
  const newFileName = shouldPrefix ? `${assetId}_${filename}` : filename;

  const fileURL = `https://d11qzsb0ksp6iz.cloudfront.net/assets/${newFileName}`;

  return fileURL;
}
