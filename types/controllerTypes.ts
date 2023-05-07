import { RequestHandler } from 'express';

export interface StationController {

    getStations: RequestHandler
    getStationsById: RequestHandler
    getFavorites: RequestHandler
    addStation: RequestHandler
    createStation: RequestHandler
    updateStation: RequestHandler
    deleteStation: RequestHandler

}

export interface UsersController {

    getUsers: RequestHandler
    getUserById: RequestHandler
    addUser: RequestHandler
    createUser: RequestHandler
    updateUser: RequestHandler
    deleteUser: RequestHandler

}