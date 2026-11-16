from PIL import Image
import numpy as np

src = r"C:\Users\Admin\.dsh\attachments\v1\objects\9b\9b3680c374c61b9af8aa45535696fc15681c661b85cf6bae0a7d4c7950daaa9e"
img = Image.open(src).convert("RGB")
a = np.asarray(img).astype(int)
print("size", img.size)


def sample(name, box, pred):
    x0, y0, x1, y1 = box
    reg = a[y0:y1, x0:x1].reshape(-1, 3)
    m = pred(reg)
    sel = reg[m]
    if len(sel) == 0:
        print(name, "no match")
        return
    med = np.median(sel, axis=0).astype(int)
    print(f"{name}: n={len(sel)} median=#{med[0]:02X}{med[1]:02X}{med[2]:02X}")


# right panel blue line art
sample(
    "right-panel",
    (980, 180, 1620, 460),
    lambda r: (r[:, 2] > 120) & (r[:, 2] > r[:, 0] + 30),
)

# light blue cell on left panel
sample(
    "left-blue-cell",
    (560, 310, 640, 390),
    lambda r: (r[:, 2] > 150) & (r[:, 2] > r[:, 0] + 20),
)

# pale teal header bar on left panel
sample(
    "left-teal-bar",
    (360, 240, 560, 285),
    lambda r: (r[:, 1] > 120) & (r[:, 2] > 120),
)

# amber cells for reference
sample(
    "amber-cell",
    (360, 295, 520, 400),
    lambda r: (r[:, 0] > 150) & (r[:, 0] > r[:, 2] + 40),
)
