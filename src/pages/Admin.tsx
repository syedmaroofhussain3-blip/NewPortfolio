import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Shield, Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import { fetchAllSections, saveSection, type PortfolioData } from '@/data/portfolioStore';
import { useToast } from '@/hooks/use-toast';

type ActiveSection = 'about' | 'projects' | 'certifications' | 'contact' | 'resume' | null;

const Admin = () => {
  const { isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) navigate('/login');
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    fetchAllSections().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  if (authLoading || loading || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground font-mono">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const handleSignOut = () => { signOut(); navigate('/'); };

  const handleSave = async (section: keyof PortfolioData) => {
    setSaving(true);
    const { error } = await saveSection(section, data[section]);
    setSaving(false);
    if (error) {
      toast({ title: "Error saving", description: error, variant: "destructive" });
    } else {
      toast({ title: `${section.charAt(0).toUpperCase() + section.slice(1)} saved!` });
    }
  };

  const inputClass = "w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm";
  const labelClass = "text-sm font-mono text-muted-foreground mb-1.5 block";
  const cardClass = "rounded-xl bg-card/50 border border-border/30 p-5 space-y-4";
  const saveBtn = (section: keyof PortfolioData) => (
    <button onClick={() => handleSave(section)} disabled={saving}
      className="flex items-center gap-2 bg-primary text-primary-foreground font-mono font-medium rounded-lg px-6 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-50">
      <Save className="w-4 h-4" /> {saving ? 'Saving...' : `Save ${section.charAt(0).toUpperCase() + section.slice(1)}`}
    </button>
  );

  const sections = [
    { key: 'about' as const, label: 'About', desc: 'Edit bio, focus areas & social links' },
    { key: 'projects' as const, label: 'Projects', desc: 'Add, edit or remove projects' },
    { key: 'certifications' as const, label: 'Certifications', desc: 'Manage certifications & education' },
    { key: 'contact' as const, label: 'Contact', desc: 'Update contact info & social links' },
    { key: 'resume' as const, label: 'Resume', desc: 'Edit resume details & achievements' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/30 bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {activeSection && (
              <button onClick={() => setActiveSection(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <Shield className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold font-mono text-foreground">
              {activeSection ? sections.find(s => s.key === activeSection)?.label : 'Admin Dashboard'}
            </h1>
          </div>
          <button onClick={handleSignOut} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-sm">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {!activeSection ? (
            <>
              <p className="text-muted-foreground font-mono mb-8">Choose a section to edit.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sections.map((s) => (
                  <button key={s.key} onClick={() => setActiveSection(s.key)}
                    className="rounded-xl bg-card/50 border border-border/30 p-6 hover:border-primary/30 transition-colors text-left">
                    <h3 className="font-mono font-semibold text-foreground mb-2">{s.label}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </button>
                ))}
              </div>
            </>
          ) : activeSection === 'about' ? (
            <div className="space-y-6">
              <div className={cardClass}>
                <h3 className="font-mono font-semibold text-foreground">Bio Paragraphs</h3>
                {data.about.bio.map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <textarea value={p} onChange={(e) => { const bio = [...data.about.bio]; bio[i] = e.target.value; setData({ ...data, about: { ...data.about, bio } }); }}
                      rows={3} className={inputClass + " resize-none"} />
                    <button onClick={() => { const bio = data.about.bio.filter((_, idx) => idx !== i); setData({ ...data, about: { ...data.about, bio } }); }}
                      className="text-destructive hover:text-destructive/80 flex-shrink-0 mt-1"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={() => setData({ ...data, about: { ...data.about, bio: [...data.about.bio, ''] } })}
                  className="flex items-center gap-2 text-primary text-sm font-mono hover:underline"><Plus className="w-4 h-4" /> Add paragraph</button>
              </div>
              <div className={cardClass}>
                <h3 className="font-mono font-semibold text-foreground">Focus Areas</h3>
                {data.about.focusAreas.map((area, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="flex-1 space-y-2">
                      <input value={area.title} onChange={(e) => { const fa = [...data.about.focusAreas]; fa[i] = { ...fa[i], title: e.target.value }; setData({ ...data, about: { ...data.about, focusAreas: fa } }); }} placeholder="Title" className={inputClass} />
                      <textarea value={area.description} onChange={(e) => { const fa = [...data.about.focusAreas]; fa[i] = { ...fa[i], description: e.target.value }; setData({ ...data, about: { ...data.about, focusAreas: fa } }); }} rows={2} placeholder="Description" className={inputClass + " resize-none"} />
                    </div>
                    <button onClick={() => { const fa = data.about.focusAreas.filter((_, idx) => idx !== i); setData({ ...data, about: { ...data.about, focusAreas: fa } }); }}
                      className="text-destructive hover:text-destructive/80 flex-shrink-0 mt-1"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={() => setData({ ...data, about: { ...data.about, focusAreas: [...data.about.focusAreas, { title: '', description: '' }] } })}
                  className="flex items-center gap-2 text-primary text-sm font-mono hover:underline"><Plus className="w-4 h-4" /> Add focus area</button>
              </div>
              <div className={cardClass}>
                <h3 className="font-mono font-semibold text-foreground">Social Links</h3>
                {data.about.socialLinks.map((link, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input value={link.label} onChange={(e) => { const sl = [...data.about.socialLinks]; sl[i] = { ...sl[i], label: e.target.value }; setData({ ...data, about: { ...data.about, socialLinks: sl } }); }} placeholder="Label" className={inputClass + " w-1/3"} />
                    <input value={link.href} onChange={(e) => { const sl = [...data.about.socialLinks]; sl[i] = { ...sl[i], href: e.target.value }; setData({ ...data, about: { ...data.about, socialLinks: sl } }); }} placeholder="URL" className={inputClass + " flex-1"} />
                    <button onClick={() => { const sl = data.about.socialLinks.filter((_, idx) => idx !== i); setData({ ...data, about: { ...data.about, socialLinks: sl } }); }}
                      className="text-destructive hover:text-destructive/80 flex-shrink-0"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={() => setData({ ...data, about: { ...data.about, socialLinks: [...data.about.socialLinks, { label: '', href: '' }] } })}
                  className="flex items-center gap-2 text-primary text-sm font-mono hover:underline"><Plus className="w-4 h-4" /> Add link</button>
              </div>
              {saveBtn('about')}
            </div>
          ) : activeSection === 'projects' ? (
            <div className="space-y-6">
              {data.projects.projects.map((proj, i) => (
                <div key={i} className={cardClass}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-mono font-semibold text-foreground">Project {i + 1}</h3>
                    <button onClick={() => { const projects = data.projects.projects.filter((_, idx) => idx !== i); setData({ ...data, projects: { projects } }); }}
                      className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div><label className={labelClass}>Title</label>
                    <input value={proj.title} onChange={(e) => { const p = [...data.projects.projects]; p[i] = { ...p[i], title: e.target.value }; setData({ ...data, projects: { projects: p } }); }} className={inputClass} /></div>
                  <div><label className={labelClass}>Description</label>
                    <textarea value={proj.description} onChange={(e) => { const p = [...data.projects.projects]; p[i] = { ...p[i], description: e.target.value }; setData({ ...data, projects: { projects: p } }); }} rows={3} className={inputClass + " resize-none"} /></div>
                  <div><label className={labelClass}>Link URL</label>
                    <input value={proj.href} onChange={(e) => { const p = [...data.projects.projects]; p[i] = { ...p[i], href: e.target.value }; setData({ ...data, projects: { projects: p } }); }} className={inputClass} /></div>
                </div>
              ))}
              <button onClick={() => setData({ ...data, projects: { projects: [...data.projects.projects, { title: '', description: '', href: '' }] } })}
                className="flex items-center gap-2 text-primary text-sm font-mono hover:underline"><Plus className="w-4 h-4" /> Add project</button>
              {saveBtn('projects')}
            </div>
          ) : activeSection === 'certifications' ? (
            <div className="space-y-6">
              <div className={cardClass}>
                <h3 className="font-mono font-semibold text-foreground">Education</h3>
                {data.certifications.education.map((edu, i) => (
                  <div key={i} className="space-y-2 border-b border-border/20 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-muted-foreground">Entry {i + 1}</span>
                      <button onClick={() => { const ed = data.certifications.education.filter((_, idx) => idx !== i); setData({ ...data, certifications: { ...data.certifications, education: ed } }); }}
                        className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <input value={edu.title} onChange={(e) => { const ed = [...data.certifications.education]; ed[i] = { ...ed[i], title: e.target.value }; setData({ ...data, certifications: { ...data.certifications, education: ed } }); }} placeholder="Title" className={inputClass} />
                    <input value={edu.institution} onChange={(e) => { const ed = [...data.certifications.education]; ed[i] = { ...ed[i], institution: e.target.value }; setData({ ...data, certifications: { ...data.certifications, education: ed } }); }} placeholder="Institution" className={inputClass} />
                    <input value={edu.status} onChange={(e) => { const ed = [...data.certifications.education]; ed[i] = { ...ed[i], status: e.target.value }; setData({ ...data, certifications: { ...data.certifications, education: ed } }); }} placeholder="Status" className={inputClass} />
                    <input value={edu.highlight} onChange={(e) => { const ed = [...data.certifications.education]; ed[i] = { ...ed[i], highlight: e.target.value }; setData({ ...data, certifications: { ...data.certifications, education: ed } }); }} placeholder="Highlight (optional)" className={inputClass} />
                  </div>
                ))}
                <button onClick={() => setData({ ...data, certifications: { ...data.certifications, education: [...data.certifications.education, { title: '', institution: '', status: '', highlight: '' }] } })}
                  className="flex items-center gap-2 text-primary text-sm font-mono hover:underline"><Plus className="w-4 h-4" /> Add education</button>
              </div>
              <div className={cardClass}>
                <h3 className="font-mono font-semibold text-foreground">Certifications & Achievements</h3>
                {data.certifications.certifications.map((cert, i) => (
                  <div key={i} className="space-y-2 border-b border-border/20 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-muted-foreground">Cert {i + 1}</span>
                      <button onClick={() => { const c = data.certifications.certifications.filter((_, idx) => idx !== i); setData({ ...data, certifications: { ...data.certifications, certifications: c } }); }}
                        className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <input value={cert.title} onChange={(e) => { const c = [...data.certifications.certifications]; c[i] = { ...c[i], title: e.target.value }; setData({ ...data, certifications: { ...data.certifications, certifications: c } }); }} placeholder="Title" className={inputClass} />
                    <input value={cert.description} onChange={(e) => { const c = [...data.certifications.certifications]; c[i] = { ...c[i], description: e.target.value }; setData({ ...data, certifications: { ...data.certifications, certifications: c } }); }} placeholder="Description" className={inputClass} />
                    <input value={cert.imageSrc} onChange={(e) => { const c = [...data.certifications.certifications]; c[i] = { ...c[i], imageSrc: e.target.value }; setData({ ...data, certifications: { ...data.certifications, certifications: c } }); }} placeholder="Image path" className={inputClass} />
                    <input value={cert.tag} onChange={(e) => { const c = [...data.certifications.certifications]; c[i] = { ...c[i], tag: e.target.value }; setData({ ...data, certifications: { ...data.certifications, certifications: c } }); }} placeholder="Tag" className={inputClass} />
                  </div>
                ))}
                <button onClick={() => setData({ ...data, certifications: { ...data.certifications, certifications: [...data.certifications.certifications, { id: Date.now(), title: '', description: '', imageSrc: '', tag: 'Certification' }] } })}
                  className="flex items-center gap-2 text-primary text-sm font-mono hover:underline"><Plus className="w-4 h-4" /> Add certification</button>
              </div>
              {saveBtn('certifications')}
            </div>
          ) : activeSection === 'contact' ? (
            <div className="space-y-6">
              <div className={cardClass}>
                <h3 className="font-mono font-semibold text-foreground">Contact Info</h3>
                <div><label className={labelClass}>Location</label>
                  <input value={data.contact.contactInfo.location} onChange={(e) => setData({ ...data, contact: { ...data.contact, contactInfo: { ...data.contact.contactInfo, location: e.target.value } } })} className={inputClass} /></div>
                <div><label className={labelClass}>Email</label>
                  <input value={data.contact.contactInfo.email} onChange={(e) => setData({ ...data, contact: { ...data.contact, contactInfo: { ...data.contact.contactInfo, email: e.target.value } } })} className={inputClass} /></div>
              </div>
              <div className={cardClass}>
                <h3 className="font-mono font-semibold text-foreground">Social Links</h3>
                {data.contact.socialLinks.map((link, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input value={link.label} onChange={(e) => { const sl = [...data.contact.socialLinks]; sl[i] = { ...sl[i], label: e.target.value }; setData({ ...data, contact: { ...data.contact, socialLinks: sl } }); }} placeholder="Label" className={inputClass + " w-1/3"} />
                    <input value={link.href} onChange={(e) => { const sl = [...data.contact.socialLinks]; sl[i] = { ...sl[i], href: e.target.value }; setData({ ...data, contact: { ...data.contact, socialLinks: sl } }); }} placeholder="URL" className={inputClass + " flex-1"} />
                    <button onClick={() => { const sl = data.contact.socialLinks.filter((_, idx) => idx !== i); setData({ ...data, contact: { ...data.contact, socialLinks: sl } }); }}
                      className="text-destructive hover:text-destructive/80 flex-shrink-0"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={() => setData({ ...data, contact: { ...data.contact, socialLinks: [...data.contact.socialLinks, { label: '', href: '' }] } })}
                  className="flex items-center gap-2 text-primary text-sm font-mono hover:underline"><Plus className="w-4 h-4" /> Add link</button>
              </div>
              {saveBtn('contact')}
            </div>
          ) : activeSection === 'resume' ? (
            <div className="space-y-6">
              <div className={cardClass}>
                <h3 className="font-mono font-semibold text-foreground">Basic Info</h3>
                <div><label className={labelClass}>Name</label><input value={data.resume.name} onChange={(e) => setData({ ...data, resume: { ...data.resume, name: e.target.value } })} className={inputClass} /></div>
                <div><label className={labelClass}>Title</label><input value={data.resume.title} onChange={(e) => setData({ ...data, resume: { ...data.resume, title: e.target.value } })} className={inputClass} /></div>
                <div><label className={labelClass}>Email</label><input value={data.resume.email} onChange={(e) => setData({ ...data, resume: { ...data.resume, email: e.target.value } })} className={inputClass} /></div>
                <div><label className={labelClass}>Location</label><input value={data.resume.location} onChange={(e) => setData({ ...data, resume: { ...data.resume, location: e.target.value } })} className={inputClass} /></div>
                <div><label className={labelClass}>GitHub</label><input value={data.resume.github} onChange={(e) => setData({ ...data, resume: { ...data.resume, github: e.target.value } })} className={inputClass} /></div>
                <div><label className={labelClass}>Summary</label><textarea value={data.resume.summary} onChange={(e) => setData({ ...data, resume: { ...data.resume, summary: e.target.value } })} rows={3} className={inputClass + " resize-none"} /></div>
              </div>
              <div className={cardClass}>
                <h3 className="font-mono font-semibold text-foreground">Skills</h3>
                {data.resume.skills.map((s, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input value={s.category} onChange={(e) => { const sk = [...data.resume.skills]; sk[i] = { ...sk[i], category: e.target.value }; setData({ ...data, resume: { ...data.resume, skills: sk } }); }} placeholder="Category" className={inputClass + " w-1/3"} />
                    <input value={s.items} onChange={(e) => { const sk = [...data.resume.skills]; sk[i] = { ...sk[i], items: e.target.value }; setData({ ...data, resume: { ...data.resume, skills: sk } }); }} placeholder="Items" className={inputClass + " flex-1"} />
                    <button onClick={() => { const sk = data.resume.skills.filter((_, idx) => idx !== i); setData({ ...data, resume: { ...data.resume, skills: sk } }); }}
                      className="text-destructive hover:text-destructive/80 flex-shrink-0"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={() => setData({ ...data, resume: { ...data.resume, skills: [...data.resume.skills, { category: '', items: '' }] } })}
                  className="flex items-center gap-2 text-primary text-sm font-mono hover:underline"><Plus className="w-4 h-4" /> Add skill category</button>
              </div>
              <div className={cardClass}>
                <h3 className="font-mono font-semibold text-foreground">Achievements</h3>
                {data.resume.achievements.map((a, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input value={a} onChange={(e) => { const ach = [...data.resume.achievements]; ach[i] = e.target.value; setData({ ...data, resume: { ...data.resume, achievements: ach } }); }} className={inputClass + " flex-1"} />
                    <button onClick={() => { const ach = data.resume.achievements.filter((_, idx) => idx !== i); setData({ ...data, resume: { ...data.resume, achievements: ach } }); }}
                      className="text-destructive hover:text-destructive/80 flex-shrink-0"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={() => setData({ ...data, resume: { ...data.resume, achievements: [...data.resume.achievements, ''] } })}
                  className="flex items-center gap-2 text-primary text-sm font-mono hover:underline"><Plus className="w-4 h-4" /> Add achievement</button>
              </div>
              {saveBtn('resume')}
            </div>
          ) : null}
        </motion.div>
      </main>
    </div>
  );
};

export default Admin;
