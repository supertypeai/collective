import { supabase } from '@/lib/supabaseClient';
import { useQuery, QueryClient, dehydrate } from '@tanstack/react-query'

import { Mainframe } from '@/blocks/Mainframe'

const fetchBookIds = async () => {
    const { data, error } = await supabase
        .from('sessionManager')
        .select('id')

    if (error) {
        throw new Error(error, "Error fetching book ids")
    }

    if (!data) {
        throw new Error("No books")
    }
    return data
}