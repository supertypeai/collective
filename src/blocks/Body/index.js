import WpArticles from "../WpArticles"


const Body = ({ data }) => {
    return (
        <>
            <div className="col-span-12 lg:col-span-4 justify-center justify-self-center lg:justify-self-start mt-8">
                <WpArticles wp_data={data['wp']} />
            </div>
            <div className="mx-auto max-w-80 lg:col-span-8 justify-center justify-self-center lg:justify-self-start mt-8">
                Work with me!
            </div>
        </>
    )
}

export default Body