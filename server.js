import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let matchAddressName = {
    '61:1b:c4:f0:55:b3': 'Jamie',
    '7b:99:bd:a9:c4:30': 'Amit', 
    '17:27:a5:fe:6a:7e': 'Gerald',
    "98:8b:82:6f:fd:ce": 'Jamie',
    "92:5c:1a:c8:6e:7e": 'Guy'
};

// In-memory storage for handshakes
let handshakes = [
  {
    id: 1,
    name: "John Mitchell",
    timestamp: "2024-03-15T14:30:00",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 2,
    name: "Emily Chen",
    timestamp: "2024-03-15T13:15:00",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 3,
    name: "Marcus Johnson",
    timestamp: "2024-03-15T11:45:00",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

// GET endpoint to retrieve all handshakes
app.get('/api/handshakes', (req, res) => {
  res.json(handshakes);
});

// POST endpoint to add a new handshake
app.post('/api/handshakes', (req, res) => {
  const newHandshake = {
    id: handshakes.length + 1,
    name: matchAddressName[req.body.address],
    timestamp: new Date().toISOString(),
    avatar: req.body.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
  };
  
  handshakes = [newHandshake, ...handshakes];
  res.status(201).json(newHandshake);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});