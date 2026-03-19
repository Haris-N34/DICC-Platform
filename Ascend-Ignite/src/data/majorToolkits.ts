import type { MajorToolkit } from '../types';

export const majorToolkits: MajorToolkit[] = [
    {
        major: 'Business',
        headline: 'AI tools that give you an unfair advantage in business school',
        description: 'From case study analysis to competitive research to pitch decks — these tools do the heavy lifting so you can focus on strategy.',
        tools: [
            { name: 'ChatGPT', url: 'https://chat.openai.com/', domain: 'chat.openai.com', oneLiner: 'Case study analysis, financial modeling questions, brainstorming strategies', howToUse: 'Upload a case study PDF, ask it to identify the core strategic issue and recommend 3 options using Porter\'s Five Forces.', free: true },
            { name: 'Gamma', url: 'https://gamma.app/', domain: 'gamma.app', oneLiner: 'Generate entire pitch decks and presentations from a description', howToUse: 'Describe your business plan or class presentation topic and get a polished slide deck in 60 seconds.', free: true },
            { name: 'Perplexity', url: 'https://www.perplexity.ai/', domain: 'perplexity.ai', oneLiner: 'Market research with real sources and citations', howToUse: 'Ask "What is the market size for plant-based protein in North America 2024?" and get cited stats instantly.', free: true },
            { name: 'Microsoft Copilot', url: 'https://copilot.microsoft.com/', domain: 'copilot.microsoft.com', oneLiner: 'AI inside Excel, Word, and PowerPoint', howToUse: 'In Excel, describe what you want: "Create a pivot table showing revenue by quarter." Copilot builds it.', free: true },
        ],
        useCases: [
            { scenario: 'Preparing for a case competition this weekend', toolUsed: 'ChatGPT + Gamma', steps: ['Upload the case brief to ChatGPT and ask for a SWOT analysis', 'Ask it to recommend 3 strategic options with pros/cons', 'Paste your final recommendation into Gamma to generate the pitch deck', 'Present a polished deliverable your team built in 2 hours instead of 8'] },
            { scenario: 'Midterm essay on a company\'s competitive strategy', toolUsed: 'Perplexity + ChatGPT', steps: ['Use Perplexity to find recent revenue data, market share, and analyst reports with citations', 'Paste the data into ChatGPT and ask it to structure a Porter\'s Five Forces analysis', 'Use the cited sources from Perplexity directly in your essay bibliography'] },
            { scenario: 'Group project with messy spreadsheet data', toolUsed: 'Microsoft Copilot', steps: ['Open the spreadsheet in Excel with Copilot enabled', 'Tell Copilot: "Summarize sales trends by region and create a chart"', 'Ask it to highlight outliers and suggest explanations', 'Export the chart directly into your group\'s PowerPoint'] },
        ],
        prompts: [
            { task: 'Case Study Analysis', prompt: 'You are a McKinsey consultant. Analyze this case: [paste case]. Identify the core issue, apply Porter\'s Five Forces, recommend 3 strategic options ranked by feasibility, and write a one-paragraph executive summary.' },
            { task: 'Competitive Analysis', prompt: 'Research the top 5 competitors in [industry]. For each, give me: founding year, revenue estimate, unique value proposition, primary marketing channel. Format as a comparison table.' },
            { task: 'Financial Concept Explainer', prompt: 'Explain [concept, e.g., DCF valuation] like I\'m a business sophomore. Use a real company example. Keep it under 200 words.' },
        ],
    },
    {
        major: 'Computer Science',
        headline: 'AI tools that 10x your coding and learning speed',
        description: 'Debug faster, understand concepts deeper, and build projects you\'d never attempt alone.',
        tools: [
            { name: 'Claude', url: 'https://claude.ai/', domain: 'claude.ai', oneLiner: 'Best for understanding complex code, debugging, and architecture decisions', howToUse: 'Paste your code and error message. Ask "Why is this failing and what\'s the idiomatic fix?"', free: true },
            { name: 'GitHub Copilot', url: 'https://github.com/features/copilot', domain: 'github.com', oneLiner: 'AI autocomplete inside your code editor', howToUse: 'Free for students with GitHub Education. Install the VS Code extension and start typing — it suggests entire functions.', free: true },
            { name: 'Lovable', url: 'https://lovable.dev/', domain: 'lovable.dev', oneLiner: 'Describe a full-stack app and get working code instantly', howToUse: 'Great for prototyping side projects fast. Describe the app, get a deployed React + Supabase app.', free: true },
            { name: 'Perplexity', url: 'https://www.perplexity.ai/', domain: 'perplexity.ai', oneLiner: 'Search Stack Overflow, docs, and forums with cited answers', howToUse: 'Ask technical questions and get answers sourced from real documentation instead of hallucinated code.', free: true },
        ],
        useCases: [
            { scenario: 'Stuck on a Data Structures assignment at 1am', toolUsed: 'Claude', steps: ['Paste your code and the exact error message', 'Ask "Explain what\'s wrong, why it happens, and show the fix with comments"', 'Then ask "Now explain the time complexity of my approach vs the optimal one"', 'You learn the concept AND fix the bug in one conversation'] },
            { scenario: 'Building a side project for your portfolio', toolUsed: 'Lovable + GitHub Copilot', steps: ['Describe the app to Lovable: "A study group finder where students post sessions by class"', 'Get a working deployed app in minutes — database, auth, UI included', 'Clone the code, open in VS Code with Copilot, and customize features', 'Deploy to your portfolio with a live demo link'] },
            { scenario: 'Preparing for a technical interview', toolUsed: 'Claude + Perplexity', steps: ['Ask Claude: "Give me 5 medium LeetCode-style problems on graphs with solutions explained"', 'Practice coding the solutions, then paste yours back for review', 'Use Perplexity to research the company\'s tech stack and recent engineering blog posts'] },
        ],
        prompts: [
            { task: 'Debug Code', prompt: 'Here\'s my code and the error I\'m getting:\n[paste code]\n[paste error]\nExplain what\'s wrong, why it\'s happening, and give me the corrected code with comments on what changed.' },
            { task: 'Learn a Concept', prompt: 'Explain [concept, e.g., dynamic programming] using a real-world analogy first, then show me a simple code example in Python with comments, then a harder example I\'d see in an interview.' },
            { task: 'Code Review', prompt: 'Review this code for: (1) bugs, (2) performance issues, (3) readability improvements. Be specific and show the improved version.\n[paste code]' },
        ],
    },
    {
        major: 'Engineering',
        headline: 'AI tools for problem sets, lab reports, and design projects',
        description: 'Calculate faster, visualize better, and write reports that don\'t take all weekend.',
        tools: [
            { name: 'ChatGPT', url: 'https://chat.openai.com/', domain: 'chat.openai.com', oneLiner: 'Walk through problem sets step-by-step, explain derivations', howToUse: 'Upload a photo of a problem. Ask "Solve this step-by-step and explain each step like I\'m learning it for the first time."', free: true },
            { name: 'Wolfram Alpha', url: 'https://www.wolframalpha.com/', domain: 'wolframalpha.com', oneLiner: 'Computational engine for math, physics, and engineering calculations', howToUse: 'Type any equation or unit conversion. It shows the solution, steps, and plots.', free: true },
            { name: 'NotebookLM', url: 'https://notebooklm.google.com/', domain: 'notebooklm.google.com', oneLiner: 'Upload textbook chapters and get an AI tutor for the material', howToUse: 'Upload your thermo or circuits textbook chapter, then ask specific questions about the material.', free: true },
            { name: 'Napkin AI', url: 'https://www.napkin.ai/', domain: 'napkin.ai', oneLiner: 'Turn text explanations into diagrams and visuals', howToUse: 'Paste a process description from your report and get a clean diagram you can use in your submission.', free: true },
        ],
        useCases: [
            { scenario: 'Sunday night problem set due Monday 8am', toolUsed: 'ChatGPT + Wolfram Alpha', steps: ['Take a photo of the problem and upload to ChatGPT for a step-by-step walkthrough', 'Cross-check the math in Wolfram Alpha by typing the equations directly', 'Ask ChatGPT to explain the physical intuition — why the answer makes sense', 'You understand the method AND finish the set on time'] },
            { scenario: 'Writing a lab report after a 3-hour lab session', toolUsed: 'ChatGPT + Napkin AI', steps: ['Paste your raw data into ChatGPT and ask for a Results section with error analysis', 'Ask it to compare your experimental values with theoretical predictions', 'Paste the methodology description into Napkin AI to generate a process flow diagram', 'Include the diagram in your report for a polished submission'] },
            { scenario: 'Studying for a circuits or thermo final', toolUsed: 'NotebookLM', steps: ['Upload all your lecture slides and textbook chapters into one notebook', 'Ask "Create a study guide covering the top 10 concepts most likely on the final"', 'Generate an Audio Overview and listen while you walk to campus', 'Use the chat to drill into specific problems you\'re stuck on'] },
        ],
        prompts: [
            { task: 'Problem Set Help', prompt: 'I\'m working on [topic, e.g., heat transfer]. Here\'s the problem: [paste]. Walk me through the solution step-by-step. Show the equations used, unit conversions, and explain the physical intuition behind each step.' },
            { task: 'Lab Report Draft', prompt: 'I conducted an experiment on [topic]. Here are my results: [paste data]. Help me write the Results and Discussion sections. Include: key findings, comparison with theoretical values, error analysis, and a conclusion paragraph.' },
            { task: 'Concept Review', prompt: 'Create a one-page study sheet for [topic, e.g., Mohr\'s Circle]. Include: key equations with variable definitions, a worked example, and common mistakes to avoid. Format for easy scanning.' },
        ],
    },
    {
        major: 'Nursing / Health Sciences',
        headline: 'AI tools for care plans, NCLEX prep, and clinical knowledge',
        description: 'Study smarter, build care plans faster, and understand pharmacology without memorizing everything blind.',
        tools: [
            { name: 'ChatGPT', url: 'https://chat.openai.com/', domain: 'chat.openai.com', oneLiner: 'Build nursing care plans, explain pathophysiology, quiz yourself', howToUse: 'Ask it to generate NANDA-format nursing diagnoses for a patient scenario with SMART goals and interventions.', free: true },
            { name: 'NotebookLM', url: 'https://notebooklm.google.com/', domain: 'notebooklm.google.com', oneLiner: 'Upload pharmacology notes and quiz yourself from YOUR material', howToUse: 'Upload your pharm notes, then ask "Quiz me on drug classifications and side effects from Chapter 8."', free: true },
            { name: 'Consensus', url: 'https://consensus.app/', domain: 'consensus.app', oneLiner: 'Find evidence-based nursing research from peer-reviewed papers', howToUse: 'Ask "What are evidence-based interventions for fall prevention in elderly patients?" and get cited research.', free: true },
            { name: 'Perplexity', url: 'https://www.perplexity.ai/', domain: 'perplexity.ai', oneLiner: 'Quick clinical reference with sources', howToUse: 'Ask "What are the nursing considerations for administering IV vancomycin?" and verify with the cited sources.', free: true },
        ],
        useCases: [
            { scenario: 'Building a care plan the night before clinical', toolUsed: 'ChatGPT', steps: ['Describe your patient: "68-year-old female, CHF, Type 2 diabetes, admitted for dyspnea"', 'Ask for 3 priority NANDA diagnoses with SMART goals and evidence-based interventions', 'Review and customize the output — add your own clinical reasoning', 'Arrive at clinical with a thorough, structured care plan ready to present'] },
            { scenario: 'Studying for the NCLEX', toolUsed: 'NotebookLM + ChatGPT', steps: ['Upload your entire pharmacology study guide into NotebookLM', 'Ask it to quiz you on drug classes, side effects, and nursing considerations', 'Switch to ChatGPT and ask for 10 NCLEX-style questions on your weak areas', 'Review rationales for each answer to understand the reasoning, not just the facts'] },
            { scenario: 'Evidence-based practice assignment', toolUsed: 'Consensus + Perplexity', steps: ['Use Consensus to find 5 peer-reviewed studies on your clinical question', 'Use Perplexity to get the current clinical guidelines from major nursing organizations', 'Compare the research evidence with current practice guidelines', 'Structure your EBP paper with direct citations from both sources'] },
        ],
        prompts: [
            { task: 'Nursing Care Plan', prompt: 'Create a nursing care plan for a [age]-year-old patient with [conditions]. Include: 3 priority NANDA nursing diagnoses, SMART goals for each, 4 evidence-based interventions per diagnosis, and expected outcomes.' },
            { task: 'Pharmacology Review', prompt: 'Create a comparison table for [drug class, e.g., ACE inhibitors vs ARBs]. Include: mechanism of action, common medications, key side effects, nursing considerations, and patient teaching points.' },
            { task: 'NCLEX Practice', prompt: 'Generate 5 NCLEX-style select-all-that-apply questions on [topic]. After each question, show the correct answers with rationale explaining why each choice is right or wrong.' },
        ],
    },
    {
        major: 'Psychology',
        headline: 'AI tools for research methods, lit reviews, and APA papers',
        description: 'Design studies, find relevant research, and write papers with proper methodology — faster.',
        tools: [
            { name: 'Elicit', url: 'https://elicit.com/', domain: 'elicit.com', oneLiner: 'AI research assistant that finds and summarizes academic papers', howToUse: 'Ask a research question and get a table of relevant papers with key findings extracted automatically.', free: true },
            { name: 'Consensus', url: 'https://consensus.app/', domain: 'consensus.app', oneLiner: 'Evidence-based answers from 200M+ peer-reviewed papers', howToUse: 'Ask "Does cognitive behavioral therapy reduce anxiety?" and get a summary of the scientific consensus.', free: true },
            { name: 'Scribbr', url: 'https://www.scribbr.com/', domain: 'scribbr.com', oneLiner: 'APA citation generator and AI writing checker', howToUse: 'Paste a DOI or URL to generate a perfect APA 7th edition citation. Use the AI detector to check your drafts.', free: true },
            { name: 'Claude', url: 'https://claude.ai/', domain: 'claude.ai', oneLiner: 'Best for writing and refining methodology sections', howToUse: 'Describe your study design and ask Claude to help structure your Methods section in APA format.', free: true },
        ],
        useCases: [
            { scenario: 'Starting a literature review from scratch', toolUsed: 'Elicit + Consensus', steps: ['Ask Elicit your research question — it returns a table of 20+ relevant papers with summaries', 'Use Consensus to check the overall scientific agreement on your topic', 'Organize the papers into themes using Elicit\'s column extraction feature', 'You have a structured lit review outline with real sources in 30 minutes instead of 3 days'] },
            { scenario: 'Writing up a Research Methods assignment', toolUsed: 'Claude + Scribbr', steps: ['Describe your study to Claude: participants, variables, procedure', 'Ask it to draft the Methods section in APA format', 'Paste your references into Scribbr to generate properly formatted APA citations', 'Run your draft through Scribbr\'s checker to catch formatting errors'] },
            { scenario: 'Preparing for a stats exam', toolUsed: 'ChatGPT + NotebookLM', steps: ['Upload your stats lecture slides into NotebookLM', 'Ask "When do I use a t-test vs ANOVA vs chi-square? Give me a decision flowchart"', 'Switch to ChatGPT for practice problems: "Give me 5 scenarios and I\'ll pick the right test"', 'Get instant feedback with explanations for each answer'] },
        ],
        prompts: [
            { task: 'Research Design', prompt: 'I\'m designing a study on [topic, e.g., the effect of sleep on academic performance]. Help me write: (1) a clear hypothesis, (2) IV and DV, (3) proposed methodology with sample size justification, (4) 3 potential confounding variables.' },
            { task: 'Literature Review Outline', prompt: 'I\'m writing a lit review on [topic]. Suggest an organizational structure with 4-5 thematic sections. For each section, describe what studies I should look for and what arguments to make.' },
            { task: 'APA Results Section', prompt: 'Here are my study results: [paste data/stats]. Write an APA-formatted Results section. Include: descriptive statistics, inferential test results with exact p-values, effect sizes, and a brief interpretation of each finding.' },
        ],
    },
    {
        major: 'Communications / Media',
        headline: 'AI tools for content creation, campaigns, and storytelling',
        description: 'Build campaigns, create content, and analyze media faster than your classmates think is possible.',
        tools: [
            { name: 'ChatGPT', url: 'https://chat.openai.com/', domain: 'chat.openai.com', oneLiner: 'Draft campaigns, social copy, press releases, and content strategies', howToUse: 'Give it a creative brief: audience, tone, platform, goal. It generates multiple options you can refine.', free: true },
            { name: 'Canva', url: 'https://www.canva.com/', domain: 'canva.com', oneLiner: 'AI-powered design for social posts, presentations, and brand kits', howToUse: 'Use Magic Design: describe what you need and Canva generates designed templates with your content.', free: true },
            { name: 'Otter.ai', url: 'https://otter.ai/', domain: 'otter.ai', oneLiner: 'Transcribe interviews, lectures, and podcasts automatically', howToUse: 'Record any conversation and get a searchable, shareable transcript with speaker labels.', free: true },
            { name: 'Suno', url: 'https://suno.com/', domain: 'suno.com', oneLiner: 'Generate original music for videos, podcasts, and projects', howToUse: 'Describe the vibe: "upbeat corporate jingle, 15 seconds, no vocals." Get a custom track instantly.', free: true },
        ],
        useCases: [
            { scenario: 'Running a social media campaign for a class project', toolUsed: 'ChatGPT + Canva', steps: ['Give ChatGPT a brief: "Create a 2-week Instagram campaign for a campus sustainability event targeting freshmen"', 'It generates captions, posting schedule, and hashtag strategies', 'Drop the captions into Canva\'s Instagram templates for polished, on-brand visuals', 'You have a full campaign deck ready to present — not just a plan, actual content'] },
            { scenario: 'Producing a podcast episode for class', toolUsed: 'Otter.ai + Suno', steps: ['Record your interview using Otter.ai for automatic transcription', 'Use the transcript to write show notes and pull quote highlights', 'Generate a custom intro/outro jingle with Suno: "chill podcast intro, 10 seconds, no vocals"', 'Combine everything for a professional podcast that sounds like you have a production team'] },
            { scenario: 'Analyzing media coverage for a PR class', toolUsed: 'Perplexity + ChatGPT', steps: ['Use Perplexity to find 10 articles covering your topic across different outlets', 'Paste the headlines and key quotes into ChatGPT', 'Ask it to identify dominant frames, tone, and sources quoted across all articles', 'Get a structured media analysis brief in 20 minutes instead of an afternoon'] },
        ],
        prompts: [
            { task: 'Social Media Campaign', prompt: 'Create a 2-week Instagram + TikTok content calendar for [event/brand]. Include: post type (reel/story/carousel), caption draft, posting time, and hashtag strategy. Target audience: [describe].' },
            { task: 'Press Release', prompt: 'Write a press release for [event/announcement]. Follow AP style. Include: headline, dateline, lead paragraph with the 5 Ws, 2 supporting paragraphs, a quote from [person/role], and boilerplate.' },
            { task: 'Media Analysis', prompt: 'Analyze the media coverage of [topic/event]. Identify: dominant frames used, sources quoted, tone (positive/negative/neutral), and any notable gaps in coverage. Structure as a 1-page brief.' },
        ],
    },
    {
        major: 'Education',
        headline: 'AI tools for lesson planning, differentiation, and classroom resources',
        description: 'Plan lessons in minutes, create assessments, and differentiate instruction without burning out.',
        tools: [
            { name: 'ChatGPT', url: 'https://chat.openai.com/', domain: 'chat.openai.com', oneLiner: 'Generate full lesson plans, rubrics, and differentiated activities', howToUse: 'Describe grade level, subject, and learning objective. Get a complete lesson with hook, activities, and assessment.', free: true },
            { name: 'Canva', url: 'https://www.canva.com/', domain: 'canva.com', oneLiner: 'Create worksheets, infographics, and classroom visuals', howToUse: 'Search "worksheet" templates, customize with your content, and print or share digitally.', free: true },
            { name: 'NotebookLM', url: 'https://notebooklm.google.com/', domain: 'notebooklm.google.com', oneLiner: 'Upload curriculum docs and ask questions about standards alignment', howToUse: 'Upload your state standards doc and ask "Which standards does this lesson plan address?"', free: true },
            { name: 'Diffit', url: 'https://www.diffit.me/', domain: 'diffit.me', oneLiner: 'AI that creates leveled reading passages and comprehension questions', howToUse: 'Enter a topic and grade level. Diffit generates a reading passage at the right level with questions.', free: true },
        ],
        useCases: [
            { scenario: 'Creating a week of lesson plans for student teaching', toolUsed: 'ChatGPT + Canva', steps: ['Tell ChatGPT: "5-day lesson plan unit for 8th grade on the Civil Rights Movement, inquiry-based"', 'It generates daily plans with hooks, activities, discussion questions, and assessments', 'Pull the key vocabulary and timelines into Canva to create classroom handouts and anchor charts', 'You walk into your placement with a full, polished unit plan'] },
            { scenario: 'Differentiating a reading assignment for mixed-level learners', toolUsed: 'Diffit', steps: ['Enter the topic: "Causes of World War I" at grade 7 reading level', 'Diffit generates the passage with vocabulary support and comprehension questions', 'Generate the same topic at grade 5 and grade 9 levels for differentiation', 'Print all three versions — same content, different complexity levels'] },
            { scenario: 'Building a rubric for a creative project', toolUsed: 'ChatGPT', steps: ['Describe the assignment: "6th grade biography poster project"', 'Ask for a 4-level rubric with specific, observable criteria', 'Request it align to your state ELA standards', 'Edit the language to match your classroom tone and share with students'] },
        ],
        prompts: [
            { task: 'Lesson Plan', prompt: 'Create a [duration]-minute lesson plan for [grade] [subject] on [topic]. Include: learning objectives, a 5-min hook, 20-min interactive activity (not lecture), 15-min group work, and a formative assessment. Align to [state] standards.' },
            { task: 'Differentiation', prompt: 'I have a mixed-ability [grade] class studying [topic]. Create 3 versions of this activity: one for struggling learners, one for on-level, and one for advanced. Each should address the same learning objective but at different complexity levels.' },
            { task: 'Rubric Generator', prompt: 'Create a 4-level rubric (Exceeds/Meets/Approaching/Below) for a [grade] [assignment type] on [topic]. Include 4 criteria with specific, observable descriptors for each level.' },
        ],
    },
    {
        major: 'Biology / Pre-Med',
        headline: 'AI tools for MCAT prep, lab reports, and understanding complex systems',
        description: 'Visualize pathways, study efficiently, and write lab reports without losing your entire weekend.',
        tools: [
            { name: 'NotebookLM', url: 'https://notebooklm.google.com/', domain: 'notebooklm.google.com', oneLiner: 'Upload bio textbook chapters and get an AI study partner', howToUse: 'Upload your molecular bio chapter, then ask "Explain the lac operon using an analogy and quiz me on it."', free: true },
            { name: 'Consensus', url: 'https://consensus.app/', domain: 'consensus.app', oneLiner: 'Find peer-reviewed research for lab reports and papers', howToUse: 'Ask "What is the effect of caffeine on heart rate variability?" and get answers from actual published studies.', free: true },
            { name: 'ChatGPT', url: 'https://chat.openai.com/', domain: 'chat.openai.com', oneLiner: 'Walk through metabolic pathways, explain mechanisms, MCAT practice', howToUse: 'Ask it to explain a pathway step-by-step, then generate MCAT-style passage questions to test yourself.', free: true },
            { name: 'BioRender', url: 'https://www.biorender.com/', domain: 'biorender.com', oneLiner: 'Create publication-quality scientific figures and diagrams', howToUse: 'Drag and drop scientific icons to build pathway diagrams, cell illustrations, and experimental workflows.', free: true },
        ],
        useCases: [
            { scenario: 'MCAT study session on biochemistry', toolUsed: 'NotebookLM + ChatGPT', steps: ['Upload all your biochem lecture slides into NotebookLM', 'Ask "Generate a study guide of the 15 most important concepts for the MCAT from this material"', 'Generate an Audio Overview and listen during your workout', 'Switch to ChatGPT: "Give me a MCAT-style passage on enzyme kinetics with 4 questions"'] },
            { scenario: 'Writing a lab report for Organic Chemistry', toolUsed: 'ChatGPT + BioRender', steps: ['Paste your raw data and ask ChatGPT to help write the Results and Discussion sections', 'Ask it to compare your yield with the theoretical value and suggest sources of error', 'Use BioRender to create a clean reaction mechanism diagram', 'Submit a report with professional figures and solid analysis'] },
            { scenario: 'Finding sources for a research paper on gene therapy', toolUsed: 'Consensus', steps: ['Ask "What are the current clinical applications of CRISPR gene therapy?"', 'Consensus returns peer-reviewed papers with key findings highlighted', 'Filter by publication date to get only recent studies', 'Export the citations directly into your paper\'s reference list'] },
        ],
        prompts: [
            { task: 'Pathway Explainer', prompt: 'Explain [pathway, e.g., glycolysis] step-by-step. For each step: name the enzyme, show the substrate and product, note if ATP/NADH is consumed or produced, and flag the rate-limiting step. End with a summary table.' },
            { task: 'Lab Report Help', prompt: 'I ran an experiment on [topic] with these results: [paste data]. Help me write the Discussion section. Include: interpretation of results, comparison with expected values, sources of error, and suggestions for future experiments.' },
            { task: 'MCAT Practice', prompt: 'Generate a MCAT-style passage about [topic, e.g., enzyme kinetics] followed by 4 multiple-choice questions. Include answer explanations that reference the passage and explain why each wrong answer is wrong.' },
        ],
    },
    {
        major: 'Political Science / Pre-Law',
        headline: 'AI tools for legal research, policy analysis, and persuasive writing',
        description: 'Research case law, analyze policy, and write arguments that hold up under scrutiny.',
        tools: [
            { name: 'Perplexity', url: 'https://www.perplexity.ai/', domain: 'perplexity.ai', oneLiner: 'Research current events and policy with real-time sources', howToUse: 'Ask about any policy issue and get a cited summary. Use Focus mode for academic papers only.', free: true },
            { name: 'Claude', url: 'https://claude.ai/', domain: 'claude.ai', oneLiner: 'Best for long-form policy analysis and structured arguments', howToUse: 'Give it a policy question and ask for a structured analysis: stakeholders, arguments for/against, precedents, and recommendation.', free: true },
            { name: 'Consensus', url: 'https://consensus.app/', domain: 'consensus.app', oneLiner: 'Find peer-reviewed political science research', howToUse: 'Ask "Does voter ID legislation reduce voter turnout?" and get evidence from published studies.', free: true },
            { name: 'ChatGPT', url: 'https://chat.openai.com/', domain: 'chat.openai.com', oneLiner: 'Case briefing, LSAT practice, moot court prep', howToUse: 'Paste a court case and ask for an IRAC-format brief: Issue, Rule, Application, Conclusion.', free: true },
        ],
        useCases: [
            { scenario: 'Writing a policy brief for a seminar class', toolUsed: 'Perplexity + Claude', steps: ['Use Perplexity to research the current state of [policy issue] with recent data and sources', 'Paste the key findings into Claude with the instruction: "Structure a 2-page policy memo with 3 options"', 'Claude generates a professional stakeholder analysis, options, and recommendation', 'Edit for your own voice, add the Perplexity citations, and submit'] },
            { scenario: 'Preparing for a moot court or mock trial', toolUsed: 'ChatGPT', steps: ['Paste the case facts and ask for an IRAC brief of the relevant precedent', 'Ask "Generate 5 counterarguments the opposing side might make"', 'Request rebuttals for each counterargument with case law references', 'Walk in with a prepared argument AND anticipated responses to every challenge'] },
            { scenario: 'Studying for the LSAT', toolUsed: 'ChatGPT', steps: ['Ask for 5 LSAT-style logical reasoning questions at increasing difficulty', 'Attempt each one before revealing the answer', 'Ask for detailed explanations of the reasoning pattern behind each correct answer', 'Request a summary of which reasoning patterns you\'re weakest at'] },
        ],
        prompts: [
            { task: 'Case Brief', prompt: 'Brief this case in IRAC format: [paste case or case name]. Include: Facts (2-3 sentences), Issue (the legal question), Rule (the applicable law), Application (how the court applied it), and Conclusion (the holding).' },
            { task: 'Policy Memo', prompt: 'Write a 1-page policy memo on [issue] for [audience, e.g., a state senator]. Structure: Executive Summary, Background, Policy Options (3), Recommendation with justification. Tone: professional and nonpartisan.' },
            { task: 'LSAT Logic Games', prompt: 'Generate 3 LSAT-style analytical reasoning questions. Include the setup, constraints, and 4 questions of increasing difficulty. Provide detailed explanations for each answer.' },
        ],
    },
    {
        major: 'Other',
        headline: 'AI tools every student should know, regardless of major',
        description: 'These work for any field. Research, writing, presentations, and productivity — covered.',
        tools: [
            { name: 'ChatGPT', url: 'https://chat.openai.com/', domain: 'chat.openai.com', oneLiner: 'The all-purpose AI for writing, analysis, brainstorming, and learning', howToUse: 'Start with any task. The key is being specific: give it a role, context, task, and desired format.', free: true },
            { name: 'Perplexity', url: 'https://www.perplexity.ai/', domain: 'perplexity.ai', oneLiner: 'Research with sources — every answer is cited', howToUse: 'Replace Google for any research question. You get the answer AND the sources in one step.', free: true },
            { name: 'NotebookLM', url: 'https://notebooklm.google.com/', domain: 'notebooklm.google.com', oneLiner: 'Upload any reading and turn it into a study resource', howToUse: 'Upload your syllabus or readings, ask questions, generate audio overviews to listen on the go.', free: true },
            { name: 'Grammarly', url: 'https://www.grammarly.com/', domain: 'grammarly.com', oneLiner: 'AI writing assistant that catches grammar, tone, and clarity issues', howToUse: 'Install the browser extension. It checks everything you type — essays, emails, discussion posts.', free: true },
        ],
        useCases: [
            { scenario: 'Writing a research paper on any topic', toolUsed: 'Perplexity + ChatGPT + Grammarly', steps: ['Use Perplexity to research your topic — every fact comes with a source you can cite', 'Ask ChatGPT to help outline the paper structure based on your research', 'Write the paper and run it through Grammarly for tone, clarity, and grammar checks', 'You have a well-researched, well-written paper with proper citations'] },
            { scenario: 'Studying for finals week', toolUsed: 'NotebookLM', steps: ['Upload every lecture slide and reading from the semester into one notebook', 'Ask "What are the 20 most important concepts from this entire course?"', 'Generate an Audio Overview to review while walking between exams', 'Use the chat to drill into specific topics you\'re shaky on'] },
            { scenario: 'Emailing a professor about a deadline extension', toolUsed: 'ChatGPT + Grammarly', steps: ['Ask ChatGPT: "Write a respectful email requesting an extension for [reason], offering to submit by [new date]"', 'Review the draft — make sure it sounds like you, not a robot', 'Run it through Grammarly to catch any tone issues', 'Send a professional, well-written email that gets a positive response'] },
        ],
        prompts: [
            { task: 'Essay Outline', prompt: 'Create a detailed outline for a [length] essay on [topic]. Include: thesis statement, 4-5 main sections with subpoints, evidence suggestions for each section, and a conclusion strategy.' },
            { task: 'Study Guide', prompt: 'Create a comprehensive study guide for [course/topic]. Include: key concepts with definitions, important formulas or frameworks, potential exam questions, and memory tricks for difficult material.' },
            { task: 'Email to Professor', prompt: 'Write a professional email to my professor about [situation, e.g., requesting an extension]. Tone: respectful and concise. Include: context, the specific request, a proposed solution, and a thank-you.' },
        ],
    },
];

export function getToolkitForMajor(major: string | undefined): MajorToolkit {
    if (!major) return majorToolkits[majorToolkits.length - 1];
    const match = majorToolkits.find(
        (t) => t.major.toLowerCase() === major.toLowerCase(),
    );
    return match ?? majorToolkits[majorToolkits.length - 1];
}
