/**
 * =========================================================================
 * SYNC ’26 — Google Apps Script Backend
 * Dharmaraja College ICT Society
 * =========================================================================
 * 
 * INSTRUCTIONS FOR ORGANIZERS:
 * 1. Create a new Google Spreadsheet in Google Drive.
 * 2. Rename the active sheet to "Registrations".
 * 3. (Optional) Create a second sheet named "Leaderboard" with columns:
 *    Rank | Name | School | Competition | Score | Status
 * 4. Open Extensions > Apps Script in the Google Spreadsheet.
 * 5. Replace all code with this file's contents.
 * 6. Set your SPREADSHEET_ID below (or leave empty if bound directly to sheet).
 * 7. (Optional) To enable Gemini AI for the chatbot:
 *    Go to Project Settings > Script Properties > Add property:
 *    Name: GEMINI_API_KEY, Value: [Your Gemini API Key]
 * 8. Deploy > New deployment > Select type: "Web app":
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 9. Copy the generated Web App URL and paste it into js/config.js (window.SYNC_CONFIG.backend.appsScriptUrl).
 */

// If standalone script, set the spreadsheet ID here; if bound to spreadsheet, leave as ""
var SPREADSHEET_ID = "";

function getSpreadsheet() {
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim().length > 0) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "ping";
  var result = {};

  try {
    if (action === "getLeaderboard") {
      result = handleGetLeaderboard();
    } else {
      result = {
        status: "online",
        message: "SYNC ’26 Backend API is active",
        timestamp: new Date().toISOString()
      };
    }
  } catch (err) {
    result = { success: false, error: err.toString() };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var result = {};

  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    var action = data.action;

    if (action === "register") {
      result = handleRegistration(data.payload);
    } else if (action === "chat") {
      result = handleAiChat(data.prompt);
    } else {
      result = { success: false, error: "Invalid action specified: " + action };
    }
  } catch (err) {
    result = { success: false, error: "Server processing exception: " + err.toString() };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle new participant and team registrations
 */
function handleRegistration(payload) {
  if (!payload) {
    return { success: false, error: "No payload provided." };
  }

  // 1. Validation Checks
  if (!payload.competitionId) {
    return { success: false, error: "Missing competitionId." };
  }
  if (!payload.fullName || payload.fullName.trim().length < 2) {
    return { success: false, error: "Full Name is required (minimum 2 characters)." };
  }
  if (!payload.schoolName) {
    return { success: false, error: "School Name is required." };
  }
  if (!payload.email || payload.email.indexOf("@") === -1) {
    return { success: false, error: "Valid email address is required." };
  }
  if (!payload.contactNumber) {
    return { success: false, error: "Valid contact phone number is required." };
  }

  // Grade restrictions
  var gradeNum = parseInt(payload.grade, 10);
  if (payload.competitionId === "quiz") {
    if (isNaN(gradeNum) || gradeNum < 10 || gradeNum > 13) {
      return { success: false, error: "Inter-School Quiz is strictly open to Grades 10–13." };
    }
    if (!payload.teamName) {
      return { success: false, error: "Team Name is required for the Inter-School Quiz." };
    }
    if (payload.teamMembers && payload.teamMembers.length > 5) {
      return { success: false, error: "Quiz teams are limited to a maximum of 5 members." };
    }
  } else {
    if (isNaN(gradeNum) || gradeNum < 6 || gradeNum > 13) {
      return { success: false, error: "Individual competitions are open to Grades 6–13." };
    }
  }

  // Intra-school validation
  if (payload.participationType === "intra") {
    if (payload.schoolName.toLowerCase().indexOf("dharmaraja") === -1) {
      return { success: false, error: "Intra-School participation is restricted to Dharmaraja College." };
    }
  }

  // 2. Write to Sheet
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName("Registrations");
  if (!sheet) {
    sheet = ss.insertSheet("Registrations");
    sheet.appendRow([
      "Timestamp",
      "Confirmation ID",
      "Competition",
      "Participation Type",
      "Full Name",
      "School",
      "Grade",
      "Email",
      "Contact Number",
      "Team Name",
      "Team Members",
      "Status"
    ]);
    sheet.getRange(1, 1, 1, 12).setFontWeight("bold").setBackground("#07100B").setFontColor("#5CE3D2");
  }

  var timestamp = new Date();
  var confirmationId = payload.confirmationId || ("SYNC-" + Date.now().toString(36).toUpperCase());
  var membersStr = "";
  if (payload.teamMembers && Array.isArray(payload.teamMembers)) {
    membersStr = payload.teamMembers.map(function (m) {
      return m.name + " (Gr." + m.grade + ")";
    }).join("; ");
  }

  sheet.appendRow([
    timestamp,
    confirmationId,
    payload.competitionId,
    payload.participationType || "intra",
    payload.fullName,
    payload.schoolName,
    payload.grade,
    payload.email,
    payload.contactNumber,
    payload.teamName || "N/A",
    membersStr || "N/A",
    "Confirmed"
  ]);

  return {
    success: true,
    confirmationId: confirmationId,
    message: "Registration successfully recorded in official event ledger."
  };
}

/**
 * Handle retrieving published leaderboard results
 */
function handleGetLeaderboard() {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName("Leaderboard");
  if (!sheet) {
    return { success: true, results: [] };
  }

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    return { success: true, results: [] };
  }

  var results = [];
  // Assumes row 1 is header: Rank, Name, School, Competition, Score, Status
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (row[0] && row[1]) {
      results.push({
        rank: Number(row[0]),
        name: String(row[1]),
        school: String(row[2]),
        competition: String(row[3]),
        score: Number(row[4]),
        status: String(row[5] || "Verified")
      });
    }
  }

  return { success: true, results: results };
}

/**
 * Secure Server-Side Gemini Chat Assistant
 */
function handleAiChat(prompt) {
  var apiKey = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");
  if (!apiKey) {
    return {
      success: true,
      reply: "The Gemini AI engine is currently operating in offline mode. For official event details, please join the WhatsApp group: https://chat.whatsapp.com/IaBJyTRhZcACMFKUOrYndg"
    };
  }

  var url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;
  var systemInstruction = "You are the official SYNC ’26 AI Assistant for Dharmaraja College ICT Society. Answer strictly about the 8 competition categories: Algorithm, Web Development, Photo Manipulation, Poster Design, Logo Design, UI/UX Design, Inter-School Quiz (Grades 10-13, max 5 members per team, 2 teams per school), and ASPECT Gaming (Call of Duty 3). Do not invent deadlines, prizes, or schedules not confirmed. For contacts, refer to Muditha Koralegedara (+94 70 264 5851) and Nethun (+94 71 490 6145).";

  var requestBody = {
    contents: [
      {
        role: "user",
        parts: [
          { text: systemInstruction + "\n\nUser Question: " + prompt }
        ]
      }
    ]
  };

  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(requestBody),
    muteHttpExceptions: true
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var json = JSON.parse(response.getContentText());
    var replyText = json.candidates[0].content.parts[0].text;
    return { success: true, reply: replyText };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}
