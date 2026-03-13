import { Event, ModuleTemplate, Quiz } from '../types';
import { appVisuals } from './visuals';

const moduleOnePartOneVideo = new URL('../../module-videos/Module 1/Module 1 Part 1.mp4', import.meta.url).href;
const moduleOnePartTwoVideo = new URL('../../module-videos/Module 1/Module 1 Part 2.mp4', import.meta.url).href;
const moduleOnePartThreeVideo = new URL('../../module-videos/Module 1/Module 1 Part 3.mp4', import.meta.url).href;
const moduleOnePartFourVideo = new URL('../../module-videos/Module 1/Module 1 Part 4.mp4', import.meta.url).href;

export const mockEvents: Event[] = [
    {
        id: 'e1',
        name: 'Future of Tech Networking Mixer',
        date: '2023-11-15T18:00:00Z',
        speaker: 'Jane Doe, Senior Engineer at TechCorp',
        description: 'Join us for an evening of networking with industry professionals and alumni navigating the AI landscape.',
        type: 'networking'
    },
    {
        id: 'e2',
        name: 'AI in Healthcare Panel',
        date: '2023-11-20T17:00:00Z',
        speaker: 'Dr. John Smith, AI Researcher',
        description: 'A panel discussion on the impact of artificial intelligence on healthcare careers.',
        type: 'networking'
    },
    {
        id: 'a1',
        name: 'Resume Review & Career Strategy',
        date: '2023-11-12T14:00:00Z',
        speaker: 'Sarah Johnson, Career Advisor',
        description: 'Group advising session focused on highlighting your unique skills in an AI-driven job market.',
        type: 'advising'
    },
    {
        id: 'a2',
        name: 'Navigating Internships in 2024',
        date: '2023-11-25T15:00:00Z',
        speaker: 'Michael Brown, University Recruiter',
        description: 'Learn strategies for securing internships and standing out among applicants.',
        type: 'advising'
    }
];

export const moduleTemplates: ModuleTemplate[] = [
    {
        id: 'module-1',
        title: 'Confidence Through Skills',
        topic: 'What makes you irreplaceable in your field',
        description: 'Learn the strengths that matter most in modern work and how to apply them with confidence.',
        videoUrl: moduleOnePartOneVideo,
        videoPlaylist: [
            { title: 'Part 1: Human Skills Overview', src: moduleOnePartOneVideo },
            { title: 'Part 2: Confidence in Practice', src: moduleOnePartTwoVideo },
            { title: 'Part 3: Real-World Scenarios', src: moduleOnePartThreeVideo },
            { title: 'Part 4: Action Plan', src: moduleOnePartFourVideo },
        ],
        thumbnail: appVisuals.modules['module-1'].thumbnail,
        infographics: [
            { title: 'The Empathy Advantage', content: 'Emotional intelligence and empathy are critical human skills that machines lack.' },
            { title: 'Creative Problem Solving', content: 'While AI can process data, humans excel at connecting disparate ideas to solve novel problems.' }
        ],
        scenario: {
            context: 'Your team is tasked with designing a new marketing campaign. An AI tool generates an outline, but it feels generic.',
            options: [
                { text: 'Use the AI outline exactly as is to save time.', feedback: 'This fails to leverage human creativity and might not resonate with the audience.' },
                { text: 'Discard the AI outline completely and start over.', feedback: 'You miss out on a valuable starting point and waste effort.' },
                { text: 'Use the AI outline as a base, but inject human stories and emotional appeal.', feedback: 'Excellent! This combines the efficiency of AI with uniquely human skills.' }
            ]
        },
        keyTakeaways: [
            'Focus on emotional intelligence.',
            'Develop complex problem-solving skills.',
            'Embrace continuous learning.'
        ]
    },
    {
        id: 'module-2',
        title: 'Navigate AI Uncertainty',
        topic: 'Your industry in 2030',
        description: 'Explore the projected impact of AI on various industries and how to prepare for future changes.',
        thumbnail: appVisuals.modules['module-2'].thumbnail,
        infographics: [
            { title: 'Automation Risk', content: 'Routine and repetitive tasks are at high risk of automation by 2030.' },
            { title: 'New Opportunities', content: 'AI will create new roles focused on oversight, ethics, and strategic implementation.' }
        ],
        scenario: {
            context: 'You read an article predicting that your chosen profession will be largely automated within 10 years.',
            options: [
                { text: 'Immediately change your major to something completely unrelated.', feedback: 'This might be a premature reaction without understanding the nuances of the prediction.' },
                { text: 'Ignore the article and assume everything will be fine.', feedback: 'Ignoring potential industry shifts can leave you unprepared.' },
                { text: 'Research the specific skills in your field that are less susceptible to automation and focus on developing those.', feedback: 'Great approach! Adapting your skill set is key to long-term resilience.' }
            ]
        },
        keyTakeaways: [
            'Stay informed about industry trends.',
            'Identify the non-automatable aspects of your chosen career.',
            'Cultivate adaptability and flexibility.'
        ]
    },
    {
        id: 'module-3',
        title: 'Practical AI Skills',
        topic: 'Using AI responsibly and effectively',
        description: 'Learn how to leverage AI tools to enhance your productivity while maintaining ethical standards.',
        thumbnail: appVisuals.modules['module-3'].thumbnail,
        infographics: [
            { title: 'Effective Prompting', content: 'The quality of AI output depends heavily on the clarity and specificity of the prompt.' },
            { title: 'The Hallucination Problem', content: 'AI models can confidently generate incorrect information. Always verify critical facts.' }
        ],
        scenario: {
            context: 'You are writing an essay and decide to use an AI chatbot for help.',
            options: [
                { text: 'Have the AI write the entire essay and submit it as your own.', feedback: 'This is academic dishonesty and prevents you from learning the material.' },
                { text: 'Ask the AI to generate ideas and outlines, then write the essay yourself.', feedback: 'This is a responsible and effective way to use AI as a brainstorming tool.' },
                { text: 'Use the AI to write sections, but heavily edit and fact-check the output.', feedback: 'This is an acceptable approach, provided you ensure the final work reflects your own understanding and writing style.' }
            ]
        },
        keyTakeaways: [
            'Learn to write clear, specific prompts.',
            'Always critically evaluate AI generated content.',
            'Understand the ethical implications of using AI.'
        ]
    }
];

