import { Mainframe } from '@/blocks/Mainframe'
import Toprow from '@/blocks/Toprow'
import Body from '@/blocks/Body'
import Affiliations from '@/blocks/Affiliations'
import { generateStack } from '@/blocks/Stack'
import { supabase } from "@/lib/supabaseClient";

export async function getStaticProps() {

    const { data, error } = await supabase
        .from('profile')
        .select()
        .eq('s_preferred_handle', 'samuel')
    
    const profile = data[0];

    if (profile['github_handle']) {
        const res_gh = await fetch(`https://api.github.com/users/${profile['github_handle']}`);
        const github_data = await res_gh.json();
        profile['gh'] = github_data
    }

    if (profile['wp_blog_root_url'] && profile['wp_blog_author_id']) {
        const res_wp = await fetch(`${profile['wp_blog_root_url']}/wp-json/wp/v2/posts?per_page=6&author=${profile['wp_blog_author_id']}&categories=4&5`);
        const wp_data = await res_wp.json();
        profile['wp'] = wp_data
    }

    return {
        props: {
            data: profile,
        },
    }
}

const Profile = ({ data }) => {

    return (
        <Mainframe data={data}>
            <Toprow>
                Hire me to work on your analytics backend, <b>operationlize</b> your data science models,
                or architect your <b>end-to-end machine learning pipelines.</b>
            </Toprow>
            <Body stack={generateStack(data.stack)} affiliations={<Affiliations />} />
        </Mainframe>
    )
}

export default Profile