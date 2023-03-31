require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const mongoose = require("mongoose");

try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("Connected successfully to Database...");
} catch (err) {
  console.error(err);
}

const personSchema = new mongoose.Schema({
  user: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  var janeFonda = new Person({
    name: "Jane Fonda",
    age: 84,
    favoriteFoods: ["eggs", "fish", "fresh fruit"],
  });

  janeFonda.save((err, data) => {
    if (err) return console.error(err);
    console.log(data);
    done(null, data);
  });
};

var arrayOfPeople = [
  { name: "Frankie", age: 74, favoriteFoods: ["Del Taco"] },
  { name: "Sol", age: 76, favoriteFoods: ["roast chicken"] },
  { name: "Robert", age: 78, favoriteFoods: ["wine"] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    console.log(data);
    done(null, data);
  });
};

let personName = "John";

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    console.log(data);
    done(null, data);
  });
};

let food = "pizza";

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    console.log(data);
    done(null, data);
  });
};

const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, data) => {
      if (err) return console.error(err);
      console.log(data);
      done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.error(err);
    console.log(data);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }, (err, data) => {
    if (err) return console.error(err);
    console.log(data);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: { $all: [foodToSearch] } })
    .sort({ name: "pol" })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return console.error(err);
      console.log(data);
      done(null, data);
    });
};

let personId = "6426c5a904cc412d9d15f6b8";

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) return console.error(err);
    console.log(data);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      console.log(updatedPerson);
      done(null, updatedPerson);
    });
  });
};

app.listen(PORT, () => {
  console.log(`Server listening on "http://localhost:${PORT}"`);
});
