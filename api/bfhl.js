export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body.data;

      if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Data must be an array" });
      }

      const numbers = data.filter(item => /^\d+$/.test(item));
      const alphabets = data.filter(item => /^[a-zA-Z]+$/.test(item));
      const specialChars = data.filter(item => !/^[a-zA-Z0-9]+$/.test(item));

      const evenNumbers = numbers.filter(n => parseInt(n) % 2 === 0).map(String);
      const oddNumbers = numbers.filter(n => parseInt(n) % 2 !== 0).map(String);
      const uppercaseAlphabets = alphabets.map(ch => ch.toUpperCase());
      const sum = numbers.reduce((a, b) => a + parseInt(b), 0).toString();

      const concat = alphabets.join("");
      let concatReversed = concat.split("").reverse();
      concatReversed = concatReversed.map((ch, i) =>
        i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
      );
      const concatString = concatReversed.join("");

      return res.status(200).json({
        is_success: true,
        user_id: "ritik_garg_29082005",   // update
        email: "your_email@example.com",  // update
        roll_number: "YOUR_ROLL_NUMBER",  // update
        even_numbers: evenNumbers,
        odd_numbers: oddNumbers,
        alphabets: uppercaseAlphabets,
        special_characters: specialChars,
        sum: sum,
        concat_string: concatString
      });
    } catch (err) {
      return res.status(500).json({ is_success: false, message: "Server Error" });
    }
  }

  return res.status(405).json({ is_success: false, message: "Method Not Allowed" });
}