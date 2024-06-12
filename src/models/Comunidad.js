import mongoose from 'mongoose';
const { Schema } = mongoose;

const CommunitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    max_number_users: {
        type: Number,
        required: true
    },
    type_community: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: false
});

export const communityModel = mongoose.model('Community', CommunitySchema);