1. Open the sheet: https://docs.google.com/spreadsheets/d/1XmlzJo0kdD6g3igCTeP-FDTVaHv-4PRqiiarUccr33g
2. Open Extensions > Apps Script.
3. Replace the script content with everything in `code.ts` (project root) and save.
4. (Optional) Run the `setup` function once and approve permissions — this creates the
   "RSVP" and "Wishes" tabs with headers. They are also created automatically on the first submission.
5. Click Deploy > New deployment > type: Web app.
6. Execute as: Me. Who has access: Anyone.
7. Deploy and copy the Web App URL (ends with /exec).
8. Either paste it into `src/config.ts`, or set it in `.env` / Vercel environment variables:

VITE_GOOGLE_APPS_SCRIPT_URL=YOUR_WEB_APP_URL

9. Restart the dev server / redeploy.

Notes:
- If you change the Apps Script code later, use Deploy > Manage deployments > Edit > New version.
- RSVP columns: Timestamp, Full Name, Phone, Attendance, Guests, Dietary Notes
- Wishes columns: Timestamp, Guest Name, Message
