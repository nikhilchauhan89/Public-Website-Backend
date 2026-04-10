import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import User from './models/User.js';
import Project from './models/Project.js';
import Service from './models/Service.js';


import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import ideaRoutes from './routes/ideaRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';

dotenv.config();


await connectDB();

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@gmail.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: 'adminpassword123',
        role: 'admin'
      });
      console.log('Default admin seeded: admin@gmail.com / adminpassword123');
    }
  } catch (error) {
    console.error('Error seeding admin', error);
  }
};
await seedAdmin();

const seedDummyContent = async () => {
  try {
    const pCount = await Project.countDocuments();
    if (pCount === 0) {
      await Project.insertMany([
        { title: 'E-commerce Platform', description: 'A fully functional online store with Stripe integration.', techStack: ['React', 'Node.js', 'MongoDB'] },
        { title: 'Portfolio Website', description: 'A sleek, modern portfolio for a freelance designer.', techStack: ['React', 'CSS3'] },
        { title: 'Task Manager App', description: 'A productivity app for managing daily tasks and projects.', techStack: ['Vue', 'Express'] }
      ]);
      console.log('Dummy projects seeded');
    }

    const sCount = await Service.countDocuments();
    if (sCount === 0) {
      await Service.insertMany([
        { name: 'Web Development', description: 'Building responsive and modern web applications from scratch.' },
        { name: 'UI/UX Design', description: 'Creating intuitive and engaging user experiences and interfaces.' },
        { name: 'Backend Architecture', description: 'Designing robust, scalable, and secure backend systems.' }
      ]);
      console.log('Dummy services seeded');
    }
  } catch (error) {
    console.error('Error seeding dummy content', error);
  }
};
await seedDummyContent();

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);

app.get('/', (req, res) => {
  res.send('Backend API is successfully running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
