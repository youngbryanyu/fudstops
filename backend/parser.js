const xmlParser = require('xml2json')
const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<Item xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<ID>6c883ba0-e283-4086-ab01-e181a6615435</ID>
<Name>Scrambled Eggs</Name>
<IsVegetarian>true</IsVegetarian>
<Allergens>
<Allergen>
<Name>Coconut</Name>
<Value>false</Value>
</Allergen>
<Allergen>
<Name>Eggs</Name>
<Value>true</Value>
</Allergen>
<Allergen>
<Name>Fish</Name>
<Value>false</Value>
</Allergen>
<Allergen>
<Name>Gluten</Name>
<Value>false</Value>
</Allergen>
<Allergen>
<Name>Milk</Name>
<Value>true</Value>
</Allergen>
<Allergen>
<Name>Peanuts</Name>
<Value>false</Value>
</Allergen>
<Allergen>
<Name>Sesame</Name>
<Value>false</Value>
</Allergen>
<Allergen>
<Name>Shellfish</Name>
<Value>false</Value>
</Allergen>
<Allergen>
<Name>Soy</Name>
<Value>false</Value>
</Allergen>
<Allergen>
<Name>Tree Nuts</Name>
<Value>false</Value>
</Allergen>
<Allergen>
<Name>Vegetarian</Name>
<Value>true</Value>
</Allergen>
<Allergen>
<Name>Vegan</Name>
<Value>false</Value>
</Allergen>
<Allergen>
<Name>Wheat</Name>
<Value>false</Value>
</Allergen>
</Allergens>
<NutritionFacts>
<NutritionFact>
<Name>Serving Size</Name>
<LabelValue>1/2 Cup</LabelValue>
<Ordinal>0</Ordinal>
</NutritionFact>
<NutritionFact>
<Name>Calories</Name>
<Value>160.2958</Value>
<LabelValue>160</LabelValue>
<Ordinal>1</Ordinal>
</NutritionFact>
<NutritionFact>
<Name>Calories from fat</Name>
<LabelValue>99</LabelValue>
<Ordinal>2</Ordinal>
</NutritionFact>
<NutritionFact>
<Name>Total fat</Name>
<Value>10.8805</Value>
<LabelValue>11g</LabelValue>
<DailyValue>17%</DailyValue>
<Ordinal>3</Ordinal>
</NutritionFact>
<NutritionFact>
<Name>Saturated fat</Name>
<Value>2.6405</Value>
<LabelValue>2.5g</LabelValue>
<DailyValue>13%</DailyValue>
<Ordinal>4</Ordinal>
</NutritionFact>
<NutritionFact>
<Name>Cholesterol</Name>
<Value>311.3398</Value>
<LabelValue>310mg</LabelValue>
<DailyValue>104%</DailyValue>
<Ordinal>5</Ordinal>
</NutritionFact>
<NutritionFact>
<Name>Sodium</Name>
<Value>416.0545</Value>
<LabelValue>420mg</LabelValue>
<DailyValue>17%</DailyValue>
<Ordinal>6</Ordinal>
</NutritionFact>
<NutritionFact>
<Name>Total Carbohydrate</Name>
<Value>2.9257</Value>
<LabelValue>3g</LabelValue>
<DailyValue>1%</DailyValue>
<Ordinal>7</Ordinal>
</NutritionFact>
<NutritionFact>
<Name>Sugar</Name>
<Value>0.0000</Value>
<LabelValue>0g</LabelValue>
<Ordinal>8</Ordinal>
</NutritionFact>
<NutritionFact>
<Name>Added Sugar</Name>
<Value>0.0000</Value>
<LabelValue>0g</LabelValue>
<Ordinal>9</Ordinal>
</NutritionFact>
<NutritionFact>
<Name>Dietary Fiber</Name>
<Value>0.0000</Value>
<LabelValue>0g</LabelValue>
<DailyValue/>
<Ordinal>10</Ordinal>
</NutritionFact>
<NutritionFact>
<Name>Protein</Name>
<Value>11.7027</Value>
<LabelValue>12g</LabelValue>
<DailyValue>12%</DailyValue>
<Ordinal>11</Ordinal>
</NutritionFact>
<NutritionFact>
<Name>Calcium</Name>
<Value>36.5709</Value>
<DailyValue>4%</DailyValue>
<Ordinal>12</Ordinal>
</NutritionFact>
<NutritionFact>
<Name>Iron</Name>
<Value>1.0971</Value>
<DailyValue>6%</DailyValue>
<Ordinal>13</Ordinal>
</NutritionFact>
</NutritionFacts>
<Ingredients>Egg Scrambled Mix Frozen (Whole Eggs, Reconstituted Nonfat Dry Milk, Egg Whites, Corn Oil, Salt, Xanthan Gum, Citric Acid, Natural Flavoring, Annatto (A Natural Color).), Canola Oil (Canola Oil With TBHQ And Citric Acid Added To Help Protect Flavor. Dimethylpolysiloxane, An Antifoaming Agent, Added.)</Ingredients>
</Item>
`
const json = xmlParser.toJson(xmlString)
const obj = JSON.parse(json)
//console.log(obj)
console.log("Name: ", obj.Item.Name)

console.log("Is Vegetarian?: ", obj.Item.IsVegetarian)

console.log("Allergens: ", obj.Item.Allergens)

console.log("Nutrition Facts: ", obj.Item.NutritionFacts)

console.log("Ingredients: ", obj.Item.Ingredients)