export default`
type Comics {
  comics: [Comics]
}

type Comic {
  id: Int!
  title: String
  thumbnail: String
  images: [String]
  hasImages: Boolean
  description: String
  characters: [Character]
  creators: [Creator]
}

type Characters {
  characters: [Characters]
}

type Character {
  id: Int!
  name: String
  role: String
  description: String
  thumbnail: String
  hasImages: Boolean,
  comicsTotal: Int
  comics: [Comic]
}

type Creators {
  creators: [Creators]
}

type Creator {
  id: Int!
  fullName: String
  suffix: String
  thumbnail: String,
  hasImages: Boolean,
  comicsTotal: Int
  comics: [Comic]
}

type Query {
  comic(id: Int!): Comic
  comics(
    start: Int = 0, 
    limit: Int = 12, 
    orderBy: String,
    titleStartsWith: String,
    characterIds: [Int]
  ): [Comic]
  
  character(id: Int!): Character
  characters(
    start: Int = 0,
    limit: Int = 12,
    orderBy: String,
    nameStartsWith: String
  ): [Character]
  
  creator(id: Int!): Creator
  creators(
    start: Int = 0,
    limit: Int = 12,
    orderBy: String,
    nameStartsWith: String
  ): [Creator]
}
`
