import { readFileSync } from "fs";
import { Car } from "./models/car.interface";
import { Vehicle } from "./models/vehicle.class";


// alap típusok
function primitives(): string {
    let alfa: number = 42;
    let beta: string = 'message';
    let gamma: boolean = true;

    let delta = 99;     // type inference: number

    console.log(alfa, beta, gamma, delta);
    console.log(alfa === 42, delta !== 99);

    console.log(beta.split('')[1]);
    console.log(beta.slice(-3));
    console.log(beta.substring(0,4));

    return beta;
}

// console.log(primitives());


// tömbök definiálása, módosítása
const arrays = () => {
    const myArray: string[] = ['this', 'is', 'my', 'text', 'array'];
    console.log(myArray[3]);

    myArray.pop();              // utolsó elem törlése és visszaadása
    console.log(myArray);

    myArray.push('message');    // elem hozzáadása a végére
    console.log(myArray);

    myArray.unshift('hello');   // elem hozzáadása az elejére
    console.log(myArray);

    myArray.shift();            // elem törlése az elejéről
    console.log(myArray);

    myArray.splice(3, 1);       // elem törlése (start index, elemszám)
    console.log(myArray);

    myArray.splice(3, 0, 'very', 'final');          // elem(ek) beszúrása adott indexen
    console.log(myArray);  
    
    console.log(myArray.length); // elemek száma
}

// arrays();


// műveletek tömbökkel: összefűzés, rendezés, szűrés, összegzés
const arrayOps = () => {
    const smallNum: Array<number> = [1, 4, -2, 7, 5];
    const largeNum: number[] = [11, 16, 16, 17, 19];

    const embeddedArray = [largeNum, smallNum];          // egymásba ágyazzuk
    console.log('embedded:', embeddedArray);

    const concatArray = [...largeNum, ...smallNum, 21];   // spread operátor segítségével összefűzve
    console.log('concat:', concatArray);

    const slicedArray = concatArray.slice(3, 8);          // szeletelés, mint pythonban [3:8]
    console.log('slice:', slicedArray);

    const filteredArray = slicedArray.filter((item) => item % 2 === 0);   // szűrés függvény segítségével
    console.log('filter:', filteredArray);

    const total = slicedArray.reduce((prev,current) => prev + current, 0);      // összegzés függvény segítségével
    console.log('slice total:', total);

    let sum = 0;
    slicedArray.forEach(item => {
        sum += item;
    });
    console.log(sum);

    slicedArray.sort((a,b) => a - b );                    // rendezés függvénnyel, in-place!
    console.log('sorted:', slicedArray);

    slicedArray.reverse();                                // fordított sorrendbe állít, in-place!
    console.log('reverse:', slicedArray);

    const txtArray: string[] = ['alma', 'körte', 'citrom'];
    txtArray.sort((a,b) => b.localeCompare(a));           // rendezés stringek esetén, in-place! 
    console.log(txtArray);
}

// arrayOps();


// js objektumok, interface-ek használata
function jsObjects() {
    const myFirstCar: Car = {
        brand: 'Toyota',
        model: 'Auris',
        doors: 5,
        isHybrid: false
    }

    const myNewCar: Car = {
        brand: 'Skoda',
        model: 'Superb',
        doors: 4,
        isHybrid: false
    }

    myNewCar.doors = 5;                     // dot notation
    myFirstCar['isHybrid'] = true;          // bracket notation

    const cars: Car[] = [
        myFirstCar,
        myNewCar
    ]

    cars.push({
        brand: 'Porsche',
        model: 'Cayenne',
        doors: 3
    })

    console.log(cars);

    let { brand, model, isHybrid } = cars[2];         // object destruction

    console.log(brand, model, isHybrid);

    model = 'Panamera';
    let doors = 5;

    cars.push({brand, model, doors});        // key: key  egyszerűsített formátum
    console.log(cars);

}

// jsObjects();


// műveletek json adatokkal: filter, map, reduce, find
const dataOperations = () => {
    const carsJson = readFileSync('./src/cars.json','utf-8');
    const cars: Car[] = JSON.parse(carsJson);

    // írjuk ki ki az X5-ös árát:
    console.log('X5 price:', cars.find(car => car.model === 'X5')?.price );

    // szűrés 5 ajtós modellekre:
    const fiveDoorCars: Car[] = cars.filter(car => car.doors === 5);        
    console.table(fiveDoorCars);

    // bevétel oszlop hozzáadása
    let revenues = cars.map((car) => {
        if (!car.price || !car.sold) {
            return {...car, revenue: 0};                     // revenue=0 beszúrása ha nincs ár vagy darab, majd return!
        }
        const revenue: number = car.price * car.sold;
        return {...car, revenue }                            // revenue oszlop beszúrása, spread operátor!
    });
    console.table(revenues);

    // összes eladott autó
    const totalVolume = revenues.reduce((prev, car) => prev + (car.sold || 0), 0);    
    console.log('total Volume:',totalVolume);

    // legdrágább autó ára
    const highestPrice = revenues.reduce((prev, car) => {
        return car.price! > prev ? car.price! : prev                // ternary operator
    }, 0);        
    console.log('highest price:', highestPrice);

    // hybrid autók össz bevétele - old school módszer:
    let hybridRevenue = 0; 
    revenues.forEach( item => {
        if (item.isHybrid) {
            hybridRevenue += item.revenue;
        }
    })

    // csak a reduce függvény használatával:
    hybridRevenue = revenues.reduce((prev, car) => {
        return car.isHybrid ? prev + car.revenue : prev;              
    }, 0);

    // filter és reduce kombinálásával:                                                  
    hybridRevenue = revenues
        .filter((car) => car.isHybrid)
        .reduce((prev, car) => prev + car.revenue, 0);                // chaining
    
    console.log('hybrid Revenue:',hybridRevenue);

    
    // Category MAPPING:
    const brandCategories = [
        {brand: 'Audi', category: 'premium'},
        {brand: 'BMW', category: 'premium'},
        {brand: 'Tesla', category: 'luxury'}
    ]

    // LEFT JOIN: Category oszlop hozzáadása a revenue táblához
    let revenuesWithCat = revenues.map((car) => {
        const categoryFound = brandCategories.find(bc => bc.brand === car.brand)?.category;
        return {...car, category: categoryFound || 'standard'}
    });
    console.table(revenuesWithCat);

    // GROUP BY category:
    let revByCategories = revenuesWithCat.reduce((prev, car) => {
        const record = prev.find(item => item.category === car.category);
        record ? record.subtotal += car.revenue : prev.push ({ category: car.category, subtotal: car.revenue });
        return prev;
      }, [] as { category: string; subtotal: number }[]);
    console.table(revByCategories);
} 

// dataOperations();


// ts classes
function useVehicleClass() {
    const vehicle = new Vehicle('Skoda', 'Superb', 5, 50000);             // instantiation (példányosítás)
    console.log('type:', typeof vehicle);

    console.log('Model:', vehicle.model, 'Price:', vehicle.getPrice());

    vehicle.setPrice(45000);
    vehicle.sales(2);

    console.log('Revenue:', vehicle.reportRevenue());
}

// useVehicleClass();