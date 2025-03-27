export interface IEditProduct {
    id_producto: number,
    producto?: string;
    stock?: number;
    precio_unitario?: number;
    proveedor_id?: number;
    categoria_id?: number;
  }