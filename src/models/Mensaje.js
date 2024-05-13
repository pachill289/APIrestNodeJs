
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

export const mensajeModel = model('Mensaje',mensajeSchema)