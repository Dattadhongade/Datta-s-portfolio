const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin'
    },
    failedLoginAttempts: {
      type: Number,
      default: 0
    },
    lockUntil: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Pre-save hook: Hash password if modified
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance helper to check if account is currently locked
userSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Compare input password with stored hash
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Increment failed attempts and lock account if limit reached
userSchema.methods.incLoginAttempts = async function () {
  // Reset attempts if lock has expired
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return await this.updateOne({
      $set: { failedLoginAttempts: 1 },
      $unset: { lockUntil: 1 }
    });
  }

  const updates = { $inc: { failedLoginAttempts: 1 } };
  if (this.failedLoginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
    updates.$set = { lockUntil: new Date(Date.now() + LOCK_TIME) };
  }

  return await this.updateOne(updates);
};

// Reset failed login attempts on successful login
userSchema.methods.resetLoginAttempts = async function () {
  return await this.updateOne({
    $set: { failedLoginAttempts: 0 },
    $unset: { lockUntil: 1 }
  });
};

// Static helper: Seed or sync default admin user on system startup
userSchema.statics.seedDefaultAdmin = async function () {
  try {
    const targetUsername = (process.env.ADMIN_USERNAME || 'dattadhongade12@gmail.com').toLowerCase().trim();
    const targetPassword = process.env.ADMIN_PASSWORD || 'Datta@$#2003!';

    let adminUser = await this.findOne({ role: 'admin' });
    if (!adminUser) {
      adminUser = new this({
        username: targetUsername,
        password: targetPassword,
        role: 'admin'
      });
      await adminUser.save();
      console.log(`🔒 Security Seeding: Created Admin Account ("${targetUsername}") in MongoDB.`);
    } else {
      let modified = false;
      if (adminUser.username !== targetUsername) {
        adminUser.username = targetUsername;
        modified = true;
      }
      const isPasswordSame = await adminUser.comparePassword(targetPassword);
      if (!isPasswordSame) {
        adminUser.password = targetPassword;
        modified = true;
      }
      if (modified) {
        await adminUser.save();
        console.log(`🔒 Security Seeding: Updated Admin Account credentials ("${targetUsername}") in MongoDB.`);
      }
    }
  } catch (err) {
    console.error('Error seeding default admin account:', err);
  }
};

module.exports = mongoose.model('User', userSchema);
