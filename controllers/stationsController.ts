import { RequestHandler} from "express"

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

export const addStation: RequestHandler = async (req, res) => {

    const { name, url, favorite } = req.body;

    const { data: station, error } = await supabase
        .from('stations')
        .insert([
            { name: name, url: url, favorite: favorite },
        ])

    if (error) {
        return res.status(400).json({ error: error.message })
    } else {
        return res.json(station);
    }
}

