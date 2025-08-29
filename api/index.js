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

      // Even & Odd numbers as strings
      const evenNumbers = numbers.filter(n => parseInt(n) % 2 === 0).map(String);
      const oddNumbers = numbers.filter(n => parseInt(n) % 2 !== 0).map(String);

      // Uppercase alphabets
      const uppercaseAlphabets = alphabets.map(ch => ch.toUpperCase());

      // Sum of numbers as string
      const sum = numbers.reduce((a, b) => a + parseInt(b), 0).toString();

      // Concat string in reverse with alternating caps
      const concat = alphabets.join("");
      let concatReversed = concat.split("").reverse();
      concatReversed = concatReversed.map((ch, i) =>
        i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
      );
      const concatString = concatReversed.join("");

      // Response
      return res.status(200).json({
        is_success: true,
        user_id: "john_doe_17091999", // replace with your DOB
        email: "john@xyz.com", // replace with your email
        roll_number: "ABCD123", // replace with your roll number
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

  // Only allow POST
  return res.status(405).json({ is_success: false, message: "Method Not Allowed" });
}