import { globSync } from "glob";

const gm = require("gm").subClass({ imageMagick: true });

async function compress(imgPath) {
  await gm(imgPath)
    .resize(800, 800)
    .noProfile()
    .write(imgPath, (error) => {});
}
function getPaths() {
  const path = `${__dirname}/../imgfrom`;
  const arr = globSync(`${path}/**/*.{png,jpeg,jpg}`);
  console.log(arr, arr.length);
  return arr;
}

async function run(index, arr) {
  if (index === arr.length) return;
  const localPath = arr[index];
  compress(localPath);
  run(index + 1, arr);
}

const arr = getPaths();

run(0, arr);
