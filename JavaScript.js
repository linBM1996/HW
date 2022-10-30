//ingredients data
//מערך רגיל של מרכיבים שכל איבר בו הוא מערך אסוציאטיבי של פרטי המרכיב
ingredientJson = [
    {
        id: 1,
        name: 'Broccoli',
        image: 'https://www.health.harvard.edu/media/content/images/p7_Broccoli_HH1812_gi905351392.jpg',
        calories: 34
    },
    {
        id: 2,
        name: 'Cauliflower',
        image: 'https://t3.gstatic.com/images?q=tbn:ANd9GcSeg3atgP35f83U_eFhOPcnD6-ZDUh19g0EhYvLjznjfW4p6tzcSyr1qLHAEA7Q0zPZSJqjUuX-XhQA2aLcggM',
        calories: 25
    },
    {
        id: 3,
        name: 'Nudels',
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Fresh_ramen_noodle_001.jpg',
        calories: 138
    },
    {
        id: 4,
        name: 'Soy sauce',
        image: 'https://cdn.shopify.com/s/files/1/0206/9470/products/10683_HFARM_49645309-3_grande.jpeg?v=1441105440',
        calories: 12
    }
]

var counterId = 1;
var recipeIngArr = [];

class ingredient {

    constructor(name, image, calories) {
        this.id = counterId++;
        this.name = name;
        this.image = image;
        this.calories = calories;
    }
    //properties
    get Id() { return this.id; }
    get Name() { return this.name; }
    get Image() { return this.image; }
    get Calories() { return this.calories; }
    set Name(value) { this.name = value }
    set Image(value) { this.image = value }
    set Calories(value) {
        if (value < 0) {
            alert("Calories cannot be a negative number");
            return;
        }
        this.calories = value;
    }
    // class methods
    Render() { // card render
        let str = `<div class="col-12 col-sm-6 col-md-4 col-lg-3">`;
        str += `<div class="row card"><div class="col-12"><label>add <input id="${this.Id}" type="checkbox" /></label></div><div class="col-12"><p>ingredient details:</p></div>`;
        str += `<div class="col-12"><img src=${this.Image} alt="couldn't load picture" /></div>`;
        str += `<div class="col-12"><p>${this.Name}</p></div>`;
        str += `<div class="col-12"><p>calories: ${this.Calories}</p></div></div></div>`;
        return str;
    }
}


class DishRecipe {

    constructor(name, cookingTime, cookingMethod, image) {
        this.recipeIngArr = recipeIngArr;
        this.name = name;
        this.cookingTime = cookingTime;
        this.cookingMethod = cookingMethod;
        this.image = image;
    }
    get Name() { return this.name; }
    get Ingredients() { return this.recipeIngArr; }
    get CookingTime() { return this.cookingTime; }
    get CookingMethod() { return this.cookingMethod; }
    get Image() { return this.image; }

    set Name(value) { this.name = value }
    set Ingredients(value) { this.recipeIngArr = value }
    set CookingTime(value) {
        if (value < 0) {
            alert("Cooking time cannot be a negative number");
            return;
        }
        this.cookingTime = value;
    }
    set CookingMethod(value) { this.cookingMethod = value }
    set Image(value) { this.image = value }

    // class methods
    Render() {

        let str = `<div class="col-12 col-sm-6 col-md-4 col-lg-3"><div class="row card">`;
        str += `<div class="col-12"><p>Dish Recipe details:</p></div>`;
        str += `<div class="col-12"><img src=${this.Image} alt="couldn't load picture" /></div>`;
        str += `<div class="col-12"><p>dish name: ${this.Name}</p></div>`;
        str += `<div class="col-12"><p>Cooking method: ${this.CookingMethod}</p></div>`;
        str += `<div class="col-12"><p>Total cooking time: ${this.CookingTime} minutes</p></div>`;
        str += `<div class="col-12"><p>total calories: ${this.getTotalCalories()}</p></div>`;
        str += `<div class="col-12"><button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" onclick="displayModal('${this.Name}')">show ingredients</button></div>`
        str += `</div></div>`;
        return str;
    }

    getTotalCalories() {
        var totalCalories = 0;

        for (var i = 0; i < this.recipeIngArr.length; i++) {
            totalCalories += this.recipeIngArr[i].Calories;
        }
        return totalCalories;
    }

    getIngredients() {

        let str = '<div class="row">';
        for (var i = 0; i < this.recipeIngArr.length; i++) {

            str += `<div class="col-12 col-sm-6 col-md-4 col-lg-3">`;
            str += `<div class="row card">`
            str += `<div class="col-12"><p>ingredient details:</p></div>`;
            str += `<div class="col-12"><img src=${this.recipeIngArr[i].Image} alt="couldn't load picture" /></div>`;
            str += `<div class="col-12"><p>${this.recipeIngArr[i].Name}</p></div>`;
            str += `<div class="col-12"><p>calories: ${this.recipeIngArr[i].Calories}</p></div></div></div>`;
        }
        str += '</div>';
        return str;
    }

}

