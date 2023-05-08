import { RequestHandler} from "express"

import { body, validationResult } from 'express-validator';

import { createClient } from '@supabase/supabase-js'

import { StationController } from '../types/controllerTypes'

import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`)

export const getStations: StationController['getStations'] = async (req, res) => {

    const { data: stations, error } = await supabase
        .from('stations')
        .select('*')

    if (error) return res.status(400).json({ error: error.message })

    return res.json(stations)

}

export const getStationsById: RequestHandler = async (req, res) => {

    const { data: stations, error } = await supabase
            .from('stations')
            .select('*')
            .eq('id', req.params.id)

    if (error) return res.status(400).json({ error: error.message })

    return res.json(stations)

}

export const getFavorites: RequestHandler = async (req, res) => {

    const { data: stations, error } = await supabase
        .from('stations')
        .select('*')
        .eq('favorite', true)

    if (error) return res.status(400).json({ error: error.message })

    return res.json(stations)

}
interface Station {
    name: string;
    url: string;
    favorite: boolean;
}

export const addStationValidator = [
    body('name').not().isEmpty().withMessage('Name is required').isString().withMessage('Name should be a string').isLength({ min: 3 }).withMessage('Name should be at least 3 characters long'),
    body('url').not().isEmpty().withMessage('URL is required').isURL().withMessage('URL should be a valid URL'),
    body('favorite').not().isEmpty().withMessage('Favorite is required').isBoolean().withMessage('Favorite should be a boolean'),
];

export const addStation: StationController['addStation'] = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({ errors: errors.array() });

        }

        const { name, url, favorite } = req.body as Station;

        const { data: station,error } = await supabase.from('stations').insert([{ name, url, favorite }]).single();

        if (error) {

            console.error(error);

            return res.status(400).json({ error: error.message });

        }
        else {

            return res.status(201).json({ message: 'Station added successfully', station: req.body });

        }
    }
    catch (error: any) {

        console.error(error);

        return res.status(500).json({ error: error.message });

    }

};

export const deleteStation: StationController['deleteStation'] = async (req, res) => {

    try {

        const { name } = req.params;

        // First, check if the station exists

        const { data: station, error: checkError } = await supabase
            .from('stations')
            .select('id')
            .eq('name', name)
            .single();

    if (checkError) {

        console.error(checkError);

        return res.status(400).json({ error: checkError.message });

    }

    if (!station) {

        return res.status(404).json({ error: 'Station not found' });

    }

    // If the station exists, delete it

    const { error: deleteError } = await supabase
        .from('stations')
        .delete()
        .eq('id', station.id);

    if (deleteError) {

        console.error(deleteError);

        return res.status(400).json({ error: deleteError.message });

    }

    return res.status(200).json({ message: 'Station deleted successfully' });

    }
    catch (error: any) {

        console.error(error);

        return res.status(500).json({ error: error.message });

    }

};

export const deleteStationValidator = [
    body('name').not().isEmpty().withMessage('Name is required').isString().withMessage('Name should be a string').isLength({ min: 3 }).withMessage('Name should be at least 3 characters long'),
];
