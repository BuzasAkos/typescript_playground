export class Vehicle {
    private model: string;
    private price: number;
    private sold: number;
  
    constructor(model: string, price: number) {
      this.model = model;
      this.price = price;
      this.sold = 0; 
    }
  
    // getters & setters:
    public getModel(): string {
        return this.model;
    }    

    public getPrice(): number {
      return this.price;
    }

    public setPrice(newPrice: number) {
      if (newPrice < 0) {
        throw new Error("Price cannot be negative");
      }
      this.price = newPrice;
    }
  
    // Sales transaction
    public sales(quantity: number) {
      this.sold += quantity;
    }

    // Revenue report
    public reportRevenue(): number {
        return this.sold * this.price;
    }
  }