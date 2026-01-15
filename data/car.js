class Car {

    brand;
    model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carDetails){
        this.brand = carDetails.brand;
        this.model = carDetails.model;
    }

    displayInfo(){
        const trunk = this.isTrunkOpen ? 'Open' : 'Closed';
        console.log(`${this.brand} - ${this.model} : ${this.speed} km/h : Trunk Status : ${trunk}`)
    }

    go(){

        if(!this.isTrunkOpen){
             this.speed += 5;

            if(this.speed > 200){
                this.speed = 200;
            }
        }
    }

    break(){
        this.speed -= 5;

        if(this.speed < 0){
            this.speed = 0;
        }
    }

    openTrunk(){
        if(this.speed === 0){
            this.isTrunkOpen = true;
        }
    }

    closeTrunk(){

    }

}



class RaceCar extends Car {
    acceleration;

    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    go(){

       this.speed += this.acceleration;

        if(this.speed > 300){
            this.speed = 300;
        }
        
    }

    break(){
        this.speed -= this.acceleration;

        if(this.speed < 0){
            this.speed = 0;
        }
    }

    openTrunk(){
        console.log('Race cars do not have trunk');
    }

    closeTrunk(){
        console.log('Race cars do not have trunk');
    }

    displayInfo(){
        console.log(`${this.brand} - ${this.model} : ${this.speed} km/h`)
    }

}

const car1 = new Car({
    brand : 'Toyota',
    model : 'Corolla'
});
car1.displayInfo();
car1.break();
car1.openTrunk();
car1.displayInfo();

const car2 = new Car({
    brand : 'Tesla',
    model : 'Model 3'
});

const raceCar = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
});

car2.displayInfo();
car2.go();
car2.break();
car2.break();
car2.displayInfo();
car2.openTrunk();

car2.displayInfo();


raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.break();
raceCar.displayInfo();


console.log(car1);
console.log(car2);