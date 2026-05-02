import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const GEMINI_MODEL = 'gemini-2.5-flash';

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server ready on http://localhost:${PORT}`));

app.post('/api/chat', async (req, res) => {
    const { conversation } = req.body;
    // [ { role: "user", text: "Halo" } ]
    try {
        if(!Array.isArray(conversation)) throw new Error('Messages must be an array!');

        const contents = conversation.map(({ role, text }) => ({
            role,
            parts: [{ text }]
        }));

        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents,
            config: {
                temperature: 0.8,
                topP: 0.5,
                systemInstruction: `
                    Anda adalah Customer Service Pemesanan Makanan SGK Food yang ramah, tanyakan kepada user ingin Pesan makanan apa dan tunjukkan list makanannya Nasi goreng, ayam goreng, minuman,
                    lalu buatkan itinerary Ada yang bisa saya bantu terkait pesanan makanan, jawab hanya pertanyaan terkait pesanan lalu jumlah total semua dan metode pembayaran,jika user ada refisi bisa menyesuaikan pesanannya.
                `
            }
        })
        res.status(200).json({ result: response.text });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});