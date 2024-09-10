import { msResolves } from "./resolves_Msg.js"
import { userResolves } from "./resolves-User.js"
import {postRosolves} from "./resolves_Post.js"
import { commentResolves } from"./resolves_Commet.js"
import { petsResolves } from "./resolver_Pets.js"
const resolvers = {
 Query :{
    ...msResolves.Query,
    ...userResolves.Query,
    ...postRosolves.Query,
    ...commentResolves.Query,
    ...petsResolves.Query
 },
 Mutation:{
...userResolves.Mutation,
...postRosolves.Mutation,
...commentResolves.Mutation
 },
 Post:{
    ...postRosolves.Post
 },
Comment:{
   ...commentResolves.Comment
 },
Comment: {
   ...userResolves.Comment
},

User: {
   ...userResolves.User
},
Pets :{
   ...petsResolves.Pets
}

} 
export default resolvers