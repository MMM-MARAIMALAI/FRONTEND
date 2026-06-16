/*
  imageCompress.js — Browser-side image resizer + compressor
  ──────────────────────────────────────────────────────────
  Why this exists:
    Ad images stored as base64 data URLs in adSettings can quickly blow past
    Vercel's 4.5 MB serverless payload limit (we raised it to 10 MB, but a
    single 4 MB phone photo becomes ~5.3 MB base64 — and there are 50+ slots).
    So we resize + recompress every uploaded image to a sane size BEFORE
    converting it to base64. Typical 8 MB phone photo → ~300 KB.

  Usage:
    const compressed = await compressImageFile(file, { maxWidth: 1600, quality: 0.85 });
    // compressed.dataUrl     — the data URL to save
    // compressed.originalKB  — original file size in KB
    // compressed.compressedKB — compressed size in KB
    // compressed.width / height — final dimensions
*/

/**
 * Compress a File object (from <input type="file">) to a smaller JPEG data URL.
 *
 * @param {File} file - browser File from a file input
 * @param {object} [opts]
 * @param {number} [opts.maxWidth=1600] - longest edge in pixels
 * @param {number} [opts.maxHeight=1600] - longest edge in pixels
 * @param {number} [opts.quality=0.85]  - JPEG quality 0..1
 * @param {string} [opts.mimeType='image/jpeg']
 * @returns {Promise<{ dataUrl, originalKB, compressedKB, width, height, ratio }>}
 */
export async function compressImageFile(file, opts = {}) {
  const maxWidth  = opts.maxWidth  || 1600;
  const maxHeight = opts.maxHeight || 1600;
  const quality   = typeof opts.quality === 'number' ? opts.quality : 0.85;
  const mimeType  = opts.mimeType || 'image/jpeg';

  const originalKB = Math.round(file.size / 1024);

  // Read file → Image
  const img = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = reject;
      im.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  // Compute target size while preserving aspect ratio
  let { width, height } = img;
  const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
  width  = Math.round(width  * ratio);
  height = Math.round(height * ratio);

  // Draw to canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  // White background — JPEGs don't support transparency
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  // Encode
  const dataUrl = canvas.toDataURL(mimeType, quality);
  const compressedKB = Math.round((dataUrl.length * 0.75) / 1024); // rough: base64 is ~33% larger than raw

  return {
    dataUrl,
    originalKB,
    compressedKB,
    width,
    height,
    ratio,
  };
}

/**
 * Convenience: handle a <input type="file"> change event, compress, and
 * return a result object with a friendly status message.
 */
export async function handleImageUpload(file, opts = {}) {
  if (!file) return { ok: false, error: 'No file' };
  if (!file.type || !file.type.startsWith('image/')) {
    return { ok: false, error: 'Not an image file' };
  }

  try {
    const result = await compressImageFile(file, opts);
    const savedKB = result.originalKB - result.compressedKB;
    const pct = result.originalKB > 0
      ? Math.round((savedKB / result.originalKB) * 100)
      : 0;
    return {
      ok: true,
      ...result,
      message:
        result.compressedKB < result.originalKB
          ? `Compressed ${result.originalKB} KB → ${result.compressedKB} KB (saved ${pct}%, resized to ${result.width}×${result.height})`
          : `Saved ${result.compressedKB} KB at ${result.width}×${result.height}`,
    };
  } catch (err) {
    return { ok: false, error: err.message || 'Compression failed' };
  }
}
