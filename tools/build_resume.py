"""Build the one-page résumé (PDF via headless Chrome + DOCX for Google Docs import) from a single content dict."""
import html, pathlib, subprocess, sys
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

OUT = pathlib.Path(sys.argv[1]); OUT.mkdir(parents=True, exist_ok=True)
C = {
 "name": "Reeti Sarup",
 "title": "Staff Software Engineer, AI @ Intuit",
 "contact": "Bengaluru, India  |  linkedin.com/in/reeti-sarup  |  github.com/REETI-SARUP  |  reetisarup.medium.com  |  reeti-sarup.github.io",
 "summary": "Staff Software Engineer building AI for enterprise-scale FinTech (GenAI, Agentic AI, RL, full-stack). Launched GenAI report summaries, personalized onboarding, Smart Suggestions, Project Profitability, a self-learning RL feedback loop and large-scale real-time inference systems for QuickBooks Online Advanced and Intuit Enterprise Suite. MS CS (ML), Georgia Tech, 4.0 GPA; Gold Medalist, IGDTUW.",
 "experience": [
  ("Staff Software Engineer, Mid-Market AI Team", "Intuit", "Aug 2026 – Present", [
    "Building Mid-Market AI intelligence and an AI-native ERP for enterprise-grade FinTech.",
    "Best Industry Paper Award, AI-ML Systems 2026 (Italy). Co-Lead, Builder Culture Champions Community; internal AI trainer for the AI Adoption Accelerator."]),
  ("Senior Software Engineer, AI/ML Builder", "Intuit AI Sciences & Smart Products / Mid-Market AI", "May 2025 – Aug 2026", [
    "Architected event-driven, explainable AI/ML systems with hybrid batch + real-time inference serving millions of transactions; low-latency ANN retrieval layer.",
    "Launched models for Project Profitability, cost-allocation predictions, categorization and budget forecasting. Built Data QnA / Deep Think experience; patent filed (BizQuery agentic system)."]),
  ("Senior Software Engineer, Mid-Market AI Mission Team (GBSG)", "Intuit", "Aug 2023 – May 2025", [
    "Launched GenAI Management Report Summary (~800 beta customers) and Project Profitability with AI Goals & Insights for IES; RAG + Knowledge Graph solution.",
    "Drove self-learning platform: online RL (multi-armed bandits) scoring, pipelines and Redis for hyper-personalized top-K insights. Core contributor to Mid-Market AI Agents platform and launches."]),
  ("Software Engineer 2 / Software Engineer 1", "Intuit, QuickBooks Online Advanced", "Jul 2019 – Aug 2023", [
    "Shipped Recurring Tasks, Attachments, Data Import, AI anomaly detection (Financial Error Detection) and AI-based onboarding; ~30% page-load (TP99) improvement; Batch Transactions and Workflow Templates (React, TypeScript, GraphQL)."]),
 ],
 "highlights": [
  "Best Industry Paper Award: “Substitutes, Not Complements: Entity Features vs Fine-Tuned Embeddings for Expense Allocation”, AI-ML Systems 2026. Paper: “BizQuery: Agentic Financial QnA”, AAIML Tokyo 2026 (IEEE). Patent filed (Dec 2025).",
  "Speaker, Grace Hopper Celebration 2025 (Agentic AI Masterclass) and 2024 (LLM RAG chatbots); GHCI 2024 showcase; WiDS Bangalore emcee. Intuit awards: Star of the Quarter and Superstar (FY22–FY24), 5 Years of Excellence, 100+ Spotlight recognitions.",
 ],
 "education": [
  ("Georgia Institute of Technology", "MS Computer Science (ML), 4.0/4.0 GPA", "2021 – 2023"),
  ("IGDTUW, Delhi", "B.Tech Information Technology, Vice-Chancellor’s Gold Medal", "2015 – 2019"),
 ],
 "skills": [
  ("AI/ML", "GenAI, Agentic AI, LLMs, RAG, LangChain, LangGraph, Reinforcement Learning, Knowledge Graphs, Recommenders, Time-series"),
  ("Engineering", "Python, PySpark, Databricks, Kubeflow, Kafka, Redis, AWS, React, TypeScript, GraphQL, Java, C++, System Design"),
 ],
}
def esc(s): return html.escape(s)
h = [f"""<!doctype html><meta charset=utf-8><title>Reeti Sarup Resume</title><style>
@page{{size:Letter;margin:0.45in 0.55in}}body{{font:9.3pt/1.32 'Helvetica Neue',Arial,sans-serif;color:#1b1f2a;margin:0}}
h1{{font-size:21pt;margin:0;letter-spacing:-.4px}}.t{{color:#2b5876;font-weight:700;font-size:11pt}}.c{{color:#555;font-size:8.4pt;margin:2px 0 6px}}
h2{{font-size:9pt;letter-spacing:1.4px;text-transform:uppercase;color:#2b5876;border-bottom:1.2px solid #2b5876;margin:9px 0 4px;padding-bottom:1px}}
.r{{display:flex;justify-content:space-between;font-weight:700}}.o{{color:#444;font-weight:400}}ul{{margin:2px 0 4px 15px;padding:0}}li{{margin:0 0 1.5px}}p{{margin:0}}</style>
<h1>{esc(C['name'])}</h1><div class=t>{esc(C['title'])}</div><div class=c>{esc(C['contact'])}</div>
<h2>Summary</h2><p>{esc(C['summary'])}</p><h2>Experience</h2>"""]
for role, org, per, bl in C["experience"]:
    h.append(f"<div class=r><span>{esc(role)} <span class=o>· {esc(org)}</span></span><span class=o>{esc(per)}</span></div><ul>"+"".join(f"<li>{esc(b)}</li>" for b in bl)+"</ul>")