function init() {

    //create ingredient objects array and convert the Jason objects
    ArrIngredient = [];

    for (var i = 0; i < ingredientJson.length; i++) {
        Ingredient = new ingredient(ingredientJson[i].name, ingredientJson[i].image, ingredientJson[i].calories);
        ArrIngredient.push(Ingredient);
    }

    //create dishes array and add the initial recpie
    Dishes = [];

    //adding all initial ingredients to initial recpie
    for (var i = 0; i < ArrIngredient.length; i++) {
        recipeIngArr.push(ArrIngredient[i]);
    }

    recipe = new DishRecipe('Pad thai', 60, 'pan cooking', 'https://d3o5sihylz93ps.cloudfront.net/wp-content/uploads/2020/05/13165500/IMG_0006-1.jpg');
    Dishes.push(recipe);

    // empty temp recipeIngArr after adding the ingred to the recipe
    recipeIngArr = [];

    //initial dish render
    let str = '<div class="row">';
    str += Dishes[0].Render();
    str += '</div>';
    document.getElementById("DishesPh").innerHTML = str;
}

function addNewIngredient() {
    let str = '<div class="row">';
    str += '<div class="col-12"> <p>Ingredient name:</p ><input type="text" id="I_name" /></div>';
    str += '<div class="col-12"> <p>Ingredient image (url):</p><input type="text" id="I_img" /></div>';
    str += '<div class="col-12"> <p>Ingredient calories:</p> <input type="text" id="I_cal" /></div></div>';
    str += '<br />';
    str += '<div class="row">';
    str += '<div class="col">';
    str += ` <button type="button" onclick="CreateIngredient('I_name','I_img','I_cal')">Create ingredient </button>`;
    str += ' <button type="button" onclick="Close()">Close </button>';
    str += '</div>';
    str += '</div>';

    document.getElementById("ph").innerHTML = str;
}

function addNewRecipe() {
    let str = '<div class="row">';
    str += '<div class="col-12"> <p>Recipe name:</p ><input type="text" id="D_name" /></div>';
    str += '<div class="col-12"> <p>Recipe cooking method:</p><input type="text" id="D_cooking_method" /></div>';
    str += '<div class="col-12"> <p>Recipe cooking time:</p> <input type="text" id="D_cooking_time" /></div></div>';
    str += '<div class="col-12"> <p>Recipe Image (url):</p> <input type="text" id="D_img" /></div></div>';
    str += '<br/>';
    str += '<div class="row">';
    str += '<div class="col">';
    str += '<h3>choose ingrediants</h3>';
    str += '</div>';

    str += '<div class="row">';
    for (var i = 0; i < ArrIngredient.length; i++) {

        str += ArrIngredient[i].Render();

    }
    str += '</div>';
    str += '<br/>';
    str += '<div class="row">';
    str += '<div class="col">';
    str += ' <button type="button" onclick="CreateRecipe(D_name,D_cooking_time,D_cooking_method,D_img)">Create Recipe</button>';
    str += ' <button type="button" onclick="Close()">Close </button>';
    str += '</div>';
    str += '</div>';

    document.getElementById("ph").innerHTML = str;
}

function CreateIngredient(name, image, cal) {
    let Iname = document.getElementById(name).value;
    let Iimage = document.getElementById(image).value;
    let Ical = document.getElementById(cal).value;
    var num = parseInt(Ical);
    if (Iname == '' || Iimage == '' || Ical == '') {
        alert('all feilds must be filled');
    }
    else {
        Ingredient = new ingredient(Iname, Iimage, num);
        ArrIngredient.push(Ingredient);
    }
}

function CreateRecipe(D_name, D_cooking_time, D_cooking_method, D_img) {
    let Dname = document.getElementById('D_name').value;
    let Dimage = document.getElementById('D_img').value;
    let DcookingTime = Number(document.getElementById('D_cooking_time').value);
    let DcookingMethod = document.getElementById('D_cooking_method').value;

    for (var i = 0; i < ArrIngredient.length; i++) {
        var MyCheckBox = document.getElementById(ArrIngredient[i].id);
        if (MyCheckBox.checked == true) {
            recipeIngArr.push(ArrIngredient[i]);
        }
    }
    if ((recipeIngArr == '') || (Dname == '') || (Dimage == '') || (DcookingTime == '') || (DcookingMethod == '')) {
        alert('all feilds must be filled');
    }
    else {
        recipe = new DishRecipe(Dname, DcookingTime, DcookingMethod, Dimage)
        Dishes.push(recipe);
    }

    // empty temp recipeIngArr after adding the ingred to the recipe
    recipeIngArr = [];

    //Dishes Render
    let str = '<div class="row">';
    for (var i = 0; i < Dishes.length; i++) {
        str += Dishes[i].Render();
    }
    str += '</div>'
    document.getElementById("DishesPh").innerHTML = str;

}

function Close() {
    let str = "";
    document.getElementById("ph").innerHTML = str;
}

function displayModal(ObjName) {

    for (var i = 0; i < Dishes.length; i++) {
        if (Dishes[i].Name == ObjName) {
            document.getElementById("ModalPh").innerHTML = Dishes[i].getIngredients();
        }
    }
}