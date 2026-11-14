import math, random, sys
from PIL import Image, ImageDraw, ImageFilter, ImageChops
random.seed(11)
W,H=2550,640   # 8.5in x ~2.13in at 300dpi
def hexc(h): h=h.lstrip('#'); return tuple(int(h[i:i+2],16) for i in (0,2,4))
def fractal(n, rough, amp):
    # midpoint displacement over n+1 points
    size=1
    while size<n: size*=2
    pts=[0.0]*(size+1); step=size; a=amp
    while step>1:
        half=step//2
        for i in range(half,size,step):
            pts[i]=(pts[i-half]+pts[i+half])/2+random.uniform(-a,a)
        a*=rough; step=half
    return pts[:n+1]
def edge(base, slope, wave, amp, rough=0.55, step=3):
    n=W//step+1; f=fractal(n,rough,amp)
    ph=random.uniform(0,6)
    return [(i*step, base + slope*(i*step) + wave*math.sin(i*step/W*math.pi*1.6+ph) + f[i] + random.uniform(-0.9,0.9)) for i in range(n+1)]
def grain(img, strength):
    n=Image.effect_noise(img.size,60).convert('L').filter(ImageFilter.GaussianBlur(0.7))
    n=n.point(lambda v:255-int((255-v)*strength))
    return ImageChops.multiply(img,Image.merge('RGB',(n,n,n)))
def flat(color): return grain(Image.new('RGB',(W,H),hexc(color)),0.16)

canvas=flat('#F5EEE1')
# faint fibers on the base sheet
d=ImageDraw.Draw(canvas)
for _ in range(260):
    x,y=random.uniform(0,W),random.uniform(0,H); l=random.uniform(6,22); a=random.uniform(0,math.pi)
    d.line([(x,y),(x+l*math.cos(a),y+l*math.sin(a))],fill=(226,216,198),width=1)

# back to front: (base y at x=0, slope, wave, colour)
layers=[(230,-0.06,30,'#D9BF98'),   # kraft
        (300,-0.025,34,'#B7C4A8'),   # sage
        (395,-0.065,16,'#F6B79A'),   # peach
        (420,-0.01,22,'#7E8F3A'),    # moss
        (500,-0.04,12,'#23402F')]    # forest felt
for base,slope,wave,col in layers:
    e=edge(base,slope,wave,amp=26)
    poly=e+[(W,H),(0,H)]
    # white fibrous rim: same tear, lifted by a ragged, varying thickness
    rim=[(x, y-(5+7*abs(math.sin(x/97.0))+random.uniform(0,6))) for x,y in e]
    rimpoly=rim+[(W,H),(0,H)]
    # soft shadow under the rim
    sh=Image.new('L',(W,H),0); ImageDraw.Draw(sh).polygon([(x,y-2) for x,y in rim]+[(W,H),(0,H)],fill=95)
    sh=sh.filter(ImageFilter.GaussianBlur(7)); s2=Image.new('L',(W,H),0); s2.paste(sh.crop((0,0,W,H-5)),(0,5)); sh=s2
    canvas=Image.composite(Image.new('RGB',(W,H),(40,36,30)),canvas,sh)
    rm=Image.new('L',(W,H),0); ImageDraw.Draw(rm).polygon(rimpoly,fill=255)
    rimcol=grain(Image.new('RGB',(W,H),(250,247,240)),0.10)
    canvas=Image.composite(rimcol,canvas,rm)
    m=Image.new('L',(W,H),0); ImageDraw.Draw(m).polygon(poly,fill=255)
    m=m.filter(ImageFilter.GaussianBlur(0.6))
    canvas=Image.composite(flat(col),canvas,m)
# bottom of the banner tears into the white page
e=edge(H-70,0.012,10,amp=18)
rim=[(x, y+(4+6*abs(math.sin(x/83.0))+random.uniform(0,5))) for x,y in e]
page=Image.new('RGB',(W,H),(255,255,255))
sh=Image.new('L',(W,H),0); ImageDraw.Draw(sh).polygon(rim+[(W,0),(0,0)],fill=70)
sh=sh.filter(ImageFilter.GaussianBlur(8)); s2=Image.new('L',(W,H),0); s2.paste(sh.crop((0,0,W,H-6)),(0,6))
page=Image.composite(Image.new('RGB',(W,H),(40,36,30)),page,s2)
rm=Image.new('L',(W,H),0); ImageDraw.Draw(rm).polygon(rim+[(W,0),(0,0)],fill=255)
page=Image.composite(grain(Image.new('RGB',(W,H),(250,247,240)),0.10),page,rm)
m=Image.new('L',(W,H),0); ImageDraw.Draw(m).polygon(e+[(W,0),(0,0)],fill=255); m=m.filter(ImageFilter.GaussianBlur(0.6))
canvas=Image.composite(canvas,page,m)
canvas.save(sys.argv[1] if len(sys.argv)>1 else 'banner-collage.jpg',quality=88,optimize=True)
print('ok')
