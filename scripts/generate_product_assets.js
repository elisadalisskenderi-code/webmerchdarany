import { execSync } from 'child_process';
import fs from 'fs';

const outDir = 'public/assets/products';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Stills available:
// public/assets/video-stills/moon_ocean.jpg
// public/assets/video-stills/ocean_ripples.jpg
// public/assets/video-stills/siren_silhouette.jpg
// public/assets/video-stills/flowing_silk.jpg
// public/assets/video-stills/mermaid_scales.jpg

console.log("Generating product visual assets from authentic video visuals...");

// 1. Tee - Primary: Moody dark garment composition with subtle insignia
// Secondary: Detailed siren print
execSync(`convert public/assets/video-stills/siren_silhouette.jpg -gravity center -crop 1080x1080+0+0 -resize 800x800 \\
  -fill "#07131C" -colorize 30% \\
  ${outDir}/tee_front.jpg`);

execSync(`convert public/assets/video-stills/siren_silhouette.jpg -gravity center -crop 700x700+0-50 -resize 800x800 \\
  -brightness-contrast 5x15 \\
  ${outDir}/tee_back.jpg`);

// 2. Hoodie - Primary: Moon ocean tone
// Secondary: Horizon detail
execSync(`convert public/assets/video-stills/moon_ocean.jpg -gravity center -crop 1080x1080+0+0 -resize 800x800 \\
  -fill "#07131C" -colorize 25% \\
  ${outDir}/hoodie_front.jpg`);

execSync(`convert public/assets/video-stills/moon_ocean.jpg -gravity north -crop 800x800+0+0 -resize 800x800 \\
  -brightness-contrast 10x10 \\
  ${outDir}/hoodie_detail.jpg`);

// 3. Siren Long Sleeve - Primary: flowing fabric sheer tone
// Secondary: mermaid scale sleeve detail
execSync(`convert public/assets/video-stills/flowing_silk.jpg -gravity center -crop 1080x1080+0+0 -resize 800x800 \\
  -fill "#102631" -colorize 20% \\
  ${outDir}/longsleeve_look.jpg`);

execSync(`convert public/assets/video-stills/mermaid_scales.jpg -gravity center -crop 900x900+0+0 -resize 800x800 \\
  -brightness-contrast 10x20 \\
  ${outDir}/longsleeve_detail.jpg`);

// 4. Tote Bag - Dark water ripples with structured contrast
execSync(`convert public/assets/video-stills/ocean_ripples.jpg -gravity center -crop 1080x1080+0+0 -resize 800x800 \\
  -fill "#07131C" -colorize 35% \\
  ${outDir}/tote_front.jpg`);

execSync(`convert public/assets/video-stills/ocean_ripples.jpg -gravity center -crop 600x600+0+0 -resize 800x800 \\
  -brightness-contrast 15x20 \\
  ${outDir}/tote_detail.jpg`);

// 5. Limited Edition Art Print
execSync(`convert public/assets/video-stills/moon_ocean.jpg -gravity center -crop 1200x900+0+0 -resize 800x600 \\
  -bordercolor "#07131C" -border 40 \\
  -bordercolor "#75838B" -border 1 \\
  ${outDir}/art_print_framed.jpg`);

execSync(`convert public/assets/video-stills/siren_silhouette.jpg -gravity center -crop 600x600+0+0 -resize 800x800 \\
  -bordercolor "#0B1A24" -border 30 \\
  ${outDir}/art_print_detail.jpg`);

// 6. Abyssal Siren Scale Ring
execSync(`convert public/assets/video-stills/mermaid_scales.jpg -gravity center -crop 1080x1080+0+0 -resize 800x800 \\
  -fill "#07131C" -colorize 25% \\
  ${outDir}/ring_still.jpg`);

execSync(`convert public/assets/video-stills/mermaid_scales.jpg -gravity center -crop 500x500+0+0 -resize 800x800 \\
  -brightness-contrast 20x25 \\
  ${outDir}/ring_macro.jpg`);

// 7. Silk Scarf: Under The Tide
execSync(`convert public/assets/video-stills/flowing_silk.jpg -gravity center -crop 1080x1080+0+0 -resize 800x800 \\
  -brightness-contrast 5x10 \\
  ${outDir}/silk_scarf_folded.jpg`);

execSync(`convert public/assets/video-stills/flowing_silk.jpg -gravity center -crop 750x750+0+0 -resize 800x800 \\
  -brightness-contrast 15x15 \\
  ${outDir}/silk_scarf_spread.jpg`);

console.log("All product visual assets created successfully in public/assets/products!");
