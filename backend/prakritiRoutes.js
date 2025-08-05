// backend/routes/prakritiRoutes.js
import express from 'express';
const router = express.Router();

router.post('/analyze', (req, res) => {
  const answers = req.body;

  // Perform basic dosha analysis logic (simple example)
  let vata = 0, pitta = 0, kapha = 0;
  for (let key in answers) {
    const value = answers[key].toLowerCase();
    if (value.includes('dry') || value.includes('thin') || value.includes('anxious') || value.includes('variable')) {
      vata++;
    } else if (value.includes('intense') || value.includes('angry') || value.includes('sharp') || value.includes('spicy')) {
      pitta++;
    } else {
      kapha++;
    }
  }

  // Identify primary and secondary doshas
  const counts = [
    { dosha: 'Vata', count: vata },
    { dosha: 'Pitta', count: pitta },
    { dosha: 'Kapha', count: kapha }
  ].sort((a, b) => b.count - a.count);

  const primaryDosha = counts[0].dosha;
  const secondaryDosha = counts[1].dosha;

  const description = `Your primary dosha is ${primaryDosha} and secondary is ${secondaryDosha}.`;
  const routine = `Suggested daily routine for ${primaryDosha}.`;
  const diet = `Recommended diet for ${primaryDosha}.`;
  const followUps = `Consider yoga/meditation for ${primaryDosha} balance.`;

  res.json({ primaryDosha, secondaryDosha, description, routine, diet, followUps });
});

export default router;
