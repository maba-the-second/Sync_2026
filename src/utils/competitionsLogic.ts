/**
 * Pure competition business logic, validation, and data helpers
 * Used both in tests and shared with frontend runtime modules
 */

export interface TeamMember {
  name: string;
  grade: string;
}

export interface RegistrationInput {
  competitionId: string;
  participationType: 'intra' | 'inter';
  fullName: string;
  schoolName: string;
  grade: string;
  email: string;
  contactNumber: string;
  // Quiz specific
  teamName?: string;
  teamMembers?: TeamMember[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const COMPETITIONS_DATA = [
  {
    id: 'algorithm',
    name: 'Algorithm',
    tagline: 'Competitive Algorithmic Programming',
    description: 'Challenge your programming logic, analytical thinking, and problem-solving ability through a competitive online algorithmic programming experience.',
    category: 'Code & Logic',
    minGrade: 6,
    maxGrade: 13,
    isTeam: false,
    platform: 'HackerRank',
    format: '5 problems, 100 points each (500 pts total), 4-hour window',
    languages: 'C++, Python, Java, JavaScript',
    scoring: 'Partial scoring on passed subtasks. Highest attempt counts. Tie-breaker: earliest completion.',
    submission: 'Submitted directly through HackerRank before the competition closes. No separate SYNC portal upload needed.'
  },
  {
    id: 'webdev',
    name: 'Web Development',
    tagline: 'School Command Center Platform',
    description: 'Design and develop an innovative digital platform that solves a practical problem through functionality, creativity, and excellent user experience.',
    category: 'Software & Web',
    minGrade: 6,
    maxGrade: 13,
    isTeam: false,
    statement: 'Bob is tasked with building a digital command center for all school events: announcements, calendars, registrations/ticketing, live updates.',
    tech: 'Any framework allowed (HTML/CSS/JS, React, Vue, etc.). Must be hosted live (GitHub Pages, Vercel, Netlify) with public GitHub repo & README.md.',
    submission: 'Submit public GitHub repo link and live hosted web app link via SYNC ’26 website before deadline.'
  },
  {
    id: 'photoman',
    name: 'Photo Manipulation',
    tagline: 'The Future-Tech Realm: A Digital Frontier',
    description: 'Transform the digital world into a futuristic visual experience using advanced photo manipulation, lighting, textures, and artistic storytelling.',
    category: 'Visual & VFX',
    minGrade: 6,
    maxGrade: 13,
    isTeam: false,
    toolRequirement: 'Adobe Photoshop only. Must record/capture workflow screenshots.',
    submission: 'RAR archive (Photo_SchoolName_YourName.rar) with all layers, textures, process screenshots, plus exported PNG/JPG. Upload via public Google Drive link.'
  },
  {
    id: 'poster',
    name: 'Poster Design',
    tagline: 'Happening Now: A Futuristic Call to SYNC \'26',
    description: 'Create a futuristic promotional poster that feels like an event happening in real time.',
    category: 'Graphic Design',
    minGrade: 6,
    maxGrade: 13,
    isTeam: false,
    spec: 'Standard A3/A4 portrait recommended. Working editable source file (.psd, .ai) with all layers intact + final PNG/JPG.',
    submission: 'Archive named Poster_SchoolName_YourName.rar via public Google Drive link.'
  },
  {
    id: 'logo',
    name: 'Logo Design',
    tagline: 'Futuristic Identity & Brand Symbolism',
    description: 'Create a memorable, futuristic identity that communicates innovation, digital transformation, and creative thinking.',
    category: 'Brand Identity',
    minGrade: 6,
    maxGrade: 13,
    isTeam: false,
    spec: 'Full color version + simplified monochrome version + short design note explaining concept & inspiration.',
    submission: 'Archive named Logo_SchoolName_YourName.rar via public Google Drive link.'
  },
  {
    id: 'uiux',
    name: 'UI/UX Design',
    tagline: 'Beyond the Screen: Envisioning Interactive Futures',
    description: 'Imagine how people will experience the next generation of digital products.',
    category: 'Product Design',
    minGrade: 6,
    maxGrade: 13,
    isTeam: false,
    spec: 'Figma, Adobe XD, or Sketch. Minimum 1 primary interface screen + wireframe/user flow of 2-3 screens + max 200-word concept note PDF.',
    submission: 'Archive named UIUX_SchoolName_YourName.rar via public Google Drive link.'
  },
  {
    id: 'quiz',
    name: 'Inter-School Quiz',
    tagline: 'Premier Inter-School ICT Knowledge Championship',
    description: 'The Inter-School Quiz competition tests students on a wide range of ICT topics, including fundamentals, emerging technologies, digital ethics, and industry trends.',
    category: 'Knowledge & Trivia',
    minGrade: 10,
    maxGrade: 13,
    isTeam: true,
    maxTeamMembers: 5,
    maxTeamsPerSchool: 2,
    rounds: 'Round 1 (Online Zoom + Portal) -> Round 2 (Online Semifinal) -> Grand Physical Final at SYNC ’26 Main Event',
    submission: 'Team registration with Captain + up to 5 members from the same school.'
  },
  {
    id: 'aspect',
    name: 'ASPECT — Gaming Competition',
    tagline: 'Call of Duty 3 Cybernetic Tournament',
    description: 'Enter the cybernetic arena in ASPECT, the premier gaming showdown featuring Call of Duty 3. Precision, tactics, and reflex define the champion.',
    category: 'Esports & Gaming',
    minGrade: 6,
    maxGrade: 13,
    isTeam: false,
    game: 'Call of Duty 3',
    statusNote: 'Competition rules and tournament schedule will be announced through the official event channels and WhatsApp community.'
  }
];

export function getCompetitionById(id: string) {
  return COMPETITIONS_DATA.find(c => c.id === id);
}

export function validateGradeEligibility(competitionId: string, gradeStr: string | number): { isEligible: boolean; message: string } {
  const comp = getCompetitionById(competitionId);
  const gradeNum = typeof gradeStr === 'number' ? gradeStr : parseInt(String(gradeStr).replace(/[^0-9]/g, ''), 10);

  if (!comp) {
    return { isEligible: false, message: 'Unknown competition specified.' };
  }

  if (isNaN(gradeNum)) {
    return { isEligible: false, message: 'Please select a valid grade.' };
  }

  if (gradeNum < comp.minGrade || gradeNum > comp.maxGrade) {
    if (competitionId === 'quiz') {
      return {
        isEligible: false,
        message: `The Inter-School Quiz is strictly open to Grades ${comp.minGrade}–${comp.maxGrade} only.`
      };
    }
    return {
      isEligible: false,
      message: `Eligible for Grade ${comp.minGrade} to Grade ${comp.maxGrade} only.`
    };
  }

  return { isEligible: true, message: 'Grade eligibility verified.' };
}

export function validateSriLankanPhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Matches +947XXXXXXXX, 00947XXXXXXXX, or 07XXXXXXXX (9-10 digits)
  const regex = /^(\+94|0094|0)?7[01245678][0-9]{7}$/;
  return regex.test(cleaned);
}

export function validateEmail(email: string): boolean {
  if (!email) return false;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email.trim());
}

