const lynx = require('./index');
const app = lynx();

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
