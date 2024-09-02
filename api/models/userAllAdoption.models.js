import mongoose from "mongoose";

const infoadopSchema = new mongoose.Schema({
    id_user: {
        type: String
    },
    info: {
        name: {
            type: String
        },
        vivianda: {
            type: String
        },
        estilo_de_vida: {
            type: String
        },
        espacio_a_el_air_libre: {
            type: String
        },
        motivo: {
            type: String
        },
        mascotas_otras: {
            type: String
        }
    },
    id_adoption: {
        type: String
    }

},
    { timestamps: true }
)
export default mongoose.model("Infoadop", infoadopSchema)