h.append("<h2>Research, talks & recognition</h2><ul>"+"".join(f"<li>{esc(b)}</li>" for b in C["highlights"])+"</ul><h2>Education</h2>")
for s, d, y in C["education"]: h.append(f"<div class=r><span>{esc(s)} <span class=o>· {esc(d)}</span></span><span class=o>{y}</span></div>")
h.append("<h2>Skills</h2>"+"".join(f"<p><b>{k}:</b> {esc(v)}</p>" for k, v in C["skills"]))
(OUT/"resume.html").write_text("".join(h))
chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
subprocess.run([chrome,"--headless=new","--disable-gpu","--no-pdf-header-footer",f"--print-to-pdf={OUT/'resume.pdf'}",(OUT/'resume.html').as_uri()],check=True,capture_output=True)

d = Document(); sec = d.sections[0]
for a in ("left_margin","right_margin"): setattr(sec,a,Inches(0.6))
sec.top_margin=sec.bottom_margin=Inches(0.45)
st=d.styles["Normal"]; st.font.name="Arial"; st.font.size=Pt(9)
def para(text="",bold=False,size=None,color=None,after=1,align=None):
    p=d.add_paragraph(); p.paragraph_format.space_after=Pt(after); p.paragraph_format.space_before=Pt(0)
    r=p.add_run(text); r.bold=bold
    if size: r.font.size=Pt(size)
    if color: r.font.color.rgb=RGBColor(*color)
    return p
BLUE=(0x2b,0x58,0x76)
para(C["name"],True,21,after=0); para(C["title"],True,11,BLUE,0); para(C["contact"],size=8,after=3)
def head(t): para(t.upper(),True,9,BLUE,after=1).paragraph_format.space_before=Pt(6)
head("Summary"); para(C["summary"])
head("Experience")
for role,org,per,bl in C["experience"]:
    para(f"{role}  ·  {org}  ·  {per}",True,after=0)
    for b in bl: d.add_paragraph(b,style="List Bullet").paragraph_format.space_after=Pt(0)
head("Research, talks & recognition")
for b in C["highlights"]: d.add_paragraph(b,style="List Bullet").paragraph_format.space_after=Pt(0)
head("Education")
for s,dg,y in C["education"]: para(f"{s}  ·  {dg}  ·  {y}",after=0)
head("Skills")
for k,v in C["skills"]:
    p=para(); r=p.add_run(f"{k}: "); r.bold=True; p.add_run(v)
d.save(OUT/"resume.docx")
print("built")
