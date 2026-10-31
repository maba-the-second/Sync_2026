import test from 'node:test';
import assert from 'node:assert/strict';
import {
  COMPETITIONS_DATA,
  getCompetitionById,
  validateGradeEligibility,
  validateSriLankanPhone,
  validateEmail,
  validateRegistration,
  generateConfirmationId,
  filterAndSortLeaderboard,
  getFaqAnswer
} from '../src/utils/competitionsLogic';

test('competition data contains exactly 8 official competitions', () => {
  assert.equal(COMPETITIONS_DATA.length, 8);
  const ids = COMPETITIONS_DATA.map(c => c.id);
  assert.deepEqual(ids, [
    'algorithm',
    'webdev',
    'photoman',
    'poster',
    'logo',
    'uiux',
    'quiz',
    'aspect'
  ]);
});

test('grade eligibility rule: quiz is strictly 10-13, others 6-13', () => {
  // Quiz checks
  assert.equal(validateGradeEligibility('quiz', 8).isEligible, false);
  assert.equal(validateGradeEligibility('quiz', 9).isEligible, false);
  assert.equal(validateGradeEligibility('quiz', 10).isEligible, true);
  assert.equal(validateGradeEligibility('quiz', 12).isEligible, true);
  assert.equal(validateGradeEligibility('quiz', 13).isEligible, true);
  assert.equal(validateGradeEligibility('quiz', 14).isEligible, false);

  // Algorithm & others
  assert.equal(validateGradeEligibility('algorithm', 5).isEligible, false);
  assert.equal(validateGradeEligibility('algorithm', 6).isEligible, true);
  assert.equal(validateGradeEligibility('algorithm', 13).isEligible, true);
  assert.equal(validateGradeEligibility('algorithm', 14).isEligible, false);
});

test('Sri Lankan phone validation works correctly', () => {
  assert.equal(validateSriLankanPhone('0714906145'), true);
  assert.equal(validateSriLankanPhone('+94 70 264 5851'), true);
  assert.equal(validateSriLankanPhone('0771234567'), true);
  assert.equal(validateSriLankanPhone('12345'), false);
  assert.equal(validateSriLankanPhone('0912345678'), false); // 09 is not mobile
  assert.equal(validateSriLankanPhone(''), false);
});

test('email validation functions correctly', () => {
  assert.equal(validateEmail('drck.ictsociety@gmail.com'), true);
  assert.equal(validateEmail('student@school.lk'), true);
  assert.equal(validateEmail('invalid-email'), false);
  assert.equal(validateEmail('@domain.com'), false);
});

test('registration validation enforces required fields and intra school rule', () => {
  // Missing fields
  const emptyRes = validateRegistration({});
  assert.equal(emptyRes.isValid, false);
  assert.ok(emptyRes.errors.competitionId);
  assert.ok(emptyRes.errors.fullName);

  // Intra school must be Dharmaraja College
  const intraBadSchool = validateRegistration({
    competitionId: 'algorithm',
    participationType: 'intra',
    fullName: 'Test Participant',
    schoolName: 'Ananda College',
    grade: '10',
    email: 'test@example.com',
    contactNumber: '0714906145'
  });
  assert.equal(intraBadSchool.isValid, false);
  assert.ok(intraBadSchool.errors.schoolName);

  // Valid Intra school registration
  const intraValid = validateRegistration({
    competitionId: 'algorithm',
    participationType: 'intra',
    fullName: 'Test Participant',
    schoolName: 'Dharmaraja College',
    grade: '10',
    email: 'test@example.com',
    contactNumber: '0714906145'
  });
  assert.equal(intraValid.isValid, true);
});

test('quiz registration enforces team name and member grade constraints', () => {
  // Quiz with Grade 8 captain
  const quizBadGrade = validateRegistration({
    competitionId: 'quiz',
    participationType: 'inter',
    fullName: 'Captain John',
    schoolName: 'Kingswood College',
    grade: '8', // ineligible
    email: 'captain@example.com',
    contactNumber: '0771234567',
    teamName: 'CyberKnights',
    teamMembers: [
      { name: 'Member 1', grade: '10' }
    ]
  });
  assert.equal(quizBadGrade.isValid, false);
  assert.ok(quizBadGrade.errors.grade);

  // Quiz with Grade 9 member
  const quizBadMember = validateRegistration({
    competitionId: 'quiz',
    participationType: 'inter',
    fullName: 'Captain John',
    schoolName: 'Kingswood College',
    grade: '12',
    email: 'captain@example.com',
    contactNumber: '0771234567',
    teamName: 'CyberKnights',
    teamMembers: [
      { name: 'Member 1', grade: '9' } // ineligible
    ]
  });
  assert.equal(quizBadMember.isValid, false);
  assert.ok(quizBadMember.errors.member_0_grade);

  // Quiz with valid 4 members in grades 10-13
  const quizValid = validateRegistration({
    competitionId: 'quiz',
    participationType: 'inter',
    fullName: 'Captain John',
    schoolName: 'Kingswood College',
    grade: '12',
    email: 'captain@example.com',
    contactNumber: '0771234567',
    teamName: 'CyberKnights',
    teamMembers: [
      { name: 'Alice Silva', grade: '11' },
      { name: 'Bob Perera', grade: '12' },
      { name: 'Charlie Fernando', grade: '13' }
    ]
  });
  assert.equal(quizValid.isValid, true);
});

test('confirmation ID generator creates prefixed unique codes', () => {
  const algoId = generateConfirmationId('algorithm');
  assert.match(algoId, /^SYNC-ALG-[A-Z0-9]+$/);

  const quizId = generateConfirmationId('quiz');
  assert.match(quizId, /^SYNC-QIZ-[A-Z0-9]+$/);
});

test('leaderboard filter and sort works deterministically', () => {
  const sample = [
    { rank: 3, name: 'Charlie', school: 'School A', competition: 'algorithm', score: 380 },
    { rank: 1, name: 'Alice', school: 'School B', competition: 'algorithm', score: 500 },
    { rank: 2, name: 'Bob', school: 'School A', competition: 'webdev', score: 450 }
  ];

  const filtered = filterAndSortLeaderboard(sample, { competition: 'algorithm' });
  assert.equal(filtered.length, 2);
  assert.equal(filtered[0].name, 'Alice');
  assert.equal(filtered[1].name, 'Charlie');

  const empty = filterAndSortLeaderboard([], {});
  assert.deepEqual(empty, []);
});

test('FAQ assistant returns grounded answers without hallucinating prizes or dates', () => {
  const gradeAns = getFaqAnswer('what grade can join?');
  assert.ok(gradeAns.includes('Grades 6–13'));
  assert.ok(gradeAns.includes('Grades 10–13'));

  const prizeAns = getFaqAnswer('what are the prizes and deadline?');
  assert.ok(prizeAns.includes('announced'));

  const contactAns = getFaqAnswer('who should I contact?');
  assert.ok(contactAns.includes('Muditha'));
  assert.ok(contactAns.includes('Nethun'));
});
