class Animal{
    constructor(name, age, sex, weight, type){
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.weight = weight;
        this.type = type;
    };

    save(){
        localStorage.setItem(this.name, this);
    }

    load(name){
        return localStorage.getItem(name);
    }
}