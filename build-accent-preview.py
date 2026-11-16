from PIL import Image, ImageDraw, ImageFont

BG = "#14171A"
PANEL = "#1B1F23"
INK = "#E9E5DA"
DIM = "#A7A399"
BONE = "#17120A"

candidates = [
    ("磷光绿 CRT", "#9BE564"),
    ("仪表琥珀", "#FFB020"),
    ("危险黄", "#F5C518"),
    ("X 光青", "#4FD1C5"),
    ("火漆红", "#E2543C"),
    ("当前·琥珀", "#E0912F"),
]

W, H = 1000, 126 + len(candidates) * 82
img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

cn = ImageFont.truetype("C:/Windows/Fonts/msyh.ttc", 22)
cn_s = ImageFont.truetype("C:/Windows/Fonts/msyh.ttc", 15)
mono = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 16)
mono_s = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 13)

d.text((36, 30), "深色模式强调色候选", font=cn, fill=INK)
d.text((36, 66), "石墨底 #14171A / 面板 #1B1F23 / 正文 #E9E5DA", font=cn_s, fill=DIM)

y = 110
for label, hexv in candidates:
    d.rounded_rectangle([36, y, W - 36, y + 68], radius=4, fill=PANEL)
    d.rectangle([36, y, 40, y + 68], fill=hexv)
    d.rounded_rectangle([56, y + 12, 108, y + 56], radius=3, fill=hexv)
    d.text((56, y + 18), "12%", font=mono_s, fill=BONE)
    d.text((124, y + 6), label, font=cn, fill=INK)
    d.text((124, y + 36), hexv, font=mono, fill=DIM)

    # filled button
    d.rounded_rectangle([470, y + 18, 570, y + 52], radius=3, fill=hexv)
    d.text((492, y + 24), "发送", font=cn_s, fill=BONE)

    # inline code chip
    d.rounded_rectangle([592, y + 20, 706, y + 50], radius=2, outline=hexv, width=1, fill="#161A1E")
    d.text((600, y + 26), "ctx.run()", font=mono_s, fill=hexv)

    # link + rule
    d.text((730, y + 24), "链接", font=cn_s, fill=hexv)
    d.rectangle([790, y + 46, 950, y + 48], fill=hexv)

    y += 82

img.save("C:/Users/Admin/Documents/deepseek-harness/default-workspace/nasapunk-theme/dark-accent-candidates.png")
print("saved", img.size)
