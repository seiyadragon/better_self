import { createClient } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next';

const requestHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        let supabaseUrl = process.env.SB_URL !== undefined ? process.env.SB_URL : ""
        let supabaseKey = process.env.SB_KEY !== undefined ? process.env.SB_KEY : ""
    
        const supabase = createClient(supabaseUrl, supabaseKey)
    
        let {data: quo1, error: err1} = await supabase.from("Quotes").select().range(0, 1000)
        let {data: quo2, error: err2} = await supabase.from("Quotes").select().range(1000, 2000)
        let quotes = quo1?.concat(quo2)
        let def_quotes = quotes !== undefined ? quotes : []

        res.status(200).json(def_quotes)
    } else {
        res.status(500).json({message: "You're only allowed to fetch!"})
    }

}; export default requestHandler