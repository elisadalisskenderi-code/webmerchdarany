import { execSync } from 'child_process';
import fs from 'fs';

const outDir = 'public/assets/products';

console.log("Generating CD packshots and disc visuals...");

// 1. ETHER - CD Front Cover (Jewel case with spine & artwork)
// Using moon ocean + typography
execSync(`convert public/assets/video-stills/moon_ocean.jpg -gravity center -crop 1000x1000+0+0 -resize 800x800 \\
  -fill "#E7E8E4" -pointsize 42 -font "DejaVu-Serif" -gravity north -annotate +0+80 "D A R A N Y" \\
  -fill "#C5CDD0" -pointsize 28 -font "DejaVu-Serif-Italic" -gravity north -annotate +0+140 "E T H E R" \\
  -fill "#75838B" -pointsize 14 -font "DejaVu-Sans" -gravity south -annotate +0+40 "ORIGINAL STUDIO ALBUM · COMPACT DISC" \\
  -bordercolor "#111416" -border 16 \\
  -bordercolor "#75838B" -border 1 \\
  ${outDir}/cd_ether_front.jpg`);

// ETHER - CD Inside view (Tray, disc with iridescent scale art & booklet)
execSync(`convert public/assets/video-stills/mermaid_scales.jpg -gravity center -crop 1000x1000+0+0 -resize 800x800 \\
  -fill "#E7E8E4" -pointsize 32 -font "DejaVu-Serif" -gravity center -annotate +0-60 "DARANY" \\
  -fill "#C5CDD0" -pointsize 22 -font "DejaVu-Serif-Italic" -gravity center -annotate +0-20 "ETHER" \\
  -fill "#75838B" -pointsize 13 -font "DejaVu-Sans" -gravity center -annotate +0+30 "8 TRACKS · 16-BIT 44.1KHZ STEREO" \\
  -fill "#75838B" -pointsize 12 -font "DejaVu-Sans" -gravity center -annotate +0+60 "INCLUDES 16-PAGE LYRIC BOOKLET" \\
  -bordercolor "#07131C" -border 20 \\
  ${outDir}/cd_ether_disc.jpg`);

// 2. BABY BOY EP - CD Front Cover
execSync(`convert public/assets/video-stills/flowing_silk.jpg -gravity center -crop 1000x1000+0+0 -resize 800x800 \\
  -fill "#E7E8E4" -pointsize 40 -font "DejaVu-Serif" -gravity north -annotate +0+80 "D A R A N Y" \\
  -fill "#C5CDD0" -pointsize 26 -font "DejaVu-Serif-Italic" -gravity north -annotate +0+140 "B A B Y   B O Y" \\
  -fill "#75838B" -pointsize 14 -font "DejaVu-Sans" -gravity south -annotate +0+40 "THE 2026 EP · COMPACT DISC EDITION" \\
  -bordercolor "#111416" -border 16 \\
  -bordercolor "#75838B" -border 1 \\
  ${outDir}/cd_babyboy_front.jpg`);

// BABY BOY EP - Inside Disc view
execSync(`convert public/assets/video-stills/ocean_ripples.jpg -gravity center -crop 1000x1000+0+0 -resize 800x800 \\
  -fill "#E7E8E4" -pointsize 32 -font "DejaVu-Serif" -gravity center -annotate +0-50 "DARANY" \\
  -fill "#C5CDD0" -pointsize 22 -font "DejaVu-Serif-Italic" -gravity center -annotate +0-15 "BABY BOY EP" \\
  -fill "#75838B" -pointsize 13 -font "DejaVu-Sans" -gravity center -annotate +0+30 "FEATURING: BABY BOY · LIVING FOR · LIFETIME" \\
  -bordercolor "#07131C" -border 20 \\
  ${outDir}/cd_babyboy_disc.jpg`);

// 3. WHITE ROSES / SPELL - Collector's Maxi-CD Front
execSync(`convert public/assets/video-stills/siren_silhouette.jpg -gravity center -crop 1000x1000+0+0 -resize 800x800 \\
  -fill "#E7E8E4" -pointsize 40 -font "DejaVu-Serif" -gravity north -annotate +0+80 "D A R A N Y" \\
  -fill "#C5CDD0" -pointsize 24 -font "DejaVu-Serif-Italic" -gravity north -annotate +0+140 "WHITE ROSES · SPELL" \\
  -fill "#75838B" -pointsize 13 -font "DejaVu-Sans" -gravity south -annotate +0+40 "LIMITED COMPACT DISC SINGLE" \\
  -bordercolor "#111416" -border 16 \\
  -bordercolor "#75838B" -border 1 \\
  ${outDir}/cd_whiteroses_front.jpg`);

// WHITE ROSES / SPELL - Collector's Maxi-CD Disc
execSync(`convert public/assets/video-stills/siren_silhouette.jpg -gravity center -crop 700x700+0+0 -resize 800x800 \\
  -fill "#E7E8E4" -pointsize 30 -font "DejaVu-Serif" -gravity center -annotate +0-40 "DARANY" \\
  -fill "#C5CDD0" -pointsize 20 -font "DejaVu-Serif-Italic" -gravity center -annotate +0-5 "WHITE ROSES / SPELL" \\
  -fill "#75838B" -pointsize 13 -font "DejaVu-Sans" -gravity center -annotate +0+35 "LIMITED RUN ECO-DIGIPAK" \\
  -bordercolor "#07131C" -border 20 \\
  ${outDir}/cd_whiteroses_disc.jpg`);

console.log("CD assets generated successfully!");
