import mongoose, { Schema } from 'mongoose';

const issueSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Waste', 'Road', 'Water', 'Electricity', 'Other'],
        default: 'Other'
    },
    priorityScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending'
    },
    location: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    scoreBreakdown: {
        severity: Number,
        frequency: Number,
        locationImpact: Number,
        timePending: Number,
        aiAdjustment: Number
    },
    reportedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Issue = mongoose.model('Issue', issueSchema);
