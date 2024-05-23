export interface Car {
    brand: string,
    model: string,
    doors: number,
    isHybrid?: boolean,      // opcionális
    price?: number,          // opcionális
    sold?: number            // opcionális
}