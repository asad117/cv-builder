"use client";
import { useResumeStore } from "@/store/useResumeStore";

export default function ResumePreview() {
  const { data } = useResumeStore();

  return (
    <div className="text-black bg-white p-8 font-serif leading-tight">
      <div className="text-center border-b-2 border-slate-900 pb-3 mb-5">
        <h1 className="text-2xl font-bold uppercase">{data.personalInfo.fullName || "Name"}</h1>
        <div className="text-xs flex justify-center gap-2 mt-1">
          <span>{data.personalInfo.location}</span> | <span>{data.personalInfo.phone}</span> | <span>{data.personalInfo.email}</span>
        </div>
      </div>

      <div className="space-y-4">
        <section>
          <h2 className="text-sm font-bold border-b border-slate-300 uppercase mb-2">Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between text-xs font-bold">
                <span>{exp.role}</span>
                <span>{exp.date}</span>
              </div>
              <div className="text-xs italic">{exp.company}</div>
              <ul className="list-disc ml-4 text-[11px] mt-1">
                {exp.description.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-sm font-bold border-b border-slate-300 uppercase mb-2">Skills</h2>
          <p className="text-xs">{data.skills.join(", ")}</p>
        </section>
      </div>
    </div>
  );
}