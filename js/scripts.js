//Order Object Constructor
function Order() {
  this.pizzas = [];
  this.pizzaNum = 0;
}

//Add Pizza Prototype
Order.prototype.addPizza = function(pizza) {
  pizza.num = this.assignNum();
  this.pizzas.push(pizza);
}

//ID Generator Prototype
Order.prototype.assignNum = function() {
  this.pizzaNum +=1;
  return this.pizzaNum;
}

//Display Prototype
Order.prototype.displayOrder = function() {
  var order = $("ul#order");
  var htmlOrder = "";
  this.pizzas.forEach(function(pizza) {
    htmlOrder += "<li id=" + pizza.num + ">" + pizza.size + " " + pizza.toppings + " $" + pizza.price + "</li>"
  });
  var total = 0;
  this.pizzas.forEach(function(pizza){
    total += pizza.price;
  });
  htmlOrder += "Total: $" + total + "<br> Click on a pizza to remove it from your order";
  order.html(htmlOrder);
  $(".order").show();
}

//Pizza Object Constructor
function Pizza(size) {
  this.toppings = [];
  this.size = size;
  this.price = 0;
}

//Base Price Prototype
Pizza.prototype.basePrice = function(toppings) {
  if (toppings === "Leo") {
    this.price = 15;
  } else if (toppings === "Donnie") {
    this.price = 16;
  } else if (toppings === "Mikey") {
    this.price = 17;
  } else if (toppings === "Raph") {
    this.price = 18;
  } else {
    toppings.forEach(topping => {
      if (topping === "Pepperoni" || topping === "Sausage" || topping === "Mama Lil's"){
        this.price += 4;
      } else {
        this.price += 2;
      }
    });
  }
}

//Size Price Adjuster Prototype
Pizza.prototype.sizeCost = function(size) {
  if (size === "Medium") {
    this.price += 2;
  } else if (size === "Large") {
    this.price += 4;
  }
}


$(document).ready(function(){
  var order = new Order();
  $("#housepie").click(function(event){
    var pizza = new Pizza($("#housesize").val());
    pizza.toppings.push($("#pizza").val());
    pizza.basePrice(pizza.toppings[0]);
    pizza.sizeCost(pizza.size);
    order.addPizza(pizza);
    order.displayOrder();
  });

  $("#newpie").click(function(event){
    var pizza = new Pizza($("#size").val());
    $("input[name=custompie]:checked").each(function() {
      pizza.toppings.push(this.value);
    });
    pizza.basePrice(pizza.toppings);
    pizza.sizeCost(pizza.size);
    order.addPizza(pizza);
    order.displayOrder();
    $("#custom")[0].reset();
  });

  $("ul#order").on("click", "li", function() {
    delete order.pizzas[this.id -1];
    order.displayOrder();
  })
});