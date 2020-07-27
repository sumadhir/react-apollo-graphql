const dessertListQuery = `query{
  dessertList{
    id
    dessert
    nutritionInfo{
      calories
      fat
      carb
      protein
    }
  }
}`;


const createDessertMutation = `mutation(
  $dessert: String
  $nutritionInfo: Nutrition!
){
  createDessert(dessert: $dessert, nutritionInfo: $nutritionInfo){
    id
    dessert
    nutritionInfo{
      calories
      fat
      carb
    }
  }
}`;

module.exports = {
    dessertListQuery,
    createDessertMutation
}