export interface IMovementDetails {
    id_movimiento: number,
    usuario_id: number,
    usuario_nombre: string,
    tipo_movimiento: string,
    fecha_registro: string,
    detalles: IProductDetail[]
}

export interface IProductDetail {
    producto_id: number,
    producto_nombre: string,
    cantidad: number,
    precio_unitario: number,
    total: number,
    stock_anterior: number,
    stock_nuevo: number
}