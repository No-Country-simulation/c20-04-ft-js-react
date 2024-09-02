import mongoose from "mongoose";

const infoadopSchema = new mongoose.Schema({
    id_user: {
        type: String,
        required:true
    },
    info: {
        name: {
            type: String,
            default:""
        },
        vivianda: {
            type: String,
            default:""
        },
        estilo_de_vida: {
            type: String,
            default:""
        },
        espacio_a_el_air_libre: {
            type: String,
            default:""
        },
        motivo: {
            type: String,
            default:""
        },
        mascotas_otras: {
            type: String,
            default:""
        }
    },
    id_adoption: {
        type: String,
        required:true
    }

},
    { timestamps: true }
)
export default mongoose.model("Infoadop", infoadopSchema)