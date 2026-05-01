
// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useResumeStore } from "@/store/useResumeStore";
// import ResumeTemplate from "@/components/Templates";
// import { useReactToPrint } from "react-to-print";
// import { 
//   Wand2, 
//   Download, 
//   ChevronDown, 
//   FileText, 
//   Eye,
//   PenLine,
//   FileEdit
// } from "lucide-react";

// export default function Home() {
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showDownloadMenu, setShowDownloadMenu] = useState(false);
//   const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  
//   const { data, setFullData, setTemplate, template } = useResumeStore();
//   const printRef = useRef<HTMLDivElement>(null);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     const closeMenu = () => setShowDownloadMenu(false);
//     if (showDownloadMenu) window.addEventListener("click", closeMenu);
//     return () => window.removeEventListener("click", closeMenu);
//   }, [showDownloadMenu]);

//   // PRINT CONFIGURATION

// const handlePrint = useReactToPrint({
//   contentRef: printRef,
//   documentTitle: `${data.personalInfo.fullName.replace(/\s+/g, "_")}_Resume`,
//   pageStyle: `
// @page {
//     size: A4;
//     margin: 6mm; /* balanced margin */
//   }

//   @media print {
//     html, body {
//       margin: 0 !important;
//       padding: 0 !important;
//       background: white !important;
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//   }
//   `,
//   onBeforePrint: async () => {
//     await new Promise((resolve) => setTimeout(resolve, 300));
//   },
// });

//   const handleDownloadDoc = () => {
//     if (!printRef.current) return;
//     const content = printRef.current.innerHTML;
//     const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
//             "xmlns:w='urn:schemas-microsoft-com:office:word' "+
//             "xmlns='http://www.w3.org/TR/REC-html40'>"+
//             "<head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
//     const footer = "</body></html>";
//     const sourceHTML = header + content + footer;
    
//     const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
//     const fileLink = document.createElement("a");
//     document.body.appendChild(fileLink);
//     fileLink.href = source;
//     fileLink.download = `${data.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.doc`;
//     fileLink.click();
//     document.body.removeChild(fileLink);
//   };

//   const handleMagicFormat = async () => {
//     if (!text.trim()) return;
//     setLoading(true);
//     try {
//       const res = await fetch("/api/parse", {
//         method: "POST",
//         body: JSON.stringify({ text }),
//       });
//       const parsedData = await res.json();
//       setFullData(parsedData);
//       if (window.innerWidth < 1024) setActiveTab('preview');
//     } catch (e) { console.error(e); }
//     setLoading(false);
//   };

//   return (
//     <main className="flex flex-col lg:flex-row h-screen bg-[#F8FAFC] overflow-hidden">
//       {/* INJECTED PRINT STYLES */}
// <style jsx global>{`
//   @media print {

//     /* ---------- PAGE SETUP ---------- */
//     @page {
//       size: A4;
//       margin: 5mm;
//     }

//     html, body {
//       margin: 0 !important;
//       padding: 0 !important;
//       background: white !important;
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     /* ---------- MAIN CONTAINER ---------- */
//     .print-area {
//       width: 220mm !important;
//       min-height: 300mm !important;
//       margin: 0 auto !important;
//       padding: 4mm !important;
//       box-shadow: none !important;
//       transform: none !important;
//       scale: 1.12 !important;
//     }

//     /* ---------- GOOGLE DOCS STYLE BREAKING ---------- */

//     /* Keep headings with next content */
//     h1, h2, h3, h4 {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* Prevent splitting paragraphs */
//     p {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     /* Prevent list breaking badly */
//     ul, ol {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     li {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     /* Prevent section splitting */
//     section {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     /* Job/experience blocks (VERY IMPORTANT) */
//     .experience-item {
//       page-break-inside: avoid;
//       break-inside: avoid;
//       margin-bottom: 8px;
//     }

//     /* Avoid tiny leftovers at bottom */
//     .no-break {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//   }
// `}</style>

//       {/* MOBILE NAVIGATION TABS */}
//       <div className="lg:hidden flex border-b border-slate-200 bg-white">
//         <button 
//           onClick={() => setActiveTab('edit')}
//           className={`flex-1 py-4 text-xs font-bold flex items-center justify-center gap-2 ${activeTab === 'edit' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}
//         >
//           <PenLine size={16} /> Edit Content
//         </button>
//         <button 
//           onClick={() => setActiveTab('preview')}
//           className={`flex-1 py-4 text-xs font-bold flex items-center justify-center gap-2 ${activeTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}
//         >
//           <Eye size={16} /> Live Preview
//         </button>
//       </div>

