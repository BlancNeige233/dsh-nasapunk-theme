from PIL import Image
import numpy as np

src = r"C:\Users\Admin\.dsh\attachments\v1\objects\9b\9b3680c374c61b9af8aa45535696fc15681c661b85cf6bae0a7d4c7950daaa9e"
img = Image.open(src).convert("RGB")
a = np.asarray(img).astype(int)

reg = a[180:460, 980:1620].reshape(-1, 3)
sel = reg[(reg[:, 2] > 120) & (reg[:, 2] > reg[:, 0] + 30)]
lum = sel.sum(axis=1)
order = np.argsort(lum)
for pct in (50, 75, 90, 97):
    k = order[int(len(order) * pct / 100)]
    r, g, b = sel[k]
    print(f"p{pct}: #{r:02X}{g:02X}{b:02X}")
