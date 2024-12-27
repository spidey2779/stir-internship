const mongoose = require("mongoose");

const TrendSchema = new mongoose.Schema(
  {
    uniqueID: { type: String, required: true },
    trends: { type: [String], required: true },
    timestamp: { type: Date, required: true },
    ipAddress: { type: String, required: true },
  },
  {
    toObject: {
        virtuals: true,
        transform: (doc, ret) => {
          delete ret._id; // Exclude _id field from the response
          return ret;
        }
      },
      toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
          delete ret._id; // Exclude _id field from the response
          return ret;
        }
      }
    }
  );

module.exports = mongoose.model("Trend", TrendSchema);
