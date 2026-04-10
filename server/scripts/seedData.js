const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Product = require('../models/Product');
const Admin = require('../models/Admin');

const sampleProducts = [
  {
    title: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    price: 199.99,
    category: 'Electronics',
    gender: 'Unisex',
    mainImg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    carousel: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
    ],
    sizes: ['One Size'],
    discount: 10
  },
  {
    title: 'Smart Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor and GPS',
    price: 299.99,
    category: 'Electronics',
    gender: 'Unisex',
    mainImg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    carousel: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    ],
    sizes: ['S', 'M', 'L'],
    discount: 15
  },
  {
    title: 'Laptop Backpack',
    description: 'Durable water-resistant backpack with laptop compartment',
    price: 49.99,
    category: 'Accessories',
    gender: 'Unisex',
    mainImg: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    carousel: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    ],
    sizes: ['One Size'],
    discount: 5
  },
  {
    title: 'Running Shoes',
    description: 'Lightweight running shoes with cushioned sole',
    price: 89.99,
    category: 'Footwear',
    gender: 'Men',
    mainImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    carousel: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'
    ],
    sizes: ['7', '8', '9', '10', '11'],
    discount: 20
  },
  {
    title: 'Bluetooth Speaker',
    description: 'Portable waterproof Bluetooth speaker with 12-hour battery',
    price: 59.99,
    category: 'Electronics',
    gender: 'Unisex',
    mainImg: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    carousel: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'
    ],
    sizes: ['One Size'],
    discount: 0
  },
  {
    title: 'Yoga Mat',
    description: 'Non-slip eco-friendly yoga mat with carrying strap',
    price: 29.99,
    category: 'Sports',
    gender: 'Unisex',
    mainImg: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    carousel: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500'
    ],
    sizes: ['One Size'],
    discount: 10
  },
  {
    title: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: 24.99,
    category: 'Electronics',
    gender: 'Unisex',
    mainImg: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    carousel: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'
    ],
    sizes: ['One Size'],
    discount: 5
  },
  {
    title: 'Water Bottle',
    description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours',
    price: 19.99,
    category: 'Sports',
    gender: 'Unisex',
    mainImg: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    carousel: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500'
    ],
    sizes: ['500ml', '750ml', '1L'],
    discount: 0
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Admin.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@shop-ez.com',
      password: adminPassword,
      role: 'ADMIN'
    });
    console.log('Admin user created:', admin.email);

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 10);
    const user = await User.create({
      name: 'Test User',
      email: 'user@shop-ez.com',
      password: userPassword,
      role: 'USER'
    });
    console.log('Test user created:', user.email);

    // Create admin settings
    const adminSettings = await Admin.create({
      banner: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
      categories: ['Electronics', 'Footwear', 'Accessories', 'Sports']
    });
    console.log('Admin settings created');

    // Create products
    const products = await Product.insertMany(sampleProducts);
    console.log(`${products.length} products created`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nLogin Credentials:');
    console.log('Admin - Email: admin@shop-ez.com, Password: admin123');
    console.log('User  - Email: user@shop-ez.com, Password: user123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
