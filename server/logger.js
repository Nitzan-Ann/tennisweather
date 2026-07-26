export function log(level, message) {
  const entry = { timestamp: new Date().toISOString(), level, message };
  console.log(JSON.stringify(entry));
}

/*
פונקציית עזר גלובלית לרישום לוגים.

מקבלת שני פרמטרים: level ו-message.
שני הערכים האלה לא נקבעים כאן בפונקציה עצמה.
הם מגיעים מכל מקום שקורא לפונקציה - מתוך server.js.

level הוא רמת החומרה של האירוע.
"info" למידע רגיל, "error" לשגיאות.
מי שקורא לפונקציה בוחר איזה ערך להעביר.
לדוגמה: "info" לפני קריאה ל-API חיצוני.
לדוגמה נוסף: "error" בתוך בלוק catch.

message הוא טקסט חופשי שמתאר מה קרה.
גם הוא מגיע מהקוד שקורא לפונקציה, לא קבוע מראש.

הפונקציה יוצרת אובייקט אחד עם שלושה שדות:
timestamp (זמן מדויק, בפורמט ISO), level, ו-message.
ואז מדפיסה את האובייקט הזה כמחרוזת JSON אחת.

זו פונקציית wrapper סביב console.log.
היא לא ממציאה הדפסה חדשה.
היא רק עוטפת את console.log בפורמט אחיד וקריא.
*/