//       {/* LEFT SIDEBAR */}
//  <aside className={`w-full lg:w-[450px] bg-white border-r border-slate-200 flex flex-col shadow-xl z-10 
//   ${activeTab === 'edit' ? 'flex' : 'hidden lg:flex'} 
//   /* FIX: Allow scrolling on the whole sidebar for mobile */
//   h-full overflow-y-auto lg:overflow-hidden`}>
        
//         <div className="p-6 border-b border-slate-100 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//   <img src="/logo.svg" alt="CV.AI Logo" className="w-10 h-10" />
//   <h1 className="font-bold text-xl text-slate-800 tracking-tight">
//     CV<span className="text-blue-600">.AI</span>
//   </h1>
// </div>

//           <div className="relative" onClick={(e) => e.stopPropagation()}>
//             <button 
//               onClick={() => setShowDownloadMenu(!showDownloadMenu)}
//               className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-black transition-all"
//             >
//               <Download size={14} /> Download <ChevronDown size={12} className={showDownloadMenu ? 'rotate-180' : ''} />
//             </button>
            
//             {showDownloadMenu && (
//               <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
//                 <button onClick={handlePrint} className="w-full text-left px-4 py-3 text-xs font-semibold hover:bg-blue-50 flex items-center gap-3 transition-colors border-b border-slate-50">
//                   <FileText size={16} className="text-red-500" />
//                   <div><p className="text-slate-800 font-bold">Professional PDF</p></div>
//                 </button>
                
//                 {/* WORD/DOC DOWNLOAD BUTTON RETAINED */}
//                 <button onClick={handleDownloadDoc} className="w-full text-left px-4 py-3 text-xs font-semibold hover:bg-blue-50 flex items-center gap-3 transition-colors">
//                   <FileEdit size={16} className="text-blue-500" />
//                   <div><p className="text-slate-800 font-bold">Microsoft Word (.doc)</p></div>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-6 space-y-6">
//           <div>
//             <label className="text-[10px] font-bold uppercase text-slate-400 mb-3 block tracking-widest">Templates</label>
//             <div className="grid grid-cols-2 gap-3">
//               {['modern', 'classic', 'minimal', 'sidebar', 'executive', 'garamond', 'professional'].map((t) => (
//                 <button
//                   key={t}
//                   onClick={() => setTemplate(t as any)}
//                   className={`py-3 px-4 rounded-xl border-2 text-xs font-bold capitalize transition-all ${
//                     template === t ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-500 hover:border-slate-200'
//                   }`}
//                 >
//                   {t}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="flex flex-col flex-1 min-h-[250px]">
//             <label className="text-[10px] font-bold uppercase text-slate-400 mb-3 block tracking-widest">Paste Content</label>
//             <textarea
//               className="flex-1 w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 text-sm font-mono text-slate-700 outline-none shadow-inner"
//               placeholder="Paste your bio or experience..."
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="p-6 bg-slate-50 border-t border-slate-200">
//           <button
//             onClick={handleMagicFormat}
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 active:scale-95 transition-all disabled:bg-slate-300"
//           >
//             {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Wand2 size={20} />}
//             {loading ? "Optimizing..." : "Auto-Format"}
//           </button>
//         </div>
//       </aside>

//       {/* RIGHT SIDE: Live Preview */}
//       <section className={`flex-1 bg-slate-200 relative overflow-y-auto p-4 md:p-12 scroll-smooth 
//         ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
        
//         <div className="max-w-[210mm] mx-auto">
// <div 
//   ref={printRef} 
//   className="print-area bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full min-h-[297mm] origin-top scale-90 md:scale-100 transition-all p-[8mm]"
// >
//             {isClient && <ResumeTemplate />}
//           </div>
//         </div>
//       </section>

      
//     </main>
//   );
// }


"use client";

