"""Check every approved public copy fragment against rendered HTML."""
import json,re,sys,urllib.request
from html.parser import HTMLParser
from pathlib import Path
class CopyParser(HTMLParser):
    def __init__(self):
        super().__init__();self.parts=[];self.skip=0;self.journey_parts=[];self.in_journey=False
    def handle_starttag(self,tag,attrs):
        if tag in ('script','style'):self.skip+=1
        if tag=='img':self.parts.append(dict(attrs).get('alt',''))
        if tag=='ol' and 'journey-nav' in dict(attrs).get('class',''):self.in_journey=True
    def handle_endtag(self,tag):
        if tag=='ol':self.in_journey=False
        if tag in ('script','style'):self.skip-=1
    def handle_data(self,data):
        if not self.skip:self.parts.append(data)
        if self.in_journey:self.journey_parts.append(data)
def norm(s):return re.sub(r'[\s→↓✓✕▸×]','',s)
source=json.loads(Path('content/copy.json').read_text())
html=urllib.request.urlopen(sys.argv[1] if len(sys.argv)>1 else 'http://localhost:5173/').read().decode()
p=CopyParser();p.feed(html);rendered=norm(' '.join(p.parts));missing=[];checked=0
for i,section in enumerate(source):
    for j,line in enumerate(section):
        # Layout directions, not public copy: graphical menu notation and screenshot brief.
        if (i,j) in ((0,0),(1,7)):continue
        # Explicitly removed by the client in revision 5; keep the original source intact.
        if (i,j)==(1,8):
            assert norm(line) not in rendered, 'Removed hero caption must not be rendered'
            continue
        checked+=1
        # Step numbers are presentation; require the seven official labels in exact order.
        if (i,j)==(3,3) and p.journey_parts:
            journey=norm(re.sub(r'\b0[1-7]\b','', ' '.join(p.journey_parts)))
            if norm(line)!=journey:missing.append({'fold':i,'text':line})
        elif norm(line) not in rendered:missing.append({'fold':i,'text':line})
for label in ['Analisar minha operação','Conhecer o NoPonto Food']:
    checked+=1
    if norm(label) not in rendered:missing.append({'label':label})
assert html.count('<h1')==1,'Exactly one H1 is required'
assert len(re.findall(r'data-fold="\d+"',html))==13,'12 sections and footer are required'
assert 'Observação interna:' not in ' '.join(p.parts),'Internal note leaked'
result={'checked':checked,'missing':missing,'h1':1,'folds_with_content':13}
print(json.dumps(result,ensure_ascii=False,indent=2))
if missing:sys.exit(1)
