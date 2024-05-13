
import {Schema, model} from 'mongoose';

const mensajeSchema = new Schema({
    id_mensaje: {
        type: Number,
        required: true,
    },
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
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
})

export const mensajeModel = model('Mensaje',mensajeSchema)