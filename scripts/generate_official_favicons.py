import os
from PIL import Image

def generate_favicons():
    source_path = r"C:\Users\Dhivakar\.gemini\antigravity\brain\945976e2-4992-434e-866d-09c2e5af38c7\.user_uploaded\media_1786951261657.jpg"
    public_dir = r"C:\Users\Dhivakar\Desktop\cadpoint\frontend\public"
    
    if not os.path.exists(source_path):
        print(f"Error: Source image not found at {source_path}")
        return

    # Open uploaded CADPOINT logo image
    logo = Image.open(source_path).convert("RGBA")
    w, h = logo.size
    
    # Target master square size
    master_size = 512
    master = Image.new("RGBA", (master_size, master_size), (255, 255, 255, 255))
    
    # Calculate aspect ratio scaling to fit inside master canvas with 10% padding
    padding = int(master_size * 0.08)
    target_width = master_size - (2 * padding)
    scale = target_width / float(w)
    target_height = int(h * scale)
    
    if target_height > (master_size - 2 * padding):
        target_height = master_size - (2 * padding)
        scale = target_height / float(h)
        target_width = int(w * scale)
        
    resized_logo = logo.resize((target_width, target_height), Image.Resampling.LANCZOS)
    
    # Center logo on square canvas
    offset_x = (master_size - target_width) // 2
    offset_y = (master_size - target_height) // 2
    master.paste(resized_logo, (offset_x, offset_y), resized_logo)

    # Save 512x512 master PNG
    p512 = os.path.join(public_dir, "android-chrome-512x512.png")
    master.save(p512, "PNG")
    print(f"Saved: {p512}")

    # Generate all required favicon sizes
    sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "favicon-48x48.png": 48,
        "favicon-96x96.png": 96,
        "favicon-144x144.png": 144,
        "apple-touch-icon.png": 180,
        "android-chrome-192x192.png": 192,
    }

    for filename, sz in sizes.items():
        out_path = os.path.join(public_dir, filename)
        resized = master.resize((sz, sz), Image.Resampling.LANCZOS)
        resized.save(out_path, "PNG")
        print(f"Saved: {out_path} ({sz}x{sz})")

    # Generate multi-resolution favicon.ico (containing 16x16, 32x32, 48x48)
    ico_path = os.path.join(public_dir, "favicon.ico")
    ico_img = master.resize((48, 48), Image.Resampling.LANCZOS)
    ico_img.save(
        ico_path,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)]
    )
    print(f"Saved: {ico_path} (Multi-resolution ICO)")

if __name__ == "__main__":
    generate_favicons()
