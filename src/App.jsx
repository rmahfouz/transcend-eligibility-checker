import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RefreshCcw, ClipboardList, AlertTriangle, Info } from 'lucide-react';

const App = () => {
const [answers, setAnswers] = useState({});
const [status, setStatus] = useState('filling'); // 'filling', 'eligible', 'ineligible'
const [failedReason, setFailedReason] = useState(null);

const criteria = [
{
id: 'age',
question: "Is the patient between 18 and 75 years of age?",
category: 'Inclusion',
failValue: false,
reason: "Patient age is outside the required 18-75 range."
},
{
id: 'amr',
question: "Biopsy-confirmed active or chronic active AMR (per Banff 2022)?",
category: 'Inclusion',
failValue: false,
reason: "Lack of biopsy-confirmed active or chronic active AMR (Banff 2022)."
},
{
id: 'tcmr',
question: "Is there concurrent T-cell-mediated rejection (TCMR)?",
category: 'Exclusion',
failValue: true,
reason: "Presence of concurrent T-cell-mediated rejection (TCMR)."
},
{
id: 'transplant_time',
question: "Was the kidney transplant performed ≥ 6 months ago?",
category: 'Inclusion',
failValue: false,
reason: "Transplant was performed less than 6 months ago."
},
{
id: 'dsa',
question: "Positive for Donor-Specific Antibodies (DSA) HLA Class I and/or II?",
category: 'Inclusion',
failValue: false,
reason: "Patient is DSA negative (HLA Class I/II)."
},
{
id: 'abo_incompatible',
question: "Was the transplant ABO-incompatible?",
category: 'Exclusion',
failValue: true,
reason: "History of ABO-incompatible transplant."
},
{
id: 'rapid_decline',
question: "Rapid decline in renal function likely requiring dialysis in < 30 days?", category: 'Exclusion' , failValue:
    true, reason: "Acute, rapid decline in renal function." }, { id: 'recent_treatment' ,
    question: "AMR/TCMR treatments (e.g. Rituximab, PLEX) within the last 3 months?" , category: 'Exclusion' ,
    failValue: true, reason: "Recent AMR/TCMR treatment (washout period required)." } ]; const handleToggle=(id, val)=>
    {
    const newAnswers = { ...answers, [id]: val };
    setAnswers(newAnswers);

    const item = criteria.find(c => c.id === id);
    if (val === item.failValue) {
    setFailedReason({
    question: item.question,
    explanation: item.reason
    });
    setStatus('ineligible');
    return;
    }

    const allAnswered = criteria.every(c => newAnswers[c.id] !== undefined);
    if (allAnswered) {
    const anyFail = criteria.some(c => newAnswers[c.id] === c.failValue);
    if (!anyFail) setStatus('eligible');
    }
    };

    const reset = () => {
    setAnswers({});
    setStatus('filling');
    setFailedReason(null);
    };

    return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-4 sm:p-8 font-sans">
        <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <ClipboardList className="w-6 h-6 text-blue-400" />
                        <span className="text-blue-400 font-bold tracking-widest text-xs uppercase">Trial Protocol
                            NCT06685757</span>
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight">TRANSCEND Eligibility</h1>
                    <p className="text-slate-400 mt-2 text-sm max-w-md">
                        Phase 3 Study of Felzartamab for Kidney Transplant Recipients with Late Antibody-Mediated
                        Rejection (AMR).
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-3xl">
                </div>
            </div>

            <div className="p-6 sm:p-10">
                {status === 'filling' && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            Pre-Screening Checklist
                        </h2>
                        <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-500 rounded">
                            {Object.keys(answers).length} / {criteria.length} Answered
                        </span>
                    </div>

                    <div className="grid gap-4">
                        {criteria.map((item) => (
                        <div key={item.id} className={`p-4 rounded-2xl border transition-all duration-200 ${
                            answers[item.id] !==undefined ? 'bg-slate-50 border-slate-200 shadow-sm'
                            : 'bg-white border-slate-100 hover:border-slate-300' }`}>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="flex-1">
                                    <span className={`text-[10px] font-bold uppercase tracking-tighter px-1.5 py-0.5
                                        rounded mr-2 ${ item.category==='Inclusion' ? 'bg-blue-100 text-blue-700'
                                        : 'bg-orange-100 text-orange-700' }`}>
                                        {item.category}
                                    </span>
                                    <p className="text-slate-700 font-medium mt-1 leading-snug">{item.question}</p>
                                </div>

                                <div
                                    className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-inner w-fit">
                                    <button onClick={()=> handleToggle(item.id, true)}
                                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                                        answers[item.id] === true
                                        ? 'bg-slate-900 text-white shadow-lg'
                                        : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                        >
                                        Yes
                                    </button>
                                    <button onClick={()=> handleToggle(item.id, false)}
                                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                                        answers[item.id] === false
                                        ? 'bg-slate-900 text-white shadow-lg'
                                        : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                        >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                )}

                {status === 'ineligible' && (
                <div className="py-12 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
                    <div
                        className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-red-50/50">
                        <XCircle className="w-14 h-14 text-red-500" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-2">Patient Not Eligible</h2>
                    <p className="text-slate-500 mb-8 font-medium">Screener terminated due to protocol deviation.</p>

                    <div
                        className="max-w-md w-full p-6 bg-white border-2 border-red-100 rounded-3xl shadow-sm mb-8 text-left">
                        <div className="flex gap-4">
                            <div className="bg-red-500 p-2 rounded-lg self-start">
                                <AlertTriangle className="w-5 h-5 text-white" />
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Failed
                                        Criterion</p>
                                    <p className="text-slate-800 font-semibold leading-snug">{failedReason?.question}
                                    </p>
                                </div>
                                <div className="pt-3 border-t border-slate-100">
                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                        Clinical Reason</p>
                                    <p className="text-red-700 font-medium">{failedReason?.explanation}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button onClick={reset}
                        className="flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all shadow-xl hover:-translate-y-1 active:translate-y-0">
                        <RefreshCcw className="w-5 h-5" />
                        Reset Screener
                    </button>
                </div>
                )}

                {status === 'eligible' && (
                <div
                    className="py-12 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div
                        className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-50/50">
                        <CheckCircle className="w-14 h-14 text-green-500" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-4">Potentially Eligible</h2>
                    <p className="text-slate-600 max-w-md mb-8">
                        The patient satisfies the core preliminary criteria for <b>TRANSCEND</b>. Proceed with screening
                        per the full protocol.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 w-full mb-10 text-left">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Pathology Requirement</p>
                            <p className="text-sm font-bold text-slate-700 leading-tight">Central reading for Banff 2022
                                AMR confirmation.</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Lab Requirement</p>
                            <p className="text-sm font-bold text-slate-700 leading-tight">DSA positive within 3 months
                                of randomization.</p>
                        </div>
                    </div>

                    <button onClick={reset}
                        className="flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all shadow-xl">
                        <RefreshCcw className="w-5 h-5" />
                        Restart Check
                    </button>
                </div>
                )}
            </div>

            {/* Footer info */}
            <div
                className="bg-slate-50 border-t border-slate-100 px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p
                    className="text-[10px] text-slate-400 text-center sm:text-left max-w-xs leading-relaxed uppercase tracking-widest">
                    Protocol Version: 2025-12 • This tool is a decision support aid, not a medical diagnosis.
                </p>
                <div className="flex gap-4">
                    <span className="text-[10px] font-bold text-slate-500">PHASE 3</span>
                    <span className="text-[10px] font-bold text-slate-500">NCT06685757</span>
                </div>
            </div>
        </div>
    </div>
    );
    };

    export default App;