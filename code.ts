// @ts-nocheck
/**
 * Amindu & Ushera — Wedding RSVP + Wishes backend (Google Apps Script)
 *
 * Paste this whole file into Extensions > Apps Script (Code.gs) of the sheet:
 * https://docs.google.com/spreadsheets/d/1XmlzJo0kdD6g3igCTeP-FDTVaHv-4PRqiiarUccr33g
 *
 * - "RSVP" and "Wishes" tabs are created automatically with styled headers.
 * - POST  ?sheet=RSVP | Wishes  -> appends a row
 * - GET   ?action=wishes        -> returns saved wishes as JSON (newest first)
 */

var SPREADSHEET_ID = '1XmlzJo0kdD6g3igCTeP-FDTVaHv-4PRqiiarUccr33g';

var SHEETS = {
  RSVP: {
    name: 'RSVP',
    headers: ['Timestamp', 'Full Name', 'Phone', 'Attendance', 'Guests', 'Dietary Notes'],
    widths: [170, 220, 140, 110, 80, 320],
  },
  WISHES: {
    name: 'Wishes',
    headers: ['Timestamp', 'Guest Name', 'Message'],
    widths: [170, 220, 520],
  },
};

var HEADER_BG = '#5C1A2B';   // royal maroon
var HEADER_FG = '#F5E6C8';   // champagne

/* ------------------------------------------------------------------ */
/* Entry points                                                        */
/* ------------------------------------------------------------------ */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var data = parsePayload_(e);
    var key = String(data.sheet || '').toUpperCase();
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    if (key === 'RSVP') {
      var rsvp = getOrCreateSheet_(ss, SHEETS.RSVP);
      rsvp.appendRow([
        new Date(),
        clean_(data.name),
        clean_(data.phone),
        clean_(data.attendance || 'Yes'),
        Number(data.guests) || 1,
        clean_(data.dietary || data.dietaryNotes),
      ]);
      return json_({ result: 'success', sheet: SHEETS.RSVP.name });
    }

    if (key === 'WISHES' || key === 'WISH') {
      var wishes = getOrCreateSheet_(ss, SHEETS.WISHES);
      wishes.appendRow([new Date(), clean_(data.name), clean_(data.message)]);
      return json_({ result: 'success', sheet: SHEETS.WISHES.name });
    }

    return json_({ result: 'error', error: 'Unknown sheet. Use "RSVP" or "Wishes".' });
  } catch (err) {
    return json_({ result: 'error', error: String(err && err.message ? err.message : err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    var action = e && e.parameter ? String(e.parameter.action || '') : '';

    if (action === 'wishes') {
      var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      var sheet = getOrCreateSheet_(ss, SHEETS.WISHES);
      var last = sheet.getLastRow();
      var rows = last > 1 ? sheet.getRange(2, 1, last - 1, 3).getValues() : [];

      var list = rows
        .filter(function (r) { return r[1] && r[2]; })
        .map(function (r) {
          return {
            name: String(r[1]),
            message: String(r[2]),
            createdAt: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
          };
        })
        .reverse();

      return json_({ result: 'success', wishes: list });
    }

    return json_({ result: 'success', message: 'Amindu & Ushera wedding endpoint is running.' });
  } catch (err) {
    return json_({ result: 'error', error: String(err && err.message ? err.message : err) });
  }
}

/**
 * Optional: run once from the Apps Script editor to create both tabs
 * right away (they are also created automatically on first submission).
 */
function setup() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  getOrCreateSheet_(ss, SHEETS.RSVP);
  getOrCreateSheet_(ss, SHEETS.WISHES);
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function getOrCreateSheet_(ss, config) {
  var sheet = ss.getSheetByName(config.name);
  if (!sheet) {
    sheet = ss.insertSheet(config.name);
  }
  if (sheet.getLastRow() === 0) {
    writeHeaders_(sheet, config);
  }
  return sheet;
}

function writeHeaders_(sheet, config) {
  var cols = config.headers.length;
  sheet.getRange(1, 1, 1, cols)
    .setValues([config.headers])
    .setFontWeight('bold')
    .setBackground(HEADER_BG)
    .setFontColor(HEADER_FG)
    .setHorizontalAlignment('center');
  sheet.setFrozenRows(1);
  for (var i = 0; i < cols; i++) {
    sheet.setColumnWidth(i + 1, config.widths[i]);
  }
  sheet.getRange(2, 1, sheet.getMaxRows() - 1, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
  sheet.getRange(2, cols, sheet.getMaxRows() - 1, 1).setWrap(true);
}

function parsePayload_(e) {
  var params = e && e.parameter ? e.parameter : {};
  if (Object.keys(params).length > 0) return params;

  var body = e && e.postData && e.postData.contents ? e.postData.contents : '';
  if (!body) return {};
  try {
    return JSON.parse(body);
  } catch (_err) {
    return {};
  }
}

// Prevent spreadsheet formula injection and trim long input
function clean_(value) {
  var s = String(value == null ? '' : value).trim().slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
