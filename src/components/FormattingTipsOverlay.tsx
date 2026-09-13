import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Table, 
  Image as ImageIcon, 
  Type, 
  FileText, 
  Sparkles, 
  BookOpen, 
  Copy, 
  Check, 
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

export interface FormattingTip {
  id: string;
  category: 'layout' | 'visuals' | 'typography' | 'structure';
  title: string;
  mistake: string;
  whyItFails: string;
  solution: string;
  severity: 'critical' | 'high' | 'medium';
  icon: React.ComponentType<{ className?: string }>;
  exampleAvoid?: string;
  exampleDo?: string;
}

export const ATS_FORMATTING_TIPS: FormattingTip[] = [
  {
    id: 'tables-columns',
    category: 'layout',
    title: 'Tables & Multi-Column Layouts',
    mistake: 'Using multi-column grids, tables, or text boxes to format skills or experience.',
    whyItFails: 'ATS parsers process documents strictly left-to-right across the page. Multi-column text gets read as a continuous horizontal line, interleaving dates with job titles from opposite columns into nonsensical fragments.',
    solution: 'Use a clean single-column linear layout. Flow content naturally from top to bottom with standard tab indentation or clear line breaks.',
    severity: 'critical',
    icon: Table,
    exampleAvoid: '| Skills | Experience |\n| React  | 2021-2024  | (Scrambled horizontally)',
    exampleDo: 'EXPERIENCE\nSenior Engineer | 2021 - 2024\n\nSKILLS\nReact, TypeScript, Node.js'
  },
  {
    id: 'graphics-images',
    category: 'visuals',
    title: 'Graphics, Logos & Skill Rating Bars',
    mistake: 'Including headshots, icons (email/phone logos), infographics, or visual skill bars (e.g., 4/5 dots).',
    whyItFails: 'Applicant Tracking Systems cannot parse image data without OCR (which is rarely run and prone to noise). Skill rating bars become completely invisible, so your core competencies register as zero.',
    solution: 'Eliminate all image elements, icons, and graphic rating meters. State your skills, proficiencies, and metrics in clear written text.',
    severity: 'critical',
    icon: ImageIcon,
    exampleAvoid: 'Python: [★★★★☆] or [Graphic Progress Bar 85%]',
    exampleDo: 'Python (Advanced, 5+ years experience, production microservices)'
  },
  {
    id: 'fonts-typography',
    category: 'typography',
    title: 'Non-Standard & Decorative Fonts',
    mistake: 'Using stylized, script, calligraphy, or custom web/display fonts downloaded from Canva or Figma.',
    whyItFails: 'If the ATS server lacks the custom font glyph mapping, characters are extracted as garbled text or question mark replacement glyphs (mojibake), destroying keyword matching.',
    solution: 'Use universal system fonts supported by every operating system: Arial, Calibri, Helvetica, Georgia, Times New Roman, Garamond, or Verdana.',
    severity: 'high',
    icon: Type,
    exampleAvoid: 'Custom Google Webfonts, handwritten script, ligature-heavy fonts',
    exampleDo: 'Standard Arial, Calibri, or Helvetica (10pt - 12pt body text)'
  },
  {
    id: 'headers-footers',
    category: 'structure',
    title: 'Headers, Footers & Floating Boxes',
    mistake: 'Placing your contact information (phone, email, portfolio link, city) inside the document header or footer margin.',
    whyItFails: 'Many ATS scanners routinely discard header and footer regions to avoid parsing repeated page numbers or document stamps, leaving your contact details completely blank.',
    solution: 'Place your full name and contact information directly in the top body section of the first page.',
    severity: 'critical',
    icon: Layers,
    exampleAvoid: 'Contact info placed inside Word or PDF Header / Footer zone',
    exampleDo: 'First 3 lines of main document body:\nJohn Doe\nSan Francisco, CA | john@example.com | (555) 012-3456'
  },
  {
    id: 'special-bullets',
    category: 'typography',
    title: 'Exotic Bullets & Emojis',
    mistake: 'Using decorative arrows (➔, ➤), diamond symbols (◆), checkmarks (✔), or emojis as list bullets.',
    whyItFails: 'Exotic unicode symbols often fail UTF-8/ASCII conversion during parsing, rendering as "???" or breaking parser sentence segmentation.',
    solution: 'Stick strictly to standard round bullet points (•) or basic hyphens (-) followed by an active verb.',
    severity: 'medium',
    icon: FileText,
    exampleAvoid: '➔ Led migration to React 18\n✔ Boosted page speed by 40%',
    exampleDo: '• Led migration to React 18\n• Boosted page speed by 40%'
  },
  {
    id: 'section-headers',
    category: 'structure',
    title: 'Unrecognized Creative Section Titles',
    mistake: 'Using poetic or informal headings like "Where I\'ve Been", "My Superpowers", or "Life Highlights".',
    whyItFails: 'ATS algorithms rely on standard taxonomy keywords to segment your resume into sections. Unusual headings cause entire sections to be misclassified or discarded.',
    solution: 'Use standard, universally recognized headers: "Work Experience", "Education", "Skills", "Projects", "Certifications".',
    severity: 'high',
    icon: BookOpen,
    exampleAvoid: 'Heading: "My Creative Toolkit" or "Where I Have Excelled"',
    exampleDo: 'Heading: "Work Experience" or "Technical Skills"'
  }
];

