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
    category: {
        type: String,
        required: true,
        enum: ['infrastructure', 'sanitation', 'safety', 'environment', 'other']
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'resolved', 'rejected'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        },
        address: String
    },
    images: [{
        type: String
    }],
    reportedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    verifications: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        verifiedAt: {
            type: Date,
            default: Date.now
        }
    }],
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    resolvedAt: Date,
    feedback: {
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: String
    }
}, { timestamps: true });

issueSchema.index({ location: '2dsphere' });

export const Issue = mongoose.model('Issue', issueSchema);
