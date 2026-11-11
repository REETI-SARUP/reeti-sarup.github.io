"""Build the one-page resume (PDF via headless Chrome + DOCX for Google Docs import) from a single content dict.
Layout follows the previous resume: a skills/positions sidebar and a main column of experience, education and accomplishments."""
import html, pathlib, subprocess, sys
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

OUT = pathlib.Path(sys.argv[1]); OUT.mkdir(parents=True, exist_ok=True)

C = {
 "name": "Reeti Sarup",
 "title": "Staff Software Engineer, AI",
 "contact": ["linkedin.com/in/reeti-sarup", "reeti.sarup@gmail.com", "reeti-sarup.github.io", "github.com/REETI-SARUP", "reetisarup.medium.com", "Bangalore, India"],
 "summary": "Staff Software Engineer building production AI for enterprise-scale FinTech: GenAI, Agentic AI, RL, ML systems and full-stack. Best Industry Paper (AIMLSystems 2026), patent filed, GHC 2024 and 2025 speaker. MS CS (ML), Georgia Tech, 4.0/4.0 GPA.",
 "skills": [
  ("Technologies & Tools", "Python, AI, GenAI, LLMs, Agentic AI, RAG, Knowledge Graphs, Machine Learning, Deep Learning, Reinforcement Learning, LangGraph, LangChain, Kubeflow, PySpark, Databricks, Kafka, SQL, Redis, AWS, React, TypeScript, HTML, CSS, JavaScript, GraphQL, Apollo Client, Cypress, Playwright, Jest, C, C++, Java, Web Performance, Web Accessibility, CI/CD, Jenkins, Splunk, Amplitude, Wavefront"),
  ("Other Skills", "Agile; verbal and written communication; mentoring and onboarding; end-to-end accountability; collaborating with stakeholders and cross-functional teams across time zones."),
  ("Languages", "Fluent English and Hindi. Elementary French."),
 ],
 "positions": [
  "Co-Lead, Builder Culture Champions Community, Intuit India (tech community with Principal and Distinguished Engineers).",
  "Internal AI trainer and mentor, AI Adoption Accelerator (AAA) and Advanced React & GraphQL sessions. Panelist in Intuit's external tech webinars. Host & Emcee, WiDS Worldwide BLR 2025.",
  "Completed Intuit's W.I.L.L. leadership development program. OMSCS Student Advisory Committee, Georgia Tech.",
  "ACM Student Chapter Secretary and Lean In Circle Founder, IGDTUW. Volunteer, IIT Bombay Spoken Tutorial and Leaders For Tomorrow.",
  "Deputy Head Girl at school. Top 20 National Champion on Climate Change (CEE, 2012); invited to Rashtrapati Bhavan. All India iGenius Scholarship (2010).",
 ],
 "experience": [
  ("Staff Software Engineer, Mid-Market AI", "Intuit, Bangalore", "Aug 2026 – Present", [
    "Building Mid-Market AI intelligence and an AI-native ERP for enterprise-grade FinTech. Best Industry Paper Award for production expense-allocation ML work (AIMLSystems 2026, Italy)."]),
  ("Senior Software Engineer, AI/ML Builder", "Intuit, GBSG Mid-Market AI → AI Sciences & Smart Products → Mid-Market AI Org", "Aug 2023 – Aug 2026", [
    "<b>Agents:</b> core contributor to the Mid-Market AI Agents platform; launched AI agents and done-for-you agentic experiences for IES and QBO Advanced. Built BizQuery, a deep-research agentic QnA system: patent filed (Dec 2025), published at AAIML Tokyo 2026.",
    "<b>GenAI products:</b> launched Management Report GenAI Summary (~800 beta customers) and Project Profitability Goals & Insights for IES, delivering 2x profitability and 3x efficiency to customers. RAG + Knowledge Graph solution with human approval of AI actions.",
    "<b>ML systems at scale:</b> architected event-driven, explainable AI/ML systems with batch and real-time low-latency inference (ANN retrieval) serving millions of transactions; models for cost allocation, categorization, budget-overage and project-cost forecasting.",
    "<b>Personalization:</b> drove an online-RL (multi-armed bandit) self-learning platform with Redis and data pipelines for hyper-personalized top-K insights from live user feedback.",
    "Built AI initiatives from early experiments to beta and launch; ~2-month Adopt a Small Business immersion with a QBO Advanced customer."]),
  ("Software Engineer 2", "Intuit, QuickBooks Online Advanced", "Aug 2021 – Jul 2023", [
    "Launched Recurring Tasks, Task Attachments, In-App Notifications and Data Import. Led the Advanced GTKM onboarding upgrader with an AI intent picker and shipped Smart Suggestions: Financial Error Detection (AI anomaly detection) on Rethink transactions. Added CI/CD, monitoring and alerts."]),
  ("Software Engineer 1", "Intuit, QuickBooks Online Advanced", "Jul 2019 – Jul 2021", [
    "Cut page-load time (TP99) ~30% on top accounting workflows. Built Batch Transactions power-tools, Smart Automated Custom Workflow templates and AI workflow recommendations, supporting QBO Advanced's first 100K customers."]),
  ("Software Engineering Intern", "Intuit", "Jun – Jul 2018", ["Integrated Kafka with the Logit service to decompose a monolith. Spotlight awards; 2nd runner-up, Interns Hackathon (Voice-of-Customer classification with ML)."]),
  ("Problem Setter & Curator Intern", "Coding Ninjas, New Delhi", "Jun – Aug 2017", ["Built C++ and Java challenges for an online coding platform."]),
  ("Summer Industrial Project Trainee", "GMR, Delhi International Airport", "Jun 2016", ["Built a Java/JSP/Servlets flight-schedule web app."]),
 ],
 "education": [
  ("Georgia Institute of Technology, Atlanta, USA", "MS Computer Science, Machine Learning specialization. GPA 4.0 / 4.0", "Aug 2021 – Aug 2023"),
  ("Indira Gandhi Delhi Technical University for Women, Delhi", "B.Tech Information Technology. Vice-Chancellor's Gold Medal. Major project: bias in online news with multi-classifier LSTM. Co-authored IGI Global chapter on predicting student attrition with educational data mining.", "2015 – 2019"),
  ("Bal Bharati Public School, New Delhi", "Class 12: 96.6% (CBSE merit certificate, top 0.1% in English; 99% in Computer Science with C++). Class 10: CGPA 10/10.", "2013 – 2015"),
 ],
 "accomplishments": [
  "<b>Research:</b> Best Industry Paper Award, AIMLSystems 2026 (Italy). BizQuery, AAIML Tokyo 2026 (IEEE). Patent filed: Deep Research QnA agentic system (Dec 2025).",
  "<b>Speaking:</b> GHC Nov 2025 (USA), Agentic AI Masterclass with LangGraph, memory and human-in-the-loop (300+ in-person global audience). GHC Oct 2024 (USA), RAG chatbots with LangChain & Knowledge Graph. GHCI Nov 2024 innovation showcase. Intuit tech webinars: AI-First Engineering (2025), Modern App (2022).",
  "<b>Awards:</b> 2x Intuit India Superstar, 2x Star of the Quarter, 5 Years of Excellence, first-100K-customers milestone, 100+ Spotlight awards. Smart India Hackathon: 4th place and Innovation award (2018).",
 ],
}

