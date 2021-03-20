let foodOptions;
let data = {};

fetch("/Data/Meats.json")
  .then(response => response.json())
  .then(json => foodOptions = json);

 let loadAnimalData = () =>{
    if(localStorage.getItem("myAnimals") != null){
        data.animals = JSON.parse(localStorage.getItem("myAnimals"));
        if(data.selectedAnimal == null && data.animals != null){
            data.selectedAnimal = data.animals[0];
        }
    };
}
  class Animal{
    constructor(name, age, sex, weight, type){
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.weight = weight;
        this.type = type;
    };

    save(){
        loadAnimalData();
        data.animals.push(this);
        localStorage.setItem("myAnimals", JSON.stringify(data.animals));
    }
}

data = {
    debugging: false,
    showCreateAnimalForm: false,
    animals: new Array(),
    units: [{"name" : "Lbs", "value": "Lbs"}, {"name":"Kg", "value" : "Kg"}],
    selectedUnit: "Lbs",
    animalTypes: [{"name" : "cat", "value":"cat"}],
    selectedAnimalType: 'cat',
    creatingAnimal: {name: "", age: 0, sex: "", weight: 0, type: "cat"},
    selectedAnimal: new Animal()
};

  let animalApp = new Vue({
      el: '#app',
      data: data,
      methods: {
        onCreateAnimalStart: function(){
            data.showCreateAnimalForm = true;
        },

        onCreateAnimalCancel : function() {
            data.showCreateAnimalForm = false;
        },
        onCreateAnimalSave: function(){
            let newAnimal = new Animal(data.creatingAnimal.name, data.creatingAnimal.age, data.creatingAnimal.sex, data.creatingAnimal.weight, data.creatingAnimal.type);
            newAnimal.save();
        },
        onSelectedAnimalChange: function(){
            console.log('change');
            let sAnim = this.animals.filter(animal => {
                return animal.name == document.getElementById("CurrentAnimal").value
              });
            if(sAnim != null){
                data.selectedAnimal = sAnim[0];
            }
        },
        init(){
            loadAnimalData();
            //this.onSelectedAnimalChange();
        }
    }
  }); 

  animalApp.init();