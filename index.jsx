```react
import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, CheckSquare, Layers, Star, ArrowRight, ArrowLeft, RotateCcw, BrainCircuit, Bot, Send, Sparkles, User, Loader2 } from 'lucide-react';

// --- EXPANDED DATA STRUCTURE ---
const notesData = [
  {
    id: 1,
    title: "Nature and Scope of Human Geography",
    importance: "⭐⭐⭐ Very Important",
    sections: [
      { subtitle: "Definition", content: "Human Geography is the branch of geography that studies human activities, culture, population and their relationship with the environment." },
      { subtitle: "Nature of Human Geography", type: "list", content: ["Dynamic subject", "Studies human-environment interaction", "Interdisciplinary in nature", "Practical and applied subject", "Studies regional differences"] },
      { subtitle: "Scope of Human Geography", type: "list", content: ["Population Geography", "Cultural Geography", "Economic Geography", "Settlement Geography", "Political Geography"] },
      { subtitle: "Conclusion", content: "Human Geography helps us understand how people interact with and modify their environment." }
    ],
    trick: "P-C-E-S-P: Population, Cultural, Economic, Settlement, Political"
  },
  {
    id: 2,
    title: "Determinism, Possibilism and Neo-Determinism",
    importance: "⭐⭐⭐ Very Important",
    sections: [
      { subtitle: "Determinism", content: "Nature controls human life.\nExample: People in deserts live differently because climate controls their activities." },
      { subtitle: "Possibilism", content: "Humans can modify nature through technology and intelligence.\nExample: Israel practices agriculture in deserts." },
      { subtitle: "Neo-Determinism", content: "Humans can use nature but must respect environmental limits.\nExample: Building dams carefully without damaging ecosystems." },
      { subtitle: "Easy Table", type: "table", headers: ["Theory", "Main Idea"], rows: [["Determinism", "Nature controls man"], ["Possibilism", "Man controls nature"], ["Neo-Determinism", "Balance between man and nature"]] }
    ],
    trick: "Nature → Man → Balance"
  },
  {
    id: 3,
    title: "Cultural Landscape",
    importance: "⭐⭐ Important",
    sections: [
      { subtitle: "Definition", content: "A landscape modified by human activities is called a cultural landscape." },
      { subtitle: "Examples", type: "list", content: ["Cities", "Roads", "Farms", "Industries", "Dams"] },
      { subtitle: "Characteristics", type: "list", content: ["Human-made", "Dynamic", "Reflects culture", "Changes over time"] },
      { subtitle: "Conclusion", content: "Cultural landscapes show the interaction between humans and the environment." }
    ]
  },
  {
    id: 4,
    title: "Classification of Races",
    importance: "⭐⭐⭐ Previous Paper Topic",
    sections: [
      { subtitle: "Meaning", content: "Race refers to a group of people sharing common physical characteristics." },
      { subtitle: "Basis of Classification", type: "list", content: ["Skin colour", "Hair type", "Nose shape", "Eye shape", "Head shape"] },
      { subtitle: "Griffith Taylor's Classification", type: "list", content: ["Nordic", "Alpine", "Mediterranean", "Mongolian", "Negroid", "Australoid"] }
    ],
    trick: "N-A-M-M-N-A"
  },
  {
    id: 5,
    title: "Eskimo Tribe",
    importance: "⭐⭐⭐",
    sections: [
      { subtitle: "Habitat", content: "Greenland, Alaska and Arctic regions." },
      { subtitle: "Economy", type: "list", content: ["Hunting", "Fishing", "Seal hunting"] },
      { subtitle: "Houses", content: "Igloos" },
      { subtitle: "Transport", content: "Kayak" },
      { subtitle: "Food", content: "Fish and meat" },
      { subtitle: "Conclusion", content: "Eskimos have adapted successfully to extreme cold conditions." }
    ],
    trick: "I-K-F: Igloo, Kayak, Fish"
  },
  {
    id: 6,
    title: "Naga Tribe",
    importance: "⭐⭐⭐ Previous Paper",
    sections: [
      { subtitle: "Habitat", content: "Nagaland and North-East India." },
      { subtitle: "Occupation", type: "list", content: ["Agriculture", "Jhum cultivation", "Hunting"] },
      { subtitle: "Houses", content: "Wooden houses on hill slopes." },
      { subtitle: "Society", content: "Tribal and community-based." },
      { subtitle: "Conclusion", content: "Nagas have adapted to mountainous environments." }
    ]
  },
  {
    id: 7,
    title: "Population Density & Distribution",
    importance: "⭐⭐⭐ Asked in Previous Paper",
    sections: [
      { subtitle: "Definition", content: "Population density means the number of people living per square kilometre." },
      { subtitle: "Factors Affecting Population Density", type: "nested-list", content: [
        { title: "Physical Factors", items: ["Climate", "Relief", "Soil fertility", "Water availability"] },
        { title: "Economic Factors", items: ["Industries", "Employment", "Transportation"] },
        { title: "Social Factors", items: ["Education", "Health", "Security"] },
        { title: "Political Factors", items: ["Government policies", "Stability"] }
      ]},
      { subtitle: "Conclusion", content: "Population density varies according to physical and human factors." }
    ],
    trick: "P-E-S-P: Physical, Economic, Social, Political"
  },
  {
    id: 8,
    title: "Malthus Theory of Population",
    importance: "⭐⭐⭐",
    sections: [
      { subtitle: "Proposed By", content: "Thomas Robert Malthus" },
      { subtitle: "Main Idea", content: "Population grows faster than food supply." },
      { subtitle: "Growth Pattern", type: "list", content: ["Population: 1, 2, 4, 8, 16 (Geometric)", "Food Supply: 1, 2, 3, 4, 5 (Arithmetic)"] },
      { subtitle: "Checks on Population", type: "nested-list", content: [
        { title: "Positive Checks", items: ["Famine", "Disease", "War"] },
        { title: "Preventive Checks", items: ["Late marriage", "Family planning"] }
      ]},
      { subtitle: "Conclusion", content: "Unchecked population growth can create resource shortages." }
    ]
  },
  {
    id: 9,
    title: "Demographic Transition Theory",
    importance: "⭐⭐⭐",
    sections: [
      { subtitle: "Stages", type: "list", content: [
        "Stage 1: High birth rate and high death rate (Pre-industrial)",
        "Stage 2: High birth rate and declining death rate (Developing)",
        "Stage 3: Declining birth rate and low death rate (Late Developing)",
        "Stage 4: Low birth rate and low death rate (Developed)",
        "Stage 5: Population decline (Post-industrial)"
      ]}
    ],
    trick: "H-H → H-L → L-L"
  },
  {
    id: 10,
    title: "Human Development Index (HDI)",
    importance: "⭐⭐ Important",
    sections: [
      { subtitle: "Definition", content: "HDI measures overall human development, introduced by Mahbub ul Haq." },
      { subtitle: "Components", type: "list", content: ["Life expectancy (Health)", "Education (Years of schooling)", "Income (Per capita GDP)"] },
      { subtitle: "Importance", type: "list", content: ["Measures quality of life", "Compares countries", "Helps policy making"] }
    ],
    trick: "L-E-I (Life, Education, Income)"
  },
  {
    id: 11,
    title: "Migration",
    importance: "⭐⭐⭐ Very Important",
    sections: [
      { subtitle: "Definition", content: "Migration means movement of people from one place to another." },
      { subtitle: "Factors", type: "nested-list", content: [
        { title: "Push Factors", items: ["Poverty", "Unemployment", "Natural disasters"] },
        { title: "Pull Factors", items: ["Jobs", "Education", "Better facilities"] }
      ]},
      { subtitle: "Types", type: "list", content: ["Internal", "International", "Seasonal", "Permanent"] },
      { subtitle: "Effects", type: "nested-list", content: [
        { title: "Positive", items: ["Employment", "Economic growth", "Cultural mixing"] },
        { title: "Negative", items: ["Overcrowding", "Pressure on resources", "Brain drain"] }
      ]}
    ],
    trick: "P-P-T-E: Push, Pull, Types, Effects"
  },
  {
    id: 12,
    title: "Christaller's Central Place Theory",
    importance: "⭐⭐⭐",
    sections: [
      { subtitle: "Proposed By", content: "Walter Christaller (1933)" },
      { subtitle: "Main Idea", content: "Towns provide goods and services to surrounding villages." },
      { subtitle: "Features", type: "list", content: ["Settlements form hexagon hierarchy", "Larger towns provide more services", "Smaller villages depend on larger towns"] },
      { subtitle: "Concepts", type: "list", content: ["Threshold: Minimum population needed to support a service", "Range: Maximum distance people will travel for a good"] }
    ],
    trick: "Village → Town → City (Hexagon)"
  },
  {
    id: 13,
    title: "Primary, Secondary & Tertiary Activities",
    importance: "⭐⭐ Important",
    sections: [
      { subtitle: "Primary Activities", content: "Extracting raw materials directly from nature.\nExamples: Agriculture, Mining, Fishing, Forestry." },
      { subtitle: "Secondary Activities", content: "Processing raw materials into valuable products (Manufacturing).\nExamples: Steel production, Textile weaving, Car manufacturing." },
      { subtitle: "Tertiary Activities", content: "Providing services to people and industries.\nExamples: Trade, Transport, Banking, Teaching." },
      { subtitle: "Quaternary & Quinary", content: "Quaternary: Research and knowledge-based services.\nQuinary: High-level decision making (Government, CEOs)." }
    ],
    trick: "1° (Extract) → 2° (Make) → 3° (Serve)"
  },
  {
    id: 14,
    title: "Von Thunen's Model of Agriculture",
    importance: "⭐⭐⭐ Previous Paper",
    sections: [
      { subtitle: "Proposed By", content: "Johann Heinrich von Thünen (1826)" },
      { subtitle: "Main Idea", content: "Agricultural land use is determined by transportation costs to the market." },
      { subtitle: "Rings of Cultivation", type: "list", content: [
        "Ring 1: Dairy & Market Gardening (Perishable/Heavy)",
        "Ring 2: Forest/Wood (Heavy to transport)",
        "Ring 3: Grains & Field Crops (Light, non-perishable)",
        "Ring 4: Ranching/Livestock (Can walk to market)"
      ]},
      { subtitle: "Assumptions", type: "list", content: ["Isolated state", "Uniform land", "Single market center", "Farmers act to maximize profit"] }
    ]
  },
  {
    id: 15,
    title: "Weber's Industrial Location Theory",
    importance: "⭐⭐⭐",
    sections: [
      { subtitle: "Proposed By", content: "Alfred Weber (1909)" },
      { subtitle: "Main Idea", content: "Industries locate where transport and labor costs are minimized." },
      { subtitle: "Key Factors", type: "nested-list", content: [
        { title: "Transport Costs", items: ["Most important factor.", "Weight-losing raw materials (like sugarcane): Industry locates near raw material.", "Weight-gaining products (like beverages): Industry locates near market."] },
        { title: "Labor Costs", items: ["Cheap labor can pull industry away from ideal transport point."] },
        { title: "Agglomeration", items: ["Industries grouping together for shared benefits (infrastructure, services)."] }
      ]}
    ]
  },
  {
    id: 16,
    title: "Rural and Urban Settlements",
    importance: "⭐⭐ Important",
    sections: [
      { subtitle: "Rural Settlements", content: "Small, primary-activity dependent (agriculture). Types include Compact (clustered) and Dispersed (scattered)." },
      { subtitle: "Urban Settlements", content: "Large, non-agricultural (secondary/tertiary). Types include Towns, Cities, Conurbations, Megalopolis." },
      { subtitle: "Problems of Urbanization", type: "list", content: ["Slums and squatters", "Traffic congestion", "Pollution", "Unemployment", "Crime"] }
    ]
  }
];

const revisionList = notesData.map(note => note.title);

// --- API CONFIGURATION ---
const apiKey = ""; // Left empty as per environment rules

// --- COMPONENTS ---

const SectionRenderer = ({ section }) => {
  if (section.type === 'list') {
    return (
      <div className="mb-4">
        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{section.subtitle}</h4>
        <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
          {section.content.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </div>
    );
  }

  if (section.type === 'nested-list') {
    return (
      <div className="mb-4">
        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{section.subtitle}</h4>
        <div className="space-y-3 pl-2">
          {section.content.map((group, idx) => (
            <div key={idx}>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-1">{group.title}:</h5>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                {group.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section.type === 'table') {
    return (
      <div className="mb-4 overflow-x-auto">
        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{section.subtitle}</h4>
        <table className="min-w-full border-collapse border border-slate-300 dark:border-slate-600">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-700">
              {section.headers.map((h, i) => (
                <th key={i} className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left font-medium text-slate-800 dark:text-slate-200">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, i) => (
              <tr key={i} className="bg-white dark:bg-slate-800">
                {row.map((cell, j) => (
                  <td key={j} className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-slate-600 dark:text-slate-300">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{section.subtitle}</h4>
      <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">{section.content}</p>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('study'); // study, flashcards, revision, ai
  const [selectedTopicId, setSelectedTopicId] = useState(1);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem('geoExamChecklistV2');
    return saved ? JSON.parse(saved) : Array(revisionList.length).fill(false);
  });

  // AI Chat State
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: "Hello! I am your Geography AI Tutor. Do you need me to explain a topic, generate exam questions, or test your knowledge?" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('geoExamChecklistV2', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    if (activeTab === 'ai' && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, activeTab]);

  const activeTopic = notesData.find(n => n.id === selectedTopicId);

  const toggleChecklist = (index) => {
    const newChecklist = [...checklist];
    newChecklist[index] = !newChecklist[index];
    setChecklist(newChecklist);
  };

  const nextFlashcard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setFlashcardIndex((prev) => (prev + 1) % notesData.length);
    }, 150);
  };

  const prevFlashcard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setFlashcardIndex((prev) => (prev - 1 + notesData.length) % notesData.length);
    }, 150);
  };

  const jumpToAiWithPrompt = (prompt) => {
    setActiveTab('ai');
    handleAiSubmit(prompt);
  };

  // Basic Text formatter to handle simple AI markdown (bold and bullets)
  const formatAiText = (text) => {
    return text.split('\n').map((line, idx) => {
      if (line.trim() === '') return <br key={idx} />;
      
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const cleanLine = line.trim().substring(2);
        return <li key={idx} className="ml-4 list-disc mb-1">{parseBoldText(cleanLine)}</li>;
      }
      
      return <p key={idx} className="mb-2">{parseBoldText(line)}</p>;
    });
  };

  const parseBoldText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-slate-900 dark:text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const handleAiSubmit = async (overridePrompt = null) => {
    const userPrompt = overridePrompt || chatInput;
    if (!userPrompt.trim()) return;

    const newUserMessage = { role: 'user', text: userPrompt };
    const updatedHistory = [...chatHistory, newUserMessage];
    
    if (!overridePrompt) setChatInput('');
    setChatHistory(updatedHistory);
    setIsAiLoading(true);

    try {
      // Build Google Gemini API Payload
      const contents = updatedHistory.map(msg => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const payload = {
        contents,
        systemInstruction: { 
          parts: [{ text: "You are an expert, friendly Human Geography tutor helping a student prepare for a 10-mark university exam. Your answers should be concise, highly structured (use bullet points and bold text), and easy to memorize. Focus on core concepts, definitions, and examples." }] 
        }
      };

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      };

      // Exponential backoff
      const delays = [1000, 2000, 4000, 8000, 16000];
      let responseData = null;
      let apiError = null;

      for (let i = 0; i <= delays.length; i++) {
        try {
          const res = await fetch(url, options);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          responseData = await res.json();
          break; // Success
        } catch (err) {
          apiError = err;
          if (i < delays.length) {
            await new Promise(resolve => setTimeout(resolve, delays[i]));
          }
        }
      }

      if (responseData && responseData.candidates && responseData.candidates[0].content) {
        const aiResponseText = responseData.candidates[0].content.parts[0].text;
        setChatHistory(prev => [...prev, { role: 'ai', text: aiResponseText }]);
      } else {
        throw new Error(apiError?.message || "Invalid response structure");
      }

    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'ai', text: "Sorry, I am having trouble connecting to the network right now. Please try again in a moment." }]);
    } finally {
      setIsAiLoading(false);
    }
  };


  const progressPercentage = Math.round((checklist.filter(Boolean).length / revisionList.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900">
      
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">GeoStudy Pro</h1>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Human Geography (GEO-52T-103)</p>
              </div>
            </div>
            
            <nav className="flex space-x-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-xl overflow-x-auto max-w-full">
              <button 
                onClick={() => setActiveTab('study')}
                className={`flex flex-shrink-0 items-center px-3 py-2 md:px-4 rounded-lg text-sm font-medium transition-colors ${activeTab === 'study' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
              >
                <BookOpen className="w-4 h-4 mr-2" /> Notes
              </button>
              <button 
                onClick={() => { setActiveTab('flashcards'); setIsFlipped(false); }}
                className={`flex flex-shrink-0 items-center px-3 py-2 md:px-4 rounded-lg text-sm font-medium transition-colors ${activeTab === 'flashcards' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
              >
                <Layers className="w-4 h-4 mr-2" /> Flashcards
              </button>
              <button 
                onClick={() => setActiveTab('revision')}
                className={`flex flex-shrink-0 items-center px-3 py-2 md:px-4 rounded-lg text-sm font-medium transition-colors ${activeTab === 'revision' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
              >
                <CheckSquare className="w-4 h-4 mr-2" /> Revise
              </button>
              <button 
                onClick={() => setActiveTab('ai')}
                className={`flex flex-shrink-0 items-center px-3 py-2 md:px-4 rounded-lg text-sm font-medium transition-colors ${activeTab === 'ai' ? 'bg-indigo-600 text-white shadow-sm' : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'}`}
              >
                <Bot className="w-4 h-4 mr-2" /> AI Tutor
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* STUDY MODE */}
        {activeTab === 'study' && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="w-full lg:w-1/3 xl:w-1/4 flex-shrink-0">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden lg:sticky lg:top-24">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                    <Layers className="w-4 h-4 mr-2 text-blue-500" /> Syllabus Topics ({notesData.length})
                  </h3>
                </div>
                <div className="overflow-y-auto max-h-[40vh] lg:max-h-[70vh] custom-scrollbar">
                  {notesData.map((note, idx) => (
                    <button
                      key={note.id}
                      onClick={() => setSelectedTopicId(note.id)}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors border-l-4 ${selectedTopicId === note.id ? 'bg-blue-50 dark:bg-slate-700 border-blue-500 text-blue-700 dark:text-blue-300 font-medium' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800'}`}
                    >
                      <span className="inline-block w-6 text-slate-400">{idx + 1}.</span> {note.title}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Content Area */}
            <section className="w-full lg:w-2/3 xl:w-3/4">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 pb-6 border-b border-slate-100 dark:border-slate-700 gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight mb-2">
                      {activeTopic.title}
                    </h2>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 whitespace-nowrap">
                      {activeTopic.importance}
                    </span>
                  </div>
                  
                  {/* AI Quick Action */}
                  <button 
                    onClick={() => jumpToAiWithPrompt(`Please explain "${activeTopic.title}" in simple terms. What are the most important points I should write for a 10-mark exam question?`)}
                    className="flex-shrink-0 flex items-center px-3 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors border border-indigo-200 dark:border-indigo-800/50"
                  >
                    <Bot className="w-4 h-4 mr-2" /> Explain with AI
                  </button>
                </div>

                <div className="space-y-6">
                  {activeTopic.sections.map((section, idx) => (
                    <SectionRenderer key={idx} section={section} />
                  ))}
                </div>

                {activeTopic.trick && (
                  <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/50 rounded-xl p-5 flex items-start">
                    <BrainCircuit className="w-6 h-6 text-yellow-600 dark:text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-yellow-900 dark:text-yellow-400 mb-1">Memory Trick</h4>
                      <p className="text-yellow-800 dark:text-yellow-300 font-medium">{activeTopic.trick}</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* FLASHCARDS MODE */}
        {activeTab === 'flashcards' && (
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <div className="mb-6 flex items-center justify-between w-full">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Card {flashcardIndex + 1} of {notesData.length}</span>
              <span className="text-sm font-medium px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full">{notesData[flashcardIndex].importance}</span>
            </div>

            {/* Flashcard Container */}
            <div className="w-full h-[400px] md:h-96 relative perspective-1000 group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
              <div className={`w-full h-full transition-transform duration-500 transform-style-3d shadow-xl rounded-3xl ${isFlipped ? 'rotate-y-180' : ''}`}>
                
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden bg-white dark:bg-slate-800 border-2 border-blue-100 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center p-8 text-center">
                  <div className="absolute top-6 left-6 text-blue-300 dark:text-slate-600">
                    <Layers className="w-8 h-8 opacity-50" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">{notesData[flashcardIndex].title}</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 flex items-center">
                    <RotateCcw className="w-4 h-4 mr-2" /> Tap to reveal notes
                  </p>
                </div>

                {/* Back */}
                <div className="absolute w-full h-full backface-hidden bg-blue-50 dark:bg-slate-800 border-2 border-blue-200 dark:border-blue-900 rounded-3xl p-6 md:p-8 rotate-y-180 overflow-y-auto custom-scrollbar text-left">
                  <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-4 pb-2 border-b border-blue-200 dark:border-blue-800/50">
                    {notesData[flashcardIndex].title}
                  </h3>
                  
                  <div className="space-y-4 text-sm">
                    {notesData[flashcardIndex].sections.map((section, idx) => (
                      <div key={idx}>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{section.subtitle}: </span>
                        {section.type === 'list' || section.type === 'nested-list' ? (
                           <span className="text-slate-600 dark:text-slate-300">Contains multiple points. (Switch to Study Mode for full list).</span>
                        ) : section.type === 'table' ? (
                          <span className="text-slate-600 dark:text-slate-300">[Table Data]</span>
                        ) : (
                          <span className="text-slate-600 dark:text-slate-300">{section.content.substring(0, 150)}{section.content.length > 150 ? '...' : ''}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {notesData[flashcardIndex].trick && (
                    <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-800 dark:text-yellow-400 text-sm font-bold flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      {notesData[flashcardIndex].trick}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between w-full mt-8">
              <button 
                onClick={(e) => { e.stopPropagation(); prevFlashcard(); }}
                className="p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full shadow hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setIsFlipped(!isFlipped)}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              >
                Flip Card
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextFlashcard(); }}
                className="p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full shadow hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* REVISION CHECKLIST MODE */}
        {activeTab === 'revision' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6 md:p-8 bg-blue-600 text-white">
                <h2 className="text-2xl font-bold mb-2">One-Night Revision Checklist</h2>
                <p className="text-blue-100 opacity-90">Mark these off as you complete them. Progress is saved automatically.</p>
                
                <div className="mt-6">
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span>Progress</span>
                    <span>{progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-blue-900/30 rounded-full h-2.5">
                    <div 
                      className="bg-green-400 h-2.5 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="p-2 md:p-4">
                <ul className="space-y-1">
                  {revisionList.map((item, index) => (
                    <li key={index}>
                      <label className={`flex items-center p-3 md:p-4 rounded-xl cursor-pointer transition-colors ${checklist[index] ? 'bg-green-50 dark:bg-green-900/10' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>
                        <div className="relative flex items-center justify-center flex-shrink-0">
                          <input 
                            type="checkbox" 
                            className="sr-only" 
                            checked={checklist[index]}
                            onChange={() => toggleChecklist(index)}
                          />
                          <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${checklist[index] ? 'bg-green-500 border-green-500' : 'border-slate-300 dark:border-slate-600'}`}>
                            {checklist[index] && <CheckSquare className="w-4 h-4 text-white" />}
                          </div>
                        </div>
                        <span className={`ml-4 text-base md:text-lg font-medium transition-all ${checklist[index] ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-700 dark:text-slate-200'}`}>
                          {item}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              
              {progressPercentage === 100 && (
                <div className="p-6 bg-green-50 dark:bg-green-900/20 text-center border-t border-green-100 dark:border-green-900/50">
                  <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">🎉 You are ready for the exam!</h3>
                  <p className="text-green-600 dark:text-green-500">Good luck with your Human Geography test. You've got this!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* AI TUTOR MODE */}
        {activeTab === 'ai' && (
          <div className="max-w-4xl mx-auto flex flex-col h-[75vh] bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            
            {/* Chat Header */}
            <div className="p-4 bg-indigo-600 text-white flex items-center justify-between flex-shrink-0">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold">Geography AI Tutor</h2>
                  <p className="text-xs text-indigo-200">Powered by Gemini</p>
                </div>
              </div>
              <div className="text-xs bg-white/20 px-2 py-1 rounded-md">
                Try asking: "Generate a quiz"
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto custom-scrollbar space-y-6 bg-slate-50 dark:bg-slate-900/50">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  
                  {msg.role === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                      <Bot className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  )}

                  <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-bl-none shadow-sm'
                  }`}>
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-line">{msg.text}</p>
                    ) : (
                      <div className="text-sm md:text-base leading-relaxed space-y-2">
                        {formatAiText(msg.text)}
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center ml-3 flex-shrink-0 mt-1">
                      <User className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    </div>
                  )}

                </div>
              ))}

              {isAiLoading && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <Bot className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2 text-slate-500">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleAiSubmit(); }}
                className="flex items-center gap-2 max-w-4xl mx-auto relative"
              >
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask a geography question..."
                  className="flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-shadow"
                  disabled={isAiLoading}
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim() || isAiLoading}
                  className="bg-indigo-600 text-white rounded-full p-3 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed absolute right-2"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>

          </div>
        )}

      </main>

      {/* Global CSS for 3D Flips and Scrollbars */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #475569;
        }
      `}} />
    </div>
  );
}


```
