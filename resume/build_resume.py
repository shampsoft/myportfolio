from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT

INK = HexColor("#12161f")
ACCENT = HexColor("#5b4bd6")
MUTED = HexColor("#5c6579")

styles = getSampleStyleSheet()
name_style = ParagraphStyle('name', parent=styles['Title'], fontName='Helvetica-Bold',
                             fontSize=24, textColor=INK, leading=28, spaceAfter=2)
role_style = ParagraphStyle('role', parent=styles['Normal'], fontName='Helvetica-Bold',
                             fontSize=12.5, textColor=ACCENT, spaceAfter=10)
contact_style = ParagraphStyle('contact', parent=styles['Normal'], fontSize=9.5,
                                textColor=MUTED, spaceAfter=14)
h2 = ParagraphStyle('h2', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=12,
                     textColor=INK, spaceBefore=14, spaceAfter=6, borderColor=ACCENT,
                     borderWidth=0, leading=14)
body = ParagraphStyle('body', parent=styles['Normal'], fontSize=10, textColor=INK,
                       leading=14.5, alignment=TA_LEFT, spaceAfter=6)
job_title = ParagraphStyle('job_title', parent=styles['Normal'], fontName='Helvetica-Bold',
                            fontSize=10.5, textColor=INK, spaceBefore=8)
job_meta = ParagraphStyle('job_meta', parent=styles['Normal'], fontSize=9, textColor=MUTED,
                           spaceAfter=4)

doc = SimpleDocTemplate("resume.pdf", pagesize=A4,
                         topMargin=22*mm, bottomMargin=18*mm, leftMargin=20*mm, rightMargin=20*mm)

story = []
story.append(Paragraph("Anand Ojha", name_style))
story.append(Paragraph("WordPress Developer", role_style))
story.append(Paragraph(
    "Ahmedabad, Gujarat, India &nbsp;•&nbsp; anandojha1432@gmail.com &nbsp;•&nbsp; "
    "+91 6355967852 &nbsp;•&nbsp; linkedin.com/in/anand-ojha-1b2704206",
    contact_style))

story.append(Paragraph("SUMMARY", h2))
story.append(Paragraph(
    "WordPress Developer with 3+ years building WooCommerce stores, custom PHP plugins, and "
    "LifterLMS platforms for agencies serving Indian and international clients. Focused on clean, "
    "maintainable code, fast page loads, and admin experiences that are easy to hand off.", body))

story.append(Paragraph("EXPERIENCE", h2))

jobs = [
    ("WordPress Developer", "Hardy Infotech", "2024 — 2025",
     "Delivering custom WordPress and WooCommerce solutions; owning plugin architecture and client-facing feature builds end to end."),
    ("WordPress Developer", "Elite Web Solution", "2024",
     "Built and customized WooCommerce stores and Elementor sites for a fast-moving agency roster of clients."),
    ("Web Developer", "Devstree IT Pvt Ltd", "2022 — 2024",
     "Promoted from intern; shipped custom plugins, LifterLMS integrations, and REST API-driven features for production sites."),
    ("Intern", "Devstree IT Pvt Ltd", "2021 — 2022",
     "Started WordPress development journey — learned theming, custom shortcodes, and PHP fundamentals."),
]
for title, company, dates, desc in jobs:
    story.append(Paragraph(f"{title} — {company}", job_title))
    story.append(Paragraph(dates, job_meta))
    story.append(Paragraph(desc, body))

story.append(Paragraph("SKILLS", h2))
skill_lines = [
    "<b>Languages:</b> PHP, JavaScript, HTML5, CSS3, MySQL",
    "<b>WordPress:</b> WooCommerce, Elementor, LifterLMS, ACF",
    "<b>Custom Development:</b> Plugin Development, Custom Themes, Custom Post Types, Custom Shortcodes",
    "<b>Integration:</b> REST API, AJAX",
    "<b>Frameworks:</b> Bootstrap, Tailwind",
    "<b>Tools:</b> Git, VS Code, Postman, cPanel",
]
for line in skill_lines:
    story.append(Paragraph(line, body))

story.append(Paragraph("SELECTED PROJECTS", h2))
projects = [
    "LifterLMS Certificate Automation — dynamic certificate generation tied into the student completion workflow.",
    "WooCommerce Custom Store — custom checkout, payment gateway integration, AJAX product filters.",
    "Custom Plugin Development — lightweight plugins with custom shortcodes and admin settings.",
    "Figma to WordPress — pixel-perfect, fully responsive Elementor builds.",
    "Performance Optimization — caching and image optimization work that improved Core Web Vitals.",
]
for p in projects:
    story.append(Paragraph("• " + p, body))

doc.build(story)
print("done")
