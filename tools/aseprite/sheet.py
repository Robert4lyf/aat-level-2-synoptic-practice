import sys, glob, os
from PIL import Image, ImageDraw
names = sys.argv[1:-1] if len(sys.argv)>2 else None
outpath = sys.argv[-1]
DIR = os.path.dirname(os.path.abspath(__file__))
if names:
    files=[os.path.join(DIR,"out",n+".png") for n in names]
else:
    files=sorted(glob.glob(os.path.join(DIR,"out","*.png")))
    files=[f for f in files if not os.path.basename(f).startswith("_")]
SCALE=5; PAD=10; LBL=12; COLS=6
cw=max(Image.open(f).width for f in files)*SCALE
ch=max(Image.open(f).height for f in files)*SCALE
cellw,cellh=cw+PAD,ch+PAD+LBL
rows=(len(files)+COLS-1)//COLS
sheet=Image.new("RGBA",(cellw*COLS,cellh*rows),(46,46,54,255))
d=ImageDraw.Draw(sheet)
for i,f in enumerate(files):
    im=Image.open(f).convert("RGBA")
    im=im.resize((im.width*SCALE,im.height*SCALE),Image.NEAREST)
    cx=(i%COLS)*cellw; cy=(i//COLS)*cellh
    ox=cx+(cellw-im.width)//2; oy=cy+PAD//2
    for yy in range(0,im.height,10):
        for xx in range(0,im.width,10):
            col=(64,64,74) if ((xx//10+yy//10)%2==0) else (82,82,92)
            d.rectangle([ox+xx,oy+yy,ox+xx+9,oy+yy+9],fill=col)
    sheet.alpha_composite(im,(ox,oy))
    d.text((cx+4,cy+cellh-LBL),os.path.basename(f)[:-4],fill=(235,235,240))
sheet.save(outpath); print("saved",sheet.size,len(files),"assets")
