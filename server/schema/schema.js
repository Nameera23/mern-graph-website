const {GraphQLObjectType, GraphQLID, GraphQLString , GraphQLSchema, GraphQLList}= require('graphql')
const project= require('../models/project')
const client=require('../models/client')
const clientType = new GraphQLObjectType({
    name: 'client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},

    })
});

const projectType = new GraphQLObjectType({
    name: 'project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client:{
            type: clientType,
            resolve(parent,args){
                return client.findById(parent.clientId)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{

        clients:{
            type: new GraphQLList(clientType),
            resolve(parent, args){
                return client.find()
            }
        },
        client:{
            type: clientType,
            args: {id:{type:GraphQLID}},
            resolve(parent ,args){
                return client.findById(args.id)
            }
        },

        projects:{
            type: new GraphQLList(projectType),
            resolve(parent, args){
                return project.find()
            }
        },
        project:{
            type: projectType,
            args: {id:{type:GraphQLID}},
            resolve(parent ,args){
                return project.findById(args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})