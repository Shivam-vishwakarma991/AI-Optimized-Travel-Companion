const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
app.post("/generate-completion", async (req, res) => {
  console.log(req)
  const { Name, startDate,endDate,location,destination,numPeople,budget,tripType,additionalInfo } = req.body;
  if (Name.length == 0 && startDate.length == 0   && endDate.length == 0 && location.length == 0 && destination.length == 0 && numPeople.length == 0 && budget.length == 0 && tripType.length == 0 && additionalInfo.length == 0 )
    return res.status(400).json({
      success: 0,
      message: "No prompt provided",
    });
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Hello, I'm ${Name}, and I'm meticulously planning a trip that spans ${startDate} to ${endDate}. Currently, I'm situated in ${location}, and I'm thrilled about embarking on a voyage to ${destination} with a group of ${numPeople} enthusiastic travelers. My budget for this excursion is strictly set at ${budget}, and I'm specifically seeking a ${tripType}-oriented itinerary. I'm looking for your expert guidance as a trip planner to craft a comprehensive, day-by-day itinerary that covers all major attractions, activities, dining, and transportation. Additionally, please ensure that the itinerary aligns perfectly with ${additionalInfo}, as this is vital for a satisfying and seamless travel experience.Please dont ask for extra suggestions`
        },
      ],
    });
    let response = chatCompletion.choices[0].message;
    res.status(200).json({ success: 1, response });
    
  } catch (error) {
    console.log("Some error occured")
    res.sendStatus(500).json({
      success: 0,
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
