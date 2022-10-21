export default async function getAppVersion() {
  const packageJSON = await import("~/package.json");
  console.log("package.json", packageJSON);
}
