import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { prisma } from './prisma.js';
import { decideCourtType } from './decision.js';
import { log } from './logger.js';

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use((req, res, next) => {
  log("info", `${req.method} ${req.url}`);
  next();
});


app.get('/api/courts', async (req, res) => {
    const { city } = req.query;
    try {
        const courts = await prisma.court.findMany({
            where: city ? { city } : {}
        });
        res.json(courts);
    }
    catch (err) {
        console.error(err);
        log("error", err.message)
        res.status(500).json({ error: 'Failed to fetch courts' });
    }
});

app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  try {
    log("info", `Calling external weather API for city: ${city}`);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      log("error", `Weather API returned an error for city "${city}": ${data.message}`);
      return res.status(404).json({ error: `City "${city}" not found` });
    }

    res.json(data);

  } catch (err) {
    console.error(err);
    log("error", err.message)
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.get('/api/recommendation', async (req, res) => {
  const { city, windThreshold, humidityThreshold, minTemp, maxTemp } = req.query;
  try {
    log("info", `Calling external weather API for city: ${city}`);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      log("error", `Weather API returned an error for city "${city}": ${data.message}`);
      return res.status(404).json({ error: `City "${city}" not found` });
    }

    const decision = decideCourtType(
      data,
      Number(windThreshold),
      Number(humidityThreshold),
      Number(minTemp),
      Number(maxTemp)
    );
    log("info", `Decision for ${city}: ${decision.recommendation} (${decision.reason})`);

    const isIndoor = decision.recommendation === "indoor";
    const courts = await prisma.court.findMany({
      where: { city, indoor: isIndoor }
      });
    res.json({ decision, courts });

  } catch (err) {
    console.error(err);
    log("error", err.message)
    res.status(500).json({ error: 'Failed to make recommondation' });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


/*
אפ יוז-
Middleware גלובלי - מטרתו לרשום לוג אחד אוטומטי לכל בקשה.

בלי המידלוור הזה, היינו צריכות להוסיף שורת log ידנית
בתחילת כל endpoint בנפרד (courts, weather, recommendation).
זה יוצר כפילות: אותה שורה כמעט זהה, מועתקת בכל endpoint.

המידלוור פותר את זה: הוא נכתב פעם אחת בלבד,
ורץ אוטומטית לפני כל endpoint, על כל בקשה שמגיעה לשרת.
כך אין צורך לחזור על אותו קוד בכל endpoint בנפרד.

req.method + req.url מתעדים מה בדיוק התבקש.
לדוגמה: "GET /api/courts?city=Tel Aviv".

next() קריטי כאן.
הוא אומר ל-Express "סיימתי, המשך הלאה".
בלי הקריאה הזו, הבקשה נתקעת כאן.
היא לעולם לא הייתה מגיעה ל-endpoint עצמו.

level כאן הוא תמיד "info", לא "error".
הסיבה: זה קורה על כל בקשה, כולל בקשות תקינות לגמרי.
זה לא מייצג בעיה או כישלון, רק תיעוד שהבקשה הגיעה.
לכן זו רמת חומרה רגילה, לא שגיאה.
*/

/*
ההבדל בין המידלוור הגלובלי (app.use) לבין קריאות log() פנימיות:

app.use (גלובלי) - שער כניסה אחד, רץ פעם אחת לכל בקשה,
לפני הכל. מתעד רק שבקשה הגיעה ומה ביקשו (method + url).
לא יודע מה קורה בהמשך העיבוד.

log() פנימי (בתוך כל endpoint) - נקרא במקומות ספציפיים בלוגיקה
עצמה: לפני קריאה ל-API חיצוני, אחרי קבלת החלטה, ובתוך catch
לכל שגיאה. מתעד את מה שקורה בפועל אחרי שהבקשה כבר נכנסה.

השילוב בין השניים נותן תמונה מלאה: גם מי נכנס ומתי (גלובלי),
וגם מה קרה בפנים (פנימי) - בלי לשכפל מידע, כי כל שכבה מתעדת
דבר אחר.
*/