export function generateConfirmationId(competitionId: string): string {
  const prefixes: Record<string, string> = {
    algorithm: 'ALG',
    webdev: 'WEB',
    photoman: 'PHM',
    poster: 'PST',
    logo: 'LGD',
    uiux: 'UIX',
    quiz: 'QIZ',
    aspect: 'ASP'
  };
  const prefix = prefixes[competitionId] || 'SYNC';
  const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
  const timestampPart = Date.now().toString(36).slice(-4).toUpperCase();
  return `SYNC-${prefix}-${timestampPart}${randomHex}`;
}

export function validateRegistration(data: Partial<RegistrationInput>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.competitionId) {
    errors.competitionId = 'Competition selection is required.';
  }

  if (!data.participationType || !['intra', 'inter'].includes(data.participationType)) {
    errors.participationType = 'Please select participation type (Intra-School or Inter-School).';
  }

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full Name is required (minimum 2 characters).';
  }

  if (!data.schoolName || data.schoolName.trim().length < 2) {
    errors.schoolName = 'School Name is required.';
  }

  if (data.participationType === 'intra') {
    if (data.schoolName && !/dharmaraja/i.test(data.schoolName)) {
      errors.schoolName = 'Intra-School participation is exclusive to Dharmaraja College.';
    }
  }

  if (!data.grade) {
    errors.grade = 'Grade selection is required.';
  } else if (data.competitionId) {
    const gradeCheck = validateGradeEligibility(data.competitionId, data.grade);
    if (!gradeCheck.isEligible) {
      errors.grade = gradeCheck.message;
    }
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'A valid email address is required.';
  }

  if (!data.contactNumber || !validateSriLankanPhone(data.contactNumber)) {
    errors.contactNumber = 'A valid Sri Lankan phone number is required (e.g., 0714906145 or +94 71 490 6145).';
  }

  // Quiz-specific rules
  if (data.competitionId === 'quiz') {
    if (!data.teamName || data.teamName.trim().length < 2) {
      errors.teamName = 'Team Name is required for the Inter-School Quiz.';
    }

    if (!Array.isArray(data.teamMembers) || data.teamMembers.length < 1) {
      errors.teamMembers = 'At least 1 team member is required (up to 5 members).';
    } else if (data.teamMembers.length > 5) {
      errors.teamMembers = 'A maximum of 5 members are allowed per quiz team.';
    } else {
      data.teamMembers.forEach((member, index) => {
        if (!member.name || member.name.trim().length < 2) {
          errors[`member_${index}_name`] = `Member #${index + 1} name is required.`;
        }
        const memberGradeCheck = validateGradeEligibility('quiz', member.grade);
        if (!memberGradeCheck.isEligible) {
          errors[`member_${index}_grade`] = `Member #${index + 1} must be in Grade 10–13.`;
        }
      });
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  school: string;
  competition: string;
  score: number;
}

export function filterAndSortLeaderboard(
  entries: LeaderboardEntry[],
  filters: { competition?: string; school?: string; query?: string }
): LeaderboardEntry[] {
  if (!entries || entries.length === 0) return [];

  return entries
    .filter(item => {
      if (filters.competition && filters.competition !== 'all' && item.competition.toLowerCase() !== filters.competition.toLowerCase()) {
        return false;
      }
      if (filters.school && filters.school !== 'all' && item.school.toLowerCase() !== filters.school.toLowerCase()) {
        return false;
      }
      if (filters.query && filters.query.trim()) {
        const q = filters.query.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesSchool = item.school.toLowerCase().includes(q);
        if (!matchesName && !matchesSchool) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (a.rank !== b.rank) return a.rank - b.rank;
      return b.score - a.score;
    });
}

export function getFaqAnswer(query: string): string {
  const q = query.toLowerCase().trim();

  if (q.includes('grade') || q.includes('eligib')) {
    return 'For Individual competitions (Algorithm, Web Dev, Photo Manipulation, Poster Design, Logo Design, UI/UX, ASPECT Gaming), participation is open to Grades 6–13. The Inter-School Quiz is strictly open to Grades 10–13.';
  }

  if (q.includes('quiz') && (q.includes('team') || q.includes('member') || q.includes('how many'))) {
    return 'The Inter-School Quiz is a team-based competition with up to 5 members per team. All members must belong to the same school, in Grades 10–13. Each school is limited to a maximum of 2 teams.';
  }

  if (q.includes('hackerrank') || q.includes('algo')) {
    return 'The Algorithm competition consists of 5 problems (100 points each, 500 total) solved within a 4-hour window on HackerRank in C++, Python, Java, or JavaScript. Submissions are made directly on HackerRank.';
  }

  if (q.includes('whatsapp') || q.includes('group') || q.includes('link')) {
    return 'You can join the official SYNC ’26 WhatsApp group at: https://chat.whatsapp.com/IaBJyTRhZcACMFKUOrYndg or contact the team directly at https://wa.link/05138r';
  }

  if (q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('organizer')) {
    return 'Official contacts: Muditha Koralegedara (+94 70 264 5851) & Nethun (+94 71 490 6145), or email drck.ictsociety@gmail.com.';
  }

  if (q.includes('aspect') || q.includes('cod') || q.includes('gaming')) {
    return 'ASPECT is the official gaming competition featuring Call of Duty 3. Detailed tournament brackets and schedule will be announced through the official event channels and WhatsApp community.';
  }

  if (q.includes('prize') || q.includes('deadline') || q.includes('schedule') || q.includes('date')) {
    return 'Official competition dates, final deadlines, and awards will be announced through the official SYNC ’26 WhatsApp group and official event channels.';
  }

  return 'I am the SYNC AI assistant. You can ask about competition rules, grade eligibility (Grades 6–13, Quiz 10–13), team limits, submission formats, or contact details for the Dharmaraja College ICT Society!';
}
