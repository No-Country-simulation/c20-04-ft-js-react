import { msResolves } from "./resolves_Msg.js"
import { userResolves } from "./resolves-User.js"
import {postRosolves} from "./resolves_Post.js"
const resolvers = {
 Query :{
    ...msResolves.Query,
    ...userResolves.Query,
    ...postRosolves.Query
 },
 Mutation:{
...userResolves.Mutation,
...postRosolves.Mutation,
 }
} 
export default resolvers