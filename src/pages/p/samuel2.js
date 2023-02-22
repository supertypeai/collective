import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';

import styles from '@/styles/Home.module.css'
import Home from '@/icons/Home'

import { WordPressBlogroll, useWordPressFeed } from 'wordpress-posts-react'

import { Mainframe } from '@/blocks/Mainframe'
import Toprow from '@/blocks/Toprow'
import Pills from '@/blocks/Pills'
import { PROFILES } from '@/data/profiles'

const me = PROFILES['samuel']

export async function getStaticProps({ pathname }) {

    const res = await fetch(`https://api.github.com/users/${me['github_handle']}`);
    const github_data = await res.json();
    console.log(github_data, "github_data")
    console.log(pathname, "pathname")

    return {
        props: {
            github_data
        },
    }

}

const Samuel = ({ me, github_data }) => {

    return (
        // needs some navbar here to return to home
        <Mainframe>
            <Toprow github_handle="onlyphantom" name="samuel"
                github_data={github_data}
            >
                lorem ipsum dolor sit amet
            </Toprow>
        </Mainframe>
    )
}

export default Samuel