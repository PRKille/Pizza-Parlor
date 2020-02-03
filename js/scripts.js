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
  htmlOrder += "Total: $" + total + `<br> <p class="tiny"> Click on a pizza to remove it from your order</p>`;
  // order.html(htmlOrder);
  return htmlOrder;
}

//Pizza Object Constructor
function Pizza() {
  this.toppings = [];
  this.size;
  this.price = 0;
}

//Base Price Prototype
Pizza.prototype.basePrice = function(options) {
  for (i = 0; i < options.length; i++){
    this.toppings.push(options[i]);
  }
  if (this.toppings[0] === "Leo") {
    this.price = 15;
  } else if (this.toppings[0] === "Donnie") {
    this.price = 16;
  } else if (this.toppings[0] === "Mikey") {
    this.price = 17;
  } else if (this.toppings[0] === "Raph") {
    this.price = 18;
  } else {
    this.toppings.forEach(topping => {
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
  this.size = size;
  if (size === "Medium") {
    this.price += 2;
  } else if (size === "Large") {
    this.price += 4;
  }
}


$(document).ready(function(){
  var order = new Order();
  $("#housepie").click(function(event){
    var pizza = new Pizza();
    var size = $("#housesize").val();
    var toppings = [];
    toppings.push($("#pizza").val());
    pizza.basePrice(toppings);
    pizza.sizeCost(size);
    order.addPizza(pizza);
    $("ul#order").html(order.displayOrder())
    $(".order").show();
  });

  $("#newpie").click(function(event){
    var pizza = new Pizza();
    var size = $("#size").val();
    var toppings = [];
    $("input[name=custompie]:checked").each(function() {
      toppings.push(this.value);
    });
    pizza.basePrice(toppings);
    pizza.sizeCost(size);
    order.addPizza(pizza);
    $("ul#order").html(order.displayOrder())
    $(".order").show();
    $("#custom")[0].reset();
  });

  $("ul#order").on("click", "li", function() {
    delete order.pizzas[this.id -1];
    order.displayOrder();
  });
});