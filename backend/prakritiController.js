// Example Node.js: controllers/prakritiController.js
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.analyzePrakriti = async (req, res) => {
  const answers = req.body;

  // Your existing logic to determine primaryDosha, secondaryDosha, description
  const primaryDosha = "Vata";
  const secondaryDosha = "Pitta";
  const description = "You are energetic but prone to anxiety.";

  // 🔮 Step: Ask GPT for suggestions
  const prompt = `
You are an Ayurvedic expert.
Based on the following doshas:
Primary: ${primaryDosha}
Secondary: ${secondaryDosha}

Suggest a simple:
1. Daily routine (morning to night),
2. Diet chart (breakfast, lunch, dinner),
3. Follow-up advice for next 30 days.

Respond in JSON with keys: "routine", "diet", "followUps"
`;

  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const gptData = JSON.parse(response.data.choices[0].message.content);

  return res.json({
    primaryDosha,
    secondaryDosha,
    description,
    ...gptData // Include routine, diet, followUps
  });
};
