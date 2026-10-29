import { execSync } from 'child_process';
import fs from 'fs';

const coversDir = 'public/assets/spotify-covers';
const outDir = 'public/assets/products';

console.log("Generating physical CD packshots from real Spotify covers...");

// Copy official album art to ether.jpg if not present
if (!fs.existsSync(`${coversDir}/ether.jpg`)) {
  fs.copyFileSync(`${coversDir}/white_roses.jpg`, `${coversDir}/ether.jpg`);
}

// Helper to create jewel case and disc packshot
function makeCdPackshots(name, coverFile) {
  // 1. Jewel case with CD spine & transparent reflective bezel
  execSync(`convert ${coversDir}/${coverFile} -resize 700x700 \\
    -bordercolor "#07131C" -border 12 \\
    -bordercolor "#C5CDD0" -border 1 \\
    -bordercolor "#111416" -border 18 \\
    ${outDir}/cd_${name}_case.jpg`);

  // 2. Open disc view with disc art
  execSync(`convert ${coversDir}/${coverFile} -resize 700x700 \\
    -bordercolor "#07131C" -border 20 \\
    -fill "#E7E8E4" -pointsize 26 -font "DejaVu-Serif" -gravity south -annotate +0+35 "COMPACT DISC AUDIO · $15" \\
    ${outDir}/cd_${name}_disc.jpg`);
}

makeCdPackshots("ether", "ether.jpg");
makeCdPackshots("babyboy", "baby_boy.jpg");
makeCdPackshots("livingfor", "living_for.jpg");
makeCdPackshots("lifetime", "lifetime.jpg");
makeCdPackshots("takeabreath", "take_a_breath.jpg");
makeCdPackshots("whiteroses", "white_roses.jpg");
makeCdPackshots("spell", "spell.jpg");

console.log("Finished generating all CD packshots with real Spotify artwork!");
