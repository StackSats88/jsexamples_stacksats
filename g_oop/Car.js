// const Vehicle = require("./Vehicle.js");
import Vehicle from "./Vehicle.js";

// Create a child class (Car) from Vehicle class
class Car extends Vehicle{ // INHERITS the vehicle class

    // constructor
    constructor(make, model, year){
        super(make, model, year); // * super (keyword) - refers to the parent class
        this.airbag = true;       // property airbar is unique to cars  
    }

    // a static method of a class can be used without instantiation
    static welcomeStatement(msg){
        console.log(msg);
    }

    // Polymorphism (Override and specialising the parent method)
    drive(distance){
        super.travel(distance); // Abstraction - drive method hides the implementation (travel)
        console.log(`Driving complete. Status: ${this.airbag ? 'Safety Check Passed.' : 'Airbag absent'}`);
    }

    // checkSafetyFeature() is only found in Car class
    checkSafetyFeature(){
        return this.airbag;
    }

    // ? IMPLICIT INHERITANCE methods inherited here in Car class (from Vehicle class) include:
    // - travel()
    // - getTotalDistance() - Abstraction, where we do not see the implemenation of getTotalDistance(), yet we can invoke it
    // - distanceTraveled - Encapsulation, where the state of the property is managed by the parent class

}

// Instantiate a new instance of a Car called myNewCar

Car.welcomeStatement("\n***************\nWelcome Car Owner.\n***************\n");

const myNewCar = new Car("Honda", "Civic", 2024);
myNewCar.drive(200);
console.log(`Does my new car have safety features: ${myNewCar.checkSafetyFeature()}`);
console.log(`My new car is driven ${myNewCar.getTotalDistance()} km.`);

// module.exports = Car;   // Export the class Car
export default Car;