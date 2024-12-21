import express from 'express';
import supabase from './db/db.js';
import cors from 'cors';
const app = express();
app.use(express.json());

app.use(cors({
    origin: '*',
}));

app.get('/', (req, res) => {
    res.send('Express server with Supabase is running!');
});
app.post('/add-student', async (req, res) => {
    const {
        date_joined,
        student_name,
        cohort,
        courses,
        last_login,
        status,
    } = req.body;

    try {
        const currentDateTime = new Date().toISOString();
        const { data, error } = await supabase.from('students').insert([
                {
                    date_joined,
                    student_name,
                    cohort,
                    courses,
                    last_login :currentDateTime,
                    status,
                },
            ]);

        if (error) {
            console.error('Error inserting student:', error);
            return res.status(400).json({ success: false, error: error.message });
        }

        res.status(201).json({ success: true, data });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/students', async (req, res) => {
    try {
        const { data, error } = await supabase.from('students').select('*');

        if (error) {
            console.error('Error fetching students:', error);
            return res.status(400).json({ success: false, error: error.message });
        }

        res.status(200).json({ success: true, data });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});
app.get('/students-by-course', async (req, res) => {
    const { course } = req.query;
    
    if (!course) {
        return res.status(400).json({ success: false, message: 'Course query parameter is required' });
    }

    try {
      
        const { data, error } = await supabase
            .from('students')
            .select('*');

        if (error) {
            console.error('Error fetching students:', error);
            return res.status(400).json({ success: false, message: "Fail" });
        }
        const filteredStudents = data.filter(student => {
            return student.courses.some(courseElement => {
                return courseElement.toLowerCase().includes(course.toLowerCase());
            });
        });
       
       
        res.status(200).json({ success: true, data: filteredStudents });

    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.get('/students-by-cohort', async (req, res) => {
    const { cohort } = req.query;

    if (!cohort) {
        return res.status(400).json({ success: false, message: 'Cohort query parameter is required' });
    }

    try {

        const { data, error } = await supabase
            .from('students')
            .select('*')
            .eq('cohort', cohort);  

        if (error) {
            console.error('Error fetching students by cohort:', error);
            return res.status(400).json({ success: false, message: error.message });
        }

        res.status(200).json({ success: true, data });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});