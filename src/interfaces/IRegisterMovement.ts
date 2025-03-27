export interface IRegisterMovement {
    usuario_id: number,
    tipo_movimiento: "Entrada" | "Salida",
    detalles: IDetailMovement[]
}

export interface IDetailMovement {
    producto_id: number,
    cantidad: number
}