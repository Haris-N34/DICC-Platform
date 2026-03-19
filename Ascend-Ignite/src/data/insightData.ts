import type { ToolArticle } from '../types';

export const weekLabel = 'March 2025';

export const analogyDictionary: Record<string, { emoji: string; analogy: string; explanation: string }> = {
    'large language model': {
        emoji: '🧠',
        analogy: 'A super-fast reader who memorized the internet',
        explanation: 'An LLM is trained on massive text data and predicts the most likely next words, giving the illusion of understanding.',
    },
    'neural network': {
        emoji: '🕸️',
        analogy: 'A web of tiny decision-makers',
        explanation: 'Layers of simple math functions that, together, can recognize patterns too complex for any single rule.',
    },
    'prompt engineering': {
        emoji: '🎯',
        analogy: 'Giving precise directions to a very literal friend',
        explanation: 'The art of phrasing your input so the AI produces the output you actually want.',
    },
    'hallucination': {
        emoji: '🌀',
        analogy: 'Confidently wrong, like a bluffing student',
        explanation: 'When an AI generates plausible-sounding but factually incorrect information.',
    },
    'token': {
        emoji: '🧩',
        analogy: 'A puzzle piece of text',
        explanation: 'The smallest unit of text an LLM processes — roughly ¾ of a word on average.',
    },
};

export const traceFlowDefaults = {
    stepDurationMs: 800,
};

export const toolArticles: ToolArticle[] = [
    {
        id: 'manus',
        name: 'Manus',
        tagline: 'AI that actually does the work, not just talks about it',
        url: 'https://manus.im/',
        domain: 'manus.im',
        free: true,
        pricing: 'Free credits on signup',
        whatItDoes: 'Give Manus a task and it opens a real browser, navigates websites, fills out forms, compiles data, and delivers finished files. You watch it work in real-time. Not a chatbot \u2014 a digital worker.',
        whyItMatters: 'The first AI most people have seen that acts instead of answers. Need 10 scholarship apps filled out? Competitor research in a spreadsheet? It does the actual browser work you\u2019d spend an hour on.',
        getStarted: 'Go to manus.im \u2192 join the waitlist \u2192 describe a multi-step task \u2192 watch it execute live.',
        bestFor: ['Research across multiple sites', 'Filling out applications', 'Data compilation', 'Any repetitive browser task'],
        studentTip: 'Give it your career fair company list and ask it to create a one-page brief on each company. Hours of research, done in minutes.',
    },
    {
        id: 'notebooklm',
        name: 'NotebookLM',
        tagline: 'Upload your notes. Get an AI tutor \u2014 and a podcast of your readings.',
        url: 'https://notebooklm.google.com/',
        domain: 'notebooklm.google.com',
        free: true,
        whatItDoes: 'Upload lecture notes, PDFs, or Google Docs. NotebookLM reads everything and answers only from YOUR material with citations. The killer feature: it generates a podcast-style audio overview of your sources.',
        whyItMatters: 'Unlike ChatGPT, it never makes things up \u2014 every answer cites the exact passage from your uploads. The audio feature turns any 50-page reading into a 10-minute conversation you can listen to while commuting.',
        getStarted: 'Go to notebooklm.google.com \u2192 upload a PDF \u2192 ask questions \u2192 try "Audio Overview" to generate a podcast.',
        bestFor: ['Exam prep', 'Understanding dense readings', 'Study guides', 'Audio learning on the go'],
        studentTip: 'Upload Friday night, generate Audio Overview, listen while cooking. Use the chat to drill into specifics before class Monday.',
    },
    {
        id: 'perplexity',
        name: 'Perplexity',
        tagline: 'Google Search, but it actually answers your question \u2014 with sources.',
        url: 'https://www.perplexity.ai/',
        domain: 'perplexity.ai',
        free: true,
        pricing: 'Pro $20/mo for deeper searches',
        whatItDoes: 'Ask any question. Perplexity searches the web in real-time, synthesizes an answer, and puts a clickable citation on every single fact. Academic focus mode searches only peer-reviewed papers.',
        whyItMatters: 'ChatGPT can make up statistics. Perplexity can\u2019t \u2014 every claim has a numbered source you can verify. Students are replacing Google with this for research because you get the answer AND the citation in one step.',
        getStarted: 'Go to perplexity.ai \u2192 no signup needed \u2192 ask a research question \u2192 click the numbered citations to verify.',
        bestFor: ['Research with citations', 'Finding statistics', 'Fact-checking', 'Literature reviews'],
        studentTip: 'Next time you need a stat for a paper, try Perplexity instead of Google. You get the number, the source, and the link to cite \u2014 all in one answer.',
    },
    {
        id: 'lovable',
        name: 'Lovable',
        tagline: 'Describe an app idea. Get a real, working app. No code.',
        url: 'https://lovable.dev/',
        domain: 'lovable.dev',
        free: true,
        pricing: 'Free: 5 projects. Starter $20/mo',
        whatItDoes: 'Describe what you want in plain English and Lovable builds a full web application with a database, login system, and responsive design. Deploy it to a live URL in minutes. Iterate by chatting: "add a dark mode toggle."',
        whyItMatters: 'Before this, building an app took months of learning to code. Now any student with an idea has a working prototype in 20 minutes. Entrepreneurship students are going from idea to live product in a weekend.',
        getStarted: 'Go to lovable.dev \u2192 sign up free \u2192 describe an app \u2192 watch it build in real-time \u2192 click deploy.',
        bestFor: ['Startup prototypes', 'Group project tools', 'Portfolio projects', 'Hackathons'],
        studentTip: 'That startup idea you have been sitting on? Build it this weekend. Show real user feedback in your pitch presentation instead of hypotheticals.',
    },
    {
        id: 'suno',
        name: 'Suno',
        tagline: 'Type a vibe. Get a full song with vocals. In 60 seconds.',
        url: 'https://suno.com/',
        domain: 'suno.com',
        free: true,
        pricing: 'Free: 10 songs/day. Pro $10/mo',
        whatItDoes: 'Generate complete songs \u2014 vocals, lyrics, instruments, mixing \u2014 from a text description. "Indie folk song about finals week stress, acoustic guitar, hopeful ending" gives you a studio-quality 3-minute track in 40 seconds.',
        whyItMatters: 'This is the AI tool that makes jaws drop. The vocals have emotion, the instruments are arranged properly, and the songs have real structure. 1,200+ genres supported. Download as MP3.',
        getStarted: 'Go to suno.com \u2192 sign up free \u2192 try "lo-fi study beat, no vocals, jazz piano, rain sounds" \u2192 share with your friends.',
        bestFor: ['Video project soundtracks', 'Podcast intros', 'Marketing jingles', 'Creative projects', 'Fun'],
        studentTip: 'Film students are scoring short films with this. Marketing students make jingles. Or just make a song about your roommate and send it to the group chat.',
    },
];