def esc(s): return html.escape(s)
rich = lambda s: s  # bullets may contain <b>

def sidebar_html():
    out = []
    for k, v in C["skills"]: out.append(f"<h3>{esc(k)}</h3><p>{esc(v)}</p>")
    out.append("<h3>Leadership & Community</h3><ul>" + "".join(f"<li>{esc(p)}</li>" for p in C["positions"]) + "</ul>")
    return "".join(out)

def main_html():
    out = ["<h2>Experience</h2>"]
    for role, org, per, bl in C["experience"]:
        out.append(f"<div class=r><span><b>{esc(role)}</b> <span class=o>· {esc(org)}</span></span><span class=d>{esc(per)}</span></div><ul>" + "".join(f"<li>{rich(b)}</li>" for b in bl) + "</ul>")
    out.append("<h2>Education</h2>")
    for s, d, y in C["education"]: out.append(f"<div class=r><span><b>{esc(s)}</b></span><span class=d>{esc(y)}</span></div><p class=e>{esc(d)}</p>")
    out.append("<h2>Additional Accomplishments</h2><ul>" + "".join(f"<li>{rich(a)}</li>" for a in C["accomplishments"]) + "</ul>")
    return "".join(out)

SIZE = float(sys.argv[2]) if len(sys.argv) > 2 else 7.6
page = f"""<!doctype html><meta charset=utf-8><title>Reeti Sarup Resume</title><style>
@page{{size:Letter;margin:0.32in 0.38in}}*{{box-sizing:border-box}}
body{{font:{SIZE}pt/1.28 'Helvetica Neue',Arial,sans-serif;color:#1b1f2a;margin:0}}
header{{border-bottom:1.6px solid #2b5876;padding-bottom:4px;margin-bottom:6px}}
h1{{font-size:20pt;margin:0;letter-spacing:.5px;text-transform:uppercase}}.t{{color:#2b5876;font-weight:700;font-size:10.5pt}}
.c{{display:flex;flex-wrap:wrap;gap:1px 12px;color:#444;font-size:{SIZE}pt;margin-top:2px}}
.sum{{margin:0 0 5px;color:#333}}
.grid{{display:grid;grid-template-columns:2.05in 1fr;gap:0 14px}}
h2,h3{{font-size:{SIZE+0.8}pt;letter-spacing:1.2px;text-transform:uppercase;color:#2b5876;margin:6px 0 2px;border-bottom:1px solid #2b5876;padding-bottom:1px}}
h3{{border:0;font-size:{SIZE+0.2}pt;margin:5px 0 1px}}
.r{{display:flex;justify-content:space-between;gap:8px;margin-top:3px}}.o{{color:#444}}.d{{color:#333;white-space:nowrap}}
ul{{margin:1px 0 2px 11px;padding:0}}li{{margin:0 0 1.2px}}p{{margin:0 0 2px}}.e{{color:#333}}aside p,aside li{{color:#222}}
</style>
<header><h1>{esc(C['name'])}</h1><div class=t>{esc(C['title'])}</div><div class=c>{''.join('<span>'+esc(x)+'</span>' for x in C['contact'])}</div></header>
<p class=sum>{esc(C['summary'])}</p>
<div class=grid><aside>{sidebar_html()}</aside><main>{main_html()}</main></div>"""
(OUT/"resume.html").write_text(page)
chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
subprocess.run([chrome, "--headless=new", "--disable-gpu", "--no-pdf-header-footer", f"--print-to-pdf={OUT/'resume.pdf'}", (OUT/'resume.html').as_uri()], check=True, capture_output=True)