import { useState, useRef, useEffect } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import ResumeTemplate from "@/components/Templates";
import { useReactToPrint } from "react-to-print";
import { 
  Wand2, 
  Download, 
  ChevronDown, 
  FileText, 
  Eye,
  PenLine,
  FileEdit
} from "lucide-react";

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  
  const { data, setFullData, setTemplate, template } = useResumeStore();
  const printRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const closeMenu = () => setShowDownloadMenu(false);
    if (showDownloadMenu) window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, [showDownloadMenu]);

  // PRINT CONFIGURATION
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${data.personalInfo.fullName.replace(/\s+/g, "_")}_Resume`,
    pageStyle: `
      @page {
        size: A4;
        margin: 6mm;
      }
      @media print {
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          background: white !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
    onBeforePrint: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    },
  });

  // WORD DOWNLOAD
  const handleDownloadDoc = () => {
    if (!printRef.current) return;
    const content = printRef.current.innerHTML;
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + content + footer;
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileLink = document.createElement("a");
    document.body.appendChild(fileLink);
    fileLink.href = source;
    fileLink.download = `${data.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.doc`;
    fileLink.click();
    document.body.removeChild(fileLink);
  };

  const handleMagicFormat = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/parse", {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      const parsedData = await res.json();
      setFullData(parsedData);
      if (window.innerWidth < 1024) setActiveTab('preview');
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <main className="flex flex-col lg:flex-row h-screen bg-[#F8FAFC] overflow-hidden">
      {/* INJECTED PRINT STYLES */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 5mm; }
          html, body { margin: 0 !important; padding: 0 !important; background: white !important; }
          .print-area {
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 auto !important;
            padding: 10mm !important;
            box-shadow: none !important;
            transform: none !important;
            scale: 1 !important;
            display: block !important;
          }
          /* Prevent breaking sections awkwardly */
          h1, h2, h3, section, .experience-item {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `}</style>

      {/* MOBILE NAVIGATION TABS */}
      <div className="lg:hidden flex border-b border-slate-200 bg-white shrink-0">
        <button 
          onClick={() => setActiveTab('edit')}
          className={`flex-1 py-4 text-xs font-bold flex items-center justify-center gap-2 ${activeTab === 'edit' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}
        >
          <PenLine size={16} /> Edit Content
        </button>
        <button 
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-4 text-xs font-bold flex items-center justify-center gap-2 ${activeTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}
        >
          <Eye size={16} /> Live Preview
        </button>
      </div>

      {/* LEFT SIDEBAR: Controls & Input */}
      <aside className={`w-full lg:w-[450px] bg-white border-r border-slate-200 flex flex-col shadow-xl z-10 
        ${activeTab === 'edit' ? 'flex' : 'hidden lg:flex'} h-full overflow-hidden`}>
        
        {/* STICKY HEADER */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="CV.AI Logo" className="w-10 h-10" />
            <h1 className="font-bold text-xl text-slate-800 tracking-tight">
              CV<span className="text-blue-600">.AI</span>
            </h1>
          </div>

          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-black transition-all"
            >
              <Download size={14} /> Download <ChevronDown size={12} className={showDownloadMenu ? 'rotate-180' : ''} />
            </button>
            {showDownloadMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                <button onClick={handlePrint} className="w-full text-left px-4 py-3 text-xs font-semibold hover:bg-blue-50 flex items-center gap-3 transition-colors border-b border-slate-50">
                  <FileText size={16} className="text-red-500" />
                  <div><p className="text-slate-800 font-bold">Professional PDF</p></div>
                </button>
                <button onClick={handleDownloadDoc} className="w-full text-left px-4 py-3 text-xs font-semibold hover:bg-blue-50 flex items-center gap-3 transition-colors">
                  <FileEdit size={16} className="text-blue-500" />
                  <div><p className="text-slate-800 font-bold">Microsoft Word (.doc)</p></div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* SCROLLABLE FORM CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <label className="text-[10px] font-bold uppercase text-slate-400 mb-3 block tracking-widest">Templates</label>
            <div className="grid grid-cols-2 gap-3">
              {['modern', 'classic', 'minimal', 'sidebar', 'executive', 'garamond', 'professional'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTemplate(t as any)}
                  className={`py-3 px-4 rounded-xl border-2 text-xs font-bold capitalize transition-all ${
                    template === t ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col min-h-[300px]">
            <label className="text-[10px] font-bold uppercase text-slate-400 mb-3 block tracking-widest">Paste Content</label>
            <textarea
              className="flex-1 w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 text-sm font-mono text-slate-700 outline-none shadow-inner"
              placeholder="Paste your bio or experience..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>

        {/* STICKY BOTTOM ACTION */}
        <div className="p-6 bg-white lg:bg-slate-50 border-t border-slate-200 shrink-0">
          <button
            onClick={handleMagicFormat}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 active:scale-95 transition-all disabled:bg-slate-300"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Wand2 size={20} />}
            {loading ? "Optimizing..." : "Auto-Format"}
          </button>
        </div>
      </aside>

      {/* RIGHT SIDE: Live Preview */}
      <section className={`flex-1 bg-slate-200 relative overflow-y-auto p-4 md:p-12 scroll-smooth 
        ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
        
        <div className="max-w-[210mm] mx-auto print:m-0 print:max-w-none">
          <div 
            ref={printRef} 
            className="print-area bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full min-h-[297mm] origin-top scale-90 md:scale-100 transition-all p-[10mm]"
          >
            {isClient && <ResumeTemplate />}
          </div>
        </div>
      </section>
    </main>
  );
}