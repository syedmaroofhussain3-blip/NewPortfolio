import { supabase } from "@/integrations/supabase/client";

export interface FocusArea { title: string; description: string; }
export interface SocialLink { label: string; href: string; }
export interface Project { title: string; description: string; href: string; }
export interface Certification { id: number; title: string; description: string; imageSrc: string; tag: string; }
export interface Education { title: string; institution: string; status: string; highlight: string; }
export interface SkillCategory { category: string; items: string; }
export interface ContactInfo { location: string; email: string; }

export interface AboutData { bio: string[]; focusAreas: FocusArea[]; socialLinks: SocialLink[]; }
export interface ProjectsData { projects: Project[]; }
export interface CertificationsData { certifications: Certification[]; education: Education[]; }
export interface ContactData { contactInfo: ContactInfo; socialLinks: SocialLink[]; }
export interface ResumeData {
  name: string; title: string; email: string; location: string; github: string; summary: string;
  education: { degree: string; institution: string; period: string; detail: string }[];
  skills: SkillCategory[];
  projects: { name: string; description: string }[];
  achievements: string[];
}

export interface PortfolioData {
  about: AboutData;
  projects: ProjectsData;
  certifications: CertificationsData;
  contact: ContactData;
  resume: ResumeData;
}

export async function fetchSection<K extends keyof PortfolioData>(section: K): Promise<PortfolioData[K] | null> {
  const { data, error } = await supabase
    .from("portfolio_content")
    .select("data")
    .eq("section", section)
    .single();

  if (error || !data) return null;
  return data.data as unknown as PortfolioData[K];
}

export async function fetchAllSections(): Promise<PortfolioData | null> {
  const { data, error } = await supabase
    .from("portfolio_content")
    .select("section, data");

  if (error || !data) return null;

  const result: Record<string, unknown> = {};
  for (const row of data) {
    result[row.section] = row.data;
  }
  return result as unknown as PortfolioData;
}

export async function saveSection<K extends keyof PortfolioData>(
  section: K,
  sectionData: PortfolioData[K]
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("portfolio_content")
    .update({ data: sectionData as unknown as Record<string, never>, updated_at: new Date().toISOString() })
    .eq("section", section);

  return { error: error?.message ?? null };
}
