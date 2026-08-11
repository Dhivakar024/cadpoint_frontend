import os
from PIL import Image, ImageDraw, ImageFont

def create_cadpoint_favicon():
    # Output directory
    public_dir = os.path.join(os.path.dirname(__file__), "..", "public")
    public_dir = os.path.abspath(public_dir)

    # Master size: 512x512
    size = 512
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 1. Background: Dark Navy Rounded Square (#0F172A)
    # Radii = 96px for 512x512 (Standard modern app icon curvature)
    bg_color = (15, 23, 42, 255)  # #0F172A
    border_color = (30, 58, 138, 200) # #1E3A8A
    
    # Draw rounded rectangle background
    draw.rounded_rectangle([16, 16, size - 16, size - 16], radius=96, fill=bg_color, outline=border_color, width=4)

    # 2. Main CADPOINT Emblem
    # Try to load heavy sans-serif fonts, fallback to default if not present
    font_large = None
    font_sub = None
    font_iso = None
    
    font_paths = [
        "C:\\Windows\\Fonts\\impact.ttf",
        "C:\\Windows\\Fonts\\ariblk.ttf",
        "C:\\Windows\\Fonts\\arialbd.ttf",
        "C:\\Windows\\Fonts\\arial.ttf"
    ]
    
    for path in font_paths:
        if os.path.exists(path):
            try:
                font_large = ImageFont.truetype(path, 110)
                font_sub = ImageFont.truetype(path, 22)
                font_iso = ImageFont.truetype(path, 16)
                break
            except Exception:
                continue

    if not font_large:
        font_large = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_iso = ImageFont.load_default()

    # Red Brand Color #EE1D23
    red_color = (238, 29, 35, 255)
    white_color = (255, 255, 255, 255)
    light_slate = (226, 232, 240, 255)
    navy_bar_bg = (10, 15, 30, 255)

    # Draw "CP" Monogram or "CADPOINT" Brand Text
    # For square icon, draw "CP" large in center top, and "CADPOINT" banner underneath
    
    # Large "CP" Monogram
    cp_text = "CP"
    bbox_cp = draw.textbbox((0, 0), cp_text, font=font_large)
    w_cp = bbox_cp[2] - bbox_cp[0]
    h_cp = bbox_cp[3] - bbox_cp[1]
    
    x_cp = (size - w_cp) / 2
    y_cp = 85
    
    # Subtle drop shadow for CP text
    draw.text((x_cp + 3, y_cp + 4), cp_text, fill=(0, 0, 0, 180), font=font_large)
    draw.text((x_cp, y_cp), cp_text, fill=red_color, font=font_large)

    # Dark Bar for "CADPOINT"
    bar_top = y_cp + h_cp + 35
    bar_height = 64
    bar_margin = 44
    draw.rounded_rectangle([bar_margin, bar_top, size - bar_margin, bar_top + bar_height], radius=12, fill=navy_bar_bg, outline=red_color, width=2)

    # Text inside bar: "CADPOINT"
    cad_text = "CADPOINT"
    bbox_cad = draw.textbbox((0, 0), cad_text, font=font_sub)
    w_cad = bbox_cad[2] - bbox_cad[0]
    h_cad = bbox_cad[3] - bbox_cad[1]
    
    x_cad = (size - w_cad) / 2
    y_cad = bar_top + (bar_height - h_cad) / 2 - 2
    draw.text((x_cad, y_cad), cad_text, fill=white_color, font=font_sub)

    # Authorized Subtext
    auth_text = "AUTHORIZED TRAINING CENTRE"
    bbox_auth = draw.textbbox((0, 0), auth_text, font=font_iso)
    w_auth = bbox_auth[2] - bbox_auth[0]
    x_auth = (size - w_auth) / 2
    y_auth = bar_top + bar_height + 24
    draw.text((x_auth, y_auth), auth_text, fill=light_slate, font=font_iso)

    # Bottom Red Accent Line
    draw.rounded_rectangle([64, y_auth + 36, size - 64, y_auth + 42], radius=3, fill=red_color)

    # Save 512x512 Master PNG
    p512_path = os.path.join(public_dir, "android-chrome-512x512.png")
    img.save(p512_path, "PNG")
    print(f"Saved {p512_path}")

    # Generate 192x192
    img192 = img.resize((192, 192), Image.Resampling.LANCZOS)
    p192_path = os.path.join(public_dir, "android-chrome-192x192.png")
    img192.save(p192_path, "PNG")
    print(f"Saved {p192_path}")

    # Generate 180x180 (Apple Touch Icon)
    img180 = img.resize((180, 180), Image.Resampling.LANCZOS)
    p180_path = os.path.join(public_dir, "apple-touch-icon.png")
    img180.save(p180_path, "PNG")
    print(f"Saved {p180_path}")

    # Generate 48x48
    img48 = img.resize((48, 48), Image.Resampling.LANCZOS)
    p48_path = os.path.join(public_dir, "favicon-48x48.png")
    img48.save(p48_path, "PNG")
    print(f"Saved {p48_path}")

    # Generate 32x32
    img32 = img.resize((32, 32), Image.Resampling.LANCZOS)
    p32_path = os.path.join(public_dir, "favicon-32x32.png")
    img32.save(p32_path, "PNG")
    print(f"Saved {p32_path}")

    # Generate 16x16
    img16 = img.resize((16, 16), Image.Resampling.LANCZOS)
    p16_path = os.path.join(public_dir, "favicon-16x16.png")
    img16.save(p16_path, "PNG")
    print(f"Saved {p16_path}")

    # Save multi-size favicon.ico
    ico_path = os.path.join(public_dir, "favicon.ico")
    img.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"Saved {ico_path}")

if __name__ == "__main__":
    create_cadpoint_favicon()
