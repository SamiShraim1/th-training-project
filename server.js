// استيراد الحزم الأساسية
const express = require('express');
const cors = require('cors');

// إنشاء تطبيق Express
const app = express();

// إعداد الميدل وير
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// إعداد المجلد الثابت (Static Folder)
app.use(express.static('website'));

// كائن فارغ لتخزين البيانات
let projectData = {};


// مسار GET لإعادة بيانات المشروع
app.get('/all', (req, res) => {
    res.send(projectData);
  });

  // مسار POST لتحديث بيانات المشروع
app.post('/add', (req, res) => {
    const { temperature, date, userResponse } = req.body;
    projectData = {
      temperature,
      date,
      userResponse,
    };
    res.send({ message: 'Data successfully saved' });
  });

  
  // تشغيل الخادم
const port = 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

