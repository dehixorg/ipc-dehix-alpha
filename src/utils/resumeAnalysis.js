import nlp from 'compromise';

/**
 * Tokenizes text into words using compromise.
 */
export const tokenizeText = (text) => {
  const doc = nlp(text);
  return doc
    .terms()
    .out('array')
    .map((term) => term.toLowerCase());
};

export const stemText = (text) => {
  const doc = nlp(text);
  return doc
    .terms()
    .out('array')
    .map((term) => nlp(term).terms().out('array')[0])
    .join('');
};

export const checkSpellingErrors = (text) => {
  const tokenized = tokenizeText(text);
  const dictionary = [
    'javascript',
    'react',
    'developer',
    'experience',
    'project',
    'resume',
  ];
  return tokenized.filter((word) => !dictionary.includes(word));
};

export const calculateAtsScore = (resumeText, jobKeywords) => {
  const tokenizedResume = tokenizeText(resumeText);
  const lowercaseKeywords = jobKeywords.map((keyword) => keyword.toLowerCase());
  const keywordCount = lowercaseKeywords.filter((keyword) =>
    tokenizedResume.includes(keyword)
  ).length;
  return Math.round((keywordCount / jobKeywords.length) * 100);
};

export const analyzeBrevity = (text) => {
  const words = tokenizeText(text);
  return words.length;
};

export const analyzeGrammar = (text) => {
  const sentences = text
    .split(/[.!?]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return sentences.filter((sentence) => sentence.split('').length > 20);
};

export const analyzeStructure = (text) => {
  const sections = [
    'education',
    'experience',
    'skills',
    'projects',
    'certifications',
  ];
  const missingSections = sections.filter(
    (section) => !text.toLowerCase().includes(section)
  );
  return missingSections;
};

export const analyzeResume = (resumeText, jobKeywords) => {
  const grammarIssues = analyzeGrammar(resumeText);
  const brevityScore = analyzeBrevity(resumeText);
  const structureIssues = analyzeStructure(resumeText);
  const atsScore = calculateAtsScore(resumeText, jobKeywords);
  const spellingMistakes = checkSpellingErrors(resumeText);

  const grammarScore = Math.max(0, 100 - grammarIssues.length * 5);
  const brevityNormalized = Math.max(0, 100 - Math.abs(brevityScore - 150));
  const sectionsScore = Math.max(0, (5 - structureIssues.length) * 20);
  const totalScore = Math.round(
    (grammarScore + brevityNormalized + atsScore + sectionsScore) / 4
  );

  return {
    totalScore,
    grammarScore,
    brevityScore: brevityNormalized,
    impactScore: atsScore,
    sectionsScore,
    spellingMistakes,
  };
};
