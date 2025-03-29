// Built by ChatGPT
import { useEffect, useState } from 'react';

const DEFAULT_BG = 'rgba(0,0,0,0.5)';
const DEFAULT_TEXT = '#FFFFFF';

const blendWithBlack = (r: number, g: number, b: number, alpha: number) => [
  Math.floor(r * alpha),
  Math.floor(g * alpha),
  Math.floor(b * alpha),
];

const blendWithWhite = (r: number, g: number, b: number, alpha: number) => [
  Math.floor(r + (255 - r) * alpha),
  Math.floor(g + (255 - g) * alpha),
  Math.floor(b + (255 - b) * alpha),
];

const getLuminance = (r: number, g: number, b: number) =>
  (0.299 * r + 0.587 * g + 0.114 * b) / 255;

const adjustIfTooDark = (r: number, g: number, b: number) =>
  getLuminance(r, g, b) < 0.2 ? blendWithWhite(r, g, b, 0.3) : [r, g, b];

const ensureTextContrast = (
  bgR: number,
  bgG: number,
  bgB: number,
  textR: number,
  textG: number,
  textB: number,
) => {
  const bgL = getLuminance(bgR, bgG, bgB);
  const textL = getLuminance(textR, textG, textB);
  return Math.abs(bgL - textL) < 0.4
    ? blendWithWhite(textR, textG, textB, 0.8)
    : [textR, textG, textB];
};

const useDominantColor = (imageUrl: string | undefined) => {
  const [colors, setColors] = useState<{ bgColor: string; textColor: string }>({
    bgColor: DEFAULT_BG,
    textColor: DEFAULT_TEXT,
  });

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx)
        return setColors({ bgColor: DEFAULT_BG, textColor: DEFAULT_TEXT });

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
      const colorMap = new Map<string, number>();

      for (let i = 0; i < imageData.length; i += 4) {
        const key = `${imageData[i]},${imageData[i + 1]},${imageData[i + 2]}`;
        colorMap.set(key, (colorMap.get(key) || 0) + 1);
      }

      let dominant = [...colorMap.entries()].reduce((max, curr) =>
        curr[1] > max[1] ? curr : max,
      )[0];
      let [r, g, b] = dominant.split(',').map(Number);

      let [bgR, bgG, bgB] = adjustIfTooDark(...blendWithBlack(r, g, b, 0.5));
      let [textR, textG, textB] = ensureTextContrast(
        bgR,
        bgG,
        bgB,
        ...blendWithWhite(r, g, b, 0.7),
      );

      setColors({
        bgColor: `rgba(${bgR},${bgG},${bgB},0.9)`,
        textColor: `rgb(${textR},${textG},${textB})`,
      });
    };

    img.onerror = () =>
      setColors({ bgColor: DEFAULT_BG, textColor: DEFAULT_TEXT });
  }, [imageUrl]);

  return colors;
};

export default useDominantColor;
