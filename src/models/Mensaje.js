
import {Schema, model} from 'mongoose';

const mensajeSchema = new Schema({
    tipo: String,
    mensaje: String,
    emisor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    destino: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: new Date().toLocaleDateString()
    },
    updated_at: {
        type: Date,
        default: new Date().toLocaleDateString()
    }
},{
    timestamps: false
})

const messageSchema = new Schema({
    from_id: {
        type: Number,
        required: true
    },
    to_id: {
        type: Number,
        required: true
    },
    body: {
        type: String,
        required: false
    },
    attachment: String,
    seen: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

export const mensajeModel = model('Mensaje',mensajeSchema)
export const messageModel = model('Message',messageSchema)