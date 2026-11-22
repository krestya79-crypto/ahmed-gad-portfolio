export const categories = ['All Projects', 'Artificial Intelligence', 'AI Security', 'Machine Learning', 'Python', 'C++', 'Java', 'Web Development', 'Other Technologies'];
export const normalizeName = name => String(name).toLowerCase().replace(/[^a-z0-9]/g, '');
export function classifyRepository(repo) {
  const topics = new Set((repo.topics || []).map(t => t.toLowerCase()));
  const languages = new Set([repo.language, ...Object.keys(repo.languages || {})].filter(Boolean));
  const description = repo.description || '';
  const matches = values => values.some(v => topics.has(v));
  const result = [];
  if (matches(['ai','artificial-intelligence','generative-ai','llm','rag','agentic-ai']) || /\bAI[- ]powered\b|\bartificial intelligence\b|\bLLM\b|\bretrieval[- ]augmented\b/i.test(description)) result.push('Artificial Intelligence');
  if (matches(['ai-security','llm-security','adversarial-machine-learning','ai-safety','prompt-injection'])) result.push('AI Security');
  if (matches(['machine-learning','deep-learning','scikit-learn','pytorch','tensorflow']) || /\bmachine learning\b|\bdeep learning\b/i.test(description)) result.push('Machine Learning');
  for (const language of ['Python','C++','Java']) if (languages.has(language)) result.push(language);
  if (['JavaScript','TypeScript','HTML','CSS','Vue','Svelte'].some(l=>languages.has(l)) || matches(['web','web-development','frontend','react','nextjs','vite'])) result.push('Web Development');
  return result.length ? result : ['Other Technologies'];
}
export function safeWebUrl(value) {
  if (!value || typeof value !== 'string') return null;
  try { const url=new URL(value); return ['https:','http:'].includes(url.protocol) && !url.username && !url.password ? url.href : null; } catch { return null; }
}
