"""
Pixel-sample helper for extracting gradient colors from a PNG.

This script was used to sample `gradient.png` to obtain the hex color stops that
were then pasted into `MatchPage.tsx`.

How it works (high level):
1) Load the image with Pillow (PIL).
2) Sample pixels at a few strategic points (top/mid/bottom + corners).
3) Sample a set of points along the main diagonal (top-left -> bottom-right).
4) Print the sampled RGB values as hex, so you can manually pick stops.

Usage:
  python pixel_sample_gradient.py gradient.png

Notes:
- This does not "detect" the gradient mathematically; it reads actual rendered
  pixels from the provided PNG. That makes it great for matching mockups.

Implementation note for `MatchPage` asymmetry (April 29):
- The Match mock adds a right-side white wash over the sampled green gradient.
- Keep the sampled base gradient stops unchanged, then layer a semi-opaque white
  gradient above it in CSS.
- Example:
    background:
      linear-gradient(120deg, rgba(255, 255, 255, 0.92) 58%,
                              rgba(255, 255, 255, 0.7) 72%,
                              rgba(255, 255, 255, 0) 88%),
      var(--page-gradient);
- This script still samples only the base image colors; the white wash is an
  implementation overlay for visual composition, not a sampled source color.
"""

from __future__ import annotations

import sys
from PIL import Image


def rgb_to_hex(r: int, g: int, b: int) -> str:
  """Convert RGB integer channels to a #RRGGBB hex string."""
  return f"#{r:02x}{g:02x}{b:02x}"


def sample_point(img: Image.Image, x: int, y: int, label: str) -> None:
  """Sample a single pixel and print it in both RGBA and hex form."""
  r, g, b, a = img.getpixel((x, y))  # gradient.png is sampled as RGBA
  print(f"{label}: (r={r}, g={g}, b={b}, a={a}) {rgb_to_hex(r, g, b)}")


def main() -> int:
  # Allow passing a custom file path; default to gradient.png.
  img_path = sys.argv[1] if len(sys.argv) > 1 else "gradient.png"

  img = Image.open(img_path).convert("RGBA")
  w, h = img.size
  print(f"Loaded: {img_path} (size={w}x{h})\n")

  # Sample a few points that commonly correspond to gradient bands.
  # For a vertical gradient, top/bottom are especially useful.
  sample_point(img, 0, h // 2, "left_mid")
  sample_point(img, w - 1, h // 2, "right_mid")
  sample_point(img, w // 2, 0, "top_mid")
  sample_point(img, w // 2, h - 1, "bottom_mid")
  sample_point(img, 0, 0, "left_top")
  sample_point(img, w - 1, 0, "right_top")
  sample_point(img, 0, h - 1, "left_bottom")
  sample_point(img, w - 1, h - 1, "right_bottom")

  print("\nDiagonal samples (top-left -> bottom-right):")
  # Sample along the diagonal at evenly spaced fractions.
  # This gives you a "curve" of how the colors change across the image.
  n = 11  # number of sample points along the diagonal
  for i in range(n):
    t = i / (n - 1)  # 0.0 to 1.0
    x = int(t * (w - 1))
    y = int(t * (h - 1))
    r, g, b, a = img.getpixel((x, y))
    print(
      f"  t={t:.2f}: (r={r}, g={g}, b={b}, a={a}) {rgb_to_hex(r, g, b)}"
    )

  return 0


if __name__ == "__main__":
  raise SystemExit(main())

