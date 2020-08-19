import { ApolloServer } from 'apollo-server-express'

 export default gql`
    type Query {
      images: [Images]!
    }
    type Images {
      id:ID!
      filename: String!
      publicId: String!
      format: String!
      url: String!
    }
    type Mutation {
      singleUpload(file: Upload!): Image!
    }
  `