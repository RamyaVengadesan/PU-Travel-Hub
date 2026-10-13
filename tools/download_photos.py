"""Optional: download every photo the site uses into img/photos/ so the site works offline / on your own hosting.
Run on your own computer:   python tools/download_photos.py
Then in js/app.js set  CFG.local = true.
Photos are from Pexels (free to use, attribution appreciated)."""
import os, re, sys, time, urllib.request
here = os.path.dirname(os.path.abspath(__file__))
data = open(os.path.join(here, '..', 'js', 'data.js'), encoding='utf-8').read()
ids = sorted(set(re.findall(r'"[a-z0-9_]+":\[(\d+),"', data)))
out = os.path.join(here, '..', 'img', 'photos'); os.makedirs(out, exist_ok=True)
ok = bad = 0
for i in ids:
    dest = os.path.join(out, i + '.jpg')
    if os.path.exists(dest): continue
    url = f'https://images.pexels.com/photos/{i}/pexels-photo-{i}.jpeg?auto=compress&cs=tinysrgb&w=1800'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        open(dest, 'wb').write(urllib.request.urlopen(req, timeout=30).read()); ok += 1
    except Exception as e:
        bad += 1; print('failed', i, e)
    time.sleep(0.2)
print(f'done: {ok} downloaded, {bad} failed, {len(ids)} total')