# ---- DOCX (two-column table; import into Google Docs) ----
import re
d = Document(); sec = d.sections[0]
sec.left_margin = sec.right_margin = Inches(0.45); sec.top_margin = sec.bottom_margin = Inches(0.4)
st = d.styles["Normal"]; st.font.name = "Arial"; st.font.size = Pt(8)
BLUE = RGBColor(0x2b, 0x58, 0x76)
def para(cell, text="", bold=False, size=None, color=None, after=1, before=0):
    p = cell.add_paragraph(); p.paragraph_format.space_after = Pt(after); p.paragraph_format.space_before = Pt(before)
    add_runs(p, text, bold, size, color); return p
def add_runs(p, text, bold=False, size=None, color=None):
    for i, part in enumerate(re.split(r"</?b>", text)):
        if not part: continue
        r = p.add_run(part); r.bold = bold or (i % 2 == 1)
        if size: r.font.size = Pt(size)
        if color: r.font.color.rgb = color
head = d.add_paragraph(); head.paragraph_format.space_after = Pt(0)
r = head.add_run(C["name"].upper()); r.bold = True; r.font.size = Pt(20)
t = d.add_paragraph(); t.paragraph_format.space_after = Pt(0); rr = t.add_run(C["title"]); rr.bold = True; rr.font.size = Pt(10.5); rr.font.color.rgb = BLUE
c = d.add_paragraph("  |  ".join(C["contact"])); c.paragraph_format.space_after = Pt(2); c.runs[0].font.size = Pt(7.5)
s = d.add_paragraph(C["summary"]); s.paragraph_format.space_after = Pt(3)
tbl = d.add_table(rows=1, cols=2); tbl.alignment = WD_TABLE_ALIGNMENT.CENTER; tbl.autofit = False
left, right = tbl.rows[0].cells; left.width = Inches(2.05); right.width = Inches(5.5)
for cell in (left, right):
    cell.paragraphs[0].paragraph_format.space_after = Pt(0)
def h(cell, text): para(cell, text.upper(), True, 8.5, BLUE, 1, 4)
for k, v in C["skills"]: h(left, k); para(left, v, size=7.5)
h(left, "Leadership & Community")
for p_ in C["positions"]: para(left, "• " + p_, size=7.5, after=1)
h(right, "Experience")
for role, org, per, bl in C["experience"]:
    para(right, f"<b>{role}</b>  ·  {org}  ·  {per}", size=8, after=0, before=2)
    for b in bl: para(right, "• " + b, size=7.5, after=0)
h(right, "Education")
for s_, dg, y in C["education"]: para(right, f"<b>{s_}</b>  ·  {y}", size=8, after=0, before=1); para(right, dg, size=7.5, after=0)
h(right, "Additional Accomplishments")
for a in C["accomplishments"]: para(right, "• " + a, size=7.5, after=0)
d.save(OUT/"resume.docx")
print("built")
