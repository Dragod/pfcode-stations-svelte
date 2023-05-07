import { RequestHandler} from "express"

import { createClient } from '@supabase/supabase-js'

import { UsersController } from '../types/controllerTypes'

import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`)

export const getUserById: UsersController['getUserById'] = async (req, res) => {

    const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', req.params.id)

    if (error) return res.status(400).json({ error: error.message })

    return res.json(users)

}

