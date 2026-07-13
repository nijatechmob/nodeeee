const mongoose = require("mongoose");
const Counter = require("./Counter");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    roleId: {
      type: String,
      required: true,
      enum: ["1", "2", "3"],
   
    },

    roleName: {
      type: String,
      required: true,
      enum: ["admin", "user", "technician"],
      
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function () {
  if (!this.isNew) return;

  const counter = await Counter.findOneAndUpdate(
    { _id: "userId" },
    { $inc: { seq: 1 } },
    {
      upsert: true,
      new: true,
    }
  );

  this.userId = counter.seq;
});

module.exports = mongoose.model("User", userSchema);








// const mongoose = require("mongoose");
// const Counter = require("./Counter");

// const userSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: Number,
//       unique: true,
//     },

//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     mobileNumber: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },

//     role: {
//       type: String,
//       enum: ["admin", "user", "technician"],
//       default: "user",
//     },

//     password: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       transform: function (doc, ret) {
//         delete ret._id;
//         delete ret.__v;
//         delete ret.password;
//         return ret;
//       },
//     },
//   }
// );

// userSchema.pre("save", async function () {
//   if (!this.isNew) return;

//   const counter = await Counter.findOneAndUpdate(
//     { _id: "userId" },
//     { $inc: { seq: 1 } },
//     {
//       upsert: true,
//       new: true,
//     }
//   );

//   this.userId = counter.seq;
// });

// module.exports = mongoose.model("User", userSchema);