import { useResumeStore } from "@/store/useResumeStore";

export default function ResumeTemplate() {
  const { data, template } = useResumeStore();

  const basePaperStyles = "w-full min-h-[297mm] bg-white text-black leading-tight shadow-none resume-wrapper";

  const templateConfigs: Record<string, string> = {
    modern: `${basePaperStyles} font-sans p-12`,
    classic: `${basePaperStyles} font-serif p-14 tracking-tight`,
    minimal: `${basePaperStyles} font-mono p-8 tracking-tighter`,
    sidebar: `${basePaperStyles} font-sans flex`,
    executive: `${basePaperStyles} font-sans p-12 tracking-tight`,
    garamond: `${basePaperStyles} font-serif p-14`,
    professional: `${basePaperStyles} font-sans p-12 leading-snug`,
  };

  // 1. PROFESSIONAL TEMPLATE (Your Requested Format)
  if (template === 'professional') {
    return (
      <div className={`${templateConfigs.professional} resume-wrapper`}>
        {/* HEADER */}
        <header className="text-center border-b border-slate-300 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">{data.personalInfo.fullName}</h1>
          <p className="text-sm font-medium text-slate-700 mt-1">{data.personalInfo.role || "Full-Stack Developer"}</p>
          <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-600 mt-2">
            <span>{data.personalInfo.location}</span>
            <span>|</span>
            <span>{data.personalInfo.phone}</span>
            <span>|</span>
            <span>{data.personalInfo.email}</span>
            {data.personalInfo.link && (
              <>
                <span>|</span>
                <span>{data.personalInfo.link}</span>
              </>
            )}
          </div>
        </header>

        {/* SUMMARY */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 mb-2 pb-1 text-left">Professional Summary</h2>
          <p className="text-[11px] text-slate-800 leading-relaxed text-left">
            {data.summary}
          </p>
        </section>

        {/* SKILLS */}
        <section className="mb-6 text-left">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 mb-2 pb-1">Technical Skills</h2>
          <div className="text-[11px] text-slate-800 leading-relaxed">
             {data.skills.join(" • ")}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="mb-6 text-left">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 mb-3 pb-1">Professional Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="font-bold text-[12px] text-slate-900">{exp.role}</h3>
                <span className="text-[10px] font-semibold text-slate-600 uppercase">{exp.date}</span>
              </div>
              <p className="text-[11px] font-medium text-slate-700 mb-1.5">{exp.company}</p>
              <ul className="list-disc ml-5 text-[11px] text-slate-800 space-y-1">
                {exp.description.map((bullet, idx) => (
                  <li key={idx} className="pl-1">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* EDUCATION */}
        <section className="text-left">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 mb-3 pb-1">Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} className="flex justify-between items-baseline">
              <div>
                <p className="text-[11px] font-bold text-slate-900">{edu.degree}</p>
                <p className="text-[10px] text-slate-700">{edu.school}</p>
              </div>
              <span className="text-[10px] font-semibold text-slate-600">{edu.year}</span>
            </div>
          ))}
        </section>
      </div>
    );
  }

  // 2. SIDEBAR TEMPLATE
  if (template === 'sidebar') {
    return (
      <div className={templateConfigs.sidebar}>
        <div className="w-[35%] bg-slate-800 text-white p-10">
          <h1 className="text-2xl font-black uppercase mb-5 tracking-wide leading-none">{data.personalInfo.fullName}</h1>
          <div className="text-[11px] space-y-2.5 opacity-85">
            <p>{data.personalInfo.location}</p>
            <p>{data.personalInfo.phone}</p>
            <p>{data.personalInfo.email}</p>
          </div>
          <div className="mt-12">
            <h2 className="text-xs font-bold uppercase border-b border-white/20 mb-4 pb-1 tracking-widest">Skills</h2>
            <div className="flex flex-wrap gap-1.5 text-left">
              {data.skills.map((s, i) => <span key={i} className="bg-white/10 px-2.5 py-1.5 rounded text-[10px]">{s}</span>)}
            </div>
          </div>
        </div>
        <div className="w-[65%] p-10 text-left">
            <h2 className="text-base font-extrabold text-slate-900 border-b-2 border-slate-900 mb-5 uppercase tracking-wider">Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-5">
                <p className="font-bold text-sm text-slate-800">{exp.role} @ <span className='font-normal text-slate-600'>{exp.company}</span></p>
                <p className="text-[10px] text-slate-500 mb-1.5">{exp.date}</p>
                <ul className="list-disc ml-5 text-[11px] space-y-1 text-slate-700">
                  {exp.description.map((d, j) => <li key={j}>{d}</li>)}
                </ul>
              </div>
            ))}
        </div>
      </div>
    );
  }

  // 3. EXECUTIVE TEMPLATE
  if (template === 'executive') {
    return (
      <div className={templateConfigs.executive}>
        <div className="flex justify-between items-start border-b-4 border-slate-900 pb-5 mb-8">
            <h1 className="text-3xl font-extrabold uppercase text-slate-950 tracking-tighter leading-none">{data.personalInfo.fullName}</h1>
            <div className="text-[10px] text-right space-y-0.5 text-slate-700">
                <p>{data.personalInfo.location}</p>
                <p>{data.personalInfo.phone}</p>
                <p>{data.personalInfo.email}</p>
            </div>
        </div>
        
        <section className="mb-7 text-left">
            <h2 className="text-sm font-black uppercase text-slate-900 tracking-wider mb-4">Experience</h2>
            {data.experience.map((exp, i) => (
                <div key={i} className="mb-5 grid grid-cols-[1fr,auto] gap-x-4">
                    <p className="font-bold text-xs text-slate-900">{exp.role}</p>
                    <p className="text-[11px] font-medium text-slate-700">{exp.date}</p>
                    <p className="italic text-xs text-slate-600 col-span-2 mb-1.5">{exp.company}</p>
                    <ul className="list-disc ml-5 text-[11px] space-y-1 text-slate-800 col-span-2">
                        {exp.description.map((d, j) => <li key={j}>{d}</li>)}
                    </ul>
                </div>
            ))}
        </section>

        <section className="text-left">
            <h2 className="text-sm font-black uppercase text-slate-900 tracking-wider mb-3">Core Competencies</h2>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-slate-800">
                {data.skills.map((s, i) => <span key={i} className='bg-slate-100 px-2 py-0.5'>{s}</span>)}
            </div>
        </section>
      </div>
    );
  }

  // 4. GARAMOND TEMPLATE
  if (template === 'garamond') {
    return (
      <div className={templateConfigs.garamond}>
        <div className="text-center mb-10 font-serif">
            <h1 className="text-3xl text-slate-950 tracking-tight leading-none mb-1.5">{data.personalInfo.fullName}</h1>
            <div className="text-[11px] flex justify-center gap-4 text-slate-700">
                <span>{data.personalInfo.location}</span>
                <span>{data.personalInfo.phone}</span>
                <span>{data.personalInfo.email}</span>
            </div>
        </div>
        
        <section className="mb-8 font-serif text-left">
            <h2 className="text-center text-base font-bold text-slate-900 mb-5 tracking-wide underline underline-offset-4 decoration-slate-300">Professional History</h2>
            {data.experience.map((exp, i) => (
                <div key={i} className="mb-6">
                    <div className="flex justify-between items-baseline mb-0.5">
                        <p className="font-bold text-sm text-slate-950">{exp.company}</p>
                        <p className="text-[11px] text-slate-600 italic">{exp.date}</p>
                    </div>
                    <p className="italic text-xs text-slate-800 mb-2">{exp.role}</p>
                    <ul className="list-disc ml-5 text-[11px] space-y-1.5 text-slate-800">
                        {exp.description.map((d, j) => <li key={j}>{d}</li>)}
                    </ul>
                </div>
            ))}
        </section>

        <section className="font-serif text-center">
            <h2 className="text-base font-bold text-slate-900 mb-4 tracking-wide">Skills & Expertise</h2>
            <p className="text-[11px] leading-relaxed text-slate-800 max-w-xl mx-auto italic">{data.skills.join(" ⬥ ")}</p>
        </section>
      </div>
    );
  }

  // 5. FALLBACK (MODERN / CLASSIC / MINIMAL)
  return (
    <div className={templateConfigs[template] || templateConfigs.modern}>
      <header className={`text-center ${template === 'minimal' ? 'mb-6' : 'mb-10'}`}>
        <h1 className={`font-bold uppercase tracking-tight ${template === 'modern' ? 'text-2xl text-slate-900' : ''} ${template === 'classic' ? 'text-3xl text-black' : ''} ${template === 'minimal' ? 'text-xl tracking-tighter bg-black text-white px-3 py-1 inline-block' : ''}`}>
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div className={`flex justify-center gap-3 text-[11px] mt-2 opacity-80 ${template === 'minimal' ? 'font-mono' : ''}`}>
          <span>{data.personalInfo.location}</span> | <span>{data.personalInfo.phone}</span> | <span>{data.personalInfo.email}</span>
        </div>
      </header>

      <section className="mb-7 text-left">
        <h2 className={`text-sm font-black border-b-2 ${template === 'minimal' ? 'border-zinc-900' : 'border-current'} mb-4 uppercase tracking-widest`}>Experience</h2>
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-5">
            <div className="flex justify-between font-bold text-xs text-slate-900">
              <span>{exp.company}</span>
              <span>{exp.date}</span>
            </div>
            <p className={`text-xs mb-2 ${template === 'modern' ? 'text-blue-700 font-medium' : 'italic text-slate-700'}`}>{exp.role}</p>
            <ul className="list-disc ml-5 text-[11px] space-y-1 text-slate-800">
              {exp.description.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="text-left">
        <h2 className={`text-sm font-black border-b-2 ${template === 'minimal' ? 'border-zinc-900' : 'border-current'} mb-3 uppercase tracking-widest`}>Skills</h2>
        <p className={`text-xs leading-relaxed text-slate-800 ${template === 'minimal' ? 'font-mono' : ''}`}>{data.skills.join(" • ")}</p>
      </section>
    </div>
  );
}