export const mockQuizzes: Quiz[] = [
    {
        moduleId: 'module-1',
        title: 'Confidence Through Skills Quiz',
        questions: [
            {
                id: 'q1-1',
                question: 'Which of the following is considered a uniquely human skill less likely to be automated in the near future?',
                options: ['Data entry', 'Complex problem solving requiring empathy', 'Basic coding tasks', 'Routine financial analysis'],
                correctAnswerIndex: 1,
                explanation: 'Skills requiring high emotional intelligence and complex reasoning are currently difficult for AI to replicate.'
            },
            {
                id: 'q1-2',
                question: 'How should you view the relationship between AI and your career?',
                options: ['As an unavoidable threat', 'As an irrelevant trend', 'As a tool to augment your abilities', 'As a complete replacement for human effort'],
                correctAnswerIndex: 2,
                explanation: 'The most effective approach is to view AI as a collaborator that can enhance your uniquely human skills.'
            }
        ]
    },
    {
        moduleId: 'module-2',
        title: 'Navigate AI Uncertainty Quiz',
        questions: [
            {
                id: 'q2-1',
                question: 'What is the most effective strategy for dealing with the uncertainty of future job markets?',
                options: ['Specializing deeply in one narrow, easily automatable task', 'Developing a broad range of adaptable skills', 'Ignoring the changes and hoping for the best', 'Assuming all jobs will disappear'],
                correctAnswerIndex: 1,
                explanation: 'Adaptability and a diverse skill set are key to navigating uncertain futures.'
            }
        ]
    },
    {
        moduleId: 'module-3',
        title: 'Practical AI Skills Quiz',
        questions: [
            {
                id: 'q3-1',
                question: 'What is a major risk when relying on information generated by Large Language Models?',
                options: ['They are too slow', 'They can produce "hallucinations" or factually incorrect information', 'They cannot write in different styles', 'They always provide unbiased answers'],
                correctAnswerIndex: 1,
                explanation: 'It is essential to fact-check AI outputs, as models can confidently present incorrect information as fact.'
            }
        ]
    }
];
