import json,re,sys
raw=json.load(open(sys.argv[1]+"/awards_raw.json"))
THEMES=[("AI & GenAI",r"(?i)\b(AI|Al|GenAl|GenAI|QB\.?A[Il]|agent|LLM|Self Learning|MR |Management Report|Deep-thinking|Profitab|M#8|Fusion)"),
("Product Launches",r"(?i)launch|release|GA |shipp|Rethink|Beta|IES|Attachments|Recurring|Workflow|Data Import|FEDs|Budgets"),
("Community & Culture",r"(?i)community|newsletter|Tech Forward|Fun Friday|volunteer|culture|WiDS|Emcee|engagement|Wordle|crossword|Spot the Difference|Tech Ambassador|booth"),
("Speaking & Mentoring",r"(?i)speak|session|mentor|workshop|Teach|AAA|Hacktoberfest|Grace Hopper|blog|React Learning|Tech Stories|Hackathon|hackathon|Open Source"),
("Hiring & Leadership",r"(?i)hiring|interview|panelist|leadership|on-call|bar you raised|nomination|Above & Beyond|Quarterly")]
# Pinned (featured) Spotlights are chosen by hand; ids refer to the generated gallery images.
FEATURED_IDS=set([33, 41, 48, 56, 59, 68, 69, 82, 98, 99, 102, 105])
FEATURED_RULES=[lambda x:x["kind"] in("milestone","winners"), lambda x:x["id"] in FEATURED_IDS]
out=[]
for x in raw:
    parts=[p for p in re.split(r"\s{0}",x["text"])]
    txt=x["text"]
    first=re.split(r"(?<=[.!?]) |  ",txt)[0]
    # headline = first fragment before body if short
    m=re.match(r"^([^.!?]{8,64}?)(?:\s{1,2}(?=[A-Z][a-z]+ [a-z]+ )|$)",txt)
    title=None
    if x["kind"]=="winners": title="Customer Obsession Winner · FY23 Q4"
    elif x["kind"]=="milestone": title="5 Year Milestone at Intuit"
    elif x["kind"]=="kudoboard": title="5 Year Milestone Kudoboard"
    else:
        title=(x["value"] or "Recognition")
    themes=[t for t,p in THEMES if re.search(p,txt)] or ["Recognition"]
    feat=any(r(x) for r in FEATURED_RULES)
    out.append({"id":x["id"],"image":x["file"],"kind":x["kind"],"value":x["value"],"giver":x["giver"],"date":x["date"],"year":x["year"],"themes":themes,"featured":feat,"text":txt})
json.dump(out,open(sys.argv[1]+"/awards_curated.json","w"),indent=1)
from collections import Counter
print(Counter(y["year"] for y in out), Counter(t for y in out for t in y["themes"]), sum(y["featured"] for y in out))
for y in out[:6]+out[-6:]: print(y["id"],y["value"],y["date"],y["themes"],y["text"][:100])
