
export class Vehicle {
    // model: string;
    // ...
    private sold: number;
  
    constructor(public brand: string, public model: string, public doors: number, private price: number) {
      // this.model = model;
      // ...
      this.sold = 0; 
    }

    getPrice(): number {
      return this.price;
    }

    setPrice(newPrice: number) {
      if (newPrice < 0) {
        throw new Error("Price cannot be negative");
      }
      this.price = newPrice;
    }
  
    // Sales transaction
    sales(quantity: number) {
      this.sold += quantity;
    }

    // Revenue report
    reportRevenue(): number {
        return this.sold * this.price;
    }
  }