interface FormattingTipsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate?: (template: string) => void;
}

export const ATS_CLEAN_TEMPLATE = `JOHN DOE
San Francisco, CA | (555) 012-3456 | john.doe@email.com | linkedin.com/in/johndoe | github.com/johndoe

PROFESSIONAL SUMMARY
Results-driven Senior Full-Stack Engineer with 6+ years of experience architecting high-traffic web applications with React, TypeScript, and Node.js. Proven track record of improving system performance by 35% and mentoring engineering teams.

CORE SKILLS
• Languages: TypeScript, JavaScript (ES6+), Python, HTML5, CSS3, SQL
• Frameworks & Libraries: React, Next.js, Express, Tailwind CSS, Redux Toolkit
• Tools & Platforms: Git, Docker, AWS (S3, Lambda), PostgreSQL, Jest, CI/CD Pipelines

PROFESSIONAL EXPERIENCE
Senior Software Engineer | Acme Corporation | San Francisco, CA
03/2021 – Present
• Architected modular micro-frontend architecture using React and TypeScript, reducing page load time by 42%.
• Built automated CI/CD pipeline using GitHub Actions, decreasing deployment failure rates from 12% to under 1%.
• Led a distributed team of 6 engineers, conducting bi-weekly code reviews and driving engineering best practices.

Software Engineer | TechStart Labs | San Jose, CA
06/2018 – 02/2021
• Developed RESTful API microservices in Node.js and PostgreSQL serving over 500,000 daily active users.
• Implemented end-to-end testing with Cypress and unit testing with Jest, achieving 92% test coverage.
• Optimized database queries and indexing strategies, reducing query latency by 38%.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | 2014 – 2018

CERTIFICATIONS
• AWS Certified Solutions Architect – Associate (2023)
• Certified Scrum Master (CSM) (2022)`;

export const FormattingTipsOverlay: React.FC<FormattingTipsOverlayProps> = ({
  isOpen,
  onClose,
  onApplyTemplate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'layout' | 'visuals' | 'typography' | 'structure'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredTips = selectedCategory === 'all' 
    ? ATS_FORMATTING_TIPS 
    : ATS_FORMATTING_TIPS.filter(t => t.category === selectedCategory);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-30 rounded-3xl bg-slate-950/95 backdrop-blur-xl border border-indigo-500/30 p-6 sm:p-7 flex flex-col shadow-2xl overflow-hidden"
    >
      {/* Overlay Header */}
      <div className="flex items-start justify-between pb-4 border-b border-slate-800/80 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/10">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-bold text-white tracking-tight">
                ATS Formatting Rules
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Common Mistakes to Avoid
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Avoid tables, graphics, and non-standard fonts to guarantee 100% parser readability.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all cursor-pointer"
          title="Close Formatting Tips"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Category Navigation Bar */}
      <div className="flex items-center gap-2 py-3 overflow-x-auto shrink-0 border-b border-slate-800/40 no-scrollbar">
        {[
          { id: 'all', label: 'All Rules (6)' },
          { id: 'layout', label: 'Tables & Columns' },
          { id: 'visuals', label: 'Graphics & Logos' },
          { id: 'typography', label: 'Fonts & Bullets' },
          { id: 'structure', label: 'Headers & Structure' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800/60'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tips Scrollable Body */}
      <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-4 text-xs">
        {filteredTips.map((tip) => {
          const IconComp = tip.icon;
          return (
            <div
              key={tip.id}
              className="rounded-2xl bg-slate-900/40 border border-slate-800/70 p-4 hover:border-indigo-500/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-slate-100">
                    {tip.title}
                  </h4>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0 ${
                  tip.severity === 'critical'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {tip.severity === 'critical' ? 'Critical Red Flag' : 'High Penalty'}
                </span>
              </div>

              {/* Mistake vs Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="rounded-xl bg-rose-500/5 border border-rose-500/15 p-3">
                  <div className="flex items-center gap-1.5 text-rose-400 font-bold mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Mistake to Avoid:</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed mb-2">
                    {tip.mistake}
                  </p>
                  <p className="text-slate-400 text-[10px] italic leading-relaxed border-t border-rose-500/10 pt-1.5">
                    <strong className="text-rose-300/80 not-italic">Why it breaks ATS:</strong> {tip.whyItFails}
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-3">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Safe ATS Standard:</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed mb-2">
                    {tip.solution}
                  </p>
                  {tip.exampleDo && (
                    <div className="mt-1.5 pt-1.5 border-t border-emerald-500/10">
                      <div className="flex items-center justify-between text-[10px] text-emerald-400/80 font-mono">
                        <span>Safe Format Pattern:</span>
                        <button
                          onClick={() => handleCopy(tip.exampleDo!, tip.id)}
                          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedId === tip.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-[9px]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span className="text-[9px]">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="mt-1 text-[10px] bg-slate-950/70 p-2 rounded-lg text-slate-300 font-mono whitespace-pre-wrap">
                        {tip.exampleDo}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overlay Footer Actions */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>Need a clean start? You can load our pre-tested ATS plain-text template.</span>
        </div>

        <div className="flex items-center gap-2">
          {onApplyTemplate && (
            <button
              onClick={() => {
                onApplyTemplate(ATS_CLEAN_TEMPLATE);
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Load ATS Template
            </button>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-white/5"
          >
            <span>Back to Resume</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
