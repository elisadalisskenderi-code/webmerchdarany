import { execSync } from 'child_process';
import fs from 'fs';

const outDir = 'public/assets/projects';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

console.log("Creating Mariposa visual artwork...");

// 1. Mariposa Main Project Artwork
// Blending flowing sheer wings with scale textures and dark moon ocean
execSync(`convert public/assets/video-stills/flowing_silk.jpg \\
  -gravity center -crop 1000x1000+0+0 -resize 800x800 \\
  -fill "#07131C" -colorize 20% \\
  -fill "#E7E8E4" -pointsize 38 -font "DejaVu-Serif" -gravity north -annotate +0+80 "D A R A N Y" \\
  -fill "#C5CDD0" -pointsize 26 -font "DejaVu-Serif-Italic" -gravity north -annotate +0+135 "M A R I P O S A" \\
  -fill "#75838B" -pointsize 13 -font "DejaVu-Sans" -gravity south -annotate +0+45 "THE UPCOMING STUDIO PROJECT · ALL TRACKS SEALED" \\
  -bordercolor "#07131C" -border 16 \\
  -bordercolor "#C5CDD0" -border 1 \\
  ${outDir}/mariposa_artwork.jpg`);

// 2. Mariposa Teaser / Chrysalis View
execSync(`convert public/assets/video-stills/mermaid_scales.jpg \\
  -gravity center -crop 1000x1000+0+0 -resize 800x800 \\
  -brightness-contrast 10x20 \\
  -fill "#07131C" -colorize 15% \\
  -fill "#E7E8E4" -pointsize 32 -font "DejaVu-Serif" -gravity center -annotate +0-40 "MARIPOSA" \\
  -fill "#C5CDD0" -pointsize 18 -font "DejaVu-Serif-Italic" -gravity center -annotate +0+10 "NOCTURNAL METAMORPHOSIS" \\
  -fill "#75838B" -pointsize 12 -font "DejaVu-Sans" -gravity center -annotate +0+50 "PHYSICAL CD PRE-ORDER · COMING SOON" \\
  -bordercolor "#111416" -border 18 \\
  ${outDir}/mariposa_chrysalis.jpg`);

console.log("Mariposa artwork created successfully!");
