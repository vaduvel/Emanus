import urllib.request
import re
import json

def get_webu(ch):
    url = f'https://ebible.org/engwebp/EXO{ch:02d}.htm'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    matches = re.findall(r'class="verse"\s+id="V(\d+)">(\d+)&#160;</span>(.*?)(?=<span class="verse"|<div class="footnote"|<ul class="tnav"|$)', html, re.DOTALL)
    res = {}
    for m in matches:
        v_num = int(m[0])
        v_text = re.sub(r'<a [^>]*>.*?</a>', '', m[2])
        v_text = re.sub(r'<[^>]+>', '', v_text)
        v_text = v_text.replace('&#160;', ' ').replace('&nbsp;', ' ').replace('\n', ' ')
        v_text = ' '.join(v_text.split())
        res[v_num] = v_text
    return res

if __name__ == '__main__':
    print('EXO 6 count:', len(get_webu(6)))
