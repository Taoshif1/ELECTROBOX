// src/lib/mongodb.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log('✅ Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('🔄 Connecting to MongoDB...');
    
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB Connected Successfully!');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ MongoDB Connection Error:', e);
    throw e;
  }

  return cached.conn;
}

export default connectDB;




// ## 📋 **Step 3: Setup MongoDB Connection**

// You need a MongoDB database! Choose one:

// ### **Option A: MongoDB Atlas (Cloud - FREE & Easy)**

// 1. **Go to:** https://www.mongodb.com/cloud/atlas/register
// 2. **Sign up** (use your email)
// 3. **Create Organization** → "ELECTROBOX"
// 4. **Create Project** → "ELECTROBOX-App"
// 5. **Build a Database** → Choose **FREE** (M0)
// 6. **Choose Provider:** AWS
// 7. **Region:** Choose closest to Bangladesh (Singapore/Mumbai)
// 8. **Cluster Name:** Keep default
// 9. **Create Cluster**

// ### **Create Database User:**
// 1. **Security** → Database Access
// 2. **Add New Database User**
//    - Username: `admin`
//    - Password: `admin123` (save this!)
//    - Database User Privileges: **Read and write to any database**
// 3. Click **Add User**

// ### **Whitelist Your IP:**
// 1. **Security** → Network Access
// 2. **Add IP Address**
// 3. **Allow Access from Anywhere** → `0.0.0.0/0`
// 4. Click **Confirm**

// ### **Get Connection String:**
// 1. Go to **Database** → **Connect**
// 2. Choose **Drivers**
// 3. Copy the connection string (looks like this):
// ```
//    mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority