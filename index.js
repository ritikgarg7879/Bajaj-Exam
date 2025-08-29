import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const isAlpha = (s) => /^[A-Za-z]+$/.test(s);
const isNumeric = (s) => /^\d+$/.test(s);
const isSingleSpecial = (s) => s.length === 1 && !/[A-Za-z0-9]/.test(s);

function buildUserId() {
  const fullName = (process.env.FULL_NAME || '').trim().toLowerCase();
  const dob = (process.env.DOB_DDMMYYYY || '').trim();
  return ${fullName}_${dob};
}

function alternatingCapsReverseConcat(alphaItems) {
  const chars = alphaItems.join('').split('');
  const reversed = chars.reverse();
  return reversed
    .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join('');
}

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body || {};

    if (!Array.isArray(data)) {
      return res.status(200).json({
        is_success: false,
        user_id: buildUserId(),
        email: process.env.EMAIL || '',
        roll_number: process.env.ROLL_NUMBER || '',
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: '0',
        concat_string: ''
      });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];

    let sum = 0;

    for (const raw of data) {
      const s = String(raw);

      if (isNumeric(s)) {
        const n = parseInt(s, 10);
        if (n % 2 === 0) {
          even_numbers.push(s);
        } else {
          odd_numbers.push(s);
        }
        sum += n;
      } else if (isAlpha(s)) {
        alphabets.push(s.toUpperCase());
      } else if (isSingleSpecial(s)) {
        special_characters.push(s);
      }
    }

    const concat_string = alternatingCapsReverseConcat(
      data.map(String).filter((s) => isAlpha(s))
    );

    const response = {
      is_success: true,
      user_id: buildUserId(),
      email: process.env.EMAIL || '',
      roll_number: process.env.ROLL_NUMBER || '',
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(200).json({
      is_success: false,
      user_id: buildUserId(),
      email: process.env.EMAIL || '',
      roll_number: process.env.ROLL_NUMBER || '',
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: '0',
      concat_string: ''
    });
  }
});

app.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});