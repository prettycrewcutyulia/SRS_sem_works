const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Подключение к базе данных
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'nic_sem',
});

connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных: ' + err.stack);
    return;
  }
  console.log('Подключено к базе данных');
});

app.use(express.urlencoded());
app.use(express.json()); 

// получить всех
app.get('/masters', (req, res) => {
  connection.execute('SELECT * FROM master_table', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ masters: results });
  });
});

// Получить мастера по id
app.get('/masters/:id', (req, res) => {
  connection.execute(
    'SELECT * FROM master_table WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ master: results[0] });
    }
  );
});

// Создать нового мастера
app.post('/masters', (req, res) => {
  const {name} = req.query;
  connection.query('INSERT INTO master_table (name) VALUES (?)', [name], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Мастер успешно создан', id: result.insertId });
  });
});

// Обновить мастера
app.put('/masters/:id', (req, res) => {
  const {name} = req.query;
  connection.query('UPDATE master_table SET name = ? WHERE id = ?', [name, req.params.id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Мастер успешно обновлен' });
  });
});

app.delete('/masters/:id', (req, res) => {
  connection.query('DELETE FROM master_table WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Мастер успешно удален' });
});
});

// создать деталь
app.post('/detail', (req, res) => {
  const { master_id, description } = req.body;
  // console.log(master_id, " ");
  connection.query('INSERT INTO detail_table (master_id, description) VALUES (?, ?)', [master_id, description], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Деталь успешно создана', id: result.insertId });
  });
});

// обновить деталь
app.put('/detail/:id', (req, res) => {
  const {master_id, description} = req.body;
  connection.query('UPDATE detail_table SET master_id = ?, description = ? WHERE id = ?', [master_id, description, req.params.id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Деталь успешно обновлена' });
  });
});

// получить все детали
app.get('/detail', (req, res) => {
  connection.execute(
    'SELECT detail_table.id, detail_table.description, master_table.name as master_name FROM detail_table, master_table WHERE detail_table.master_id = master_table.id', 
    (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ detail: results });
  });
});

// Получить деталь по id
app.get('/detail/:id', (req, res) => {
  connection.execute(
    'SELECT detail_table.id, detail_table.description, master_table.name as master_name FROM detail_table, master_table WHERE detail_table.master_id = master_table.id AND detail_table.id = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ detail: results[0] });
    }
  );
});

app.delete('/detail/:id', (req, res) => {
  connection.query('DELETE FROM detail_table WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Деталь успешно удалена' });
});
});


app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
