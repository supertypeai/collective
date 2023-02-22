import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';

import Home from '@/icons/Home'

import { WordPressBlogroll, useWordPressFeed } from 'wordpress-posts-react'

import { Mainframe } from '@/blocks/Mainframe'
import Toprow from '@/blocks/Toprow'
import { PROFILES } from '@/data/profiles'

const me = PROFILES['samuel']

export async function getStaticProps() {

    const res = await fetch(`https://api.github.com/users/${me['github_handle']}`);
    const github_data = await res.json();
    console.log(github_data)

    return {
        props: {
            data: {
                ...me,
                gh: github_data,
            }
        },
    }
}

const Samuel = ({ data }) => {

    return (
        // needs some navbar here to return to home
        <Mainframe>
            <Toprow data={data}>
                {/* {JSON.stringify(data)} */}
            </Toprow>
        </Mainframe>
    )
}

export default Samuel