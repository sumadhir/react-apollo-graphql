const { ApolloServer, gql } = require('apollo-server');
const DataLoader = require('dataloader');
const { find, filter } = require('lodash');
const dessertList = require('./mockdata');

const typeDefs = `
  type NutritionInfo {
    calories: Int!
    fat: Int!
    carb: Int!
    protein: Int!
  }

  input Nutrition {
    calories: String
    fat: String
    carb: String
    protein: String
  }

  type Dessert {
    id: Int!  
    dessert: String
    nutritionInfo: NutritionInfo
  }

  # the schema allows the following query:
  type Query {
    dessertList: [Dessert]
  }

  # this schema allows the following mutation:
  type Mutation {
    createDessert(dessert: String, nutritionInfo: Nutrition!): Dessert
  }
`;


const resolvers = {
  Query: {
      dessertList: () => dessertList
  },
  Mutation: {
      createDessert: (_, { dessert, nutritionInfo}) => {
          const id = Math.floor(1000 + Math.random() * 9000);
          return {id, dessert, nutritionInfo};
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
  context: ({ req }) => {
    return {
      loaders: {

      }
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
